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

  const pricingSection = document.querySelector('#ofertas');
  if (pricingSection && !document.querySelector('#bonus-exclusivos')) {
    const bonusSection = document.createElement('section');
    bonusSection.className = 'section bonuses';
    bonusSection.id = 'bonus-exclusivos';
    bonusSection.setAttribute('aria-labelledby', 'bonus-title');
    bonusSection.innerHTML = `
      <div class="container">
        <div class="bonus-heading">
          <h2 id="bonus-title">Bônus Exclusivos 🎁</h2>
        </div>

        <div class="bonus-strip" aria-label="Bônus exclusivos do pacote completo">
          <article class="bonus-card">
            <div class="bonus-visual" data-bonus-image="cronograma" aria-label="Espaço reservado para a imagem do Cronograma de Estudos"></div>
            <div class="bonus-copy">
              <h3>Cronograma de Estudos</h3>
              <p>Organize estudos até a prova.</p>
            </div>
          </article>

          <article class="bonus-card">
            <div class="bonus-visual" data-bonus-image="mnemonicos" aria-label="Espaço reservado para a imagem do Mural de Mnemônicos"></div>
            <div class="bonus-copy">
              <h3>Mural de Mnemônicos</h3>
              <p>Memorize conteúdos difíceis com atalhos.</p>
            </div>
          </article>

          <article class="bonus-card">
            <div class="bonus-visual" data-bonus-image="caderno-erros" aria-label="Espaço reservado para a imagem do Caderno de Erros"></div>
            <div class="bonus-copy">
              <h3>Caderno de Erros</h3>
              <p>Revise falhas antes de repeti-las.</p>
            </div>
          </article>
        </div>
      </div>`;

    pricingSection.before(bonusSection);
  }

  if (pricingSection && !document.querySelector('#avaliacoes')) {
    const reviewsSection = document.createElement('section');
    reviewsSection.className = 'section reviews-band';
    reviewsSection.id = 'avaliacoes';
    reviewsSection.setAttribute('aria-labelledby', 'reviews-title');
    reviewsSection.innerHTML = `
      <div class="container reviews-container">
        <div class="reviews-heading">
          <p>AVALIAÇÕES DOS CLIENTES</p>
          <h2 id="reviews-title">Veja avaliações de alguns dos nossos clientes:</h2>
        </div>

        <div class="reviews-shell" data-reviews-carousel role="region" aria-roledescription="carrossel" aria-label="Avaliações dos clientes">
          <button class="reviews-arrow reviews-arrow--prev" type="button" aria-label="Ver avaliações anteriores" data-reviews-prev>‹</button>

          <div class="reviews-viewport" data-reviews-viewport tabindex="0" aria-label="Arraste para os lados para ver mais avaliações">
            <div class="reviews-track">
              ${Array.from({ length: 6 }, (_, index) => `
                <article class="review-shot" data-review-image="${index + 1}" aria-label="Espaço reservado para a avaliação ${index + 1}">
                  <div class="review-placeholder" aria-hidden="true">
                    <span>AVALIAÇÃO ${String(index + 1).padStart(2, '0')}</span>
                    <strong>Imagem da avaliação</strong>
                  </div>
                </article>`).join('')}
            </div>
          </div>

          <button class="reviews-arrow reviews-arrow--next" type="button" aria-label="Ver próximas avaliações" data-reviews-next>›</button>
        </div>

        <p class="reviews-swipe-hint">← Arraste para ver mais →</p>
      </div>`;

    pricingSection.before(reviewsSection);

    const viewport = reviewsSection.querySelector('[data-reviews-viewport]');
    const prevButton = reviewsSection.querySelector('[data-reviews-prev]');
    const nextButton = reviewsSection.querySelector('[data-reviews-next]');
    const firstCard = reviewsSection.querySelector('.review-shot');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let autoTimer = null;

    const stepSize = () => {
      if (!firstCard) return Math.max(260, viewport.clientWidth * 0.8);
      const styles = getComputedStyle(reviewsSection.querySelector('.reviews-track'));
      const gap = parseFloat(styles.columnGap || styles.gap || '14') || 14;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const scrollReviews = (direction) => {
      const nearEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
      const nearStart = viewport.scrollLeft <= 8;

      if (direction > 0 && nearEnd) {
        viewport.scrollTo({ left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        return;
      }

      if (direction < 0 && nearStart) {
        viewport.scrollTo({ left: viewport.scrollWidth, behavior: reducedMotion ? 'auto' : 'smooth' });
        return;
      }

      viewport.scrollBy({ left: stepSize() * direction, behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    prevButton.addEventListener('click', () => scrollReviews(-1));
    nextButton.addEventListener('click', () => scrollReviews(1));

    const stopAuto = () => {
      if (autoTimer) window.clearInterval(autoTimer);
      autoTimer = null;
    };

    const startAuto = () => {
      if (reducedMotion || autoTimer) return;
      autoTimer = window.setInterval(() => scrollReviews(1), 5000);
    };

    ['pointerdown', 'touchstart', 'focusin', 'mouseenter'].forEach((eventName) => {
      reviewsSection.addEventListener(eventName, stopAuto, { passive: true });
    });
    reviewsSection.addEventListener('mouseleave', startAuto);
    reviewsSection.addEventListener('focusout', startAuto);

    startAuto();
  }

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
