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
const defaultTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
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
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mainNav.classList.toggle("is-open", open);
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}));

// Project filters
const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.getElementById("filter-status");
filters.forEach(filter => filter.addEventListener("click", () => {
  const choice = filter.dataset.filter;
  filters.forEach(item => {
    const selected = item === filter;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  const visible = cards.filter(card => {
    const match = choice === "all" || card.dataset.category === choice;
    card.hidden = !match;
    return match;
  }).length;
  filterStatus.textContent = `${visible} project${visible === 1 ? "" : "s"} displayed`;
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
