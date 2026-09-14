(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navigatsiya: skroll qilinganda shisha fon ---------- */
  const nav = document.getElementById('nav');
  const sentinel = document.querySelector('.nav-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      nav.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- Bokeh: logodagi kabi yumshoq tilla nurlar ---------- */
  // Oldindan belgilangan urug' (seed): har safar bir xil, tasodifiy ko'rinishdagi joylashuv
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  document.querySelectorAll('[data-bokeh]').forEach((field) => {
    const count = Number(field.dataset.bokeh) || 12;
    const soft = field.classList.contains('bokeh--soft');
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const orb = document.createElement('span');
      const sharp = rand() < 0.45;
      const size = sharp ? 10 + rand() * 38 : 90 + rand() * (soft ? 320 : 240);
      orb.className = sharp ? 'orb orb--sharp' : 'orb';
      orb.style.setProperty('--x', `${rand() * 100}%`);
      orb.style.setProperty('--y', `${rand() * 100}%`);
      orb.style.setProperty('--s', `${size.toFixed(0)}px`);
      orb.style.setProperty('--o', (sharp ? 0.28 + rand() * 0.4 : 0.1 + rand() * 0.16).toFixed(2));
      orb.style.setProperty('--dx', `${((rand() - 0.5) * 140).toFixed(0)}px`);
      orb.style.setProperty('--dy', `${((rand() - 0.5) * 110).toFixed(0)}px`);
      orb.style.setProperty('--dur', `${(34 + rand() * 30).toFixed(1)}s`);
      orb.style.setProperty('--delay', `${(-rand() * 30).toFixed(1)}s`);
      frag.appendChild(orb);
    }
    field.appendChild(frag);
  });

  /* ---------- Scroll paydo bo'lishi ---------- */
  // data-inview: faqat is-in klassi kerak, animatsiyani element o'zi boshqaradi (shifokorlar portretlari)
  const revealEls = document.querySelectorAll('[data-reveal], [data-inview]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Shifokorlar: telefonda suriladigan lenta, faol portret va hisoblagich ---------- */
  const team = document.querySelector('[data-team]');
  const teamProgress = document.querySelector('[data-team-progress]');
  if (team && teamProgress && 'IntersectionObserver' in window) {
    const docs = [...team.querySelectorAll('.doc')];
    const current = teamProgress.querySelector('[data-team-current]');

    // Faol portret: lentada kamida 3/4 qismi ko'rinib turgani (uslub faqat telefon o'lchamida)
    const activeIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
      const first = docs.findIndex((doc) => doc.classList.contains('is-active'));
      if (first >= 0) current.textContent = String(first + 1).padStart(2, '0');
    }, { root: team, threshold: 0.75 });
    docs.forEach((doc) => activeIO.observe(doc));

    // Chiziq: lentaning qancha qismi ko'rib chiqilgani
    let ticking = false;
    const updateFill = () => {
      ticking = false;
      const p = (team.scrollLeft + team.clientWidth) / team.scrollWidth;
      teamProgress.style.setProperty('--p', Math.min(1, p).toFixed(3));
    };
    team.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateFill);
    }, { passive: true });
    window.addEventListener('resize', updateFill);
    updateFill();
  }

  /* ---------- Xizmatlar: avval 4 ta yo'nalish kartasi, bittasi tanlansa faqat uning xizmatlari aylanadi ---------- */
  const svc = document.querySelector('.svc');
  if (svc) {
    const decks = [...svc.querySelectorAll('.svc-panel')].map((panel) => ({
      panel,
      list: panel.querySelector('.svc-deck'),
      cards: [...panel.querySelectorAll('.svc-card')],
      active: 0,
      timers: []
    }));
    // 0-panel: yo'nalishlar g'ildiragi; uning i-kartasi (i + 1)-panelni ochadi
    const home = decks[0];
    const prevBtn = svc.querySelector('[data-deck-prev]');
    const nextBtn = svc.querySelector('[data-deck-next]');
    const backBtn = svc.querySelector('[data-svc-back]');
    const countNow = svc.querySelector('[data-deck-current]');
    const countAll = svc.querySelector('[data-deck-total]');
    const pad = (n) => String(n).padStart(2, '0');
    let current = 0;
    let introduced = false;

    // k: karta markazdan necha qadam narida. CSS uni pastdagi uzoq o'q atrofida k * qadam burchakka buradi
    const place = (deck, offset = 0) => {
      deck.cards.forEach((card, i) => {
        const k = i - deck.active + offset;
        const abs = Math.abs(k);
        card.style.setProperty('--k', k);
        card.style.setProperty('--abs', abs);
        card.style.zIndex = String(20 - abs);
        card.classList.toggle('is-center', k === 0);
        const btn = card.firstElementChild;
        btn.tabIndex = abs > 2 ? -1 : 0;
        if (k === 0) btn.setAttribute('aria-current', 'true');
        else btn.removeAttribute('aria-current');
      });
    };

    // Yangi g'ildirak o'ng tomondan yoy bo'ylab navbatma-navbat kirib keladi
    const enter = (deck) => {
      deck.timers.forEach(clearTimeout);
      deck.panel.classList.remove('is-leaving');
      if (reduceMotion) {
        place(deck);
        return;
      }
      deck.list.classList.add('is-instant');
      place(deck, 3);
      void deck.list.offsetWidth;
      deck.list.classList.remove('is-instant');
      deck.cards.forEach((card, i) => card.style.setProperty('--delay', `${i * 70}ms`));
      place(deck);
      deck.timers = [setTimeout(() => deck.cards.forEach((card) => card.style.removeProperty('--delay')), 1500)];
    };

    // Eski g'ildirak chapga aylanib, so'nib ketadi
    const leave = (deck) => {
      deck.timers.forEach(clearTimeout);
      deck.panel.classList.add('is-leaving');
      deck.timers = [setTimeout(() => deck.panel.classList.remove('is-leaving'), 800)];
    };

    const syncNav = () => {
      const deck = decks[current];
      countNow.textContent = pad(deck.active + 1);
      countAll.textContent = pad(deck.cards.length);
      prevBtn.disabled = deck.active === 0;
      nextBtn.disabled = deck.active === deck.cards.length - 1;
    };

    const go = (index) => {
      const deck = decks[current];
      const next = Math.max(0, Math.min(deck.cards.length - 1, index));
      if (next === deck.active) return;
      // Kirish animatsiyasidan oldin bosilsa ham kartalar sokin aylanib kelsin
      introduced = true;
      deck.list.classList.remove('is-instant');
      deck.active = next;
      place(deck);
      syncNav();
    };

    const setPanels = () => {
      decks.forEach((deck, i) => {
        const on = i === current;
        deck.panel.classList.toggle('is-active', on);
        deck.panel.inert = !on;
      });
      // Orqaga tugmasi faqat yo'nalish ichida ko'rinadi
      svc.classList.toggle('is-inside', current !== 0);
      syncNav();
    };

    const select = (index) => {
      if (index === current) return;
      introduced = true;
      const from = current;
      leave(decks[from]);
      current = index;
      // Ortga qaytilganda g'ildirak hozirgina ko'rilgan yo'nalishda to'xtaydi
      decks[current].active = index === 0 ? from - 1 : 0;
      setPanels();
      enter(decks[current]);
      const target = index === 0 ? home.cards[home.active].firstElementChild : backBtn;
      target.focus({ preventScroll: true });
    };

    // Kartalar: bosish, barmoq bilan surish va klaviatura strelkalari
    decks.forEach((deck, d) => {
      let startX = null;
      let swiped = false;
      deck.cards.forEach((card, i) => {
        card.firstElementChild.addEventListener('click', () => {
          if (swiped) {
            swiped = false;
            return;
          }
          if (d !== current) return;
          if (deck === home) select(i + 1);
          else go(i);
        });
      });
      deck.list.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
        swiped = false;
      });
      deck.list.addEventListener('pointercancel', () => { startX = null; });
      deck.list.addEventListener('pointerup', (e) => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        startX = null;
        if (Math.abs(dx) < 40) return;
        swiped = true;
        go(deck.active + (dx < 0 ? 1 : -1));
      });
      deck.list.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        go(deck.active + (e.key === 'ArrowRight' ? 1 : -1));
        deck.cards[deck.active].firstElementChild.focus({ preventScroll: true });
      });
    });
    backBtn.addEventListener('click', () => select(0));

    // Esc: yo'nalishlarga qaytish
    svc.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && current !== 0) select(0);
    });

    prevBtn.addEventListener('click', () => go(decks[current].active - 1));
    nextBtn.addEventListener('click', () => go(decks[current].active + 1));

    decks.forEach((deck) => place(deck));
    setPanels();

    // Birinchi marta ko'ringanda g'ildirak kirib keladi
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const first = decks[current];
      first.list.classList.add('is-instant');
      place(first, 3);
      const deckIO = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        deckIO.disconnect();
        if (!introduced) enter(decks[current]);
      }, { threshold: 0.3 });
      deckIO.observe(first.list);
    }
  }

  /* ---------- Yil ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
