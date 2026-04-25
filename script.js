// Sticky nav shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form tab switching
function switchTab(type, btn) {
  document.querySelectorAll('.contact__tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('formType').value = type;

  const companyField = document.getElementById('companyField');
  const serviceField = document.getElementById('serviceField');
  const roleField    = document.getElementById('roleField');
  const msgLabel     = document.getElementById('messageLabel');
  const msgArea      = document.getElementById('message');

  if (type === 'candidate') {
    companyField.style.display = 'none';
    serviceField.style.display = 'none';
    roleField.style.display    = 'flex';
    msgLabel.textContent       = 'Tell Us About Your Career Goals *';
    msgArea.placeholder        = 'Describe your experience, what you\'re looking for, and your ideal timeline...';
    document.getElementById('company').required = false;
  } else {
    companyField.style.display = 'flex';
    serviceField.style.display = 'flex';
    roleField.style.display    = 'none';
    msgLabel.textContent       = 'Tell Us About Your Hiring Need *';
    msgArea.placeholder        = 'Describe the role(s), timeline, and any specifics...';
    document.getElementById('company').required = true;
  }
}

// Form submission — wire up to Formspree or Netlify Forms when deploying
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.querySelectorAll('input, select, textarea, button[type="submit"]')
      .forEach(el => el.disabled = true);
  success.style.display = 'block';
  success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
