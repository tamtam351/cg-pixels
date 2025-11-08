// script.js — CGPIXELS Apple dark studio final
// Place alongside index.html and style.css (deferred in HTML)

/* DOM refs */
const siteNav = document.getElementById('siteNav');
const progress = document.getElementById('progress');
const heroBg = document.querySelector('.hero-bg');
const mobileBtn = document.getElementById('mobileBtn');
const mobileMenu = document.getElementById('mobileMenu');
const yearEl = document.getElementById('year');
yearEl && (yearEl.textContent = new Date().getFullYear());

/* Mobile toggle */
mobileBtn && mobileBtn.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'block';
  mobileMenu.style.display = open ? 'none' : 'block';
});

/* Scroll: nav solid + progress + parallax */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    siteNav.classList.add('solid');
    siteNav.classList.remove('transparent');
  } else {
    siteNav.classList.add('transparent');
    siteNav.classList.remove('solid');
  }

  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (y / docH) * 100 : 0;
  progress.style.width = Math.min(100, Math.max(0, pct)) + '%';

  // gentle parallax on hero background
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.16}px)`;
});

/* Init AOS */
AOS && AOS.init({ duration: 700, once: true, easing: 'cubic-bezier(.2,.9,.2,1)' });

/* GSAP typewriter (smooth) */
if (window.gsap) {
  const words = ['Photography', 'Cinematic Studio Shots', 'One Pixel at a Time', 'Timeless Images'];
  const target = document.getElementById('typewriter');

  // build a function that types a word into #typewriter smoothly
  function smoothType(words, el) {
    let tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9 });
    words.forEach((word) => {
      // create span nodes
      const chars = [...word].map(ch => {
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.opacity = '0';
        s.style.display = 'inline-block';
        s.style.transform = 'translateY(8px)';
        return s;
      });
      const container = document.createElement('span');
      container.className = 'tw';
      chars.forEach(c => container.appendChild(c));
      tl.add(() => { el.innerHTML = ''; el.appendChild(container); }, '>');
      tl.to(chars, { opacity: 1, y: 0, stagger: 0.04, duration: 0.36, ease: 'power2.out' });
      tl.to({}, { duration: 1.1 });
      tl.to(chars, { opacity: 0, y: -8, stagger: 0.02, duration: 0.26, ease: 'power2.in' });
    });
  }
  smoothType(words, target);

  // gentle entrance for hero CTAs
  gsap.from('.btn-accent', { scale: 0.96, opacity: 0, duration: 0.9, ease: 'back.out(1.1)', delay: 0.45 });
}

/* IntersectionObserver (JS fallback reveal) */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos], .tile, .glass-strong, .hero-inner').forEach(el => io.observe(el));

/* Tiny Lightbox for tiles */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.addEventListener('click', (ev) => {
  const tile = ev.target.closest('.tile');
  if (tile) {
    const src = tile.getAttribute('data-src');
    if (src) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.bod
