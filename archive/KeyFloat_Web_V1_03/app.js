(() => {
  "use strict";

  const translations = {
    en: {
      "a11y.skip": "Skip to content",
      "a11y.primary": "Primary",
      "a11y.home": "KeyFloat home",
      "a11y.logoField": "Supported software logos",
      "a11y.assurances": "Product assurances",
      "a11y.coverage": "Product coverage",
      "a11y.close": "Close",
      "a11y.qr": "Alipay payment QR code",
      "nav.features": "Features",
      "nav.coverage": "Coverage",
      "nav.download": "Download",
      "nav.contact": "Contact developer",
      "nav.faq": "FAQ",
      "nav.language": "Language",
      "nav.buy": "Buy KeyFloat",
      "hero.eyebrow": "KEYFLOAT · DESKTOP PRODUCTIVITY",
      "hero.title": "Desktop shortcut tools that amplify your creativity.",
      "hero.lede": "A productivity tool built for engineers, designers, writers, and students.",
      "hero.buy": "Get KeyFloat",
      "hero.download": "Choose a desktop version",
      "hero.trust1": "One-time purchase",
      "hero.trust2": "Runs locally",
      "hero.trust3": "No subscription",
      "proof.software": "software titles",
      "proof.shortcuts": "shortcut references",
      "proof.categories": "clear categories",
      "proof.platforms": "desktop platforms",
      "features.eyebrow": "BUILT FOR FLOW",
      "features.title": "Reference without leaving your work.",
      "features.lede": "Every product decision shortens the distance between remembering a command and using it.",
      "features.float.title": "Always within reach",
      "features.float.body": "Keep a compact shortcut window above your active workspace and collapse it without breaking focus.",
      "features.search.title": "Fast, ranked search",
      "features.search.body": "Search by action, key, tag, or category. Exact matches surface first.",
      "features.language.title": "Complete language modes",
      "features.language.body": "English and Chinese remain independent throughout the interface and shortcut library.",
      "features.local.title": "Private by default",
      "features.local.body": "Shortcut browsing, search, preferences, favorites, and activation stay on your device.",
      "coverage.eyebrow": "ONE LIBRARY",
      "coverage.title": "From coursework to professional production.",
      "coverage.lede": "The catalog is organized by task rather than vendor, so software remains easy to find as the library grows.",
      "coverage.design": "Design",
      "coverage.media": "Media",
      "coverage.engineering": "Engineering",
      "coverage.modeling": "3D and animation",
      "coverage.development": "Development",
      "coverage.research": "Study and research",
      "platform.eyebrow": "DESKTOP EDITIONS",
      "platform.title": "Choose your platform.",
      "platform.lede": "The macOS edition is available now. The Windows edition is in development and is shown here so you can follow its release status.",
      "platform.available": "Available now",
      "platform.developing": "In development",
      "platform.macos.body": "Native floating-window edition for macOS 13 and later.",
      "platform.macos.cta": "Buy and download",
      "platform.windows.body": "A Windows desktop edition is being developed. Download will open after the release is ready.",
      "platform.windows.cta": "Coming soon",
      "pricing.eyebrow": "ONE PURCHASE",
      "pricing.title": "Unlock KeyFloat with one voucher.",
      "pricing.lede": "Pay once with Alipay. No account subscription and no recurring charge.",
      "pricing.item1": "Current desktop release",
      "pricing.item2": "English and Chinese interface",
      "pricing.item3": "A signed activation voucher",
      "pricing.once": "one time",
      "pricing.cta": "Pay with Alipay",
      "pricing.note": "After payment is verified, your activation voucher appears once.",
      "contact.eyebrow": "CONTACT THE DEVELOPER",
      "contact.title": "Questions, feedback, or a lost voucher?",
      "contact.lede": "Contact the KeyFloat developer directly. Please include your payment reference when asking about a lost voucher.",
      "contact.cta": "Contact developer",
      "contact.dialogEyebrow": "DEVELOPER CONTACT",
      "contact.dialogTitle": "Contact the KeyFloat developer",
      "contact.dialogLede": "For activation, payment, or product support, contact the developer by email below.",
      "contact.email": "Email",
      "contact.emailCta": "Send email",
      "contact.replyTime": "The developer will reply within 1 business day.",
      "faq.eyebrow": "QUESTIONS",
      "faq.title": "Before you download.",
      "faq.q1": "Does KeyFloat require an internet connection?",
      "faq.a1": "No. The installed application reads its shortcut library, activation, search, and preferences locally.",
      "faq.q2": "Which platforms are supported?",
      "faq.a2": "The macOS edition is available now. The Windows edition is in development and will be added to this page after release.",
      "faq.q3": "How does activation work?",
      "faq.a3": "After payment verification, the website displays a signed voucher. Enter that voucher when KeyFloat first opens.",
      "faq.q4": "Why is the voucher displayed only once?",
      "faq.a4": "The voucher is intentionally not stored by the public page. Copy it immediately and keep it in a secure place.",
      "faq.q5": "What if I lose the voucher?",
      "faq.a5": "Contact the developer by email and provide the corresponding Alipay transaction number.",
      "footer.tagline": "A desktop shortcut companion for focused work.",
      "footer.support": "Contact developer",
      "footer.download": "Download",
      "footer.faq": "FAQ",
      "purchase.eyebrow": "ALIPAY CHECKOUT",
      "purchase.title": "Purchase KeyFloat",
      "purchase.lede": "Scan the code, complete the ¥6 payment, then submit the transaction number for verification.",
      "purchase.qrMissing": "Alipay checkout is being prepared and is not open yet.",
      "purchase.qrLoadError": "The payment QR code could not be loaded. Purchasing remains closed for safety.",
      "purchase.unavailable": "Purchasing is temporarily unavailable while the payment channel is being configured.",
      "purchase.openAlipay": "Open Alipay",
      "purchase.amount": "Amount",
      "purchase.reference": "Alipay transaction number",
      "purchase.referencePlaceholder": "Enter the transaction number",
      "purchase.email": "Contact email",
      "purchase.emailPlaceholder": "name@example.com",
      "purchase.consent": "I confirm that the payment information is accurate.",
      "purchase.submit": "Verify payment and get voucher",
      "purchase.note": "Payment details are used only to verify this order and issue the voucher.",
      "purchase.sending": "Verifying…",
      "purchase.pending": "Payment has not been confirmed yet. Wait a moment and submit again.",
      "purchase.configError": "Payment verification or voucher signing is not configured yet. Please contact the developer.",
      "purchase.error": "Unable to verify the payment. Check the transaction number or contact the developer.",
      "voucher.eyebrow": "PAYMENT VERIFIED",
      "voucher.title": "Your KeyFloat activation voucher",
      "voucher.copy": "Copy voucher",
      "voucher.copied": "Voucher copied. Store it safely now.",
      "voucher.warning": "This voucher is shown only once. Copy it now and keep it safe. If it is lost, contact the product developer.",
      "voucher.download": "Download desktop installer"
    },
    zh: {
      "a11y.skip": "跳至主要内容",
      "a11y.primary": "主要导航",
      "a11y.home": "KeyFloat 首页",
      "a11y.logoField": "支持的软件图标",
      "a11y.assurances": "产品承诺",
      "a11y.coverage": "产品覆盖范围",
      "a11y.close": "关闭",
      "a11y.qr": "支付宝付款二维码",
      "nav.features": "产品功能",
      "nav.coverage": "软件覆盖",
      "nav.download": "下载",
      "nav.contact": "联系开发者",
      "nav.faq": "常见问题",
      "nav.language": "语言",
      "nav.buy": "购买 KeyFloat",
      "hero.eyebrow": "KEYFLOAT · 桌面效率工具",
      "hero.title": "桌面级快捷键工具，为您的创意增效",
      "hero.lede": "针对工程师、设计师、文字工作者、学生开发的一款增效工具",
      "hero.buy": "获取 KeyFloat",
      "hero.download": "选择桌面版本",
      "hero.trust1": "一次购买",
      "hero.trust2": "本地运行",
      "hero.trust3": "无需订阅",
      "proof.software": "款常用软件",
      "proof.shortcuts": "条快捷键资料",
      "proof.categories": "个清晰分类",
      "proof.platforms": "个桌面平台",
      "features.eyebrow": "专注工作流",
      "features.title": "无需离开工作现场的快捷键参考。",
      "features.lede": "每一项产品决策，都在缩短记住命令与真正使用命令之间的距离。",
      "features.float.title": "随时在手边",
      "features.float.body": "小窗常驻于当前工作区之上，需要时展开，不用时收起，不打断专注。",
      "features.search.title": "快速排序搜索",
      "features.search.body": "按动作、按键、标签或分类搜索，精确匹配会优先出现。",
      "features.language.title": "完整语言模式",
      "features.language.body": "中文与英文在界面和快捷键资料中保持相互独立。",
      "features.local.title": "默认保护隐私",
      "features.local.body": "快捷键浏览、搜索、偏好、收藏和激活信息均保存在本机。",
      "coverage.eyebrow": "一个资料库",
      "coverage.title": "从大学课程覆盖到专业生产。",
      "coverage.lede": "目录按工作任务而不是厂商划分，即使软件继续增加，也能快速找到。",
      "coverage.design": "设计创意",
      "coverage.media": "媒体制作",
      "coverage.engineering": "工程制图",
      "coverage.modeling": "三维与动画",
      "coverage.development": "软件开发",
      "coverage.research": "学习与科研",
      "platform.eyebrow": "桌面版本",
      "platform.title": "选择您的平台。",
      "platform.lede": "macOS 版本现已提供，Windows 版本正在开发中。网站同时展示两个平台，方便您了解发布进度。",
      "platform.available": "现已提供",
      "platform.developing": "开发中",
      "platform.macos.body": "适用于 macOS 13 及以上系统的原生桌面悬浮窗版本。",
      "platform.macos.cta": "购买并下载",
      "platform.windows.body": "Windows 桌面版本正在开发，正式完成后将在这里开放下载。",
      "platform.windows.cta": "即将推出",
      "pricing.eyebrow": "一次购买",
      "pricing.title": "使用一枚券码解锁 KeyFloat。",
      "pricing.lede": "通过支付宝一次付费，无账户订阅，也没有后续自动扣费。",
      "pricing.item1": "当前桌面正式版本",
      "pricing.item2": "完整中文与英文界面",
      "pricing.item3": "一枚带签名的激活券码",
      "pricing.once": "一次性",
      "pricing.cta": "使用支付宝购买",
      "pricing.note": "付款核验通过后，激活券码只展示一次。",
      "contact.eyebrow": "联系开发者",
      "contact.title": "产品问题、使用反馈或券码遗失？",
      "contact.lede": "您可以直接联系 KeyFloat 开发者。咨询遗失券码时，请同时提供对应的支付宝交易号。",
      "contact.cta": "联系开发者",
      "contact.dialogEyebrow": "开发者联系方式",
      "contact.dialogTitle": "联系 KeyFloat 开发者",
      "contact.dialogLede": "如有激活、付款或产品使用问题，请通过以下邮箱联系。",
      "contact.email": "邮箱",
      "contact.emailCta": "发送邮件",
      "contact.replyTime": "开发者将在 1 个工作日内回复。",
      "faq.eyebrow": "常见问题",
      "faq.title": "下载之前需要了解的内容。",
      "faq.q1": "KeyFloat 需要联网吗？",
      "faq.a1": "不需要。安装后的快捷键资料、激活状态、搜索和偏好均在本地读取。",
      "faq.q2": "支持哪些平台？",
      "faq.a2": "macOS 版本现已提供，Windows 版本正在开发，完成后会在本页面增加下载入口。",
      "faq.q3": "如何激活 KeyFloat？",
      "faq.a3": "付款核验通过后，网站会展示一枚带签名的券码。首次打开 KeyFloat 时输入该券码即可。",
      "faq.q4": "为什么券码只展示一次？",
      "faq.a4": "公开网页不会保存券码。请在出现后立即复制，并保存在安全的位置。",
      "faq.q5": "券码遗失怎么办？",
      "faq.a5": "请通过邮箱联系开发者，并提供对应的支付宝交易号。",
      "footer.tagline": "专注工作效率的桌面快捷键工具。",
      "footer.support": "联系开发者",
      "footer.download": "下载",
      "footer.faq": "常见问题",
      "purchase.eyebrow": "支付宝结账",
      "purchase.title": "购买 KeyFloat",
      "purchase.lede": "扫描二维码支付 ¥6，完成后提交支付宝交易号进行核验。",
      "purchase.qrMissing": "支付宝付款通道正在准备中，目前暂未开放。",
      "purchase.qrLoadError": "付款二维码加载失败，为避免误付款，购买通道仍保持关闭。",
      "purchase.unavailable": "付款通道正在配置中，购买功能暂不可用。",
      "purchase.openAlipay": "打开支付宝",
      "purchase.amount": "支付金额",
      "purchase.reference": "支付宝交易号",
      "purchase.referencePlaceholder": "请输入支付宝交易号",
      "purchase.email": "联系邮箱",
      "purchase.emailPlaceholder": "请输入您的联系邮箱",
      "purchase.consent": "我确认填写的付款信息准确无误。",
      "purchase.submit": "核验付款并获取券码",
      "purchase.note": "付款信息仅用于核验本次订单和签发券码。",
      "purchase.sending": "正在核验…",
      "purchase.pending": "暂未确认到付款，请稍等片刻后再次提交。",
      "purchase.configError": "付款核验或券码签发服务尚未配置，请联系产品开发者。",
      "purchase.error": "付款核验失败，请检查交易号或联系产品开发者。",
      "voucher.eyebrow": "付款已核验",
      "voucher.title": "您的 KeyFloat 激活券码",
      "voucher.copy": "复制券码",
      "voucher.copied": "券码已复制，请立即妥善保存。",
      "voucher.warning": "该券码仅展示一次，请您复制后妥善保管，若遗失请联系产品开发者",
      "voucher.download": "下载桌面安装包"
    }
  };

  const softwareIcons = [
    ["figma", "Figma"], ["grammarly", "Grammarly"], ["vscode", "Visual Studio Code"], ["godot", "Godot"],
    ["jupyter", "Jupyter"], ["supabase", "Supabase"], ["obsstudio", "OBS Studio"], ["handbrake", "HandBrake"],
    ["obsidian", "Obsidian"], ["linear", "Linear"], ["netlify", "Netlify"], ["dockerdesktop", "Docker Desktop"],
    ["postman", "Postman"], ["intellij", "IntelliJ IDEA"], ["datagrip", "DataGrip"], ["goland", "GoLand"],
    ["pycharm", "PyCharm"], ["clion", "CLion"], ["webstorm", "WebStorm"], ["github", "GitHub"],
    ["vercel", "Vercel"], ["blender", "Blender"], ["audacity", "Audacity"], ["vlc", "VLC"],
    ["rstudio", "RStudio"], ["anki", "Anki"], ["drawio", "draw.io"], ["pymol", "PyMOL"],
    ["redisinsight", "Redis Insight"], ["hoppscotch", "Hoppscotch"], ["insomnia", "Insomnia"], ["qgis", "QGIS"],
    ["dbeaver", "DBeaver"], ["todoist", "Todoist"], ["onepassword", "1Password"], ["raycast", "Raycast"],
    ["photoshop", "Photoshop"], ["illustrator", "Illustrator"], ["aftereffects", "After Effects"], ["premiere", "Premiere Pro"],
    ["indesign", "InDesign"], ["lightroom", "Lightroom"], ["adobefirefly", "Adobe Firefly"], ["adobeacrobat", "Adobe Acrobat"],
    ["adobexd", "Adobe XD"], ["substancepainter", "Substance 3D Painter"], ["gitlab", "GitLab"], ["kicad", "KiCad"],
    ["paraview", "ParaView"], ["imagej", "ImageJ / Fiji"], ["deepl", "DeepL"], ["zotero", "Zotero"]
  ];

  const config = window.KEYFLOAT_CONFIG || {};
  const storedLanguage = localStorage.getItem("keyfloat-site-language");
  const defaultLanguage = config.product?.defaultLanguage === "zh" ? "zh" : "en";
  const languageDefaultVersion = String(config.product?.languageDefaultVersion ?? 1);
  const storedDefaultVersion = localStorage.getItem("keyfloat-site-language-default-version");
  let language;
  if (storedDefaultVersion !== languageDefaultVersion) {
    language = defaultLanguage;
    localStorage.setItem("keyfloat-site-language", language);
    localStorage.setItem("keyfloat-site-language-default-version", languageDefaultVersion);
  } else {
    language = storedLanguage === "zh" || storedLanguage === "en" ? storedLanguage : defaultLanguage;
  }
  const dialog = document.querySelector("#purchase-dialog");
  const contactDialog = document.querySelector("#contact-dialog");
  const form = document.querySelector("#purchase-form");
  const status = document.querySelector("#purchase-status");
  const checkoutGrid = document.querySelector("#checkout-grid");
  const voucherPanel = document.querySelector("#voucher-panel");
  const voucherCode = document.querySelector("#voucher-code");
  const voucherCopyStatus = document.querySelector("#voucher-copy-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let checkoutReady = false;

  function translate(key) {
    return translations[language][key] || key;
  }

  function renderLanguage() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = language === "zh"
      ? "KeyFloat — 桌面级快捷键工具"
      : "KeyFloat — desktop shortcuts for creative flow";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = translate(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = translate(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", translate(node.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
      node.alt = translate(node.dataset.i18nAlt);
    });
    document.querySelector("#language-toggle").setAttribute(
      "aria-label",
      language === "zh" ? "切换语言" : "Switch language"
    );
  }

  function resolveConfiguredURL(value) {
    if (typeof value !== "string" || !value.trim()) return undefined;
    try {
      const parsed = new URL(value.trim(), window.location.href);
      const isSameOrigin = parsed.origin === window.location.origin;
      return parsed.protocol === "https:" || isSameOrigin ? parsed.href : undefined;
    } catch {
      return undefined;
    }
  }

  function setQRPlaceholder(key) {
    const message = document.querySelector("#qr-placeholder-message");
    message.dataset.i18n = key;
    message.textContent = translate(key);
  }

  function setCheckoutReady(isReady) {
    checkoutReady = isReady;
    const claimPanel = document.querySelector("#claim-panel");
    const unavailable = document.querySelector("#checkout-unavailable");
    claimPanel.classList.toggle("is-disabled", !isReady);
    claimPanel.querySelectorAll("input, button[type='submit']").forEach((control) => {
      control.disabled = !isReady;
    });
    unavailable.hidden = isReady;
  }

  function createLogoField() {
    const field = document.querySelector("#logo-field");
    const nodes = softwareIcons.map(([id, name], index) => {
      const item = document.createElement("span");
      item.className = "logo-orb";
      item.role = "listitem";
      item.tabIndex = 0;
      item.setAttribute("aria-label", name);
      item.dataset.index = String(index);

      const image = document.createElement("img");
      image.src = `assets/software-icons/${id}.svg`;
      image.alt = "";
      image.decoding = "async";
      image.draggable = false;

      const label = document.createElement("span");
      label.className = "logo-label";
      label.textContent = name;
      item.append(image, label);
      return item;
    });
    field.replaceChildren(...nodes);

    const bodies = nodes.map((node, index) => ({
      node,
      index,
      size: 48,
      radius: 24,
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      angle: 0,
      spin: 0
    }));
    const pointer = { x: 0, y: 0, active: false };
    let fieldWidth = 0;
    let fieldHeight = 0;
    let animationFrame = 0;
    let resizeFrame = 0;
    let previousTime = 0;
    let quietFrames = 0;

    function seededRandom(index, salt) {
      const value = Math.sin((index + 1) * 91.713 + salt * 37.119) * 43758.5453;
      return value - Math.floor(value);
    }

    function render(body) {
      body.node.style.left = `${body.x}px`;
      body.node.style.top = `${body.y}px`;
      body.node.style.setProperty("--rotation", `${body.angle}deg`);
    }

    function resetLayout() {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      fieldWidth = field.clientWidth;
      fieldHeight = field.clientHeight;
      const compact = fieldWidth < 560;
      const medium = fieldWidth < 900;
      const usableFloor = fieldHeight - 92;

      bodies.forEach((body) => {
        const randomSize = seededRandom(body.index, 2);
        body.size = Math.round(compact ? 32 + randomSize * 15 : medium ? 39 + randomSize * 18 : 44 + randomSize * 22);
        body.radius = body.size * 0.52;
        body.x = body.radius + seededRandom(body.index, 5) * Math.max(1, fieldWidth - body.radius * 2);
        body.y = body.radius + seededRandom(body.index, 8) * Math.max(1, usableFloor * 0.72 - body.radius * 2);
        body.velocityX = (seededRandom(body.index, 11) - 0.5) * 1.8;
        body.velocityY = seededRandom(body.index, 13) * 0.8;
        body.angle = (seededRandom(body.index, 17) - 0.5) * 24;
        body.spin = (seededRandom(body.index, 19) - 0.5) * 0.45;
        body.node.style.setProperty("--size", `${body.size}px`);
        render(body);
      });

      previousTime = 0;
      quietFrames = 0;
      if (!reduceMotion.matches) startPhysics();
    }

    function resolveCollisions() {
      for (let firstIndex = 0; firstIndex < bodies.length; firstIndex += 1) {
        const first = bodies[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < bodies.length; secondIndex += 1) {
          const second = bodies[secondIndex];
          const deltaX = second.x - first.x;
          const deltaY = second.y - first.y;
          const minimumDistance = (first.radius + second.radius) * 0.92;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;
          if (distanceSquared >= minimumDistance * minimumDistance) continue;

          const distance = Math.sqrt(distanceSquared) || 0.01;
          const normalX = deltaX / distance;
          const normalY = deltaY / distance;
          const correction = (minimumDistance - distance) * 0.51;
          first.x -= normalX * correction;
          first.y -= normalY * correction;
          second.x += normalX * correction;
          second.y += normalY * correction;

          const relativeVelocity = (second.velocityX - first.velocityX) * normalX +
            (second.velocityY - first.velocityY) * normalY;
          if (relativeVelocity < 0) {
            const impulse = -relativeVelocity * 0.42;
            first.velocityX -= normalX * impulse;
            first.velocityY -= normalY * impulse;
            second.velocityX += normalX * impulse;
            second.velocityY += normalY * impulse;
          }
        }
      }
    }

    function stepPhysics(delta) {
      const floor = fieldHeight - 92;
      let energy = 0;

      bodies.forEach((body) => {
        body.velocityY += 0.2 * delta;

        if (pointer.active) {
          const deltaX = body.x - pointer.x;
          const deltaY = body.y - pointer.y;
          const distance = Math.hypot(deltaX, deltaY) || 0.01;
          if (distance > body.radius * 0.82 && distance < 145) {
            const force = (1 - distance / 145) * 1.35 * delta;
            body.velocityX += deltaX / distance * force;
            body.velocityY += deltaY / distance * force;
            body.spin += deltaX / distance * 0.018;
          }
        }

        body.velocityX *= Math.pow(0.993, delta);
        body.velocityY *= Math.pow(0.997, delta);
        body.spin *= Math.pow(0.988, delta);
        body.x += body.velocityX * delta;
        body.y += body.velocityY * delta;
        body.angle += body.spin * delta;

        if (body.x < body.radius) {
          body.x = body.radius;
          body.velocityX = Math.abs(body.velocityX) * 0.46;
          body.spin *= -0.62;
        } else if (body.x > fieldWidth - body.radius) {
          body.x = fieldWidth - body.radius;
          body.velocityX = -Math.abs(body.velocityX) * 0.46;
          body.spin *= -0.62;
        }
        if (body.y < body.radius) {
          body.y = body.radius;
          body.velocityY = Math.abs(body.velocityY) * 0.36;
        } else if (body.y > floor - body.radius) {
          body.y = floor - body.radius;
          body.velocityY = body.velocityY > 0.7 ? -body.velocityY * 0.3 : 0;
          body.velocityX *= 0.91;
          body.spin *= 0.84;
        }
      });

      resolveCollisions();
      bodies.forEach((body) => {
        body.x = Math.max(body.radius, Math.min(fieldWidth - body.radius, body.x));
        body.y = Math.max(body.radius, Math.min(floor - body.radius, body.y));
        render(body);
        energy += Math.abs(body.velocityX) + Math.abs(body.velocityY) + Math.abs(body.spin);
      });
      return energy;
    }

    function animate(timestamp) {
      const delta = previousTime ? Math.min(2, (timestamp - previousTime) / 16.67) : 1;
      previousTime = timestamp;
      const energy = stepPhysics(delta);
      quietFrames = energy < 3 && !pointer.active ? quietFrames + 1 : 0;
      if (quietFrames > 90) {
        animationFrame = 0;
        previousTime = 0;
        return;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    function startPhysics() {
      if (!animationFrame && !reduceMotion.matches) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    field.addEventListener("pointermove", (event) => {
      if (reduceMotion.matches) return;
      const bounds = field.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      quietFrames = 0;
      startPhysics();
    });
    field.addEventListener("pointerleave", () => {
      pointer.active = false;
      quietFrames = 0;
      startPhysics();
    });
    window.addEventListener("resize", () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resetLayout);
    });
    reduceMotion.addEventListener("change", resetLayout);
    resetLayout();
  }

  function setupProofCounters() {
    const section = document.querySelector(".proof-band");
    const counters = Array.from(section?.querySelectorAll("[data-counter-target]") || []);
    if (!section || !counters.length) return;

    const finalValues = counters.map((node) => Number(node.dataset.counterTarget || 0));
    const renderValues = (progress) => {
      counters.forEach((node, index) => {
        const value = Math.round(finalValues[index] * progress);
        node.textContent = value.toLocaleString("en-US");
      });
    };
    const finish = () => renderValues(1);

    if (reduceMotion.matches || typeof IntersectionObserver !== "function") {
      finish();
      return;
    }

    renderValues(0);
    let hasStarted = false;
    const observer = new IntersectionObserver((entries) => {
      if (hasStarted || !entries.some((entry) => entry.isIntersecting)) return;
      hasStarted = true;
      observer.disconnect();
      const duration = 780;
      let startedAt;

      function animateCounter(timestamp) {
        startedAt ??= timestamp;
        const linearProgress = Math.min(1, (timestamp - startedAt) / duration);
        const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
        renderValues(easedProgress);
        if (linearProgress < 1) requestAnimationFrame(animateCounter);
        else finish();
      }
      requestAnimationFrame(animateCounter);
    }, { threshold: 0.34 });
    observer.observe(section);
  }

  function applyConfig() {
    const product = config.product || {};
    document.querySelectorAll("[data-price]").forEach((node) => {
      node.textContent = product.priceCny ?? 6;
    });
    const software = document.querySelector('[data-stat="software"]');
    if (software) {
      software.dataset.counterTarget = String(Number(product.softwareCount || 209));
      software.textContent = Number(product.softwareCount || 209).toLocaleString("en-US");
    }
    const shortcuts = document.querySelector('[data-stat="shortcuts"]');
    if (shortcuts) {
      shortcuts.dataset.counterTarget = String(Number(product.shortcutCount || 8432));
      shortcuts.textContent = Number(product.shortcutCount || 8432).toLocaleString("en-US");
    }

    const email = config.support?.email || "SHL7450702@gmail.com";
    document.querySelectorAll("[data-support-email]").forEach((node) => {
      node.href = `mailto:${email}`;
    });
    document.querySelectorAll("[data-contact-email]").forEach((node) => {
      node.textContent = email;
    });

    setCheckoutReady(false);
    const qr = document.querySelector("#payment-qr");
    const placeholder = document.querySelector("#qr-placeholder");
    const paymentIsLive = config.payment?.status === "live";
    const qrURL = resolveConfiguredURL(config.payment?.alipayQrImageUrl);
    const claimURL = resolveConfiguredURL(config.payment?.claimEndpoint);
    if (paymentIsLive && qrURL && claimURL) {
      qr.addEventListener("load", () => {
        qr.hidden = false;
        placeholder.hidden = true;
        setCheckoutReady(true);
      }, { once: true });
      qr.addEventListener("error", () => {
        qr.hidden = true;
        placeholder.hidden = false;
        setQRPlaceholder("purchase.qrLoadError");
        setCheckoutReady(false);
      }, { once: true });
      qr.src = qrURL;
    }
    const deepLink = document.querySelector("#open-alipay");
    const deepLinkURL = resolveConfiguredURL(config.payment?.alipayPaymentUrl);
    if (paymentIsLive && deepLinkURL) {
      deepLink.href = deepLinkURL;
      deepLink.hidden = false;
    }
  }

  function resetPurchaseView() {
    checkoutGrid.hidden = false;
    voucherPanel.hidden = true;
    voucherCode.textContent = "";
    voucherCopyStatus.textContent = "";
    status.textContent = "";
    status.className = "form-status";
  }

  function openPurchase() {
    resetPurchaseView();
    form.reset();
    dialog.showModal();
    (checkoutReady ? document.querySelector("#payment-reference") : document.querySelector("[data-purchase-dialog-close]")).focus();
  }

  function showVoucher(result) {
    checkoutGrid.hidden = true;
    voucherPanel.hidden = false;
    voucherCode.textContent = result.voucherCode;
    const download = document.querySelector("#voucher-download");
    if (result.downloadURL) {
      download.href = result.downloadURL;
      download.hidden = false;
    } else {
      download.hidden = true;
      download.removeAttribute("href");
    }
    document.querySelector("#copy-voucher").focus();
  }

  async function submitClaim(event) {
    event.preventDefault();
    if (!checkoutReady) {
      status.textContent = translate("purchase.configError");
      status.className = "form-status error";
      return;
    }
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = translate("purchase.sending");
    status.textContent = "";
    try {
      const endpoint = resolveConfiguredURL(config.payment?.claimEndpoint);
      if (!endpoint) throw new Error("configuration");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "keyfloat-desktop",
          amountCny: config.product?.priceCny ?? 6,
          paymentReference: form.paymentReference.value.trim(),
          email: form.email.value.trim(),
          language
        })
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 202 || result.code === "PAYMENT_PENDING") throw new Error("pending");
      if (!response.ok) {
        throw new Error(["CHECKOUT_DISABLED", "NOT_CONFIGURED", "SIGNING_NOT_CONFIGURED"].includes(result.code) ? "configuration" : "request");
      }
      if (typeof result.voucherCode !== "string" || result.voucherCode.length < 100) throw new Error("request");
      showVoucher(result);
      form.reset();
    } catch (error) {
      const key = error.message === "configuration"
        ? "purchase.configError"
        : error.message === "pending" ? "purchase.pending" : "purchase.error";
      status.textContent = translate(key);
      status.className = "form-status error";
    } finally {
      button.disabled = false;
      button.textContent = translate("purchase.submit");
    }
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.left = "-9999px";
    document.body.append(temporary);
    temporary.select();
    document.execCommand("copy");
    temporary.remove();
  }

  document.querySelector("#language-toggle").addEventListener("click", () => {
    language = language === "en" ? "zh" : "en";
    localStorage.setItem("keyfloat-site-language", language);
    renderLanguage();
  });
  document.querySelectorAll("[data-purchase]").forEach((button) => {
    button.addEventListener("click", openPurchase);
  });
  document.querySelector("[data-purchase-dialog-close]").addEventListener("click", () => dialog.close());
  document.querySelectorAll("[data-contact-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      contactDialog.showModal();
      contactDialog.querySelector("[data-contact-dialog-close]").focus();
    });
  });
  document.querySelector("[data-contact-dialog-close]").addEventListener("click", () => contactDialog.close());
  document.querySelector("#copy-voucher").addEventListener("click", async () => {
    await copyText(voucherCode.textContent);
    voucherCopyStatus.textContent = translate("voucher.copied");
    voucherCopyStatus.className = "form-status success";
  });
  form.addEventListener("submit", submitClaim);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  contactDialog.addEventListener("click", (event) => {
    if (event.target === contactDialog) contactDialog.close();
  });
  dialog.addEventListener("close", resetPurchaseView);
  document.querySelector("#year").textContent = new Date().getFullYear();

  createLogoField();
  applyConfig();
  setupProofCounters();
  renderLanguage();
})();
