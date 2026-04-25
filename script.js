// Hero image slideshow — all 4 images, crossfade every 30s
const heroImgs = document.querySelectorAll('.hero__img');
if (heroImgs.length) {
  let current = 0;
  heroImgs[0].style.opacity = '1';
  setInterval(() => {
    heroImgs[current].style.opacity = '0';
    current = (current + 1) % heroImgs.length;
    heroImgs[current].style.opacity = '1';
  }, 30000);
}

// Sticky nav shadow + back to top
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  backToTop.classList.toggle('visible', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Stat counter animation
const statEls = document.querySelectorAll('.stat__number');
statEls.forEach(el => {
  const suffix = el.querySelector('span');
  el.dataset.suffix = suffix ? suffix.textContent : '';
  el.dataset.target = parseInt(el.textContent.match(/\d+/)[0]);
});

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.innerHTML = Math.round(eased * target) + '<span>' + suffix + '</span>';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

statEls.forEach(el => counterObserver.observe(el));

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
