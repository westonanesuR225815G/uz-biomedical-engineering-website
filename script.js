// Smooth scroll and active section highlighting, accordion, form validation, reveal animations, and mobile nav

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Active nav link on scroll
const sections = Array.from(document.querySelectorAll('section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.nav-link'));
const activate = (id) => {
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
};
const onScroll = () => {
  const pos = window.scrollY + 140; // offset for sticky header
  let current = sections[0]?.id;
  sections.forEach(sec => {
    if (pos >= sec.offsetTop) current = sec.id;
  });
  if (current) activate(current);
};
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// Programme toggles
const programmeToggles = document.querySelectorAll('.programme-toggle');
programmeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const details = toggle.parentElement.querySelector('.programme-details');
    
    // Toggle this one
    toggle.setAttribute('aria-expanded', String(!expanded));
    details?.classList.toggle('open', !expanded);
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback
  revealEls.forEach(el => el.classList.add('visible'));
}

// Form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    let valid = true;

    // Name
    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // Email
    const emailVal = email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailOk) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Message
    if (message.value.trim().length < 10) {
      messageError.textContent = 'Please provide a message (min 10 characters).';
      valid = false;
    } else {
      messageError.textContent = '';
    }

    if (valid) {
      alert('Thank you for contacting us! Your message has been received.');
      form.reset();
    }
  });
}
