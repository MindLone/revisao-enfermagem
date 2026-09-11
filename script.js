(() => {
  const countdown = document.querySelector('[data-exam-countdown]');
  if (countdown) countdown.remove();

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
    target.innerHTML = `🔥 PROMOÇÃO <span style="display:inline-block;padding:2px 7px;margin:0 3px;border-radius:4px;background:#e30613;color:#ffe600;font-weight:900;box-shadow:0 0 0 1px rgba(255,230,0,.12) inset;">57% OFF</span> SOMENTE HOJE, ${formatted.toUpperCase()}`;
  }

  updateDate();

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.innerHTML = 'Pacote com <b>+200 mapas mentais</b>, <b>+500 questões</b>, <b>+50 simulados</b> e muito mais.';
  }

  document.querySelectorAll('.hero .cta-reference').forEach((heroCta) => {
    heroCta.href = '#ofertas';
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
          <h2 id="reviews-title">Mais de <span class="reviews-count-highlight">350</span> clientes satisfeitas!</h2>
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

  if (pricingSection) {
    pricingSection.innerHTML = `
      <div class="container">
        <div class="section-heading center pricing-heading-simple">
          <h2 id="pricing-title">Escolha o pacote ideal para sua preparação.</h2>
        </div>

        <div class="price-grid">
          <article class="price-card basic">
            <div class="plan-head">
              <p class="plan-kicker">OPÇÃO BÁSICA</p>
              <h3>Pacote Básico</h3>
              <p>Para quem quer começar com o essencial.</p>
            </div>

            <ul class="feature-list pricing-feature-list">
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>100 Mapas Mentais</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>250 Questões Gabaritadas</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>25 Simulados</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text">Acesso por período limitado</span></li>
            </ul>

            <div class="price-row"><div><span>Pagamento único</span><strong><small>R$</small> 19,90</strong></div></div>
            <a class="cta cta-secondary" href="#" data-checkout="basico">QUERO O PACOTE BÁSICO</a>
            <p class="access-note">Acesso digital • sem mensalidade</p>
          </article>

          <article class="price-card complete">
            <span class="value-badge">MELHOR ESCOLHA</span>
            <div class="plan-head">
              <p class="plan-kicker">EXPERIÊNCIA COMPLETA</p>
              <h3>Pacote Completo</h3>
              <p>Todo o material, bônus exclusivos e acesso vitalício.</p>
            </div>

            <ul class="feature-list pricing-feature-list pricing-feature-list--complete">
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>+200 Mapas Mentais</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>+500 Questões Gabaritadas</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>+50 Simulados</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>3 Bônus Exclusivos</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text"><strong>Acesso vitalício</strong></span></li>
              <li><span class="feature-check">✅</span><span class="feature-text">Suporte 24 horas</span></li>
              <li><span class="feature-check">✅</span><span class="feature-text">7 dias de garantia</span></li>
            </ul>

            <div class="price-row"><div><span>Pagamento único</span><strong><small>R$</small> 27,00</strong></div></div>
            <a class="cta cta-primary" href="#" data-checkout="completo">QUERO O PACOTE COMPLETO</a>
            <p class="access-note">Acesso vitalício • garantia de 7 dias</p>
          </article>
        </div>
      </div>`;

    if (!document.querySelector('#pricing-refresh-style')) {
      const pricingStyle = document.createElement('style');
      pricingStyle.id = 'pricing-refresh-style';
      pricingStyle.textContent = `
        #ofertas .pricing-heading-simple{max-width:650px;margin-bottom:28px}
        #ofertas .pricing-heading-simple h2{margin-inline:auto}
        #ofertas .price-card{padding:25px 20px}
        #ofertas .plan-head p:last-child{margin-top:8px;font-size:13.5px;line-height:1.55}
        #ofertas .pricing-feature-list{margin-top:20px;border-top:1px solid #e5ece8}
        #ofertas .pricing-feature-list li{position:relative;display:flex;align-items:flex-start;gap:10px;padding:12px 0;border-bottom:1px solid #edf2ef;color:#354a40;font-size:14px;line-height:1.45}
        #ofertas .pricing-feature-list li::before{display:none!important;content:none!important}
        #ofertas .feature-check{flex:0 0 auto;width:22px;font-size:17px;line-height:1.3}
        #ofertas .feature-text{min-width:0;display:block}
        #ofertas .feature-text strong{color:#223d32}
        #ofertas .complete .feature-text strong{color:#164c3d}
        #ofertas .price-row{padding:22px 0 16px}
        #ofertas .price-row>div{align-items:flex-end}
        #ofertas .price-row strong{white-space:nowrap}
        #ofertas .price-row strong small{font-size:16px;letter-spacing:0}
        #ofertas .complete{background:linear-gradient(180deg,#fff 0%,#fbfffd 100%)}
        #ofertas .complete .cta-primary{min-height:56px}
        #ofertas .basic .cta-secondary{min-height:54px}
        @media(max-width:719px){
          #ofertas .pricing-heading-simple{margin-bottom:22px}
          #ofertas .pricing-heading-simple h2{font-size:31px}
          #ofertas .price-card{padding:23px 18px}
          #ofertas .pricing-feature-list li{font-size:14.5px;padding:12px 0}
          #ofertas .feature-check{font-size:18px;width:23px}
          #ofertas .price-row strong{font-size:45px}
        }
      `;
      document.head.appendChild(pricingStyle);
    }
  }

  const faqList = document.querySelector('.faq-list');
  if (faqList) {
    faqList.innerHTML = `
      <details><summary>Qual é a diferença entre o Pacote Básico e o Completo?<span>+</span></summary><p>O Básico inclui 100 mapas mentais, 250 questões gabaritadas e 25 simulados, com acesso por período limitado. O Completo inclui +200 mapas mentais, +500 questões gabaritadas, +50 simulados, 3 bônus exclusivos, acesso vitalício, suporte 24h e garantia de 7 dias.</p></details>
      <details><summary>Por quanto tempo tenho acesso?<span>+</span></summary><p>O Pacote Básico possui acesso por período limitado. O Pacote Completo possui acesso vitalício ao material.</p></details>
      <details><summary>O pagamento é mensal?<span>+</span></summary><p>Não. Os dois pacotes são de pagamento único, sem mensalidade.</p></details>
      <details><summary>Tem garantia?<span>+</span></summary><p>Sim. O Pacote Completo possui garantia de 7 dias, conforme as condições exibidas no checkout.</p></details>`;
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