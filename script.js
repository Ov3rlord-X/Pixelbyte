// ── Detect touch / no-hover devices (skip custom cursor entirely)
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
 
const cursor = document.getElementById('cursor');
 
if (isTouch) {
  if (cursor) cursor.style.display = 'none';
  document.documentElement.style.cursor = 'auto';
  document.body.style.cursor = 'auto';
} else if (cursor) {
  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
 
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });
 
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}
 
// ── Scroll progress
const bar = document.getElementById('scrollBar');
if (bar) {
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = 'scaleX(' + p + ')';
  });
}
 
// ── Reveal on scroll (single shared observer)
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObserver.observe(r));
} else {
  reveals.forEach(r => r.classList.add('visible'));
}
 
// ── Theme toggle (with persistence)
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');
 
const savedTheme = localStorage.getItem('pixelbyte-theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  html.setAttribute('data-theme', 'light');
}
 
if (toggle) {
  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pixelbyte-theme', next);
  });
}
 
// ── Mobile menu
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
 
let menuOverlay = document.querySelector('.mobile-menu-overlay');
if (!menuOverlay && mobileMenu) {
  menuOverlay = document.createElement('div');
  menuOverlay.className = 'mobile-menu-overlay';
  document.body.appendChild(menuOverlay);
}
 
function openMenu() {
  mobileMenu.classList.add('open');
  navBurger.classList.add('open');
  if (menuOverlay) menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  navBurger.classList.remove('open');
  if (menuOverlay) menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
 
if (navBurger && mobileMenu) {
  navBurger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', closeMenu)
  );
}
 
