const button = document.querySelector('.theme-toggle');
button.setAttribute('aria-pressed', 'false');
button.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  button.setAttribute('aria-pressed', String(dark));
  button.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  button.textContent = dark ? '☀' : '◐';
});
