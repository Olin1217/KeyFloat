(() => {
  "use strict";

  const loginView = document.querySelector("#login-view");
  const dashboard = document.querySelector("#dashboard");
  const loginForm = document.querySelector("#admin-login-form");
  const loginStatus = document.querySelector("#login-status");
  const dashboardStatus = document.querySelector("#dashboard-status");
  const claimList = document.querySelector("#claim-list");
  const userList = document.querySelector("#user-list");
  const feedbackList = document.querySelector("#feedback-list");
  const licenseList = document.querySelector("#license-list");
  const emptyState = document.querySelector("#empty-state");
  const approveDialog = document.querySelector("#approve-dialog");
  const approveStatus = document.querySelector("#approve-status");
  const connectionState = document.querySelector("#connection-state");
  let claims = [];
  let users = [];
  let feedback = [];
  let licenses = [];
  let downloadMetrics = {};
  let activeFilter = "pending";
  let activeLicenseFilter = "available";
  let licenseQuery = "";
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

  function activationCodeCopyButton(value) {
    const button = document.createElement("button");
    button.className = "button button-secondary license-copy";
    button.type = "button";
    button.textContent = "复制券码";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(value);
      button.textContent = "已复制";
      window.setTimeout(() => { button.textContent = "复制券码"; }, 1_400);
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
      title.textContent = claim.paymentProvider === "alipay" ? "KeyFloat 桌面版 · 支付宝自动支付" : "KeyFloat 桌面版";
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
        const emailLabel = claim.emailDeliveryStatus === "sent" ? "激活码邮件已发送"
          : claim.emailDeliveryStatus === "failed" ? "激活码邮件发送失败" : "激活码邮件等待发送";
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
        resend.textContent = "重新发送激活码邮件";
        resend.addEventListener("click", () => { void resendVoucherEmail(claim.id, resend); });
        actions.append(resend);
      }
      card.append(main, actions);
      claimList.append(card);
    });
    emptyState.hidden = visible.length > 0;
    claimList.hidden = visible.length === 0;
  }

  function appendDataCell(row, value, className = "") {
    const cell = document.createElement("span");
    cell.className = `data-cell ${className}`.trim();
    cell.setAttribute("role", "cell");
    cell.textContent = value;
    row.append(cell);
  }

  function renderUsers(metrics = {}) {
    document.querySelector("#user-count").textContent = String(metrics.totalUsers ?? users.length);
    document.querySelector("#visit-count").textContent = String(metrics.totalVisits ?? users.reduce((total, user) => total + (Number(user.visitCount) || 0), 0));
    userList.replaceChildren();
    if (users.length) {
      const heading = document.createElement("div");
      heading.className = "data-row is-heading";
      heading.setAttribute("role", "row");
      ["用户邮箱", "访问次数", "首次记录", "最近访问"].forEach((label) => appendDataCell(heading, label));
      userList.append(heading);
    }
    users.forEach((user) => {
      const row = document.createElement("div");
      row.className = "data-row";
      row.setAttribute("role", "row");
      appendDataCell(row, user.email, "is-primary");
      appendDataCell(row, String(Number(user.visitCount) || 0), "is-count");
      appendDataCell(row, formatDate(user.firstSeenAt) || "暂无");
      appendDataCell(row, formatDate(user.lastVisitAt) || "尚未访问官网");
      userList.append(row);
    });
    document.querySelector("#users-empty").hidden = users.length > 0;
    userList.hidden = users.length === 0;
  }

  function renderDownloads(metrics = {}) {
    downloadMetrics = metrics;
    document.querySelector("#macos-download-count").textContent = String(metrics.macOSDownloads ?? 0);
    document.querySelector("#windows-download-count").textContent = String(metrics.windowsDownloads ?? 0);
  }

  function licenseMatchesFilter(license) {
    if (activeLicenseFilter === "all") return true;
    if (activeLicenseFilter === "redeemed") return license.status === "active" && Number(license.deviceCount) > 0;
    return license.status === "active" && Number(license.deviceCount) === 0;
  }

  function licenseSourceLabel(license) {
    if (license.source === "manual_batch") return license.batch ? `批量发放 · ${license.batch}` : "批量发放";
    if (license.source === "purchase") return license.paymentReference ? `订单 · ${license.paymentReference}` : "订单签发";
    return "手工发放";
  }

  function setLicenseFilter(filter, { scroll = false } = {}) {
    activeLicenseFilter = ["available", "redeemed", "all"].includes(filter) ? filter : "available";
    document.querySelectorAll("[data-license-filter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.licenseFilter === activeLicenseFilter);
    });
    document.querySelectorAll("[data-license-metric-filter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.licenseMetricFilter === activeLicenseFilter);
    });
    renderLicenses();
    if (scroll) document.querySelector("#licenses-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderLicenses(metrics) {
    const derived = licenses.reduce((result, license) => {
      result.total += 1;
      if (license.status === "active" && Number(license.deviceCount) > 0) result.redeemed += 1;
      else if (license.status === "active") result.available += 1;
      return result;
    }, { total: 0, available: 0, redeemed: 0 });
    const counts = metrics || derived;
    document.querySelector("#license-total-count").textContent = String(counts.total ?? derived.total);
    document.querySelector("#license-available-count").textContent = String(counts.available ?? derived.available);
    document.querySelector("#license-redeemed-count").textContent = String(counts.redeemed ?? derived.redeemed);

    const normalizedQuery = licenseQuery.trim().toUpperCase();
    const visible = licenses.filter((license) => {
      if (!licenseMatchesFilter(license)) return false;
      if (!normalizedQuery) return true;
      return [license.activationCode, license.batch, license.paymentReference, ...(license.platforms || [])]
        .filter(Boolean)
        .some((value) => String(value).toUpperCase().includes(normalizedQuery));
    });

    licenseList.replaceChildren();
    if (visible.length) {
      const heading = document.createElement("div");
      heading.className = "data-row license-row is-heading";
      heading.setAttribute("role", "row");
      ["激活券码", "状态", "设备", "来源", "签发 / 核销时间", "操作"].forEach((label) => appendDataCell(heading, label));
      licenseList.append(heading);
    }
    visible.forEach((license) => {
      const row = document.createElement("div");
      row.className = "data-row license-row";
      row.setAttribute("role", "row");
      appendDataCell(row, license.activationCode, "license-code");

      const redeemed = license.status === "active" && Number(license.deviceCount) > 0;
      const status = document.createElement("span");
      status.className = `data-cell license-status ${redeemed ? "is-redeemed" : ""}`.trim();
      status.setAttribute("role", "cell");
      status.textContent = license.status !== "active" ? "已停用" : redeemed ? "已核销" : "可用";
      row.append(status);

      const platform = (license.platforms || []).map((value) => value === "macos" ? "macOS" : "Windows").join(" / ");
      appendDataCell(row, `${Number(license.deviceCount) || 0} / ${Number(license.maxDevices) || 3}${platform ? ` · ${platform}` : ""}`, "license-device");
      appendDataCell(row, licenseSourceLabel(license));
      appendDataCell(row, license.lastRedeemedAt
        ? `签发 ${formatDate(license.issuedAt)} · 核销 ${formatDate(license.lastRedeemedAt)}`
        : `签发 ${formatDate(license.issuedAt)}`);

      const action = document.createElement("span");
      action.className = "data-cell";
      action.setAttribute("role", "cell");
      action.append(activationCodeCopyButton(license.activationCode));
      row.append(action);
      licenseList.append(row);
    });
    document.querySelector("#licenses-summary").textContent = `当前显示 ${visible.length} 枚 · 最近刷新 ${formatDate(new Date().toISOString())}`;
    document.querySelector("#licenses-empty").hidden = visible.length > 0;
    licenseList.hidden = visible.length === 0;
  }

  function renderFeedback(metrics = {}) {
    document.querySelector("#feedback-count").textContent = String(metrics.totalFeedback ?? feedback.length);
    document.querySelector("#feedback-summary").textContent = `官网 ${metrics.websiteFeedback ?? feedback.filter((item) => item.source === "website").length} 条 · KeyFloat ${metrics.macOSFeedback ?? feedback.filter((item) => item.source === "macos").length} 条 · 新增软件 ${metrics.softwareRequests ?? feedback.filter((item) => item.kind === "software_request").length} 条`;
    feedbackList.replaceChildren();
    feedback.forEach((item) => {
      const card = document.createElement("article");
      card.className = "feedback-card";
      const head = document.createElement("div");
      head.className = "feedback-card-head";
      const source = document.createElement("span");
      source.className = "feedback-source";
      const isSoftwareRequest = item.kind === "software_request";
      source.textContent = isSoftwareRequest
        ? `新增软件请求 · ${item.source === "macos" ? "KeyFloat 客户端" : "KeyFloat 官网"}`
        : item.source === "macos" ? "问题反馈 · KeyFloat 客户端" : "问题反馈 · KeyFloat 官网";
      const time = document.createElement("time");
      time.className = "feedback-time";
      time.textContent = formatDate(item.submittedAt);
      head.append(source, time);

      const message = document.createElement("p");
      message.className = "feedback-message";
      message.textContent = isSoftwareRequest
        ? `申请上架：${item.softwareName || item.message}`
        : item.message;
      const meta = document.createElement("div");
      meta.className = "feedback-meta";
      const values = [
        item.email ? `登录邮箱：${item.email}` : "",
        item.contact ? `联系方式：${item.contact}` : "",
        item.softwareGroup ? `所属分类：${item.softwareGroup}` : "",
        item.softwareID ? `当前软件：${item.softwareID}` : "",
        item.language ? `语言：${item.language === "zh" ? "中文" : "English"}` : "",
        item.appVersion ? `版本：${item.appVersion}` : ""
      ].filter(Boolean);
      if (!values.length) values.push("未留下联系方式");
      values.forEach((value) => {
        const span = document.createElement("span");
        span.textContent = value;
        meta.append(span);
      });
      card.append(head, message, meta);
      feedbackList.append(card);
    });
    document.querySelector("#feedback-empty").hidden = feedback.length > 0;
    feedbackList.hidden = feedback.length === 0;
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

  async function loadUsers({ silent = false } = {}) {
    try {
      const result = await api("/api/admin/users");
      users = Array.isArray(result.users) ? result.users : [];
      renderUsers(result.metrics || {});
      document.querySelector("#users-updated").textContent = `最近刷新：${formatDate(new Date().toISOString())}`;
      return true;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        showLogin("管理员会话已失效，请重新登录。");
        return false;
      }
      if (!silent) {
        dashboardStatus.textContent = "用户统计加载失败，请稍后重试。";
        dashboardStatus.className = "form-status is-error";
      }
      return false;
    }
  }

  async function loadFeedback({ silent = false } = {}) {
    try {
      const result = await api("/api/admin/feedback");
      feedback = Array.isArray(result.feedback) ? result.feedback : [];
      renderFeedback(result.metrics || {});
      return true;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        showLogin("管理员会话已失效，请重新登录。");
        return false;
      }
      if (!silent) {
        dashboardStatus.textContent = "用户反馈加载失败，请稍后重试。";
        dashboardStatus.className = "form-status is-error";
      }
      return false;
    }
  }

  async function loadDownloads({ silent = false } = {}) {
    try {
      const result = await api("/api/admin/downloads");
      renderDownloads(result.metrics || {});
      return true;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        showLogin("管理员会话已失效，请重新登录。");
        return false;
      }
      if (!silent) {
        dashboardStatus.textContent = "下载统计加载失败，请稍后重试。";
        dashboardStatus.className = "form-status is-error";
      }
      return false;
    }
  }

  async function loadLicenses({ silent = false } = {}) {
    try {
      const result = await api("/api/admin/licenses");
      licenses = Array.isArray(result.activationCodes) ? result.activationCodes : [];
      renderLicenses(result.metrics || {});
      return true;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        showLogin("管理员会话已失效，请重新登录。");
        return false;
      }
      if (!silent) {
        dashboardStatus.textContent = "券码库存加载失败，请稍后重试。";
        dashboardStatus.className = "form-status is-error";
      }
      return false;
    }
  }

  async function loadDashboard({ silent = false } = {}) {
    await Promise.all([
      loadClaims({ silent }),
      loadUsers({ silent }),
      loadFeedback({ silent }),
      loadDownloads({ silent }),
      loadLicenses({ silent })
    ]);
  }

  function stopRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = 0;
  }

  function startRefresh() {
    stopRefresh();
    refreshTimer = window.setInterval(() => {
      if (!document.hidden && !dashboard.hidden) void loadDashboard({ silent: true });
    }, 10_000);
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
        ? "激活码邮件已发送到用户的验证邮箱。"
        : "邮件仍未发送成功，请检查邮件服务配置后重试。";
      dashboardStatus.className = result.emailDelivered ? "form-status is-success" : "form-status is-error";
    } catch {
      dashboardStatus.textContent = "激活码邮件发送失败，请检查邮件服务配置后重试。";
      dashboardStatus.className = "form-status is-error";
      button.disabled = false;
      button.textContent = "重新发送激活码邮件";
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
      await loadDashboard();
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

  document.querySelector("#refresh-claims").addEventListener("click", () => { void loadDashboard(); });
  document.querySelector("#logout").addEventListener("click", async () => {
    try { await api("/api/auth/admin-logout", { method: "POST" }); } catch { /* Local state still closes the dashboard. */ }
    claims = [];
    users = [];
    feedback = [];
    licenses = [];
    downloadMetrics = {};
    showLogin();
    setConnection("", "已退出");
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });
  document.querySelectorAll("[data-metric-filter]").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.metricFilter, { scroll: true }));
  });
  document.querySelectorAll("[data-license-filter]").forEach((button) => {
    button.addEventListener("click", () => setLicenseFilter(button.dataset.licenseFilter));
  });
  document.querySelectorAll("[data-license-metric-filter]").forEach((button) => {
    button.addEventListener("click", () => setLicenseFilter(button.dataset.licenseMetricFilter, { scroll: true }));
  });
  document.querySelector("#license-search").addEventListener("input", (event) => {
    licenseQuery = event.currentTarget.value;
    renderLicenses();
  });
  document.querySelector("#confirm-approve").addEventListener("click", async (event) => {
    if (!selectedClaim) return;
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "正在签发激活码…";
    approveStatus.textContent = "";
    try {
      const result = await api("/api/admin/payment-claims", {
        method: "POST",
        body: JSON.stringify({ action: "approve", claimId: selectedClaim.id })
      });
      approveDialog.close();
      selectedClaim = undefined;
      await Promise.all([loadClaims(), loadLicenses({ silent: true })]);
      dashboardStatus.textContent = result.emailDelivered
        ? "激活码已同步显示在用户网页并发送到验证邮箱。"
        : "激活码已显示在用户网页，但邮件发送失败；可在“已完成”中重新发送。";
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
        await loadDashboard();
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
