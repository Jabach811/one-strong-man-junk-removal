// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Quote form: validate, then hand off to the visitor's email app
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  const status = document.getElementById('formStatus');
  const fields = {
    name: document.getElementById('qName'),
    phone: document.getElementById('qPhone'),
    city: document.getElementById('qCity'),
    details: document.getElementById('qWhat'),
  };

  const clearInvalid = (input) => {
    input.addEventListener('input', () => input.closest('.field').classList.remove('invalid'));
  };
  [fields.name, fields.phone, fields.details].forEach(clearInvalid);

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    [fields.name, fields.phone, fields.details].forEach((input) => {
      const empty = !input.value.trim();
      input.closest('.field').classList.toggle('invalid', empty);
      if (empty) ok = false;
    });
    if (!ok) {
      status.textContent = 'Fill in the highlighted fields and try again.';
      return;
    }

    const body =
      'New quote request from the website\n\n' +
      'Name: ' + fields.name.value.trim() + '\n' +
      'Phone: ' + fields.phone.value.trim() + '\n' +
      'City: ' + (fields.city.value.trim() || 'Not given') + '\n\n' +
      'What needs to go:\n' + fields.details.value.trim();

    window.location.href =
      'mailto:onestrongman@pm.me?subject=' +
      encodeURIComponent('Quote request — ' + fields.name.value.trim()) +
      '&body=' + encodeURIComponent(body);

    status.textContent = "Your email app should open with everything filled in — just hit send. If it didn't open, text 209-650-3977 instead.";
  });
}
