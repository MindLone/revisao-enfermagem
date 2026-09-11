(() => {
  const promoBar = document.querySelector('.promo-bar');
  if (promoBar) {
    promoBar.innerHTML = '<span class="promo-dot" aria-hidden="true"></span><p>PAGAMENTO ÚNICO <span aria-hidden="true">•</span> SEM MENSALIDADE <span aria-hidden="true">•</span> GARANTIA DE 7 DIAS</p>';
  }

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

  const deliverables = document.querySelector('[data-deliverables]');
  if (deliverables) {
    const cards = [...deliverables.querySelectorAll('.deliverable-card')];

    cards.forEach((card) => {
      card.addEventListener('toggle', () => {
        if (!card.open) return;
        cards.forEach((otherCard) => {
          if (otherCard !== card) otherCard.open = false;
        });
      });
    });
  }

  const bonusCards = document.querySelectorAll('.bonus-card');
  if (bonusCards.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bonusCards.forEach((card) => card.classList.add('bonus-card--reveal'));
    const revealBonus = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    bonusCards.forEach((card) => revealBonus.observe(card));
  }
})();
