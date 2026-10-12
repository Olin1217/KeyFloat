(() => {
  "use strict";

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let initialized = false;

  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  function revealGroup(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const items = Array.from(container.children).filter((item) => !item.hidden);
    if (!items.length) return;

    const distance = options.distance ?? 24;
    gsap.set(items, { autoAlpha: 0, y: distance });
    ScrollTrigger.create({
      trigger: container,
      start: options.start || "top 84%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: options.duration || 0.72,
          stagger: options.stagger || 0.07,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform"
        });
      }
    });
  }

  function setupPageReveals() {
    const headings = Array.from(document.querySelectorAll("main .section-heading"));
    headings.forEach((heading) => {
      gsap.set(heading, { autoAlpha: 0, y: 28 });
      ScrollTrigger.create({
        trigger: heading,
        start: "top 86%",
        once: true,
        onEnter: () => gsap.to(heading, {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform"
        })
      });
    });

    revealGroup(".proof-grid", { distance: 18, stagger: 0.06 });
    revealGroup(".feature-grid", { distance: 30, stagger: 0.08 });
    revealGroup(".coverage-grid", { distance: 26, stagger: 0.065 });
    revealGroup(".platform-grid", { distance: 28, stagger: 0.1 });

    const pricingParts = Array.from(document.querySelectorAll(".pricing-card > div"));
    if (pricingParts.length) {
      gsap.set(pricingParts, { autoAlpha: 0, y: 26 });
      ScrollTrigger.create({
        trigger: ".pricing-card",
        start: "top 82%",
        once: true,
        onEnter: () => gsap.to(pricingParts, {
          autoAlpha: 1,
          y: 0,
          duration: 0.76,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform"
        })
      });
    }

    [".contact-actions", ".faq-list", ".footer-grid"].forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) return;
      gsap.set(element, { autoAlpha: 0, y: 22 });
      ScrollTrigger.create({
        trigger: element,
        start: "top 90%",
        once: true,
        onEnter: () => gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform"
        })
      });
    });
  }

  function setupMagneticFeedback() {
    if (!finePointer.matches) return;
    const targets = document.querySelectorAll(".button-primary, .nav-links a, .nav-link-button");
    targets.forEach((target) => {
      const moveX = gsap.quickTo(target, "x", { duration: 0.32, ease: "power3.out" });
      const moveY = gsap.quickTo(target, "y", { duration: 0.32, ease: "power3.out" });

      target.addEventListener("pointermove", (event) => {
        if (reduceMotion.matches || target.disabled) return;
        const rect = target.getBoundingClientRect();
        moveX((event.clientX - rect.left - rect.width / 2) / 9);
        moveY((event.clientY - rect.top - rect.height / 2) / 9);
      });
      target.addEventListener("pointerleave", () => {
        moveX(0);
        moveY(0);
      });
    });
  }

  function setupStateTransitions() {
    document.querySelectorAll("dialog").forEach((dialog) => {
      const observer = new MutationObserver(() => {
        if (!dialog.open || reduceMotion.matches) return;
        gsap.fromTo(dialog,
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.36, ease: "power3.out", clearProps: "opacity,visibility,transform" }
        );
      });
      observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    });

    const authPage = document.querySelector("#auth-page");
    if (!authPage) return;
    const observer = new MutationObserver((records) => {
      if (reduceMotion.matches) return;
      records.forEach((record) => {
        const step = record.target;
        if (!(step instanceof HTMLElement) || step.hidden || !step.matches("[data-auth-step]")) return;
        gsap.fromTo(step,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out", clearProps: "opacity,visibility,transform" }
        );
      });
    });
    observer.observe(authPage, { subtree: true, attributes: true, attributeFilter: ["hidden"] });
  }

  function initializeMotion() {
    if (initialized) {
      ScrollTrigger.refresh();
      return;
    }
    initialized = true;
    document.documentElement.classList.add("motion-ready");
    setupStateTransitions();
    setupMagneticFeedback();

    if (reduceMotion.matches) return;

    const heroTitle = document.querySelector(".hero h1");
    const heroLede = document.querySelector(".hero-lede");
    const logoField = document.querySelector(".logo-field-wrap");
    const heroFooter = document.querySelector(".hero-footer");
    const introTargets = [heroTitle, heroLede, logoField, heroFooter].filter(Boolean);
    gsap.set(introTargets, { autoAlpha: 0, y: 24 });
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(heroTitle, { autoAlpha: 1, y: 0, duration: 0.82 })
      .to(heroLede, { autoAlpha: 1, y: 0, duration: 0.62 }, "-=0.5")
      .to(logoField, { autoAlpha: 1, y: 0, duration: 0.76 }, "-=0.36")
      .to(heroFooter, { autoAlpha: 1, y: 0, duration: 0.62 }, "-=0.42")
      .set(introTargets, { clearProps: "opacity,visibility,transform" });

    setupPageReveals();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  document.addEventListener("keyfloat:site-visible", initializeMotion);
  if (!document.querySelector("main")?.hidden) initializeMotion();
})();
