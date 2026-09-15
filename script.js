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

  /* ---------- Shifokor ishlari: portretdagi tugma yorug' galereyani ochadi ---------- */
  // Bir vaqtda bitta ish: barmoq bilan surish, strelkalar yoki klaviatura bilan almashadi
  const works = document.querySelector('[data-works]');
  if (works && typeof works.showModal === 'function') {
    const panels = [...works.querySelectorAll('[data-works-doc]')];
    const count = works.querySelector('[data-works-count]');
    const prev = works.querySelector('[data-works-prev]');
    const next = works.querySelector('[data-works-next]');
    const HASH = '#ishlar-';
    const pad2 = (n) => String(n).padStart(2, '0');
    let pushed = false;
    let track = null;
    let total = 0;
    // Strelka bosilganda boriladigan ish: silliq surilish tugaguncha hisoblagich orqaga sakramaydi
    let target = null;

    const current = () => Math.round(track.scrollLeft / track.clientWidth);
    const sync = (i) => {
      const focused = document.activeElement;
      count.innerHTML = `<b>${pad2(i + 1)}</b> / ${pad2(total)}`;
      prev.disabled = i === 0;
      next.disabled = i === total - 1;
      // Fokusdagi strelka o'chsa, fokus qarama-qarshi strelkaga o'tadi
      if (focused && focused.disabled) (focused === next ? prev : next).focus();
    };
    const go = (dir) => {
      const from = target ?? current();
      const to = Math.max(0, Math.min(total - 1, from + dir));
      if (to === from) return;
      target = to;
      track.scrollTo({ left: to * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
      sync(to);
    };

    panels.forEach((panel) => {
      const t = panel.querySelector('.works__track');
      t.addEventListener('scroll', () => {
        const i = current();
        if (target !== null && i !== target) return;
        target = null;
        sync(i);
      }, { passive: true });
      // Foydalanuvchi o'zi sursa, strelka maqsadi bekor bo'ladi
      ['pointerdown', 'wheel'].forEach((type) => {
        t.addEventListener(type, () => { target = null; }, { passive: true });
      });
    });

    const show = (id) => {
      const panel = panels.find((p) => p.dataset.worksDoc === id);
      if (!panel) return false;
      panels.forEach((p) => { p.hidden = p !== panel; });
      // Shu shifokorning barcha suratlari birdan yuklanadi: surganda bo'sh joy ko'rinmaydi
      panel.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
      works.setAttribute('aria-labelledby', panel.querySelector('.works__name').id);
      if (!works.open) works.showModal();
      track = panel.querySelector('.works__track');
      total = track.children.length;
      target = null;
      track.scrollLeft = 0;
      sync(0);
      return true;
    };

    // Har bir galereyaning o'z havolasi bor (#ishlar-osimxon): telefondagi "orqaga" tugmasi uni yopadi
    const open = (id) => {
      if (!show(id)) return;
      history.pushState({ works: id }, '', HASH + id);
      pushed = true;
    };
    // Yopilgach tozalash darhol bajariladi: "close" hodisasi kechikishi mumkin (masalan, fon tabda)
    const finish = () => {
      pushed = false;
      if (location.hash.startsWith(HASH)) history.replaceState(null, '', location.pathname + location.search);
    };
    // Oyna darhol yopiladi, tarix esa keyin tozalanadi: popstate'ni kutib qolinmaydi
    const close = () => {
      const wasPushed = pushed;
      works.close();
      finish();
      if (wasPushed) history.back();
    };

    works.addEventListener('close', finish);
    works.addEventListener('cancel', (e) => {
      e.preventDefault();
      close();
    });
    window.addEventListener('popstate', () => {
      const id = history.state && history.state.works;
      if (id && show(id)) {
        pushed = true;
      } else if (works.open) {
        works.close();
        finish();
      }
    });
    works.querySelector('[data-works-close]').addEventListener('click', close);
    document.querySelectorAll('[data-works-open]').forEach((btn) => {
      btn.addEventListener('click', () => open(btn.dataset.worksOpen));
    });

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    document.addEventListener('keydown', (e) => {
      if (!works.open) return;
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });

    // Havola orqali kelinsa (masalan Instagram'dan), galereya darhol ochiladi
    if (location.hash.startsWith(HASH)) show(location.hash.slice(HASH.length));
  }

  /* ---------- Davolash yo'li: har yo'nalishdan ikki surat, ular orasida skroll bilan chiziladigan ip ---------- */
  // Yo'l suratlarning haqiqiy o'rni va shaklidan quriladi: bekatdan chiqib, har bir suratni tashqi tomonidan
  // aylanib o'tadi va keyingisiga oqib boradi. Skroll qilinganda ipning uchi ekran balandligining 62% iga ergashadi
  const route = document.querySelector('[data-path]');
  const routeItems = route ? [...route.querySelectorAll('.path__cat, .stop, .path__end')] : [];
  if (route && 'ResizeObserver' in window) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = route.querySelector('.path__line');
    const track = svg.querySelector('.path__track');
    const ink = svg.querySelector('.path__ink');
    const tip = svg.querySelector('.path__tip');
    const nodeLayer = svg.querySelector('.path__nodes');
    const narrow = window.matchMedia('(max-width: 760px)');
    const STEP = 6;   // yo'l uzunligi bo'yicha namuna qadami, px
    const GAP = 18;   // ip surat chetidan shuncha nari yuradi, px
    const fx = (n) => n.toFixed(1);
    let xs = [];
    let ys = [];
    let total = 0;
    let drawn = 0;
    let anchors = [];
    let frame = 0;
    let first = true;

    // Yotiq S-egri: ip ikkala uchida ham gorizontal yo'nalishda turadi, shuning uchun bo'g'inlar silliq
    const link = (a, b) => {
      const dir = Math.sign(b[0] - a[0]) || 1;
      const k = Math.max(Math.abs(b[0] - a[0]) * 0.5, 24);
      return ` C ${fx(a[0] + dir * k)} ${fx(a[1])} ${fx(b[0] - dir * k)} ${fx(b[1])} ${fx(b[0])} ${fx(b[1])}`;
    };

    const build = () => {
      const box = route.getBoundingClientRect();
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
      };
      const centre = (el) => {
        const r = rect(el);
        return [r.x + r.w / 2, r.y + r.h / 2];
      };
      // Telefonda ip chap chetdagi raqamli doiralar markazidan to'g'ri tushadi
      const rail = narrow.matches;
      const railX = rail ? centre(route.querySelector('.path__cat-num'))[0] : 0;
      const nodes = [];
      let d = '';
      let pos = null;
      anchors = [];

      // Hozirgacha qurilgan yo'l uzunligi: ip shu nuqtaga yetganda bekat yonadi
      const lengthSoFar = () => {
        track.setAttribute('d', d);
        return track.getTotalLength();
      };

      routeItems.forEach((item) => {
        // Yo'nalish nomi va oxirgi rozetka: ip ularning markazidan o'tadi
        if (!item.classList.contains('stop')) {
          const c = centre(item.querySelector('.path__cat-pill, .path__seal'));
          const p = rail ? [railX, c[1]] : c;
          if (!pos) d = `M ${fx(p[0])} ${fx(p[1])}`;
          else d += rail ? ` L ${fx(p[0])} ${fx(p[1])}` : link(pos, p);
          pos = p;
          anchors.push({ el: item, len: lengthSoFar() });
          return;
        }

        const r = rect(item.querySelector('.stop__media'));
        let p;
        let hug = '';
        if (rail) {
          p = [railX, r.y + r.h / 2];
          d += ` L ${fx(p[0])} ${fx(p[1])}`;
          pos = p;
        } else {
          // Surat shakli CSS'dan olinadi: arka, doira yoki keng deraza
          const cs = getComputedStyle(item.querySelector('.stop__photo'));
          const R = (parseFloat(cs.borderTopLeftRadius) || 0) + GAP;
          const B = (parseFloat(cs.borderBottomLeftRadius) || 0) + GAP;
          const s = item.classList.contains('stop--r') ? 1 : -1;   // tashqi tomon: chap (-1) yoki o'ng (1)
          const sweep = s > 0 ? 1 : 0;
          const top = r.y - GAP;
          const bottom = r.y + r.h + GAP;
          const out = s > 0 ? r.x + r.w + GAP : r.x - GAP;
          // Ip suratning tepa o'rtasiga kiradi, tashqi yoni bo'ylab tushadi va pastidan ichkariga buriladi
          p = [r.x + r.w / 2, top];
          d += link(pos, p);
          pos = [out - s * B, bottom];
          hug = ` L ${fx(out - s * R)} ${fx(top)} A ${fx(R)} ${fx(R)} 0 0 ${sweep} ${fx(out)} ${fx(top + R)}` +
            ` L ${fx(out)} ${fx(bottom - B)} A ${fx(B)} ${fx(B)} 0 0 ${sweep} ${fx(pos[0])} ${fx(pos[1])}`;
        }
        const len = lengthSoFar();
        const node = document.createElementNS(NS, 'circle');
        node.setAttribute('class', 'path__node');
        node.setAttribute('cx', fx(p[0]));
        node.setAttribute('cy', fx(p[1]));
        node.setAttribute('r', '5');
        nodes.push(node);
        anchors.push({ el: item, len }, { el: node, len });
        d += hug;
      });

      track.setAttribute('d', d);
      ink.setAttribute('d', d);
      total = track.getTotalLength();
      ink.style.strokeDasharray = `${fx(total)} ${fx(total)}`;
      nodeLayer.replaceChildren(...nodes);

      // Yo'l bo'ylab nuqtalar: ekrandagi balandlikdan uzunlikni tez topish uchun (y hech qachon kamaymaydi)
      xs = [];
      ys = [];
      for (let l = 0; l < total; l += STEP) {
        const pt = track.getPointAtLength(l);
        xs.push(pt.x);
        ys.push(pt.y);
      }
      const end = track.getPointAtLength(total);
      xs.push(end.x);
      ys.push(end.y);
    };

    // Ekranning 62% balandligidagi chiziq yo'lning qaysi uzunligiga to'g'ri keladi
    const locate = () => {
      const y = window.innerHeight * 0.62 - route.getBoundingClientRect().top;
      const n = ys.length;
      if (!n || y <= ys[0]) return 0;
      if (y >= ys[n - 1]) return total;
      let lo = 1;
      let hi = n - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid + 1;
        else hi = mid;
      }
      const y0 = ys[lo - 1];
      const t = ys[lo] > y0 ? (y - y0) / (ys[lo] - y0) : 1;
      return Math.min(total, (lo - 1 + t) * STEP);
    };

    const render = () => {
      if (!xs.length) return;   // yo'l hali qurilmagan (skroll ResizeObserver'dan oldin kelishi mumkin)
      ink.style.strokeDashoffset = fx(total - drawn);
      const i = drawn / STEP;
      const i0 = Math.min(xs.length - 1, Math.floor(i));
      const i1 = Math.min(xs.length - 1, i0 + 1);
      const t = i - Math.floor(i);
      tip.setAttribute('transform', `translate(${fx(xs[i0] + (xs[i1] - xs[i0]) * t)} ${fx(ys[i0] + (ys[i1] - ys[i0]) * t)})`);
      tip.classList.toggle('is-hidden', reduceMotion || drawn < 2 || drawn > total - 2);
      anchors.forEach(({ el, len }) => el.classList.toggle('is-lit', drawn >= len - 1));
    };

    // Ip maqsadga birdan sakramaydi: har kadrda qolgan masofaning bir qismini bosib, sekin ulanib boradi
    const tick = () => {
      frame = 0;
      const goal = locate();
      const diff = goal - drawn;
      drawn = Math.abs(diff) < 0.5 ? goal : drawn + diff * 0.09;
      render();
      if (drawn !== goal) frame = requestAnimationFrame(tick);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // O'lcham, shrift yoki til o'zgarsa yo'l qayta quriladi. Birinchi marta ip boshidan chiziladi
    const refresh = () => {
      build();
      drawn = reduceMotion ? total : first ? 0 : locate();
      first = false;
      render();
      if (!reduceMotion) request();
    };
    let pending = 0;
    new ResizeObserver(() => {
      if (!pending) pending = requestAnimationFrame(() => { pending = 0; refresh(); });
    }).observe(route);

    // Skroll faqat bo'lim ekranga yaqin bo'lganda tinglanadi
    if (!reduceMotion) {
      const onScroll = () => request();
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) window.addEventListener('scroll', onScroll, { passive: true });
        else window.removeEventListener('scroll', onScroll);
        request();
      }, { rootMargin: '25% 0px' }).observe(route);
      window.addEventListener('resize', request);
    }
  } else {
    // Eski brauzer: ip chizilmaydi, lekin suratlar va bekatlar to'liq holatda ko'rinadi
    routeItems.forEach((el) => el.classList.add('is-lit'));
  }

  /* ---------- Yil ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
