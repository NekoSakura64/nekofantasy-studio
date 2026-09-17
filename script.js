const button = document.querySelector('.theme-toggle');
const themePreferenceKey = 'nekofantasy-theme-preference';

const isNightTime = () => {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 18;
};

const setTheme = (dark) => {
  document.body.classList.toggle('dark', dark);
  button.setAttribute('aria-pressed', String(dark));
  button.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  button.textContent = dark ? '☀' : '◐';
};

const savedTheme = localStorage.getItem(themePreferenceKey);
setTheme(savedTheme === null ? isNightTime() : savedTheme === 'dark');

button.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  setTheme(dark);
  localStorage.setItem(themePreferenceKey, dark ? 'dark' : 'light');
});

// 没有手动选择时，每分钟根据本地时间检查一次晨昏切换。
setInterval(() => {
  if (localStorage.getItem(themePreferenceKey) === null) setTheme(isNightTime());
}, 60 * 1000);

const modal = document.querySelector('.contact-modal');
const contactButtons = document.querySelectorAll('.contact-trigger');
const closeButtons = document.querySelectorAll('[data-close-contact]');

if (modal) {
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
}

document.querySelectorAll('.copy-wechat').forEach((copyButton) => {
  copyButton.addEventListener('click', async () => {
    const value = copyButton.dataset.wechat;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement('textarea');
      input.value = value;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    copyButton.textContent = '已复制';
    copyButton.classList.add('is-copied');
    window.setTimeout(() => {
      copyButton.textContent = '复制';
      copyButton.classList.remove('is-copied');
    }, 1800);
  });
});
