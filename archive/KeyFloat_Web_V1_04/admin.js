(() => {
  "use strict";

  const loginView = document.querySelector("#login-view");
  const dashboard = document.querySelector("#dashboard");
  const loginForm = document.querySelector("#admin-login-form");
  const loginStatus = document.querySelector("#login-status");
  const dashboardStatus = document.querySelector("#dashboard-status");
  const claimList = document.querySelector("#claim-list");
  const emptyState = document.querySelector("#empty-state");
  const approveDialog = document.querySelector("#approve-dialog");
  const approveStatus = document.querySelector("#approve-status");
  const connectionState = document.querySelector("#connection-state");
  let claims = [];
  let activeFilter = "pending";
  let selectedClaim;
  let refreshTimer = 0;

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: "same-origin",
      ...options,
      headers: options.body ? { "Content-Type": "application/json", ...(options.headers || {}) } : options.headers
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw Object.assign(new Error(payload.code || "REQUEST_FAILED"), { response, payload });
    return payload;
  }

  function setConnection(state, label) {
    connectionState.className = `connection-state ${state ? `is-${state}` : ""}`.trim();
    connectionState.querySelector("span").textContent = label;
  }

  function showLogin(message = "") {
    stopRefresh();
    dashboard.hidden = true;
    loginView.hidden = false;
    loginStatus.textContent = message;
    loginStatus.className = message ? "form-status is-error" : "form-status";
    document.querySelector("#admin-code").focus();
  }

  function showDashboard() {
    loginView.hidden = true;
    dashboard.hidden = false;
    startRefresh();
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
    }).format(date);
  }

  function copyButton(value) {
    const button = document.createElement("button");
    button.className = "button button-secondary";
    button.type = "button";
    button.textContent = "复制核验编号";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(value);
      button.textContent = "已复制";
      window.setTimeout(() => { button.textContent = "复制核验编号"; }, 1_400);
    });
    return button;
  }

  function openApproval(claim) {
    selectedClaim = claim;
    approveStatus.textContent = "";
    approveStatus.className = "form-status";
    document.querySelector("#confirm-reference").textContent = claim.reviewReference;
    document.querySelector("#confirm-email").textContent = claim.email;
    document.querySelector("#confirm-amount").textContent = `¥${claim.amountCny}`;
    approveDialog.showModal();
    document.querySelector("#confirm-approve").focus();
  }

  function renderClaims() {
    const pending = claims.filter((claim) => claim.status === "pending");
    const approved = claims.filter((claim) => claim.status === "approved");
    document.querySelector("#pending-count").textContent = String(pending.length);
    document.querySelector("#approved-count").textContent = String(approved.length);
    document.querySelector("#total-count").textContent = String(claims.length);

    const visible = activeFilter === "all" ? claims : claims.filter((claim) => claim.status === activeFilter);
    claimList.replaceChildren();
    visible.forEach((claim) => {
      const card = document.createElement("article");
      card.className = "claim-card";
      const main = document.createElement("div");
      main.className = "claim-main";
      const topline = document.createElement("div");
      topline.className = "claim-topline";
      const title = document.createElement("strong");
      title.textContent = "KeyFloat 桌面版";
      const badge = document.createElement("span");
      badge.className = `claim-status ${claim.status === "pending" ? "is-pending" : ""}`.trim();
      badge.textContent = claim.status === "pending" ? "待核验" : "已发码";
      topline.append(title, badge);

      const details = document.createElement("div");
      details.className = "claim-details";
      const values = [
        [claim.reviewReference, "claim-reference"],
        [claim.email, ""],
        [`¥${claim.amountCny}`, ""],
        [formatDate(claim.status === "approved" ? claim.approvedAt : claim.submittedAt), ""]
      ];
      if (claim.status === "approved") {
        const emailLabel = claim.emailDeliveryStatus === "sent" ? "券码邮件已发送"
          : claim.emailDeliveryStatus === "failed" ? "券码邮件发送失败" : "券码邮件等待发送";
        const emailClass = claim.emailDeliveryStatus === "sent" ? "email-status is-sent"
          : claim.emailDeliveryStatus === "failed" ? "email-status is-failed" : "email-status";
        values.push([emailLabel, emailClass]);
      }
      values.forEach(([value, className]) => {
        const span = document.createElement("span");
        span.className = className;
        span.textContent = value;
        details.append(span);
      });
      main.append(topline, details);

      const actions = document.createElement("div");
      actions.className = "claim-actions";
      actions.append(copyButton(claim.reviewReference));
      if (claim.status === "pending") {
        const approve = document.createElement("button");
        approve.className = "button button-primary";
        approve.type = "button";
        approve.textContent = "确认到账并发码";
        approve.addEventListener("click", () => openApproval(claim));
        actions.append(approve);
      } else if (claim.emailDeliveryStatus !== "sent") {
        const resend = document.createElement("button");
        resend.className = "button button-primary";
        resend.type = "button";
        resend.textContent = "重新发送券码邮件";
        resend.addEventListener("click", () => { void resendVoucherEmail(claim.id, resend); });
        actions.append(resend);
      }
      card.append(main, actions);
      claimList.append(card);
    });
    emptyState.hidden = visible.length > 0;
    claimList.hidden = visible.length === 0;
  }

  function setFilter(filter, { scroll = false } = {}) {
    activeFilter = ["pending", "approved", "all"].includes(filter) ? filter : "pending";
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === activeFilter);
    });
    document.querySelectorAll("[data-metric-filter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.metricFilter === activeFilter);
    });
    renderClaims();
    if (scroll) document.querySelector("#review-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function loadClaims({ silent = false } = {}) {
    if (!silent) {
      dashboardStatus.textContent = "正在刷新付款记录…";
      dashboardStatus.className = "form-status";
    }
    try {
      const result = await api("/api/admin/payment-claims?scope=all");
      claims = Array.isArray(result.claims) ? result.claims : [];
      renderClaims();
      document.querySelector("#last-updated").textContent = `最近刷新：${formatDate(new Date().toISOString())}`;
      dashboardStatus.textContent = "";
      setConnection("online", "已连接 · 自动刷新");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        showLogin("管理员会话已失效，请重新登录。");
        return;
      }
      if (!silent) {
        dashboardStatus.textContent = "付款记录加载失败，请检查网络后重试。";
        dashboardStatus.className = "form-status is-error";
      }
      setConnection("error", "连接异常");
    }
  }

  function stopRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = 0;
  }

  function startRefresh() {
    stopRefresh();
    refreshTimer = window.setInterval(() => {
      if (!document.hidden && !dashboard.hidden) void loadClaims({ silent: true });
    }, 5_000);
  }

  async function resendVoucherEmail(claimId, button) {
    button.disabled = true;
    button.textContent = "正在发送邮件…";
    dashboardStatus.textContent = "";
    try {
      const result = await api("/api/admin/payment-claims", {
        method: "POST",
        body: JSON.stringify({ action: "resend-email", claimId })
      });
      await loadClaims({ silent: true });
      dashboardStatus.textContent = result.emailDelivered
        ? "券码邮件已发送到用户的验证邮箱。"
        : "邮件仍未发送成功，请检查邮件服务配置后重试。";
      dashboardStatus.className = result.emailDelivered ? "form-status is-success" : "form-status is-error";
    } catch {
      dashboardStatus.textContent = "券码邮件发送失败，请检查邮件服务配置后重试。";
      dashboardStatus.className = "form-status is-error";
      button.disabled = false;
      button.textContent = "重新发送券码邮件";
    }
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = loginForm.querySelector("button[type='submit']");
    const input = document.querySelector("#admin-code");
    if (!input.reportValidity()) return;
    button.disabled = true;
    button.textContent = "正在登录…";
    loginStatus.textContent = "";
    try {
      await api("/api/auth/admin-login", {
        method: "POST",
        body: JSON.stringify({ adminCode: input.value })
      });
      input.value = "";
      showDashboard();
      await loadClaims();
    } catch (error) {
      loginStatus.textContent = error.payload?.code === "RATE_LIMITED"
        ? "尝试次数过多，请稍后再试。"
        : "管理员口令不正确或服务尚未配置。";
      loginStatus.className = "form-status is-error";
      input.select();
      setConnection("error", "登录失败");
    } finally {
      button.disabled = false;
      button.textContent = "登录管理后台";
    }
  });

  document.querySelector("#refresh-claims").addEventListener("click", () => { void loadClaims(); });
  document.querySelector("#logout").addEventListener("click", async () => {
    try { await api("/api/auth/admin-logout", { method: "POST" }); } catch { /* Local state still closes the dashboard. */ }
    claims = [];
    showLogin();
    setConnection("", "已退出");
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });
  document.querySelectorAll("[data-metric-filter]").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.metricFilter, { scroll: true }));
  });
  document.querySelector("#confirm-approve").addEventListener("click", async (event) => {
    if (!selectedClaim) return;
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "正在签发券码…";
    approveStatus.textContent = "";
    try {
      const result = await api("/api/admin/payment-claims", {
        method: "POST",
        body: JSON.stringify({ action: "approve", claimId: selectedClaim.id })
      });
      approveDialog.close();
      selectedClaim = undefined;
      await loadClaims();
      dashboardStatus.textContent = result.emailDelivered
        ? "券码已同步显示在用户网页并发送到验证邮箱。"
        : "券码已显示在用户网页，但邮件发送失败；可在“已完成”中重新发送。";
      dashboardStatus.className = result.emailDelivered ? "form-status is-success" : "form-status is-error";
    } catch {
      approveStatus.textContent = "发码失败，请检查签名密钥和服务配置后重试。";
      approveStatus.className = "form-status is-error";
    } finally {
      button.disabled = false;
      button.textContent = "确认到账并发码";
    }
  });
  approveDialog.addEventListener("close", () => {
    selectedClaim = undefined;
    approveStatus.textContent = "";
  });

  void (async () => {
    try {
      const result = await api("/api/auth/admin-session");
      if (result.authenticated && result.user?.role === "admin") {
        showDashboard();
        await loadClaims();
      } else {
        showLogin();
        setConnection("", "等待登录");
      }
    } catch {
      showLogin();
      setConnection("", "等待登录");
    }
  })();
})();
