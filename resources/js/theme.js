const THEME_KEY = 'theme';

let isDarkMode = false;
let initialized = false;
const subscribers = new Set();

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    const legacy = localStorage.getItem('dark_mode');
    if (legacy === '1') return true;
    if (legacy === '0') return false;
  } catch (_) {
    /* ignore storage errors */
  }
  // Fallback: keep light mode by default
  return false;
}

function persistTheme(enabled) {
  try {
    const value = enabled ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, value);
    localStorage.setItem('dark_mode', enabled ? '1' : '0');
  } catch (_) {
    /* ignore storage errors */
  }
}

function notify() {
  subscribers.forEach((cb) => {
    try {
      cb(isDarkMode);
    } catch (_) {
      /* noop */
    }
  });
}

function applyTheme(enabled) {
  isDarkMode = !!enabled;
  const root = document.documentElement;
  const body = document.body;
  if (root) root.classList.toggle('dark-mode', isDarkMode);
  if (body) body.classList.toggle('dark-mode', isDarkMode);
  persistTheme(isDarkMode);
  notify();
}

export function initThemeProvider() {
  if (initialized) return isDarkMode;
  const initial = readStoredTheme();
  applyTheme(initial);
  initialized = true;
  return isDarkMode;
}

export function toggleTheme() {
  initThemeProvider();
  applyTheme(!isDarkMode);
  return isDarkMode;
}

export function subscribeTheme(listener) {
  if (typeof listener !== 'function') return () => {};
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function connectThemeToggle(selectors = ['#btn-darkmode', '#darkmode-btn-mobile']) {
  initThemeProvider();

  const attach = () => {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((btn) => {
        if (!btn.dataset.themeBound) {
          btn.addEventListener('click', toggleTheme);
          btn.dataset.themeBound = '1';
        }
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach, { once: true });
  } else {
    attach();
  }
}

export function getIsDarkMode() {
  return isDarkMode;
}
