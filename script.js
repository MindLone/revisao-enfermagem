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

  const promoBar = document.querySelector('.promo-bar');
  if (promoBar) {
    promoBar.innerHTML = '<p id="promo-date">CONDIÇÃO ESPECIAL DISPONÍVEL HOJE — PAGAMENTO ÚNICO</p>';
  }

  function updateDate() {
    const target = document.querySelector('#promo-date');
    if (!target) return;
    const formatted = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    }).format(new Date());
    target.innerHTML = `🔥 PROMOÇÃO DE <span style="display:inline-block;padding:2px 7px;margin:0 3px;border-radius:4px;background:#e30613;color:#ffe600;font-weight:900;box-shadow:0 0 0 1px rgba(255,230,0,.12) inset;">57% DE DESCONTO</span> SOMENTE HOJE, ${formatted.toUpperCase()}`;
  }

  updateDate();

  document.querySelectorAll('.hero .cta-reference').forEach((heroCta) => {
    heroCta.innerHTML = `
      <svg class="cta-zap" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>
      <span class="cta-label">SIM! QUERO VER OS PACOTES</span>`;
  });

  const footerLinks = document.querySelector('.footer-links');
  if (footerLinks && !footerLinks.querySelector('a[href="mailto:bibliotecasaudebs@gmail.com"]')) {
    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:bibliotecasaudebs@gmail.com';
    emailLink.textContent = 'bibliotecasaudebs@gmail.com';
    footerLinks.appendChild(emailLink);
  }

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
