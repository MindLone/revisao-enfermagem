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
    target.innerHTML = `🔥 PROMOÇÃO <span style="display:inline-block;padding:2px 7px;margin:0 3px;border-radius:4px;background:#e30613;color:#ffe600;font-weight:900;box-shadow:0 0 0 1px rgba(255,230,0,.12) inset;">83% OFF</span> SOMENTE HOJE, ${formatted.toUpperCase()}`;
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
    const checkIcon = '<span class="feature-check" aria-hidden="true">✔</span>';

    pricingSection.innerHTML = `
      <div class="container">
        <div class="section-heading center pricing-heading-simple">
          <h2 id="pricing-title">Tenha acesso a <span class="pricing-title-gradient">Tudo</span></h2>
          <p>Garanta todo o material por apenas <strong>R$ 7,10 a mais!</strong></p>
        </div>

        <div class="price-grid">
          <article class="price-card basic">
            <div class="plan-head">
              <p class="plan-kicker">OPÇÃO BÁSICA</p>
              <h3>PACOTE BÁSICO</h3>
              <p>Para quem quer começar com o essencial.</p>
            </div>

            <ul class="feature-list pricing-feature-list">
              <li>${checkIcon}<span class="feature-text"><strong>100 Mapas Mentais</strong></span></li>
              <li>${checkIcon}<span class="feature-text"><strong>250 Questões Gabaritadas</strong></span></li>
              <li>${checkIcon}<span class="feature-text"><strong>25 Simulados</strong></span></li>
              <li>${checkIcon}<span class="feature-text">Acesso por período limitado</span></li>
            </ul>

            <div class="price-row"><div><strong><small>R$</small> 19,90</strong></div></div>
            <a class="cta cta-secondary" href="#" data-checkout="basico">QUERO O PACOTE BÁSICO</a>
            <p class="access-note">Acesso enviado por e-mail</p>
          </article>

          <article class="price-card complete">
            <span class="value-badge">MELHOR OPÇÃO</span>
            <div class="complete-discount-badge">83% DE PROMOÇÃO SOMENTE HOJE!</div>
            <div class="plan-head">
              <p class="plan-kicker">EXPERIÊNCIA COMPLETA</p>
              <h3>PACOTE COMPLETO</h3>
              <p>Mais conteúdo, bônus exclusivos e acesso vitalício.</p>
            </div>

            <ul class="feature-list pricing-feature-list pricing-feature-list--complete">
              <li>${checkIcon}<span class="feature-text"><strong>+200 Mapas Mentais</strong></span></li>
              <li>${checkIcon}<span class="feature-text"><strong>+500 Questões Gabaritadas</strong></span></li>
              <li>${checkIcon}<span class="feature-text"><strong>+50 Simulados</strong></span></li>
              <li>${checkIcon}<span class="feature-text">Acesso vitalício</span></li>
              <li>${checkIcon}<span class="feature-text">Suporte 24 horas</span></li>
              <li>${checkIcon}<span class="feature-text">7 dias de garantia</span></li>
              <li class="bonus-divider"><span class="bonus-plus" aria-hidden="true">+</span><span class="feature-text">3 MEGA BÔNUS</span></li>
              <li class="bonus-item-name">${checkIcon}<span class="feature-text">Cronograma de Estudos</span></li>
              <li class="bonus-item-name">${checkIcon}<span class="feature-text">Mural de Mnemônicos</span></li>
              <li class="bonus-item-name">${checkIcon}<span class="feature-text">Caderno de Erros</span></li>
            </ul>

            <div class="complete-offer-price">
              <div class="complete-old-price">De <span>R$ 158,82</span></div>
              <div class="complete-now-row">
                <span class="complete-now-label">Hoje por apenas</span>
                <strong class="complete-now-price"><small>R$</small> 27,00</strong>
              </div>
              <div class="complete-installment">ou <strong>12x de R$ 2,25</strong> no cartão</div>
            </div>

            <a class="cta cta-primary" href="#" data-checkout="completo">SIM! QUERO O PACOTE COMPLETO!</a>
            <p class="access-note">Acesso enviado por e-mail</p>
          </article>
        </div>
      </div>`;

    if (!document.querySelector('#pricing-refresh-style')) {
      const pricingStyle = document.createElement('style');
      pricingStyle.id = 'pricing-refresh-style';
      pricingStyle.textContent = `
        @keyframes pricing-title-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pricing-cta-shine{0%,58%{transform:translateX(-155%) skewX(-18deg)}82%,100%{transform:translateX(430%) skewX(-18deg)}}
        .bonus-copy h3{color:#082b4c;font-weight:400;text-shadow:0 2px 9px rgba(8,43,76,.16)}
        #ofertas .pricing-heading-simple{max-width:680px;margin-bottom:30px}
        #ofertas .pricing-heading-simple h2{margin-inline:auto}
        #ofertas .pricing-heading-simple>p{margin:12px auto 0;color:#556772;font-size:15px;line-height:1.55}
        #ofertas .pricing-heading-simple>p strong{color:#122f3e;font-weight:800}
        #ofertas .pricing-title-gradient{display:inline-block;color:transparent;background:linear-gradient(105deg,#1769d2 0%,#2f86e7 30%,#1599ad 58%,#10ae83 100%);background-size:220% 220%;background-clip:text;-webkit-background-clip:text;animation:pricing-title-shift 4.5s ease-in-out infinite}
        #ofertas .price-card{padding:25px 20px}
        #ofertas .plan-head h3{font-size:25px;letter-spacing:.005em}
        #ofertas .plan-head p:last-child{margin-top:8px;font-size:13.5px;line-height:1.55}
        #ofertas .pricing-feature-list{margin-top:20px;border-top:1px solid #e5ece8}
        #ofertas .pricing-feature-list li{position:relative;display:flex;align-items:flex-start;gap:10px;padding:12px 0;border-bottom:1px solid #edf2ef;color:#151a18;font-size:14.5px;line-height:1.45}
        #ofertas .pricing-feature-list li::before{display:none!important;content:none!important}
        #ofertas .feature-check{flex:0 0 23px;width:23px;height:23px;margin-top:0;display:grid;place-items:center;border-radius:50%;background:#078768;color:#fff;font-size:14px;font-weight:900;line-height:1;box-shadow:0 3px 8px rgba(7,135,104,.18)}
        #ofertas .feature-text{min-width:0;display:block;color:#151a18}
        #ofertas .feature-text strong{color:#111614;font-weight:800}
        #ofertas .bonus-divider{align-items:center;padding-top:16px;padding-bottom:10px;border-bottom:0;color:#0a6f53;font-size:12.5px;font-weight:900;letter-spacing:.045em;text-transform:uppercase}
        #ofertas .bonus-divider .bonus-plus{flex:0 0 27px;width:27px;height:27px;display:grid;place-items:center;border-radius:7px;background:#1769d2;color:#fff;font-size:19px;font-weight:900;line-height:1;box-shadow:0 5px 12px rgba(23,105,210,.18)}
        #ofertas .bonus-divider .feature-text{color:#123d72}
        #ofertas .bonus-item-name .feature-text{color:#082b4c;font-weight:400;text-shadow:0 2px 9px rgba(8,43,76,.16)}
        #ofertas .price-row{padding:22px 0 16px}
        #ofertas .price-row>div{display:flex;align-items:flex-end;justify-content:flex-end}
        #ofertas .price-row strong{white-space:nowrap}
        #ofertas .price-row strong small{font-size:16px;letter-spacing:0}
        #ofertas .price-card.complete{border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(125deg,#05a96f 0%,#2fe99a 42%,#079f6b 72%,#39f0a7 100%) border-box;box-shadow:0 24px 58px rgba(6,164,103,.22),0 0 24px rgba(16,174,131,.18)}
        #ofertas .value-badge{background:linear-gradient(105deg,#057f59 0%,#11b679 45%,#35e598 100%);box-shadow:0 8px 20px rgba(8,135,104,.22);font-size:9.5px}
        #ofertas .complete-discount-badge{margin:4px 0 18px;padding:10px 13px;border:1px solid rgba(230,76,28,.22);border-radius:10px;text-align:center;color:#7b2505;background:linear-gradient(100deg,#ffd84a 0%,#ff9b28 46%,#ff5a2f 100%);box-shadow:0 8px 18px rgba(239,95,28,.16);font-size:12px;font-weight:900;letter-spacing:.035em}
        #ofertas .complete-offer-price{margin:22px 0 16px;padding:17px 16px 15px;border:1px solid #e4ece8;border-radius:14px;background:linear-gradient(135deg,#fbfdfc 0%,#f5fbf8 100%)}
        #ofertas .complete-old-price{color:#7d8581;font-size:13px;font-weight:600;line-height:1.2}
        #ofertas .complete-old-price span{position:relative;display:inline-block;margin-left:3px;color:#7b817e;font-weight:700}
        #ofertas .complete-old-price span::after{content:"";position:absolute;left:-3px;right:-3px;top:52%;height:2px;border-radius:999px;background:#e22929;box-shadow:0 1px 5px rgba(226,41,41,.45);transform:rotate(-6deg);transform-origin:center}
        #ofertas .complete-now-row{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:10px}
        #ofertas .complete-now-label{padding-bottom:5px;color:#273b32;font-size:14px;font-weight:800;line-height:1.2}
        #ofertas .complete-now-price{white-space:nowrap;color:transparent;background:linear-gradient(115deg,#087c4f 0%,#08b56f 45%,#25e492 100%);background-clip:text;-webkit-background-clip:text;font-size:51px;line-height:.9;letter-spacing:-.05em;filter:drop-shadow(0 2px 1px rgba(0,0,0,.34))}
        #ofertas .complete-now-price small{font-size:17px;letter-spacing:0}
        #ofertas .complete-installment{margin-top:9px;text-align:right;color:#60737f;font-size:12px;font-weight:600}
        #ofertas .complete-installment strong{color:#1769d2;font-size:14px;font-weight:900}
        #ofertas .complete .cta-primary{position:relative;overflow:hidden;isolation:isolate;min-height:58px;background:linear-gradient(135deg,#0aa672 0%,#16c889 52%,#079968 100%);box-shadow:0 12px 30px rgba(8,157,105,.33),0 0 20px rgba(22,200,137,.18);font-size:14.5px;font-weight:700;letter-spacing:.015em}
        #ofertas .complete .cta-primary::before{content:"";position:absolute;z-index:-1;top:-55%;left:-20%;width:27%;height:210%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);filter:blur(1px);animation:pricing-cta-shine 3.2s ease-in-out infinite}
        #ofertas .basic .cta-secondary{min-height:54px}
        #ofertas .access-note{margin-top:11px;font-size:10.5px;color:#6f7c76}
        @media(max-width:719px){
          #ofertas .pricing-heading-simple{margin-bottom:23px}
          #ofertas .pricing-heading-simple h2{font-size:32px}
          #ofertas .pricing-heading-simple>p{font-size:14.5px}
          #ofertas .price-card{padding:23px 18px}
          #ofertas .pricing-feature-list li{font-size:15px;padding:12px 0}
          #ofertas .feature-check{flex-basis:24px;width:24px;height:24px;font-size:15px}
          #ofertas .price-row strong{font-size:45px}
          #ofertas .complete-discount-badge{margin-top:5px;font-size:11.5px;padding:9px 10px}
          #ofertas .complete-offer-price{padding:16px 14px 14px}
          #ofertas .complete-now-label{font-size:13.5px}
          #ofertas .complete-now-price{font-size:47px}
          #ofertas .complete-installment{font-size:12px}
          #ofertas .complete-installment strong{font-size:13.5px}
          #ofertas .complete .cta-primary{font-size:15px;min-height:60px;padding-inline:14px}
        }
        @media(max-width:390px){
          #ofertas .complete-now-row{gap:8px}
          #ofertas .complete-now-label{font-size:12.5px}
          #ofertas .complete-now-price{font-size:43px}
        }
        @media(prefers-reduced-motion:reduce){
          #ofertas .pricing-title-gradient{animation:none;background-position:50% 50%}
          #ofertas .complete .cta-primary::before{animation:none;display:none}
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