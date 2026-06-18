// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Header scroll state =====
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navbar = document.querySelector('.navbar');
navToggle.addEventListener('click', () => {
  navbar.classList.toggle('menu-open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

// ===== Cursor glow (desktop only) =====
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

// ===== Fade-in on scroll =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// ===== Timeline dots light up on scroll =====
const timelineDots = document.querySelectorAll('.timeline-dot');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('lit');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
timelineDots.forEach(dot => timelineObserver.observe(dot));

// ===== Idea form submission (Formspree) =====
const ideaForm = document.getElementById('ideaForm');
const formConfirmation = document.getElementById('formConfirmation');
const formError = document.getElementById('formError');

ideaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.classList.remove('show');

  try {
    const response = await fetch(ideaForm.action, {
      method: 'POST',
      body: new FormData(ideaForm),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Formspree request failed');

    ideaForm.reset();
    ideaForm.style.display = 'none';
    formConfirmation.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => formConfirmation.classList.add('show'));
    });
  } catch (err) {
    formError.classList.add('show');
    setTimeout(() => formError.classList.remove('show'), 5000);
  }
});

// Hero background is now a Three.js scene — see js/hero3d.js
