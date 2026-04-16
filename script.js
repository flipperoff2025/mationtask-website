/**
 * MationTask.com â Main Script
 * Vanilla JS | Modern ES6+
 */
'use strict';

// ============================================================
// 1. SMOOTH SCROLL â Anchor links
// ============================================================
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      // Close mobile nav if open
      const nav = document.querySelector('.navbar');
      if (nav && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
      }

      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
};

// ============================================================
// 2. NAVBAR â Transparent to solid on scroll
// ============================================================
const initNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const THRESHOLD = 50;

  const update = () => {
    if (window.scrollY > THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
};

// ============================================================
// 3. MOBILE HAMBURGER MENU
// ============================================================
const initHamburger = () => {
  const btn = document.getElementById('hamburger');
  const nav = document.querySelector('.navbar');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
  });
};

// ============================================================
// 4. SCROLL REVEAL â IntersectionObserver
// ============================================================
const initScrollReveal = () => {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
};

// ============================================================
// 5. CONSULTATION FORM
// ============================================================
const initForm = () => {
  const form = document.getElementById('consultationForm');
  const success = document.getElementById('consultationSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.style.display = 'block';
    document.querySelector('.consultation__note').style.display = 'none';
  });
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initNavbarScroll();
  initHamburger();
  initScrollReveal();
  initForm();
});
