/* ============================================================
   DANIEL IMMOBILIEN – main.js
   Runs AFTER components.js + initComponents() have already
   injected nav + footer HTML into the DOM.
   ============================================================ */
(function () {
  'use strict';

  /* Tell CSS JS is running — activates fade-up animations */
  document.body.classList.add('js-ready');

  /* ── 1. HAMBURGER MENU ── */
  const burger    = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 2. STICKY NAV SHADOW ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 3. ACTIVE NAV LINK ── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === currentFile) link.classList.add('active');
  });

  /* ── 4. FADE-UP ON SCROLL ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── 5. CONTACT FORM (Formspree AJAX) ── */
  const form = document.getElementById('contact-form');
  if (form) {
    const btn        = form.querySelector('[type="submit"]');
    const successBox = document.getElementById('form-success');
    const errorBox   = document.getElementById('form-error');
    const origHTML   = btn ? btn.innerHTML : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

/* ── VALIDATION ── */
      let hasError = false;

      form.querySelectorAll('[required]').forEach(field => {
        const isCheckbox = field.type === 'checkbox';
        const isSelect   = field.tagName === 'SELECT';
        const isEmpty    = isCheckbox ? !field.checked : !field.value.trim();
        const errorEl    = field.id === 'datenschutz'
          ? document.getElementById('datenschutz-error')
          : isSelect
            ? document.getElementById('betreff-error')
            : field.closest('.form-group') && field.closest('.form-group').querySelector('.field-error');

        if (isEmpty) {
          if (errorEl)  errorEl.style.setProperty('display', 'block', 'important');
          if (isSelect) field.style.borderColor = '#e53e3e';
          hasError = true;
        } else {
          if (errorEl)  errorEl.style.setProperty('display', 'none', 'important');
          if (isSelect) field.style.borderColor = '';
        }
      });

      if (hasError) return; /* Stop submission if any field is invalid */
      /* ── END VALIDATION ── */

      if (!btn) return;
      btn.disabled = true;
      btn.innerHTML = 'Wird gesendet…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          form.reset();
          if (successBox) successBox.style.display = 'block';
          if (errorBox)   errorBox.style.display   = 'none';
          btn.innerHTML = '✓ Nachricht gesendet';
          btn.style.background  = '#059669';
          btn.style.borderColor = '#059669';
          /* Redirect to thank you page after 1 second */
          setTimeout(() => {
            window.location.href = window.location.origin + '/pages/thankyou.html';
          }, 1000);
        } else throw new Error();

      } catch {
        if (errorBox)   errorBox.style.display  = 'block';
        if (successBox) successBox.style.display = 'none';
        btn.disabled  = false;
        btn.innerHTML = origHTML;
      }
    });
  }

  /* ── 6. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: 'smooth' });
    });
  });

})();