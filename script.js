(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
  const revealEls = document.querySelectorAll('[data-reveal]');
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

  /* ---------- Shisha kartochkalarda kursorga ergashuvchi yumshoq nur ---------- */
  if (finePointer) {
    document.querySelectorAll('.t-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Xizmatlar: yo'nalishlar bo'yicha tablar ---------- */
  const tablist = document.querySelector('.svc-tabs');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

    // Tilla indikatorni faol tab ostiga joylash (til yoki shrift o'zgarsa ham qayta o'lchanadi)
    const moveIndicator = () => {
      const active = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
      if (!active) return;
      tablist.style.setProperty('--ind-x', `${active.offsetLeft}px`);
      tablist.style.setProperty('--ind-w', `${active.offsetWidth}px`);
      if (!tablist.classList.contains('is-ready')) {
        void tablist.offsetWidth; // birinchi joylashuv sirpanishsiz bo'lsin
        tablist.classList.add('is-ready');
      }
    };

    const select = (index) => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].classList.toggle('is-active', on);
        panels[i].inert = !on;
      });
      moveIndicator();
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

    select(Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true')));

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
