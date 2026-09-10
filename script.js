(() => {
  const examDate = new Date('2026-11-01T00:00:00-03:00');
  const now = new Date();
  const days = Math.max(0, Math.ceil((examDate - now) / 86400000));
  const countdown = document.querySelector('[data-exam-countdown]');

  if (countdown) {
    if (days > 1) countdown.textContent = `SES-TO • FALTAM ${days} DIAS PARA A PROVA`;
    else if (days === 1) countdown.textContent = 'SES-TO • A PROVA É AMANHÃ';
    else countdown.textContent = 'SES-TO • PROVA EM 01/11/2026';
  }

  // Insira os links definitivos quando os checkouts estiverem prontos.
  const CHECKOUTS = {
    basico: '',
    completo: ''
  };

  document.querySelectorAll('[data-checkout]').forEach((link) => {
    const plan = link.dataset.checkout;
    const url = CHECKOUTS[plan];
    if (url) link.href = url;
    else link.addEventListener('click', (event) => event.preventDefault());
  });
})();
