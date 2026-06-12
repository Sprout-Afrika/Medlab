// ===== HERO SLIDER =====
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-indicators span');
  const prev   = document.querySelector('.hero-arrow.prev');
  const next   = document.querySelector('.hero-arrow.next');
  let current  = 0;
  let timer;

  if (!slides.length) return;

  function showSlide(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5500);
  }

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { showSlide(i); startTimer(); });
  });

  // Arrow clicks
  if (prev) prev.addEventListener('click', () => { showSlide(current - 1); startTimer(); });
  if (next) next.addEventListener('click', () => { showSlide(current + 1); startTimer(); });

  // Swipe support (touch)
  let touchStartX = 0;
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    heroEl.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { showSlide(diff > 0 ? current + 1 : current - 1); startTimer(); }
    }, { passive: true });
  }

  showSlide(0);
  startTimer();
})();

// ===== MOBILE NAV =====
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    const open = mobileNav.style.display === 'flex';
    mobileNav.style.display = open ? 'none' : 'flex';
  });
})();

// ===== ANIMATED STAT COUNTER =====
(function () {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  function animateCount(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const step     = target / (duration / 16);
    let val = 0;
    const t = setInterval(() => {
      val += step;
      if (val >= target) { val = target; clearInterval(t); }
      el.textContent = Math.floor(val).toLocaleString() + suffix;
    }, 16);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(s => observer.observe(s));
})();
