// =====================================================
//   JOSÉ PAULO — PORTFOLIO · main.js
// =====================================================

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// ── SCROLL REVEAL ──────────────────────────────────
const revealEls = document.querySelectorAll('.reveal-line, .reveal-fade, .reveal-up');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ── HEADER ACTIVE NAV ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const secObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = active ? 'var(--txt)' : '';
      });
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => secObs.observe(s));

// ── SMOOTH ANCHOR SCROLL ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── INFINITE CAROUSEL ─────────────────────────────
(function initCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  // Clone all cards for seamless loop
  const origCards = Array.from(track.children);
  origCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // Total width of ONE set
  function getTotalWidth() {
    const gap = 20;
    let w = 0;
    origCards.forEach(c => { w += c.offsetWidth + gap; });
    return w;
  }

  let offset   = 0;
  let rafId    = null;
  let paused   = false;
  const speed  = 0.55; // px per frame

  function tick() {
    if (!paused) {
      offset += speed;
      const total = getTotalWidth();
      if (offset >= total) offset -= total;
      track.style.transform = `translateX(-${offset}px)`;
    }
    rafId = requestAnimationFrame(tick);
  }

  // Pause on hover (pointer over any card)
  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });

  // Start
  tick();
})();

// ── HEADER BORDER ON SCROLL ───────────────────────
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.borderBottomColor = window.scrollY > 30
    ? 'rgba(108,99,255,0.15)'
    : 'rgba(255,255,255,0.07)';
}, { passive: true });
