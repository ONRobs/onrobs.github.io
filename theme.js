const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

const getStoredTheme = () => localStorage.getItem('theme');
const getPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = theme => {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (themeToggle) {
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  } else {
    root.setAttribute('data-theme', 'light');
    if (themeToggle) {
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
};

const currentTheme = getStoredTheme() || getPreferredTheme();
applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  });
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    const expanded = siteNav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
    navToggle.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu');
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => siteNav.classList.remove('open'));
  });
}
