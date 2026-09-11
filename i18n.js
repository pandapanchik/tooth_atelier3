/* =========================================================
   Tooth Atelier · 3 til: o'zbek (asosiy), rus, ingliz
   O'zbekcha matnlar to'g'ridan-to'g'ri index.html dan olinadi,
   bu yerda faqat tarjimalar saqlanadi.
   ========================================================= */
(() => {
  const DICT = {
    ru: {
      'meta.title': 'Tooth Atelier · Стоматологическое ателье',
      'meta.desc': 'Tooth Atelier: создаём вашу улыбку с любовью. Имплантация, эстетическая стоматология, ортодонтия, особые программы для детей и женщин.',
      'skip': 'Перейти к основному содержанию',
      'brand.home': 'Tooth Atelier, главная страница',
      'brand.top': 'Tooth Atelier, наверх страницы',
      'nav.aria': 'Главное меню',
      'nav.treat': 'Услуги',
      'nav.kids': 'Детям',
      'nav.women': 'Женщинам',
      'nav.contact': 'Контакты',
      'lang.label': 'Выберите язык',
      'cta.book': 'Записаться на приём',

      'hero.eyebrow': 'Tooth Atelier · Стоматологическое ателье',
      'hero.title': 'Создаём вашу улыбку <em>с любовью</em>',
      'hero.lead': 'Здесь никто не торопится. Сначала мы выслушаем вас, всё объясним и только потом бережно и безболезненно вылечим.',
      'hero.photoAlt': 'Женщина с кудрявыми волосами широко и искренне улыбается, видны белые здоровые зубы',
      'social.ig': 'Наш Instagram',
      'social.tg': 'Наш Telegram',
      'hours.label': 'Часы работы',
      'hours.days': 'Понедельник–Суббота',
      'scroll.aria': 'Вниз, к услугам',

      'treat.eyebrow': 'Услуги',
      'treat.title': 'Всё для здоровой улыбки <em>в одном месте</em>',
      'treat.lead': 'Каждая процедура проходит на современном оборудовании и в комфортном для вас темпе. Не знаете, что именно нужно? Определим вместе на первом визите.',
      'img.feature': 'Врач бережно осматривает зубы улыбающейся пациентки с помощью зеркальца',
      'feature.kicker': 'Первый визит',
      'feature.title': 'Осмотр, спокойная беседа и понятный план лечения',
      'feature.cta': 'Записаться',
      't1.title': 'Имплантация',
      't1.text': 'Прочный и естественный на вид новый зуб на месте утраченного. Служит долгие годы.',
      't2.title': 'Отбеливание зубов',
      't2.text': 'Естественный сияющий оттенок без вреда для эмали.',
      't3.title': 'Эстетическая реставрация и виниры',
      't3.text': 'Бережно, вручную восстанавливаем форму и цвет улыбки с учётом черт лица, характера и ваших пожеланий.',
      't4.title': 'Ортодонтия',
      't4.text': 'Ровные зубы с помощью брекетов или прозрачных элайнеров, в любом возрасте.',
      't5.title': 'Лечение без боли',
      't5.text': 'Лечим кариес и корневые каналы под современной анестезией. Вы чувствуете только спокойствие.',
      't6.title': 'Профессиональная гигиена',
      't6.text': 'Удаление зубного камня и налёта, регулярный уход за здоровьем дёсен.',

      'svc.eyebrow': 'Полный список',
      'svc.title': 'Все наши <em>услуги</em>',
      'svc.tabs': 'Направления услуг',
      'svc.call': 'Цены и сроки лечения уточняйте по телефону',
      'svc.c1': 'Хирургия',
      'svc.c1desc': 'От консультации до имплантации: точно, бережно и без боли.',
      'svc.c2': 'Терапия',
      'svc.c2desc': 'Всё, что нужно, чтобы сохранить ваш зуб.',
      'svc.c3': 'Ортодонтия',
      'svc.c3desc': 'От первой диагностики до ретейнеров: путь к ровной улыбке.',
      'svc.c4': 'Ортопедия',
      'svc.c4desc': 'Коронки и виниры естественного вида, на долгие годы.',
      'svc.1.1': 'Консультация',
      'svc.1.2': 'Удаление простое',
      'svc.1.3': 'Удаление сложное',
      'svc.1.4': 'Разрез / дренаж',
      'svc.1.5': 'Синус-лифтинг',
      'svc.1.6': 'Установка импланта',
      'svc.1.7': 'Коронка на имплант',
      'svc.2.1': 'Лечение кариеса',
      'svc.2.2': 'Эстетическая реставрация',
      'svc.2.3': 'Перелечивание',
      'svc.2.4': 'Лечение корневого канала',
      'svc.2.5': 'Профессиональная чистка',
      'svc.3.1': 'Диагностика <span class="svc-item__note">фото + слепки</span>',
      'svc.3.2': 'Металлические брекеты',
      'svc.3.3': 'Керамические брекеты',
      'svc.3.4': 'Элайнеры',
      'svc.3.5': 'Контрольный визит',
      'svc.3.6': 'Снятие брекетов',
      'svc.3.7': 'Ретейнеры',
      'svc.4.1': 'Виниры',
      'svc.4.2': 'Коронка безметаловая на имплант <span class="svc-item__note">диоксид циркония</span>',
      'svc.4.3': 'Коронка безметаловая на зуб <span class="svc-item__note">диоксид циркония, прессовка e.max</span>',
      'svc.4.4': 'Восстановление культи сильно разрушенных зубов <span class="svc-item__note">build-up</span>',

      'care.eyebrow': 'Особая забота',
      'care.title': 'Особые программы для самых <em>нежных пациентов</em>',
      'img.kids': 'Мальчик в клетчатой рубашке радостно смеётся',
      'kids.label': 'Детям',
      'kids.title': 'К стоматологу без страха, с радостью',
      'kids.text': 'С малышами мы говорим по-особенному: спокойно, через игру и без всякого принуждения. А первый визит становится просто знакомством.',
      'kids.l1': 'Адаптационный визит в игровой форме',
      'kids.l2': 'Безболезненное лечение молочных зубов',
      'kids.l3': 'Фторирование и герметизация фиссур',
      'kids.l4': 'Родители рядом на протяжении всей процедуры',
      'kids.cta': 'Записать ребёнка',
      'img.women': 'Темноволосая женщина в красном свитере светло и радостно улыбается',
      'women.label': 'Женщинам',
      'women.title': 'Надёжная забота даже в деликатные периоды',
      'women.text': 'Беременность, период кормления или подготовка к важному событию: безопасный и внимательный подход к каждой ситуации.',
      'women.l1': 'Безопасный осмотр и лечение во время беременности',
      'women.l2': 'Дизайн улыбки и эстетическая реставрация',
      'women.l3': 'Мягкое отбеливание и уход за дёснами',
      'women.l4': 'Удобное время приёма, без спешки',

      'footer.title': 'Встретим вас <em>с теплом</em>',
      'footer.address': 'Адрес',
      'footer.addressText': 'Dental Clinic Tooth Atelier,<br>Ташкент',
      'footer.mapLink': 'Открыть в Google Картах',
      'map.title': 'Tooth Atelier на карте',
      'footer.phone': 'Телефон',
      'footer.sunday': 'Воскресенье: выходной',
      'footer.social': 'Мы в соцсетях',
      'footer.rights': 'Все права защищены.'
    },

    en: {
      'meta.title': 'Tooth Atelier · Dental Atelier',
      'meta.desc': 'Tooth Atelier: we craft your smile with love. Implants, aesthetic dentistry, orthodontics and dedicated programs for children and women.',
      'skip': 'Skip to main content',
      'brand.home': 'Tooth Atelier, home',
      'brand.top': 'Tooth Atelier, back to top',
      'nav.aria': 'Main menu',
      'nav.treat': 'Treatments',
      'nav.kids': 'Children',
      'nav.women': 'Women',
      'nav.contact': 'Contact',
      'lang.label': 'Choose language',
      'cta.book': 'Book a visit',

      'hero.eyebrow': 'Tooth Atelier · Dental atelier',
      'hero.title': 'We craft your smile <em>with love</em>',
      'hero.lead': 'Nobody rushes here. First we listen, explain everything, and only then treat you, gently and without pain.',
      'hero.photoAlt': 'A woman with curly hair smiles widely and warmly, showing healthy white teeth',
      'social.ig': 'Our Instagram',
      'social.tg': 'Our Telegram',
      'hours.label': 'Opening hours',
      'hours.days': 'Monday–Saturday',
      'scroll.aria': 'Scroll down to treatments',

      'treat.eyebrow': 'Treatments',
      'treat.title': 'Everything a healthy smile needs, <em>in one place</em>',
      'treat.lead': 'Every treatment uses modern equipment and moves at a pace that feels right to you. Not sure what you need? We will work it out together at your first visit.',
      'img.feature': 'A dentist gently examines a smiling patient’s teeth with a dental mirror',
      'feature.kicker': 'First visit',
      'feature.title': 'An exam, an honest conversation and a clear treatment plan',
      'feature.cta': 'Book',
      't1.title': 'Dental implants',
      't1.text': 'A strong, natural-looking new tooth where one was lost. Built to last for years.',
      't2.title': 'Teeth whitening',
      't2.text': 'A natural, brighter shade without harming the enamel.',
      't3.title': 'Aesthetic restoration and veneers',
      't3.text': 'We carefully restore the shape and color of your smile by hand, matched to your face, your character and your wishes.',
      't4.title': 'Orthodontics',
      't4.text': 'Straight teeth with braces or clear aligners, at any age.',
      't5.title': 'Pain-free treatment',
      't5.text': 'We treat cavities and root canals under modern anesthesia. All you feel is calm.',
      't6.title': 'Professional hygiene',
      't6.text': 'Removal of tartar and stains, with regular care for healthy gums.',

      'svc.eyebrow': 'Full list',
      'svc.title': 'All our <em>services</em>',
      'svc.tabs': 'Service categories',
      'svc.call': 'Call us for prices and treatment timelines',
      'svc.c1': 'Surgery',
      'svc.c1desc': 'From consultation to implants: precise, gentle and pain-free.',
      'svc.c2': 'Therapy',
      'svc.c2desc': 'Everything it takes to save your tooth.',
      'svc.c3': 'Orthodontics',
      'svc.c3desc': 'From the first diagnosis to retainers: the path to a straight smile.',
      'svc.c4': 'Orthopedics',
      'svc.c4desc': 'Natural-looking crowns and veneers, made to last.',
      'svc.1.1': 'Consultation',
      'svc.1.2': 'Simple tooth extraction',
      'svc.1.3': 'Complex tooth extraction',
      'svc.1.4': 'Incision and drainage',
      'svc.1.5': 'Sinus lifting',
      'svc.1.6': 'Implant placement',
      'svc.1.7': 'Implant crown',
      'svc.2.1': 'Caries treatment',
      'svc.2.2': 'Aesthetic restoration',
      'svc.2.3': 'Retreatment',
      'svc.2.4': 'Root canal treatment',
      'svc.2.5': 'Professional teeth cleaning',
      'svc.3.1': 'Diagnostics <span class="svc-item__note">photo + impressions</span>',
      'svc.3.2': 'Metal braces',
      'svc.3.3': 'Ceramic braces',
      'svc.3.4': 'Aligners',
      'svc.3.5': 'Follow-up visit',
      'svc.3.6': 'Braces removal',
      'svc.3.7': 'Retainers',
      'svc.4.1': 'Veneers',
      'svc.4.2': 'Metal-free crown on implant <span class="svc-item__note">zirconium dioxide</span>',
      'svc.4.3': 'Metal-free crown on tooth <span class="svc-item__note">zirconium dioxide, pressed e.max</span>',
      'svc.4.4': 'Build-up restoration of severely damaged teeth',

      'care.eyebrow': 'Special care',
      'care.title': 'Dedicated programs for our <em>most delicate patients</em>',
      'img.kids': 'A boy in a plaid shirt laughing with his whole face',
      'kids.label': 'For children',
      'kids.title': 'To the dentist without fear, with joy',
      'kids.text': 'We talk to little ones differently: slowly, through play and never by force. The first visit is simply a chance to get to know each other.',
      'kids.l1': 'A playful first visit to settle in',
      'kids.l2': 'Pain-free treatment of baby teeth',
      'kids.l3': 'Fluoride care and fissure sealing',
      'kids.l4': 'Parents stay close throughout the treatment',
      'kids.cta': 'Book for my child',
      'img.women': 'A dark-haired woman in a red sweater with a bright, joyful smile',
      'women.label': 'For women',
      'women.title': 'Trusted care, even in delicate times',
      'women.text': 'Pregnancy, breastfeeding or getting ready for a big day: a safe, attentive approach for every situation.',
      'women.l1': 'Safe check-ups and treatment during pregnancy',
      'women.l2': 'Smile design and aesthetic restoration',
      'women.l3': 'Gentle whitening and gum care',
      'women.l4': 'Unhurried appointments at a time that suits you',

      'footer.title': 'We will welcome you <em>warmly</em>',
      'footer.address': 'Address',
      'footer.addressText': 'Dental Clinic Tooth Atelier,<br>Tashkent',
      'footer.mapLink': 'Open in Google Maps',
      'map.title': 'Tooth Atelier on the map',
      'footer.phone': 'Phone',
      'footer.sunday': 'Sunday: closed',
      'footer.social': 'Find us online',
      'footer.rights': 'All rights reserved.'
    }
  };

  const LANGS = ['uz', 'ru', 'en'];
  const STORAGE_KEY = 'tooth-atelier-lang';
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metaDesc = document.querySelector('meta[name="description"]');
  const textEls = [...document.querySelectorAll('[data-i18n]')];
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  const switchers = [...document.querySelectorAll('[data-lang-switch]')];
  const mapFrame = document.querySelector('[data-map]');

  const parseAttrs = (el) =>
    el.dataset.i18nAttr.split(';').map((pair) => pair.split(':').map((s) => s.trim()));

  // O'zbekcha asl matnni sahifaning o'zidan yig'ib olamiz
  const uz = {
    'meta.title': document.title,
    'meta.desc': metaDesc ? metaDesc.content : ''
  };
  textEls.forEach((el) => {
    if (!(el.dataset.i18n in uz)) uz[el.dataset.i18n] = el.innerHTML.trim();
  });
  attrEls.forEach((el) => {
    parseAttrs(el).forEach(([attr, key]) => {
      if (!(key in uz)) uz[key] = el.getAttribute(attr);
    });
  });
  DICT.uz = uz;

  let current = 'uz';

  const apply = (lang) => {
    const dict = DICT[lang];
    const t = (key) => (dict[key] ?? uz[key]);

    root.lang = lang;
    document.title = t('meta.title');
    if (metaDesc) metaDesc.content = t('meta.desc');

    textEls.forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    attrEls.forEach((el) => {
      parseAttrs(el).forEach(([attr, key]) => el.setAttribute(attr, t(key)));
    });

    switchers.forEach((group) => {
      group.style.setProperty('--idx', LANGS.indexOf(lang));
      group.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
      });
    });

    // Xarita interfeysi ham tanlangan tilda
    if (mapFrame) {
      const src = mapFrame.getAttribute('src');
      const next = src.replace(/!1s[a-z]{2}!2s[a-z]{2}/g, `!1s${lang}!2suz`);
      if (next !== src) mapFrame.setAttribute('src', next);
    }

    current = lang;
  };

  // Tilni sokin almashtirish: ko'rinib turgan matnlar yumshoq so'nib, qayta paydo bo'ladi
  const setLang = (lang) => {
    if (!LANGS.includes(lang) || lang === current) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* saqlab bo'lmasa ham ishlayveradi */ }

    const visible = textEls.filter((el) => {
      if (el.closest('[data-reveal]:not(.is-in)')) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
    });

    if (reduceMotion || !visible.length || !Element.prototype.animate) {
      apply(lang);
      return;
    }

    // Almashtirish taymerga bog'langan: animatsiya to'xtab qolsa ham (fon tab) til baribir o'zgaradi
    const easing = 'cubic-bezier(0.45, 0, 0.25, 1)';
    const outs = visible.map((el) =>
      el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing, fill: 'forwards' })
    );
    window.setTimeout(() => {
      apply(lang);
      visible.forEach((el, i) => {
        outs[i].cancel();
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      });
    }, 340);
  };

  switchers.forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (btn) setLang(btn.dataset.lang);
    });
  });

  // Boshlang'ich til: ?lang=ru havolasi, keyin saqlangan tanlov, bo'lmasa o'zbekcha
  let initial = new URLSearchParams(window.location.search).get('lang');
  if (!LANGS.includes(initial)) {
    try { initial = localStorage.getItem(STORAGE_KEY); } catch (e) { initial = null; }
  }
  if (LANGS.includes(initial) && initial !== 'uz') apply(initial);
})();
