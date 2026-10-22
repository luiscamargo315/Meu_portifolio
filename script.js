/* ========================================
   PORTFOLIO — Luis Camargo
   JavaScript: interações, animações, validação
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme toggle ---
  const toggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }

  try {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  } catch (_) {}

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(next);
  });

  // --- Mobile menu ---
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // --- Scroll reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // --- Contact form validation ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { el: form.querySelector('#name'), rule: v => v.trim().length >= 2, msg: 'Insira seu nome completo.' },
        { el: form.querySelector('#email'), rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Insira um e-mail válido.' },
        { el: form.querySelector('#message'), rule: v => v.trim().length >= 10, msg: 'A mensagem deve ter pelo menos 10 caracteres.' }
      ];

      fields.forEach(({ el, rule, msg }) => {
        const group = el.closest('.form-group');
        const errorEl = group.querySelector('.error-msg');
        if (!rule(el.value)) {
          valid = false;
          group.classList.add('error');
          if (errorEl) errorEl.textContent = msg;
        } else {
          group.classList.remove('error');
        }
      });

      if (valid) {
        const success = form.querySelector('.form-success');
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 4000);
      }
    });

    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
      });
    });
  }

  // --- Typed effect for hero subtitle ---
  const typed = document.querySelector('.typed-text');
  if (typed) {
    const text = typed.getAttribute('data-text');
    typed.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        typed.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 35);
      }
    }
    setTimeout(typeChar, 600);
  }

});
