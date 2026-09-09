const pic=(k,alt,lazy)=>`<picture>
  <source type="image/webp" srcset="/img/${k}-700.webp 700w, /img/${k}-1400.webp 1400w" sizes="100vw">
  <img src="/img/${k}-1400.jpg" srcset="/img/${k}-700.jpg 700w, /img/${k}-1400.jpg 1400w"
       sizes="100vw" alt="${alt}"${lazy?' loading="lazy"':''} decoding="async">
</picture>`;

/* ---------- i18n: el idioma se lee de <html lang>, sin markup extra ---------- */
const LANG = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
const VR = 'https://vimeo.com/reviews/872749ab-01ff-4af0-a523-c4bd248dfbb6/videos/';
const CALENDLY = 'https://calendly.com/maestros-del-futuro/discovery-mdf';

const T = {
  es: {
    words: [['crecer',3600],['decidir',1500],['conectar',1500],['crear',1500]],
    work: [
      ['banregio','Cursos Autodirigidos',  {vimeo:'1222870857'}],
      ['ocho20',  'Casos de Estudio',      {vimeo:'1222872213'}],
      ['pilot',   'Series de Liderazgo',   {vimeo:'1222870251'}],
      ['goyn',    'Productos Gamificados', {site:'https://goyn-experiencia.vercel.app/'}],
    ],
    dialogLabel: 'Contenido del portafolio',
    close: 'Cerrar',
    frameTitle: n => `${n} — reproductor`,
    bookTitle: 'Agenda una llamada con Maestros del Futuro',
  },
  en: {
    words: [['used',3600],['adopted',1500],['shared',1500],['finished',1500]],
    work: [
      ['banregio','Self-paced Courses', {vimeo:'1222870857'}],
      ['ocho20',  'Case Studies',       {vimeo:'1222872213'}],
      ['pilot',   'Leadership Series',   {vimeo:'1222870251'}],
      ['goyn',    'Gamified Products',   {site:'https://goyn-experiencia.vercel.app/'}],
    ],
    dialogLabel: 'Portfolio content',
    close: 'Close',
    frameTitle: n => `${n} — player`,
    bookTitle: 'Book a call with Maestros del Futuro',
  },
};
const t = T[LANG];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- hero carousel ---------- */
const wrap = document.getElementById('slides');
if (wrap) {
  const SLIDES = ['banregio','goyn','pilot','ocho20','laura'];
  /* solo la primera diapositiva entra en la carga inicial; el resto tras `load`,
     porque todas caen dentro del viewport y `loading="lazy"` no las difiere */
  wrap.innerHTML = `<div class="slide on">${pic(SLIDES[0],'',false)}</div>`;
  let slides = [...wrap.children], si = 0;
  const DUR = 5000;
  const setSlide = i => { slides[si].classList.remove('on'); si = i; slides[si].classList.add('on'); };
  const startCarousel = () => {
    wrap.insertAdjacentHTML('beforeend',
      SLIDES.slice(1).map(k => `<div class="slide">${pic(k,'',false)}</div>`).join(''));
    slides = [...wrap.children];
    setInterval(() => setSlide((si + 1) % slides.length), DUR);
  };
  if (!reduce) addEventListener('load', startCarousel);
}

/* ---------- palabra rotante — "crecer"/"grow" se queda más tiempo (palabra ancla) ---------- */
const rot = document.getElementById('rot');
if (rot) {
  rot.innerHTML = t.words.map(([w], i) => `<span class="${i ? '' : 'on'}">${w}</span>`).join('');
  const ws = [...rot.children];
  let wi = 0;
  const nextWord = () => {
    ws[wi].classList.remove('on');
    wi = (wi + 1) % ws.length;
    ws[wi].classList.add('on');
    setTimeout(nextWord, t.words[wi][1]);
  };
  if (!reduce) setTimeout(nextWord, t.words[0][1]);
}

/* ---------- statement: revelado línea por línea ligado al scroll ---------- */
const lns = [...document.querySelectorAll('#stmt .ln')];
if (lns.length) {
  const st = document.getElementById('stmt');
  const reveal = () => {
    const r = st.getBoundingClientRect(), vh = innerHeight;
    const p = (vh * 0.86 - r.top) / (vh * 0.5);
    lns.forEach((l, i) => l.classList.toggle('on', p > i / lns.length));
  };
  if (!reduce) { addEventListener('scroll', reveal, { passive: true }); reveal(); }
  else lns.forEach(l => l.classList.add('on'));
}

/* ---------- header shrink (no aplica al header sólido de páginas interiores) ---------- */
const hd = document.getElementById('hd');
if (hd && !hd.classList.contains('solid'))
  addEventListener('scroll', () => hd.classList.toggle('shrunk', scrollY > 40), { passive: true });

/* ---------- correo ensamblado por JS (anti-scraping) ---------- */
document.querySelectorAll('[data-email]').forEach(a => {
  const addr = 'cesar' + '@' + 'maestrosdelfuturo.com';
  a.href = 'mailto:' + addr;
  if (!a.textContent.trim()) a.textContent = addr;
});

/* ---------- lightbox (portafolio + Calendly) ---------- */
let lb, lbFrame, lastFocus;

function ensureLb() {
  if (lb) return;
  lb = document.createElement('div');
  lb.className = 'lb';
  lb.hidden = true;
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', t.dialogLabel);
  lb.innerHTML =
    `<div class="lb-in"><button class="lb-x" type="button" aria-label="${t.close}">&times;</button>` +
    `<div class="lb-frame" id="lbFrame"></div></div>`;
  document.body.appendChild(lb);
  lbFrame = lb.querySelector('#lbFrame');
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-x')) closeLb(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLb(); return; }
    if (e.key !== 'Tab') return;
    const f = [...lb.querySelectorAll('button, iframe, a[href], [tabindex]:not([tabindex="-1"])')];
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

function openLb(kind, ref, title) {
  ensureLb();
  lastFocus = document.activeElement;
  const src = kind === 'vimeo'
    ? `https://player.vimeo.com/video/${ref}?title=0&byline=0&portrait=0`
    : ref;
  lbFrame.className = 'lb-frame' + (kind === 'site' ? ' site' : kind === 'calendly' ? ' tall' : '');
  lbFrame.innerHTML =
    `<iframe src="${src}" title="${title}" allow="autoplay; fullscreen; picture-in-picture" ` +
    `allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  lb.hidden = false;
  document.documentElement.style.overflow = 'hidden';
  lb.querySelector('.lb-x').focus();
}

function closeLb() {
  if (!lb || lb.hidden) return;
  lb.hidden = true;
  lbFrame.innerHTML = '';
  document.documentElement.style.overflow = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* portafolio — cada tarjeta es un enlace real y, con JS, abre el lightbox */
const workEl = document.getElementById('work');
if (workEl) {
  workEl.innerHTML = t.work.map(([k, n, src], i) => {
    const href = src.vimeo ? VR + src.vimeo : src.site;
    return `<a class="w" href="${href}" target="_blank" rel="noopener" data-i="${i}">${pic(k, n, true)}
     <span class="tag">${n}</span></a>`;
  }).join('');
  workEl.querySelectorAll('.w').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const [, n, src] = t.work[+a.dataset.i];
    openLb(src.vimeo ? 'vimeo' : 'site', src.vimeo || src.site, t.frameTitle(n));
  }));
}

/* botón "Agenda una llamada" / "Book a call" → Calendly en el lightbox */
const book = document.getElementById('bookCall');
if (book) book.addEventListener('click', () => openLb('calendly', CALENDLY, t.bookTitle));
