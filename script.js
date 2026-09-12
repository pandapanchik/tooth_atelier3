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

  /* ---------- Xizmatlar: yo'nalish tablari + yoy bo'ylab aylanuvchi kartalar ---------- */
  const tablist = document.querySelector('.svc-tabs');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const decks = tabs.map((tab) => {
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      return {
        panel,
        list: panel.querySelector('.svc-deck'),
        cards: [...panel.querySelectorAll('.svc-card')],
        active: 0,
        timers: []
      };
    });
    const prevBtn = document.querySelector('[data-deck-prev]');
    const nextBtn = document.querySelector('[data-deck-next]');
    const countNow = document.querySelector('[data-deck-current]');
    const countAll = document.querySelector('[data-deck-total]');
    const pad = (n) => String(n).padStart(2, '0');
    let current = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));
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

    // Tilla indikatorni faol tab ostiga joylash (til yoki shrift o'zgarsa ham qayta o'lchanadi)
    const moveIndicator = () => {
      const active = tabs[current];
      tablist.style.setProperty('--ind-x', `${active.offsetLeft}px`);
      tablist.style.setProperty('--ind-w', `${active.offsetWidth}px`);
      if (!tablist.classList.contains('is-ready')) {
        void tablist.offsetWidth; // birinchi joylashuv sirpanishsiz bo'lsin
        tablist.classList.add('is-ready');
      }
    };

    const setTabs = () => {
      tabs.forEach((tab, i) => {
        const on = i === current;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        decks[i].panel.classList.toggle('is-active', on);
        decks[i].panel.inert = !on;
      });
      moveIndicator();
      syncNav();
    };

    const select = (index) => {
      if (index === current) return;
      introduced = true;
      leave(decks[current]);
      current = index;
      decks[current].active = 0;
      setTabs();
      enter(decks[current]);
    };

    const bringIntoView = (tab) => {
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    tablist.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      select(tabs.indexOf(tab));
      bringIntoView(tab);
    });

    // Klaviatura: ← → Home End (roving tabindex)
    tablist.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const keys = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const next = keys[e.key];
      select(next);
      tabs[next].focus();
      bringIntoView(tabs[next]);
    });

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
          if (d === current) go(i);
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

    prevBtn.addEventListener('click', () => go(decks[current].active - 1));
    nextBtn.addEventListener('click', () => go(decks[current].active + 1));

    decks.forEach((deck) => place(deck));
    setTabs();

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

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(moveIndicator);
      tabs.forEach((tab) => ro.observe(tab));
    } else {
      window.addEventListener('resize', moveIndicator);
    }
    if (document.fonts) document.fonts.ready.then(moveIndicator);
  }

  /* ---------- Yil ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
