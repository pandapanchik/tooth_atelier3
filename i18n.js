/* =========================================================
   Tooth Atelier · 3 til: o'zbek (asosiy), rus, ingliz
   O'zbekcha matnlar to'g'ridan-to'g'ri index.html dan olinadi,
   bu yerda faqat tarjimalar saqlanadi.
   ========================================================= */
(() => {
  const DICT = {
    ru: {
      'meta.title': 'Tooth Atelier · Стоматологическое ателье',
      'meta.desc': 'Tooth Atelier: создаём вашу улыбку с любовью. Имплантация, эстетическая стоматология, ортодонтия, 3D-томография, особые программы для детей и женщин.',
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
      'hero.photoAlt': 'Крупный план искренней улыбки: белые ровные зубы и розовые губы',
      'social.ig': 'Наш Instagram',
      'social.tg': 'Наш Telegram',
      'hours.label': 'Часы работы',
      'hours.days': 'Понедельник–Суббота',
      'scroll.aria': 'Вниз, к услугам',

      'team.eyebrow': 'Наша команда',
      'team.title': 'Ваша улыбка <em>в надёжных руках</em>',
      'team.lead': 'Шесть врачей: от терапии до хирургии и ортодонтии. На приёме вас выслушают без спешки и объяснят каждый шаг.',
      'doc.1.role': 'Терапевт',
      'doc.1.first': 'Бурхон',
      'doc.1.last': 'Назаров',
      'doc.2.role': 'Хирург-ортопед',
      'doc.2.first': 'Акром',
      'doc.2.last': 'Рихсиев',
      'doc.3.role': 'Хирург-ортопед',
      'doc.3.first': 'Шахзод',
      'doc.3.last': 'Рахматходжаев',
      'doc.4.role': 'Ортодонт',
      'doc.4.first': 'Осимхон',
      'doc.4.last': 'Ахрорходжаев',
      'doc.5.role': 'Ортопед',
      'doc.5.first': 'Ширин',
      'doc.5.last': 'Атаханова',
      'doc.6.role': 'Терапевт-ортопед',
      'doc.6.first': 'Дилшод',
      'doc.6.last': 'Мирзокиров',

      'svc.eyebrow': 'Полный список',
      'svc.title': 'Все наши <em>услуги</em>',
      'svc.tabs': 'Направления услуг',
      'svc.prev': 'Предыдущая услуга',
      'svc.next': 'Следующая услуга',
      'svc.c1': 'Хирургия',
      'svc.c1desc': 'От консультации до имплантации: точно, бережно и без боли.',
      'svc.c2': 'Терапия',
      'svc.c2desc': 'Всё, что нужно, чтобы сохранить ваш зуб.',
      'svc.c3': 'Ортодонтия',
      'svc.c3desc': 'От первой диагностики до ретейнеров: путь к ровной улыбке.',
      'svc.c4': 'Ортопедия',
      'svc.c4desc': 'Коронки и виниры естественного вида, на долгие годы.',
      'svc.pick': 'Выберите направление',
      'svc.pickdesc': 'Нажмите на карточку: внутри все услуги этого направления.',
      'svc.back': 'Все направления',
      'svc.c1n': '6 услуг',
      'svc.c2n': '5 услуг',
      'svc.c3n': '7 услуг',
      'svc.c4n': '4 услуги',
      'svc.1.1': 'Консультация',
      'svc.1.2': 'Удаление простое',
      'svc.1.3': 'Удаление сложное',
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

      'img.tomo': 'Современный аппарат 3D-компьютерной томографии в клинике',
      'tomo.chip1': 'Зубы, кость и нервы на одном снимке',
      'tomo.chip2l': 'Исследование',
      'tomo.chip2': 'Несколько секунд',
      'tomo.eyebrow': '3D-диагностика · прямо в клинике',
      'tomo.title': 'Видим ваш зуб <em>изнутри</em>',
      'tomo.lead': 'Обычный рентген показывает лишь тень зуба. 3D-компьютерная томография показывает зубы, корни, кость и нервы со всех сторон. Поэтому лечение начинается не с догадок, а с точного плана.',
      'tomo.p1': 'Скрытые проблемы видны заранее',
      'tomo.p1t': 'Воспаление у верхушки корня, киста, трещина или дополнительный канал: то, что не видно на обычном снимке, обнаруживается вовремя.',
      'tomo.p2': 'Имплант планируется до миллиметра',
      'tomo.p2t': 'Объём кости и положение нерва измеряются точно. Имплант устанавливается в самое безопасное и надёжное место.',
      'tomo.p3': 'Быстро, удобно и прямо здесь',
      'tomo.p3t': 'Исследование длится несколько секунд, а облучение значительно ниже, чем при обычной КТ. Ехать в другой диагностический центр не нужно.',
      'tomo.types': 'Виды исследования',
      'tomo.t1': 'КТ всей челюсти в 3D',
      'tomo.t2': 'Область одного или нескольких зубов',
      'tomo.t3': 'Панорамный снимок',
      'tomo.note': 'Результат вы разберёте вместе с врачом: каждый шаг будет понятен.',

      'works.btn': 'Смотреть работы',
      'works.close': 'Закрыть',
      'works.prev': 'Предыдущая работа',
      'works.next': 'Следующая работа',
      'works.before': 'До',
      'works.after': 'После',
      'works.o1': 'Лечение металлическими брекетами',
      'works.o1n': 'Начало лечения',
      'works.o2': 'Выравнивание скученных зубов',
      'works.o3': 'Выравнивание зубного ряда',
      'works.o4': 'Исправление прикуса',
      'works.o4n': 'Вид сбоку',
      'works.s1': 'Коронка на имплант',
      'works.s2': 'Профессиональная чистка и отбеливание',
      'works.s3': 'Отбеливание зубов',
      'works.s3n': 'С оттенка A3 до B1',
      'works.s4': 'Новая улыбка с винирами',
      'works.h1': 'Полное восстановление улыбки',
      'works.h1n': 'Стёртые и разрушенные зубы',
      'works.h2': 'Замена старых коронок',
      'works.h2n': 'Керамика вместо металла',
      'works.h3': 'Полное восстановление обеих челюстей',
      'works.h3n': 'Импланты и керамические коронки',
      'works.during': 'В процессе',
      'works.smile': 'Улыбка',
      'works.h4': 'Восстановление нижней челюсти на имплантах',
      'works.h4n': '4 импланта и керамический мост',
      'works.h5': 'Новая улыбка из керамики',
      'works.h5n': 'Керамические коронки на обе челюсти',
      'works.h6': 'Восстановление сильно разрушенных зубов',
      'works.h6n': 'Полная реабилитация обеих челюстей',
      'works.b1': 'Восстановление жевательного зуба композитом',
      'works.b1n': 'Сверху до, снизу после',
      'works.b2': 'Реставрация премоляров',
      'works.b2n': 'Под коффердамом, поэтапно',
      'works.b3': 'Лечение кариеса',
      'works.b3n': 'От диагностики до пломбы',
      'works.b4': 'Замена старых пломб',
      'works.b4n': 'Композитная реставрация',
      'works.b5': 'Восстановление нижних жевательных зубов',
      'works.b5n': 'Естественная форма и цвет',

      'care.eyebrow': 'Особая забота',
      'care.title': 'Особые программы для самых <em>нежных пациентов</em>',
      'img.kids': 'Светловолосая девочка в белой футболке смотрит вверх и радостно смеётся',
      'kids.label': 'Детям',
      'kids.title': 'К стоматологу без страха, с радостью',
      'kids.text': 'С малышами мы говорим по-особенному: спокойно, через игру и без всякого принуждения. А первый визит становится просто знакомством.',
      'kids.l1': 'Адаптационный визит в игровой форме',
      'kids.l2': 'Безболезненное лечение молочных зубов',
      'kids.l3': 'Фторирование и герметизация фиссур',
      'kids.l4': 'Родители рядом на протяжении всей процедуры',
      'img.women': 'Женщина с веснушками смотрит в сторону и искренне смеётся',
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
      'meta.desc': 'Tooth Atelier: we craft your smile with love. Implants, aesthetic dentistry, orthodontics, 3D CT scans and dedicated programs for children and women.',
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
      'hero.photoAlt': 'Close-up of a warm smile with white, even teeth and soft pink lips',
      'social.ig': 'Our Instagram',
      'social.tg': 'Our Telegram',
      'hours.label': 'Opening hours',
      'hours.days': 'Monday–Saturday',
      'scroll.aria': 'Scroll down to treatments',

      'team.eyebrow': 'Our team',
      'team.title': 'Your smile is <em>in caring hands</em>',
      'team.lead': 'Six doctors, from general dentistry to surgery and orthodontics. At your visit they listen without rushing and explain every step.',
      'doc.1.role': 'General dentist',
      'doc.1.first': 'Burkhon',
      'doc.1.last': 'Nazarov',
      'doc.2.role': 'Oral surgeon, prosthodontist',
      'doc.2.first': 'Akrom',
      'doc.2.last': 'Rikhsiev',
      'doc.3.role': 'Oral surgeon, prosthodontist',
      'doc.3.first': 'Shakhzod',
      'doc.3.last': 'Rakhmatkhodjaev',
      'doc.4.role': 'Orthodontist',
      'doc.4.first': 'Osimkhon',
      'doc.4.last': 'Akhrorkhodjaev',
      'doc.5.role': 'Prosthodontist',
      'doc.5.first': 'Shirin',
      'doc.5.last': 'Atakhanova',
      'doc.6.role': 'General dentist, prosthodontist',
      'doc.6.first': 'Dilshod',
      'doc.6.last': 'Mirzokirov',

      'svc.eyebrow': 'Full list',
      'svc.title': 'All our <em>services</em>',
      'svc.tabs': 'Service categories',
      'svc.prev': 'Previous service',
      'svc.next': 'Next service',
      'svc.c1': 'Surgery',
      'svc.c1desc': 'From consultation to implants: precise, gentle and pain-free.',
      'svc.c2': 'Therapy',
      'svc.c2desc': 'Everything it takes to save your tooth.',
      'svc.c3': 'Orthodontics',
      'svc.c3desc': 'From the first diagnosis to retainers: the path to a straight smile.',
      'svc.c4': 'Orthopedics',
      'svc.c4desc': 'Natural-looking crowns and veneers, made to last.',
      'svc.pick': 'Choose a category',
      'svc.pickdesc': 'Tap a card to see every service in that category.',
      'svc.back': 'All categories',
      'svc.c1n': '6 services',
      'svc.c2n': '5 services',
      'svc.c3n': '7 services',
      'svc.c4n': '4 services',
      'svc.1.1': 'Consultation',
      'svc.1.2': 'Simple tooth extraction',
      'svc.1.3': 'Complex tooth extraction',
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

      'img.tomo': 'A modern 3D dental CT scanner at the clinic',
      'tomo.chip1': 'Teeth, bone and nerves in one scan',
      'tomo.chip2l': 'Scan time',
      'tomo.chip2': 'A few seconds',
      'tomo.eyebrow': '3D diagnostics · right in the clinic',
      'tomo.title': 'We see your tooth <em>from the inside</em>',
      'tomo.lead': 'A regular X-ray shows only a shadow of the tooth. 3D computed tomography shows teeth, roots, bone and nerves from every angle, so treatment starts with a precise plan instead of guesswork.',
      'tomo.p1': 'Hidden problems found early',
      'tomo.p1t': 'Inflammation at the root tip, a cyst, a crack or an extra canal: what a flat X-ray misses is caught in time.',
      'tomo.p2': 'Implants planned to the millimetre',
      'tomo.p2t': 'Bone volume and nerve position are measured precisely, so the implant goes exactly where it is safest and strongest.',
      'tomo.p3': 'Fast, comfortable and right here',
      'tomo.p3t': 'The scan takes a few seconds, with far less radiation than a conventional CT. No trips to a separate imaging centre.',
      'tomo.types': 'Scan types',
      'tomo.t1': 'Full-jaw 3D scan',
      'tomo.t2': 'One or several teeth',
      'tomo.t3': 'Panoramic X-ray',
      'tomo.note': 'You review the results together with your doctor, so every step is clear.',

      'works.btn': 'See their work',
      'works.close': 'Close',
      'works.prev': 'Previous case',
      'works.next': 'Next case',
      'works.before': 'Before',
      'works.after': 'After',
      'works.o1': 'Treatment with metal braces',
      'works.o1n': 'Start of treatment',
      'works.o2': 'Straightening crowded teeth',
      'works.o3': 'Aligning the dental arch',
      'works.o4': 'Bite correction',
      'works.o4n': 'Side view',
      'works.s1': 'Crown on an implant',
      'works.s2': 'Professional cleaning and whitening',
      'works.s3': 'Teeth whitening',
      'works.s3n': 'From shade A3 to B1',
      'works.s4': 'A new smile with veneers',
      'works.h1': 'Full smile restoration',
      'works.h1n': 'Worn and damaged teeth',
      'works.h2': 'Replacing old crowns',
      'works.h2n': 'Ceramic instead of metal',
      'works.h3': 'Full-mouth restoration of both jaws',
      'works.h3n': 'Implants and ceramic crowns',
      'works.during': 'In progress',
      'works.smile': 'Smile',
      'works.h4': 'Lower jaw restored on implants',
      'works.h4n': '4 implants and a ceramic bridge',
      'works.h5': 'A new smile in ceramic',
      'works.h5n': 'Ceramic crowns on both jaws',
      'works.h6': 'Restoring severely damaged teeth',
      'works.h6n': 'Full rehabilitation of both jaws',
      'works.b1': 'Restoring a molar with composite',
      'works.b1n': 'Before on top, after below',
      'works.b2': 'Premolar restoration',
      'works.b2n': 'Under rubber dam, step by step',
      'works.b3': 'Caries treatment',
      'works.b3n': 'From diagnosis to filling',
      'works.b4': 'Replacing old fillings',
      'works.b4n': 'Composite restoration',
      'works.b5': 'Restoring lower back teeth',
      'works.b5n': 'Natural shape and colour',

      'care.eyebrow': 'Special care',
      'care.title': 'Dedicated programs for our <em>most delicate patients</em>',
      'img.kids': 'A blonde girl in a white T-shirt looking up and laughing happily',
      'kids.label': 'For children',
      'kids.title': 'To the dentist without fear, with joy',
      'kids.text': 'We talk to little ones differently: slowly, through play and never by force. The first visit is simply a chance to get to know each other.',
      'kids.l1': 'A playful first visit to settle in',
      'kids.l2': 'Pain-free treatment of baby teeth',
      'kids.l3': 'Fluoride care and fissure sealing',
      'kids.l4': 'Parents stay close throughout the treatment',
      'img.women': 'A freckled woman looking to the side with a warm, genuine laugh',
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
