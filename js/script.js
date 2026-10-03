(function () {
  "use strict";

  // Mobile menu toggle
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("mainNav");

  hamburger.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Language switch
  var langButtons = document.querySelectorAll(".lang-btn");
  var htmlEl = document.documentElement;

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.pt;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    langButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    htmlEl.setAttribute("lang", lang === "en" ? "en" : "pt-BR");

    try {
      localStorage.setItem("maranuts-lang", lang);
    } catch (e) {
      /* ignore storage errors (private mode, etc.) */
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.getAttribute("data-lang"));
    });
  });

  var savedLang = "pt";
  try {
    savedLang = localStorage.getItem("maranuts-lang") || "pt";
  } catch (e) {
    /* ignore */
  }
  applyLanguage(savedLang);

  // Header shadow on scroll
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
