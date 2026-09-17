const button = document.querySelector('.theme-toggle');
button.setAttribute('aria-pressed', 'false');
button.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  button.setAttribute('aria-pressed', String(dark));
  button.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  button.textContent = dark ? '☀' : '◐';
});

const modal = document.querySelector('.contact-modal');
const contactButtons = document.querySelectorAll('.contact-trigger');
const closeButtons = document.querySelectorAll('[data-close-contact]');

const closeContact = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
};

contactButtons.forEach((trigger) => trigger.addEventListener('click', () => {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('.modal-close').focus();
}));

closeButtons.forEach((trigger) => trigger.addEventListener('click', closeContact));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeContact();
});
