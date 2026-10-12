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
      "a11y.account": "KeyFloat account",
      "nav.features": "Features",
      "nav.coverage": "Coverage",
      "nav.download": "Download",
      "nav.contact": "Contact developer",
      "nav.faq": "FAQ",
      "nav.login": "Log in",
      "nav.orders": "My orders",
      "nav.admin": "Payment review",
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
      "platform.lede": "KeyFloat is available for both macOS and 64-bit Windows.",
      "platform.available": "Available now",
      "platform.developing": "In development",
      "platform.macos.body": "Universal floating-window edition for Apple silicon and Intel Macs running macOS 13 or later.",
      "platform.macos.cta": "Download for macOS",
      "platform.windows.body": "Version 1.0.5 installer for 64-bit Windows systems.",
      "platform.windows.cta": "Download for Windows",
      "pricing.eyebrow": "ONE PURCHASE",
      "pricing.title": "Unlock KeyFloat with one activation code.",
      "pricing.lede": "Pay once with Alipay. No account subscription and no recurring charge.",
      "pricing.item1": "Current desktop release",
      "pricing.item2": "English and Chinese interface",
      "pricing.item3": "A clear, uppercase activation code",
      "pricing.once": "one time",
      "pricing.cta": "Pay with Alipay",
      "pricing.note": "After payment is verified, your activation code is saved to your account and emailed to you.",
      "contact.eyebrow": "CONTACT THE DEVELOPER",
      "contact.title": "Questions, feedback, or a lost activation code?",
      "contact.lede": "Contact the KeyFloat developer directly. Please include your payment reference when asking about a lost activation code.",
      "contact.cta": "Contact developer",
      "contact.dialogEyebrow": "DEVELOPER CONTACT",
      "contact.dialogTitle": "Contact the KeyFloat developer",
      "contact.dialogLede": "For activation, payment, or product support, contact the developer by email below.",
      "contact.email": "Email",
      "contact.emailCta": "Copy email",
      "contact.emailCopied": "Copied",
      "contact.replyTime": "The developer will reply within 1 business day.",
      "contact.feedbackCta": "Send feedback",
      "feedback.eyebrow": "PRODUCT FEEDBACK",
      "feedback.title": "Help us improve KeyFloat",
      "feedback.lede": "Tell us what happened or what would make KeyFloat more useful. Your feedback goes directly to the product dashboard.",
      "feedback.messageLabel": "Feedback",
      "feedback.messagePlaceholder": "Describe the issue, suggestion, or experience you want us to improve",
      "feedback.contactLabel": "Contact email (optional)",
      "feedback.contactPlaceholder": "Leave an email if you would like a reply",
      "feedback.submit": "Send feedback",
      "feedback.sending": "Sending…",
      "feedback.success": "Thank you. Your feedback has been received.",
      "feedback.error": "Feedback could not be sent. Please try again shortly.",
      "feedback.rate": "Too many submissions. Please try again later.",
      "faq.eyebrow": "QUESTIONS",
      "faq.title": "Before you download.",
      "faq.q1": "Does KeyFloat require an internet connection?",
      "faq.a1": "Only the first short-code activation requires internet. After that, shortcut browsing, search, preferences, and activation work locally.",
      "faq.q2": "Which platforms are supported?",
      "faq.a2": "KeyFloat currently supports macOS 13 or later and 64-bit Windows systems.",
      "faq.q3": "How does activation work?",
      "faq.a3": "After payment verification, the website displays a short uppercase activation code. Enter it once while online; KeyFloat then works offline.",
      "faq.q4": "Can I retrieve my activation code later?",
      "faq.a4": "Yes. Sign in with the purchase email to view the order and copy its activation code again.",
      "faq.q5": "What if I used the wrong email?",
      "faq.a5": "Contact the developer from the email used for your KeyFloat account so the order can be located.",
      "footer.tagline": "A desktop shortcut companion for focused work.",
      "footer.orders": "My orders",
      "footer.support": "Contact developer",
      "footer.download": "Download",
      "footer.faq": "FAQ",
      "purchase.eyebrow": "ALIPAY CHECKOUT",
      "purchase.title": "Purchase KeyFloat",
      "purchase.lede": "Scan the QR code and pay ¥6 to receive an activation code.",
      "purchase.qrMissing": "Alipay checkout is being prepared and is not open yet.",
      "purchase.qrLoadError": "The payment QR code could not be loaded. Purchasing remains closed for safety.",
      "purchase.unavailable": "Purchasing is temporarily unavailable while the payment channel is being configured.",
      "purchase.openAlipay": "Open Alipay",
      "purchase.business": "Business",
      "purchase.activationCode": " activation code",
      "purchase.email": "Contact email",
      "purchase.emailPlaceholder": "name@example.com",
      "purchase.submit": "I have completed payment",
      "purchase.creating": "Preparing a secure Alipay order…",
      "purchase.sending": "Submitting for review…",
      "purchase.pending": "Your payment is being reviewed.",
      "purchase.configError": "Payment review or activation-code issuance is not configured yet. Please contact the developer.",
      "purchase.error": "Unable to start payment verification. Please try again or contact the development team.",
      "purchase.reviewTitle": "Checking your payment",
      "purchase.reviewBody": "Checking your payment takes about 3–5 minutes. You may keep this page open or retrieve the activation code later from Orders.",
      "purchase.reviewConnection": "The status check was interrupted. We will keep trying automatically.",
      "purchase.expired": "This payment QR code has expired. Close this window and start a new order.",
      "voucher.eyebrow": "PAYMENT VERIFIED",
      "voucher.title": "Your KeyFloat activation code",
      "voucher.copy": "Copy activation code",
      "voucher.copied": "Activation code copied.",
      "voucher.warning": "Keep this code private. It is also saved in Orders and sent to your verified purchase email.",
      "voucher.download": "Download desktop installer",
      "auth.title": "Welcome to KeyFloat",
      "auth.emailLabel": "Email address",
      "auth.emailPlaceholder": "name@example.com",
      "auth.remember": "Keep me signed in on this device",
      "auth.sendCode": "Send verification code",
      "auth.sending": "Sending code…",
      "auth.privacy": "We use your email only for login, order lookup, and essential purchase support.",
      "auth.back": "Change email",
      "auth.backToSite": "Back to website",
      "auth.verifyEyebrow": "EMAIL VERIFICATION",
      "auth.verifyTitle": "Check your inbox.",
      "auth.verifyLede": "Enter the 6-digit code sent to",
      "auth.codeLabel": "Verification code",
      "auth.codePlaceholder": "000000",
      "auth.verify": "Verify and sign in",
      "auth.verifying": "Signing in…",
      "auth.resend": "Resend code",
      "auth.resendIn": "Resend in {seconds}s",
      "auth.devCode": "Local test code: {code}",
      "auth.visualLive": "LIVE SHORTCUT INDEX",
      "auth.visualSearch": "Command search",
      "auth.visualSwitch": "Switch library",
      "auth.visualCollapse": "Collapse panel",
      "auth.error.invalidEmail": "Enter a valid email address.",
      "auth.error.send": "The code could not be sent. Please try again.",
      "auth.error.rate": "Too many requests. Please wait before trying again.",
      "auth.error.invalidCode": "That code is not correct. Check the email and try again.",
      "auth.error.expired": "That code has expired. Request a new one.",
      "auth.error.attempts": "Too many incorrect attempts. Request a new code.",
      "auth.error.unavailable": "Login is temporarily unavailable. Please try again later.",
      "account.eyebrow": "YOUR KEYFLOAT ACCOUNT",
      "account.title": "Orders and activation codes.",
      "account.logout": "Log out",
      "account.summaryLabel": "Available purchases",
      "account.loading": "Loading your orders…",
      "account.emptyTitle": "No purchases found yet.",
      "account.emptyBody": "Orders paid with this email will appear here automatically.",
      "account.buy": "Buy KeyFloat",
      "account.loadError": "Your orders could not be loaded. Try again shortly.",
      "admin.eyebrow": "PAYMENT REVIEW",
      "admin.title": "Pending payments.",
      "admin.summaryLabel": "Waiting for review",
      "admin.refresh": "Refresh",
      "admin.loading": "Loading payment claims…",
      "admin.emptyTitle": "No payments are waiting.",
      "admin.emptyBody": "New customer submissions will appear here automatically.",
      "admin.loadError": "Payment claims could not be loaded. Try again shortly.",
      "admin.claimTitle": "KeyFloat payment",
      "admin.reference": "Transaction {reference}",
      "admin.email": "Customer {email}",
      "admin.amount": "Amount ¥{amount}",
      "admin.approve": "Payment received · issue activation code",
      "admin.approving": "Issuing activation code…",
      "admin.approveError": "The activation code could not be issued. Check the server configuration and try again.",
      "order.product": "KeyFloat Desktop",
      "order.reference": "Review reference {reference}",
      "order.amount": "¥{amount}",
      "order.copy": "Copy activation code",
      "order.copied": "Copied",
      "order.download": "Download installer"
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
      "a11y.account": "KeyFloat 账户",
      "nav.features": "产品功能",
      "nav.coverage": "软件覆盖",
      "nav.download": "下载",
      "nav.contact": "联系开发者",
      "nav.faq": "常见问题",
      "nav.login": "登录",
      "nav.orders": "我的订单",
      "nav.admin": "付款核验",
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
      "platform.lede": "KeyFloat 现已同时支持 macOS 与 64 位 Windows 系统。",
      "platform.available": "现已提供",
      "platform.developing": "开发中",
      "platform.macos.body": "适用于 macOS 13 及以上系统、兼容 Apple 芯片与 Intel 芯片的通用悬浮窗版本。",
      "platform.macos.cta": "下载 macOS 版",
      "platform.windows.body": "适用于 64 位 Windows 系统的 1.0.5 版安装程序。",
      "platform.windows.cta": "下载 Windows 版",
      "pricing.eyebrow": "一次购买",
      "pricing.title": "使用一枚激活码解锁 KeyFloat。",
      "pricing.lede": "通过支付宝一次付费，无账户订阅，也没有后续自动扣费。",
      "pricing.item1": "当前桌面正式版本",
      "pricing.item2": "完整中文与英文界面",
      "pricing.item3": "一枚清晰易读的全大写激活码",
      "pricing.once": "一次性",
      "pricing.cta": "使用支付宝购买",
      "pricing.note": "付款核验通过后，激活码会保存到您的账户并发送至邮箱。",
      "contact.eyebrow": "联系开发者",
      "contact.title": "产品问题、使用反馈或激活码遗失？",
      "contact.lede": "您可以直接联系 KeyFloat 开发者。咨询遗失激活码时，请使用账户验证邮箱发送邮件。",
      "contact.cta": "联系开发者",
      "contact.dialogEyebrow": "开发者联系方式",
      "contact.dialogTitle": "联系 KeyFloat 开发者",
      "contact.dialogLede": "如有激活、付款或产品使用问题，请通过以下邮箱联系。",
      "contact.email": "邮箱",
      "contact.emailCta": "复制邮箱",
      "contact.emailCopied": "已复制",
      "contact.replyTime": "开发者将在 1 个工作日内回复。",
      "contact.feedbackCta": "提交反馈",
      "feedback.eyebrow": "产品反馈",
      "feedback.title": "帮助我们改进 KeyFloat",
      "feedback.lede": "请告诉我们遇到的问题或希望增加的体验，反馈会直接进入产品管理后台。",
      "feedback.messageLabel": "反馈内容",
      "feedback.messagePlaceholder": "请描述您遇到的问题、建议或希望我们改进的体验",
      "feedback.contactLabel": "联系邮箱（选填）",
      "feedback.contactPlaceholder": "如需回复，请留下邮箱",
      "feedback.submit": "提交反馈",
      "feedback.sending": "正在提交…",
      "feedback.success": "感谢反馈，我们已经收到。",
      "feedback.error": "反馈暂时无法提交，请稍后重试。",
      "feedback.rate": "提交次数过多，请稍后再试。",
      "faq.eyebrow": "常见问题",
      "faq.title": "下载之前需要了解的内容。",
      "faq.q1": "KeyFloat 需要联网吗？",
      "faq.a1": "短激活码首次验证需要联网；完成后，快捷键资料、搜索、偏好和激活状态均在本地工作。",
      "faq.q2": "支持哪些平台？",
      "faq.a2": "KeyFloat 目前支持 macOS 13 及以上系统与 64 位 Windows 系统。",
      "faq.q3": "如何激活 KeyFloat？",
      "faq.a3": "付款核验通过后，网站会展示一枚全大写短激活码。首次联网输入后，KeyFloat 即可离线使用。",
      "faq.q4": "以后还能找回激活码吗？",
      "faq.a4": "可以。使用购买邮箱登录，即可查询订单并再次复制激活码。",
      "faq.q5": "购买时填错邮箱怎么办？",
      "faq.a5": "请使用 KeyFloat 账户的验证邮箱联系开发者，以便查询对应订单。",
      "footer.tagline": "专注工作效率的桌面快捷键工具。",
      "footer.orders": "我的订单",
      "footer.support": "联系开发者",
      "footer.download": "下载",
      "footer.faq": "常见问题",
      "purchase.eyebrow": "支付宝结账",
      "purchase.title": "购买 KeyFloat",
      "purchase.lede": "扫描二维码支付 ¥6获取激活码",
      "purchase.qrMissing": "支付宝付款通道正在准备中，目前暂未开放。",
      "purchase.qrLoadError": "付款二维码加载失败，为避免误付款，购买通道仍保持关闭。",
      "purchase.unavailable": "付款通道正在配置中，购买功能暂不可用。",
      "purchase.openAlipay": "打开支付宝",
      "purchase.business": "经营",
      "purchase.activationCode": "激活码",
      "purchase.email": "联系邮箱",
      "purchase.emailPlaceholder": "请输入您的联系邮箱",
      "purchase.submit": "我已完成支付",
      "purchase.creating": "正在创建安全的支付宝订单…",
      "purchase.sending": "正在提交核验…",
      "purchase.pending": "正在核验，请耐心等待。",
      "purchase.configError": "付款审核或激活码签发服务尚未配置，请联系产品开发者。",
      "purchase.error": "付款核验提交失败，请重试或联系开发团队。",
      "purchase.reviewTitle": "正在核验",
      "purchase.reviewBody": "正在核验，大约需要 3–5 分钟。您可以保持页面打开，也可以稍后在订单中查询激活码。",
      "purchase.reviewConnection": "状态查询暂时中断，页面会继续自动重试。",
      "purchase.expired": "本次支付二维码已过期，请关闭窗口后重新创建订单。",
      "voucher.eyebrow": "付款已核验",
      "voucher.title": "您的 KeyFloat 激活码",
      "voucher.copy": "复制激活码",
      "voucher.copied": "激活码已复制。",
      "voucher.warning": "请勿向他人分享该激活码。激活码已保存至订单，并会发送到您的购买邮箱。",
      "voucher.download": "下载桌面安装包",
      "auth.title": "欢迎使用KeyFloat",
      "auth.emailLabel": "邮箱地址",
      "auth.emailPlaceholder": "请输入您的邮箱",
      "auth.remember": "在此设备上保持登录",
      "auth.sendCode": "发送验证码",
      "auth.sending": "正在发送验证码…",
      "auth.privacy": "邮箱仅用于登录、查询订单和必要的购买支持。",
      "auth.back": "更换邮箱",
      "auth.backToSite": "返回官网",
      "auth.verifyEyebrow": "邮箱验证",
      "auth.verifyTitle": "请查收邮箱。",
      "auth.verifyLede": "请输入发送至以下邮箱的 6 位验证码",
      "auth.codeLabel": "验证码",
      "auth.codePlaceholder": "000000",
      "auth.verify": "验证并登录",
      "auth.verifying": "正在登录…",
      "auth.resend": "重新发送验证码",
      "auth.resendIn": "{seconds} 秒后可重新发送",
      "auth.devCode": "本地测试验证码：{code}",
      "auth.visualLive": "实时快捷键索引",
      "auth.visualSearch": "命令搜索",
      "auth.visualSwitch": "切换资料库",
      "auth.visualCollapse": "收起面板",
      "auth.error.invalidEmail": "请输入有效的邮箱地址。",
      "auth.error.send": "验证码发送失败，请稍后重试。",
      "auth.error.rate": "请求过于频繁，请稍后再试。",
      "auth.error.invalidCode": "验证码不正确，请检查邮件后重试。",
      "auth.error.expired": "验证码已过期，请重新获取。",
      "auth.error.attempts": "错误次数过多，请重新获取验证码。",
      "auth.error.unavailable": "登录服务暂不可用，请稍后重试。",
      "account.eyebrow": "您的账户",
      "account.title": "订单与激活码。",
      "account.logout": "退出登录",
      "account.summaryLabel": "可查询的购买记录",
      "account.loading": "正在加载您的订单…",
      "account.emptyTitle": "暂未查询到购买记录。",
      "account.emptyBody": "使用此邮箱完成支付后，订单会自动显示在这里。",
      "account.buy": "购买 KeyFloat",
      "account.loadError": "订单加载失败，请稍后重试。",
      "admin.eyebrow": "付款核验",
      "admin.title": "待核验付款。",
      "admin.summaryLabel": "等待核验",
      "admin.refresh": "刷新",
      "admin.loading": "正在加载待核验付款…",
      "admin.emptyTitle": "当前没有待核验付款。",
      "admin.emptyBody": "用户提交“我已完成支付”后会自动显示在这里。",
      "admin.loadError": "待核验付款加载失败，请稍后重试。",
      "admin.claimTitle": "KeyFloat 付款",
      "admin.reference": "交易号 {reference}",
      "admin.email": "用户 {email}",
      "admin.amount": "金额 ¥{amount}",
      "admin.approve": "确认到账并发码",
      "admin.approving": "正在签发激活码…",
      "admin.approveError": "激活码签发失败，请检查服务配置后重试。",
      "order.product": "KeyFloat 桌面版",
      "order.reference": "订单核验编号 {reference}",
      "order.amount": "¥{amount}",
      "order.copy": "复制激活码",
      "order.copied": "已复制",
      "order.download": "下载安装包"
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
  const previewTarget = new URLSearchParams(window.location.search).get("preview");
  const localPreviewMode = ["127.0.0.1", "localhost"].includes(window.location.hostname) &&
    ["site", "payment"].includes(previewTarget);
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
  const feedbackDialog = document.querySelector("#feedback-dialog");
  const feedbackForm = document.querySelector("#website-feedback-form");
  const feedbackStatus = document.querySelector("#website-feedback-status");
  const authPage = document.querySelector("#auth-page");
  const siteShell = Array.from(document.querySelectorAll("[data-site-shell]"));
  const form = document.querySelector("#purchase-form");
  const status = document.querySelector("#purchase-status");
  const checkoutGrid = document.querySelector("#checkout-grid");
  const reviewPanel = document.querySelector("#payment-review-panel");
  const reviewStatus = document.querySelector("#payment-review-status");
  const voucherPanel = document.querySelector("#voucher-panel");
  const voucherCode = document.querySelector("#voucher-code");
  const voucherCopyStatus = document.querySelector("#voucher-copy-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let checkoutReady = false;
  let authUser;
  let authEmail = "";
  let authOrders = [];
  let authStep = "email";
  let resendAvailableAt = 0;
  let resendTimer = 0;
  let authDevelopmentCode = "";
  let activeClaimId = "";
  let activePaymentProvider = "manual";
  let activeAlipayOrderNo = "";
  let alipayAutomatic = false;
  let alipayDetectionPromise;
  let manualCheckoutReady = false;
  let manualQRURL;
  let claimPollTimer = 0;
  let websiteVisitRecorded = false;
  let resetLogoField = () => {};
  let updateHeroPurchaseVisibility = () => {};

  function translate(key) {
    return translations[language][key] || key;
  }

  function interpolate(key, values = {}) {
    return Object.entries(values).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
      translate(key)
    );
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
    document.querySelectorAll("#language-toggle, [data-auth-language]").forEach((button) => {
      button.setAttribute("aria-label", language === "zh" ? "切换语言" : "Switch language");
    });
    renderAuthNav();
    updateResendButton();
    if (authDevelopmentCode) document.querySelector("#auth-dev-code").textContent = interpolate("auth.devCode", { code: authDevelopmentCode });
    if (authOrders.length) renderOrders();
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

  function authEndpoint(name) {
    const defaults = {
      requestCode: "/api/auth/request-code",
      verifyCode: "/api/auth/verify-code",
      session: "/api/auth/session",
      logout: "/api/auth/logout",
      orders: "/api/orders"
    };
    return resolveConfiguredURL(config.auth?.[name] || defaults[name]);
  }

  async function authRequest(name, options = {}) {
    const endpoint = authEndpoint(name);
    if (!endpoint) throw Object.assign(new Error("configuration"), { payload: { code: "AUTH_UNAVAILABLE" } });
    const response = await fetch(endpoint, {
      credentials: "same-origin",
      ...options,
      headers: options.body ? { "Content-Type": "application/json", ...(options.headers || {}) } : options.headers
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw Object.assign(new Error(payload.code || "AUTH_UNAVAILABLE"), { response, payload });
    return payload;
  }

  function renderAuthNav() {
    const button = document.querySelector("#auth-open");
    const label = document.querySelector("#auth-nav-label");
    if (!button || !label) return;
    button.classList.toggle("is-authenticated", Boolean(authUser));
    const labelKey = authUser ? "nav.orders" : "nav.login";
    label.textContent = translate(labelKey);
    button.setAttribute("aria-label", label.textContent);
  }

  function syncAuthGate() {
    const close = document.querySelector("[data-auth-close]");
    close.hidden = !authUser;
  }

  function showAuthSurface() {
    siteShell.forEach((section) => { section.hidden = true; });
    authPage.hidden = false;
    document.body.classList.add("auth-mode");
    window.scrollTo(0, 0);
  }

  function showWebsite() {
    authPage.hidden = true;
    siteShell.forEach((section) => { section.hidden = false; });
    document.body.classList.remove("auth-mode");
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      resetLogoField();
      updateHeroPurchaseVisibility();
      document.dispatchEvent(new CustomEvent("keyfloat:site-visible"));
    });
  }

  function setAuthStep(step) {
    authStep = step;
    authPage.querySelectorAll("[data-auth-step]").forEach((section) => {
      section.hidden = section.dataset.authStep !== step;
    });
    if (step === "email") document.querySelector("#auth-email").focus();
    if (step === "code") document.querySelector("#auth-code").focus();
    if (step === "account") document.querySelector("#auth-logout").focus();
  }

  function authErrorKey(code, context) {
    if (code === "INVALID_EMAIL") return "auth.error.invalidEmail";
    if (code === "INVALID_CREDENTIALS") return "auth.error.invalidEmail";
    if (["RATE_LIMITED", "RESEND_TOO_SOON"].includes(code)) return "auth.error.rate";
    if (code === "INVALID_CODE" || code === "INVALID_INPUT") return "auth.error.invalidCode";
    if (code === "CODE_EXPIRED") return "auth.error.expired";
    if (code === "TOO_MANY_ATTEMPTS") return "auth.error.attempts";
    if (context === "send") return "auth.error.send";
    return "auth.error.unavailable";
  }

  function updateResendButton() {
    const button = document.querySelector("#auth-resend");
    if (!button) return;
    const seconds = Math.max(0, Math.ceil((resendAvailableAt - Date.now()) / 1_000));
    button.disabled = seconds > 0;
    button.textContent = seconds > 0 ? interpolate("auth.resendIn", { seconds }) : translate("auth.resend");
    if (seconds <= 0 && resendTimer) {
      clearInterval(resendTimer);
      resendTimer = 0;
    }
  }

  function startResendTimer(seconds) {
    resendAvailableAt = Date.now() + Math.max(0, seconds) * 1_000;
    if (resendTimer) clearInterval(resendTimer);
    updateResendButton();
    resendTimer = window.setInterval(updateResendButton, 1_000);
  }

  async function sendAuthCode(email, { resend = false } = {}) {
    const status = document.querySelector(resend ? "#auth-code-status" : "#auth-email-status");
    const button = resend ? document.querySelector("#auth-resend") : document.querySelector("#auth-email-form button[type='submit']");
    status.textContent = "";
    status.className = "form-status";
    button.disabled = true;
    if (!resend) button.textContent = translate("auth.sending");
    try {
      const result = await authRequest("requestCode", {
        method: "POST",
        body: JSON.stringify({ email, language })
      });
      authEmail = email.trim().toLowerCase();
      document.querySelector("#auth-masked-email").textContent = result.maskedEmail || authEmail;
      const development = document.querySelector("#auth-dev-code");
      if (result.developmentCode) {
        authDevelopmentCode = result.developmentCode;
        development.textContent = interpolate("auth.devCode", { code: authDevelopmentCode });
        development.hidden = false;
      } else {
        authDevelopmentCode = "";
        development.hidden = true;
        development.textContent = "";
      }
      document.querySelector("#auth-code").value = "";
      setAuthStep("code");
      startResendTimer(Number(result.resendAfter || 60));
    } catch (error) {
      if (error.payload?.retryAfter) startResendTimer(Number(error.payload.retryAfter));
      status.textContent = translate(authErrorKey(error.payload?.code, "send"));
      status.className = "form-status error";
    } finally {
      if (!resend) {
        button.disabled = false;
        button.textContent = translate("auth.sendCode");
      } else {
        updateResendButton();
      }
    }
  }

  async function refreshAuthSession() {
    try {
      const result = await authRequest("session", { method: "GET" });
      authUser = result.authenticated ? result.user : undefined;
    } catch {
      authUser = undefined;
    }
    renderAuthNav();
    syncAuthGate();
    const deliveryEmail = document.querySelector("#delivery-email");
    if (authUser && deliveryEmail && !deliveryEmail.value) deliveryEmail.value = authUser.email;
    return authUser;
  }

  async function recordWebsiteVisitOnce() {
    if (!authUser || localPreviewMode || websiteVisitRecorded) return;
    websiteVisitRecorded = true;
    try {
      await fetch("/api/analytics/visit", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: "{}"
      });
    } catch { /* Analytics must never interrupt the website experience. */ }
  }

  function safeDownloadURL(value) {
    if (!value) return undefined;
    try {
      const parsed = new URL(value, window.location.href);
      return parsed.protocol === "https:" || parsed.origin === window.location.origin ? parsed.href : undefined;
    } catch {
      return undefined;
    }
  }

  function downloadPlatformForURL(value) {
    const safeURL = safeDownloadURL(value);
    if (!safeURL) return undefined;
    const pathname = new URL(safeURL).pathname.toLowerCase();
    if (pathname.endsWith(".dmg")) return "macos";
    if (pathname.endsWith(".exe")) return "windows";
    return undefined;
  }

  function setupDownloadAnalytics() {
    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[data-platform]");
      const platform = link?.dataset.platform;
      if (!link?.href || !["macos", "windows"].includes(platform) || !authUser || localPreviewMode) return;
      void fetch("/api/analytics/download", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
        keepalive: true,
      }).catch(() => { /* Download analytics must never interrupt the installer download. */ });
    });
  }

  function renderOrders() {
    const list = document.querySelector("#order-list");
    list.replaceChildren();
    const formatter = new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en", { year: "numeric", month: "short", day: "numeric" });
    authOrders.forEach((order) => {
      const card = document.createElement("article");
      card.className = "order-card";

      const heading = document.createElement("div");
      heading.className = "order-card-head";
      const title = document.createElement("strong");
      title.textContent = translate("order.product");
      const date = document.createElement("span");
      const purchasedAt = new Date(order.purchasedAt);
      date.textContent = Number.isNaN(purchasedAt.getTime()) ? "" : formatter.format(purchasedAt);
      heading.append(title, date);

      const meta = document.createElement("div");
      meta.className = "order-meta";
      const reference = document.createElement("span");
      reference.textContent = interpolate("order.reference", { reference: order.paymentReference });
      const amount = document.createElement("span");
      amount.textContent = interpolate("order.amount", { amount: order.amountCny });
      meta.append(reference, amount);

      const voucher = document.createElement("div");
      voucher.className = "order-voucher";
      const code = document.createElement("code");
      code.textContent = order.voucherCode;
      code.title = order.voucherCode;
      const copy = document.createElement("button");
      copy.className = "button button-secondary";
      copy.type = "button";
      copy.textContent = translate("order.copy");
      copy.addEventListener("click", async () => {
        await copyText(order.voucherCode);
        copy.textContent = translate("order.copied");
        window.setTimeout(() => { copy.textContent = translate("order.copy"); }, 1_500);
      });
      voucher.append(code, copy);
      card.append(heading, meta, voucher);

      const downloadURL = safeDownloadURL(order.downloadURL);
      if (downloadURL) {
        const actions = document.createElement("div");
        actions.className = "order-actions";
        const download = document.createElement("a");
        download.href = downloadURL;
        download.dataset.platform = downloadPlatformForURL(downloadURL) || "";
        download.textContent = translate("order.download");
        download.rel = "noopener";
        actions.append(download);
        card.append(actions);
      }
      list.append(card);
    });
    document.querySelector("#account-order-count").textContent = String(authOrders.length);
  }

  async function loadOrders() {
    const loading = document.querySelector("#orders-loading");
    const empty = document.querySelector("#orders-empty");
    const list = document.querySelector("#order-list");
    const status = document.querySelector("#orders-status");
    loading.hidden = false;
    empty.hidden = true;
    list.hidden = true;
    status.textContent = "";
    try {
      const result = await authRequest("orders", { method: "GET" });
      authOrders = Array.isArray(result.orders) ? result.orders : [];
      renderOrders();
      empty.hidden = authOrders.length > 0;
      list.hidden = authOrders.length === 0;
    } catch {
      authOrders = [];
      document.querySelector("#account-order-count").textContent = "0";
      status.textContent = translate("account.loadError");
      status.className = "form-status error";
    } finally {
      loading.hidden = true;
    }
  }

  async function showAccount() {
    showAuthSurface();
    syncAuthGate();
    document.querySelector("#auth-account-email").textContent = authUser?.email || "";
    setAuthStep("account");
    await loadOrders();
  }

  async function openAuth() {
    await refreshAuthSession();
    showAuthSurface();
    if (authUser) await showAccount();
    else {
      syncAuthGate();
      setAuthStep("email");
    }
  }

  async function initializeAuthLanding() {
    if (localPreviewMode) {
      authUser = undefined;
      renderAuthNav();
      showWebsite();
      if (previewTarget === "payment") requestAnimationFrame(openPurchase);
      return;
    }
    await refreshAuthSession();
    if (authUser) {
      showWebsite();
      void recordWebsiteVisitOnce();
    }
    else {
      showAuthSurface();
      syncAuthGate();
      setAuthStep("email");
    }
  }

  function setupHeroPurchaseVisibility() {
    const hero = document.querySelector(".hero");
    const header = document.querySelector(".site-header");
    const purchase = document.querySelector("[data-hero-nav-purchase]");
    if (!hero || !header || !purchase) return () => {};

    function update() {
      purchase.hidden = hero.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom + 1;
    }

    if (typeof IntersectionObserver === "function") {
      const observer = new IntersectionObserver(([entry]) => {
        purchase.hidden = entry.isIntersecting;
      }, {
        rootMargin: `-${Math.ceil(header.getBoundingClientRect().height + 1)}px 0px 0px 0px`,
        threshold: 0
      });
      observer.observe(hero);
    }
    window.addEventListener("resize", update);
    update();
    return update;
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
      if (fieldWidth <= 0 || fieldHeight <= 0) return;
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
    if (typeof ResizeObserver === "function") {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(resetLayout);
      });
      resizeObserver.observe(field);
    }
    reduceMotion.addEventListener("change", resetLayout);
    resetLayout();
    return resetLayout;
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
      shortcuts.dataset.counterTarget = String(Number(product.shortcutCount || 10783));
      shortcuts.textContent = Number(product.shortcutCount || 10783).toLocaleString("en-US");
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
    manualQRURL = qrURL;
    const claimURL = paymentEndpoint("claimEndpoint");
    const statusURL = paymentEndpoint("statusEndpoint");
    if (paymentIsLive && qrURL && claimURL && statusURL) {
      qr.addEventListener("load", () => {
        if (qr.src === manualQRURL) manualCheckoutReady = true;
        if (activePaymentProvider === "manual") {
          qr.hidden = false;
          placeholder.hidden = true;
          setCheckoutReady(true);
        }
      });
      qr.addEventListener("error", () => {
        qr.hidden = true;
        placeholder.hidden = false;
        setQRPlaceholder("purchase.qrLoadError");
        setCheckoutReady(false);
      });
      qr.src = qrURL;
    }
    const deepLink = document.querySelector("#open-alipay");
    const deepLinkURL = resolveConfiguredURL(config.payment?.alipayPaymentUrl);
    if (paymentIsLive && deepLinkURL) {
      deepLink.href = deepLinkURL;
      deepLink.hidden = false;
    }
    alipayDetectionPromise = detectAutomaticAlipay();
  }

  function paymentEndpoint(name) {
    const defaults = {
      claimEndpoint: "/api/payment-claim",
      statusEndpoint: "/api/payment-status",
      alipayConfigEndpoint: "/api/alipay/config",
      alipayCreateEndpoint: "/api/alipay/create-order",
      alipayStatusEndpoint: "/api/alipay/order-status"
    };
    return resolveConfiguredURL(config.payment?.[name] || defaults[name]);
  }

  async function detectAutomaticAlipay() {
    const endpoint = paymentEndpoint("alipayConfigEndpoint");
    if (!endpoint) return false;
    try {
      const response = await fetch(endpoint, { credentials: "same-origin" });
      const result = await response.json().catch(() => ({}));
      alipayAutomatic = response.ok && result.enabled === true;
    } catch {
      alipayAutomatic = false;
    }
    return alipayAutomatic;
  }

  function showManualPaymentQR() {
    activePaymentProvider = "manual";
    activeAlipayOrderNo = "";
    const qr = document.querySelector("#payment-qr");
    const placeholder = document.querySelector("#qr-placeholder");
    if (manualQRURL) qr.src = manualQRURL;
    if (manualCheckoutReady || (qr.complete && qr.naturalWidth > 0)) {
      qr.hidden = false;
      placeholder.hidden = true;
      setCheckoutReady(true);
    }
  }

  async function preparePaymentCheckout() {
    const qr = document.querySelector("#payment-qr");
    const placeholder = document.querySelector("#qr-placeholder");
    const deepLink = document.querySelector("#open-alipay");
    if (!alipayDetectionPromise) alipayDetectionPromise = detectAutomaticAlipay();
    setCheckoutReady(false);
    const automatic = await alipayDetectionPromise.catch(() => false);
    if (!automatic) {
      showManualPaymentQR();
      return;
    }

    activePaymentProvider = "alipay";
    qr.hidden = true;
    placeholder.hidden = false;
    setQRPlaceholder("purchase.creating");
    deepLink.hidden = true;
    const endpoint = paymentEndpoint("alipayCreateEndpoint");
    if (!endpoint) return;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "keyfloat-desktop",
          amountCny: config.product?.priceCny ?? 6,
          email: authUser.email,
          language
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.order?.outTradeNo || !/^data:image\/png;base64,/.test(result.order.qrImageDataUrl || "")) {
        throw new Error(result.code || "ALIPAY_ORDER_FAILED");
      }
      activeAlipayOrderNo = result.order.outTradeNo;
      const showDynamicQR = () => {
        if (activePaymentProvider !== "alipay") return;
        qr.hidden = false;
        placeholder.hidden = true;
        setCheckoutReady(true);
      };
      qr.onload = showDynamicQR;
      qr.onerror = () => {
        qr.hidden = true;
        placeholder.hidden = false;
        setQRPlaceholder("purchase.qrLoadError");
        setCheckoutReady(false);
      };
      qr.src = result.order.qrImageDataUrl;
      if (qr.complete && qr.naturalWidth > 0) showDynamicQR();
      const paymentURL = resolveConfiguredURL(result.order.qrCode);
      if (paymentURL) {
        deepLink.href = paymentURL;
        deepLink.hidden = false;
      }
    } catch {
      setQRPlaceholder("purchase.qrLoadError");
      status.textContent = translate("purchase.configError");
      status.className = "form-status error";
    }
  }

  function pendingClaimStorageKey() {
    return authUser?.email ? `keyfloat-pending-claim:${authUser.email}` : "";
  }

  function rememberPendingClaim(claim) {
    const key = pendingClaimStorageKey();
    if (!key) return;
    const id = claim.outTradeNo || claim.id;
    localStorage.setItem(key, JSON.stringify({ id, reviewReference: claim.reviewReference || claim.outTradeNo || "", provider: claim.outTradeNo ? "alipay" : "manual" }));
  }

  function forgetPendingClaim() {
    const key = pendingClaimStorageKey();
    if (key) localStorage.removeItem(key);
  }

  function restoredPendingClaim() {
    const key = pendingClaimStorageKey();
    if (!key) return undefined;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      const provider = saved?.provider === "alipay" ? "alipay" : "manual";
      const pattern = provider === "alipay" ? /^[A-Za-z0-9_-]{8,64}$/ : /^[a-f0-9]{24}$/;
      if (!pattern.test(String(saved?.id || ""))) return undefined;
      return provider === "alipay"
        ? { outTradeNo: saved.id, reviewReference: String(saved.reviewReference || saved.id) }
        : { id: saved.id, reviewReference: String(saved.reviewReference || "") };
    } catch {
      localStorage.removeItem(key);
      return undefined;
    }
  }

  function clearClaimPolling() {
    if (claimPollTimer) clearTimeout(claimPollTimer);
    claimPollTimer = 0;
  }

  function scheduleClaimPoll(delay = 4_000) {
    clearClaimPolling();
    claimPollTimer = window.setTimeout(() => { void pollClaimStatus(); }, delay);
  }

  function resetPurchaseView() {
    clearClaimPolling();
    activeClaimId = "";
    activePaymentProvider = "manual";
    activeAlipayOrderNo = "";
    checkoutGrid.hidden = false;
    reviewPanel.hidden = true;
    voucherPanel.hidden = true;
    voucherCode.textContent = "";
    voucherCopyStatus.textContent = "";
    status.textContent = "";
    status.className = "form-status";
    reviewStatus.textContent = "";
    reviewStatus.className = "form-status";
  }

  function openPurchase() {
    if (!authUser && !localPreviewMode) {
      void openAuth();
      return;
    }
    showWebsite();
    resetPurchaseView();
    form.reset();
    document.querySelector("#delivery-email").value = authUser?.email || (localPreviewMode ? "preview@local.test" : "");
    dialog.showModal();
    const restored = restoredPendingClaim();
    if (restored) {
      showPaymentReview(restored);
      void pollClaimStatus();
    } else {
      void preparePaymentCheckout();
      document.querySelector("[data-purchase-dialog-close]").focus();
    }
  }

  function showPaymentReview(claim) {
    activePaymentProvider = claim.outTradeNo ? "alipay" : "manual";
    activeAlipayOrderNo = claim.outTradeNo || "";
    activeClaimId = claim.outTradeNo || claim.id;
    rememberPendingClaim(claim);
    checkoutGrid.hidden = true;
    voucherPanel.hidden = true;
    reviewPanel.hidden = false;
    reviewStatus.textContent = "";
    reviewStatus.className = "form-status";
  }

  function showVoucher(result) {
    clearClaimPolling();
    forgetPendingClaim();
    checkoutGrid.hidden = true;
    reviewPanel.hidden = true;
    voucherPanel.hidden = false;
    voucherCode.textContent = result.voucherCode;
    const download = document.querySelector("#voucher-download");
    if (result.downloadURL) {
      download.href = result.downloadURL;
      download.dataset.platform = downloadPlatformForURL(result.downloadURL) || "";
      download.hidden = false;
    } else {
      download.hidden = true;
      download.removeAttribute("href");
      delete download.dataset.platform;
    }
    document.querySelector("#copy-voucher").focus();
    if (authUser) void loadOrders();
  }

  async function pollClaimStatus() {
    if (!activeClaimId || reviewPanel.hidden) return;
    const endpoint = paymentEndpoint(activePaymentProvider === "alipay" ? "alipayStatusEndpoint" : "statusEndpoint");
    if (!endpoint) {
      reviewStatus.textContent = translate("purchase.configError");
      reviewStatus.className = "form-status error";
      return;
    }
    const url = new URL(endpoint);
    url.searchParams.set(activePaymentProvider === "alipay" ? "outTradeNo" : "claimId", activeClaimId);
    try {
      const response = await fetch(url, { credentials: "same-origin" });
      const result = await response.json().catch(() => ({}));
      const payment = activePaymentProvider === "alipay" ? result.order : result.claim;
      if (!response.ok || !payment) throw new Error("status");
      if (["approved", "paid"].includes(payment.status) && typeof payment.voucherCode === "string") {
        showVoucher(payment);
        return;
      }
      if (payment.status === "closed") {
        forgetPendingClaim();
        reviewStatus.textContent = translate("purchase.expired");
        reviewStatus.className = "form-status error";
        return;
      }
      reviewStatus.textContent = "";
      reviewStatus.className = "form-status";
      scheduleClaimPoll();
    } catch {
      reviewStatus.textContent = translate("purchase.reviewConnection");
      reviewStatus.className = "form-status error";
      scheduleClaimPoll(8_000);
    }
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
      if (activePaymentProvider === "alipay" && activeAlipayOrderNo) {
        showPaymentReview({ outTradeNo: activeAlipayOrderNo });
        await pollClaimStatus();
        return;
      }
      const endpoint = paymentEndpoint("claimEndpoint");
      if (!endpoint) throw new Error("configuration");
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "keyfloat-desktop",
          amountCny: config.product?.priceCny ?? 6,
          email: form.email.value.trim(),
          language
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(["CHECKOUT_DISABLED", "ORDER_STORAGE_NOT_CONFIGURED", "CLAIM_STORAGE_FAILED"].includes(result.code) ? "configuration" : "request");
      }
      if (!result.claim?.id) throw new Error("request");
      if (result.claim.status === "approved" && typeof result.claim.voucherCode === "string") {
        showVoucher(result.claim);
      } else {
        showPaymentReview(result.claim);
        scheduleClaimPoll(1_500);
      }
    } catch (error) {
      const key = error.message === "configuration" ? "purchase.configError" : "purchase.error";
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

  async function submitWebsiteFeedback(event) {
    event.preventDefault();
    const message = document.querySelector("#website-feedback-message");
    const contact = document.querySelector("#website-feedback-contact");
    if (!feedbackForm.reportValidity()) return;
    const button = feedbackForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = translate("feedback.sending");
    feedbackStatus.textContent = "";
    feedbackStatus.className = "form-status";
    try {
      const clientSubmissionId = globalThis.crypto?.randomUUID?.() ||
        `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      const response = await fetch("/api/feedback", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "website",
          message: message.value.trim(),
          contact: contact.value.trim(),
          language,
          clientSubmissionId
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw Object.assign(new Error(result.code || "FEEDBACK_UNAVAILABLE"), { response, result });
      feedbackForm.reset();
      feedbackStatus.textContent = translate("feedback.success");
      feedbackStatus.className = "form-status success";
    } catch (error) {
      feedbackStatus.textContent = translate(error.response?.status === 429 ? "feedback.rate" : "feedback.error");
      feedbackStatus.className = "form-status error";
    } finally {
      button.disabled = false;
      button.textContent = translate("feedback.submit");
    }
  }

  document.querySelectorAll("#language-toggle, [data-auth-language]").forEach((button) => {
    button.addEventListener("click", () => {
      language = language === "en" ? "zh" : "en";
      localStorage.setItem("keyfloat-site-language", language);
      renderLanguage();
    });
  });
  document.querySelectorAll("[data-purchase]").forEach((button) => {
    button.addEventListener("click", openPurchase);
  });
  document.querySelectorAll("[data-auth-open]").forEach((button) => {
    button.addEventListener("click", () => { void openAuth(); });
  });
  document.querySelector("[data-auth-close]").addEventListener("click", () => {
    if (authUser) showWebsite();
  });
  document.querySelector("[data-auth-back]").addEventListener("click", () => {
    document.querySelector("#auth-code-status").textContent = "";
    setAuthStep("email");
  });
  document.querySelector("#auth-email-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#auth-email");
    const value = input.value.trim();
    if (!value) {
      const status = document.querySelector("#auth-email-status");
      status.textContent = translate("auth.error.invalidEmail");
      status.className = "form-status error";
      input.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      const status = document.querySelector("#auth-email-status");
      status.textContent = translate("auth.error.invalidEmail");
      status.className = "form-status error";
      input.focus();
      return;
    }
    void sendAuthCode(value);
  });
  document.querySelector("#auth-code").addEventListener("input", (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 6);
  });
  document.querySelector("#auth-code-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.querySelector("#auth-code");
    if (!input.reportValidity()) return;
    const button = event.currentTarget.querySelector('button[type="submit"]');
    const status = document.querySelector("#auth-code-status");
    status.textContent = "";
    status.className = "form-status";
    button.disabled = true;
    button.textContent = translate("auth.verifying");
    try {
      const result = await authRequest("verifyCode", {
        method: "POST",
        body: JSON.stringify({
          email: authEmail,
          code: input.value,
          remember: document.querySelector("#auth-remember").checked
        })
      });
      authUser = result.user;
      renderAuthNav();
      syncAuthGate();
      showWebsite();
      void recordWebsiteVisitOnce();
    } catch (error) {
      status.textContent = translate(authErrorKey(error.payload?.code, "verify"));
      status.className = "form-status error";
      input.select();
    } finally {
      button.disabled = false;
      button.textContent = translate("auth.verify");
    }
  });
  document.querySelector("#auth-resend").addEventListener("click", () => {
    if (authEmail) void sendAuthCode(authEmail, { resend: true });
  });
  document.querySelectorAll("[data-auth-logout]").forEach((button) => {
    button.addEventListener("click", async () => {
      try { await authRequest("logout", { method: "POST" }); } catch { /* Clearing local state still prevents stale UI. */ }
      clearClaimPolling();
      authUser = undefined;
      authEmail = "";
      authOrders = [];
      authDevelopmentCode = "";
      document.querySelector("#auth-email-form").reset();
      document.querySelector("#auth-remember").checked = true;
      renderAuthNav();
      syncAuthGate();
      showAuthSurface();
      setAuthStep("email");
    });
  });
  document.querySelector("[data-purchase-dialog-close]").addEventListener("click", () => dialog.close());
  document.querySelectorAll("[data-contact-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      contactDialog.showModal();
      contactDialog.querySelector("[data-contact-dialog-close]").focus();
    });
  });
  document.querySelectorAll("[data-feedback-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      feedbackStatus.textContent = "";
      feedbackStatus.className = "form-status";
      const contact = document.querySelector("#website-feedback-contact");
      if (authUser && !contact.value) contact.value = authUser.email;
      feedbackDialog.showModal();
      document.querySelector("#website-feedback-message").focus();
    });
  });
  document.querySelector("[data-contact-dialog-close]").addEventListener("click", () => contactDialog.close());
  document.querySelector("[data-feedback-dialog-close]").addEventListener("click", () => feedbackDialog.close());
  document.querySelector("[data-copy-contact-email]").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const email = document.querySelector("[data-contact-email]").textContent.trim();
    await copyText(email);
    button.textContent = translate("contact.emailCopied");
    window.setTimeout(() => {
      button.textContent = translate("contact.emailCta");
    }, 1_500);
  });
  document.querySelector("#copy-voucher").addEventListener("click", async () => {
    await copyText(voucherCode.textContent);
    voucherCopyStatus.textContent = translate("voucher.copied");
    voucherCopyStatus.className = "form-status success";
  });
  form.addEventListener("submit", submitClaim);
  feedbackForm.addEventListener("submit", submitWebsiteFeedback);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  contactDialog.addEventListener("click", (event) => {
    if (event.target === contactDialog) contactDialog.close();
  });
  feedbackDialog.addEventListener("click", (event) => {
    if (event.target === feedbackDialog) feedbackDialog.close();
  });
  dialog.addEventListener("close", resetPurchaseView);
  document.querySelector("#year").textContent = new Date().getFullYear();

  resetLogoField = createLogoField();
  updateHeroPurchaseVisibility = setupHeroPurchaseVisibility();
  applyConfig();
  setupDownloadAnalytics();
  setupProofCounters();
  renderLanguage();
  void initializeAuthLanding();
})();
