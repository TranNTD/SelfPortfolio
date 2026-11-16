// OPTIONAL CONTACT LINKS: Edit these values, then commit and push to GitHub.
// Leave a value empty to hide its button. Never put private passwords/API keys here.
const CONTACT = {
  email: "", // Example: "hello@yourdomain.com"
  linkedin: "https://www.linkedin.com/in/ngoc-thuy-dung-tran-353462213/" // Your public profile
};

// Use the visitor's preference as the default, but remember their choice.
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
let savedTheme;
try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (_) { savedTheme = null; }
const defaultTheme = "light"; // Minimal black-and-white design by default.
root.dataset.theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : defaultTheme;
themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("portfolio-theme", next); } catch (_) { /* storage unavailable */ }
});

// Mobile navigation
const menuButton = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? (root.lang === "de" ? "Menü schließen" : "Close menu") : (root.lang === "de" ? "Menü öffnen" : "Open menu"));
  mainNav.classList.toggle("is-open", open);
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", root.lang === "de" ? "Menü öffnen" : "Open menu");
}));

// Project filters
const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.getElementById("filter-status");
const updateFilterStatus = () => {
  const visible = cards.filter(card => !card.hidden).length;
  filterStatus.textContent = root.lang === "de"
    ? `${visible} ${visible === 1 ? "Projekt" : "Projekte"} angezeigt`
    : `${visible} project${visible === 1 ? "" : "s"} displayed`;
};
filters.forEach(filter => filter.addEventListener("click", () => {
  const choice = filter.dataset.filter;
  filters.forEach(item => {
    const selected = item === filter;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  cards.forEach(card => {
    card.hidden = choice !== "all" && card.dataset.category !== choice;
  });
  updateFilterStatus();
}));

// Contact: hidden unless configured
const email = CONTACT.email.trim();
if (email && email.includes("@")) {
  const link = document.getElementById("email-link");
  link.href = `mailto:${email}`;
  link.hidden = false;
}
const linkedin = CONTACT.linkedin.trim();
if (/^https:\/\/([a-z]{2,3}\.)?linkedin\.com\//i.test(linkedin)) {
  const link = document.getElementById("linkedin-link");
  link.href = linkedin;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.hidden = false;
}
document.getElementById("year").textContent = new Date().getFullYear();

// Bilingual English / German portfolio. HTML is the English source of truth.
// German text lives in translations.js, which loads before this file.
const languageButtons = [...document.querySelectorAll(".language-option")];
const translatableElements = [...document.querySelectorAll("[data-i18n]")];
const englishMarkup = new Map(translatableElements.map(el => [el, el.innerHTML]));
const translations = typeof PORTFOLIO_DE === "object" ? PORTFOLIO_DE : {};

const pageMetadata = {
  en: {
    title: "Dung Tran | Data Scientist & ML Enthusiast",
    description: "Portfolio of Dung Tran — Data Scientist working across machine learning, statistical modeling, and data engineering.",
    ogTitle: "Dung Tran — Data Science & Machine Learning",
    ogDescription: "Projects, experience, and ideas in data science, machine learning, and data engineering.",
    languageGroup: "Select language",
    navigation: "Primary navigation",
    projectFilters: "Filter projects",
    home: "Dung Tran home",
    theme: "Switch color theme",
    visual: "Illustrative data science workspace",
    learningCurve: "An upward trending illustrative learning curve",
    openMenu: "Open menu",
    closeMenu: "Close menu"
  },
  de: {
    title: "Dung Tran | Data Scientist & Machine Learning",
    description: "Portfolio von Dung Tran — Data Scientist mit Schwerpunkten in Machine Learning, statistischer Modellierung und Data Engineering.",
    ogTitle: "Dung Tran — Data Science & Machine Learning",
    ogDescription: "Projekte, Erfahrungen und Ideen zu Data Science, Machine Learning und Data Engineering.",
    languageGroup: "Sprache auswählen",
    navigation: "Hauptnavigation",
    projectFilters: "Projekte filtern",
    home: "Dung Tran Startseite",
    theme: "Farbschema wechseln",
    visual: "Illustrativer Data-Science-Arbeitsbereich",
    learningCurve: "Illustrative Lernkurve mit steigender Tendenz",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen"
  }
};

function setLanguage(language) {
  const lang = language === "de" ? "de" : "en";
  const meta = pageMetadata[lang];
  translatableElements.forEach(el => {
    const key = el.dataset.i18n;
    // Only trusted, bundled static translations are inserted as HTML.
    el.innerHTML = lang === "de" && Object.hasOwn(translations, key)
      ? translations[key]
      : englishMarkup.get(el);
  });
  root.lang = lang;
  document.title = meta.title;
  document.querySelector('meta[name="description"]').content = meta.description;
  document.querySelector('meta[property="og:title"]').content = meta.ogTitle;
  document.querySelector('meta[property="og:description"]').content = meta.ogDescription;
  document.querySelector(".language-switch").setAttribute("aria-label", meta.languageGroup);
  document.getElementById("main-nav").setAttribute("aria-label", meta.navigation);
  document.querySelector(".project-filters").setAttribute("aria-label", meta.projectFilters);
  document.querySelector(".site-header .brand").setAttribute("aria-label", meta.home);
  themeToggle.setAttribute("aria-label", meta.theme);
  themeToggle.setAttribute("title", meta.theme);
  document.querySelector(".hero-visual").setAttribute("aria-label", meta.visual);
  document.querySelector(".mini-chart svg").setAttribute("aria-label", meta.learningCurve);
  menuButton.setAttribute("aria-label", menuButton.getAttribute("aria-expanded") === "true" ? meta.closeMenu : meta.openMenu);
  languageButtons.forEach(button => {
    const selected = button.dataset.lang === lang;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  updateFilterStatus();
  try { localStorage.setItem("portfolio-language", lang); } catch (_) { /* storage unavailable */ }
}

languageButtons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
let savedLanguage;
try { savedLanguage = localStorage.getItem("portfolio-language"); } catch (_) { savedLanguage = null; }
setLanguage(savedLanguage === "de" ? "de" : "en");
