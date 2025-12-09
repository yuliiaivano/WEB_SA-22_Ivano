document.addEventListener('DOMContentLoaded', () => {
  const b = document.querySelector('.burger'), m = document.getElementById('headerMenu');
  if (!b || !m) return;
  let d = document.querySelector('.menu-backdrop') || (document.body.appendChild(Object.assign(document.createElement('div'), { className: 'menu-backdrop' })), document.querySelector('.menu-backdrop'));

  const set = s => {
    b.classList.toggle('open', s); m.classList.toggle('open', s);
    b.setAttribute('aria-expanded', s); m.setAttribute('aria-hidden', !s);
    d.classList.toggle('visible', s); document.body.style.overflow = s ? 'hidden' : '';
  };

  b.addEventListener('click', e => { e.stopPropagation(); set(!m.classList.contains('open')); });

  m.addEventListener('click', e => {
    const a = e.target.closest('.menu__link'); if (!a) return;
    e.preventDefault(); const href = a.getAttribute('href') || '';
    set(false);
    if (!href.startsWith('#')) return void (location.href = href);
    const t = document.getElementById(href.slice(1));
    setTimeout(() => t ? window.scrollTo({ top: Math.max(0, Math.floor(t.getBoundingClientRect().top + scrollY - ((document.querySelector('header')||{}).offsetHeight||0) - 12)), behavior: 'smooth' }) : window.location.hash = href, 120);
  });

  d.addEventListener('click', () => set(false));
  document.addEventListener('click', e => m.classList.contains('open') && !e.target.closest('.menu') && !e.target.closest('.burger') && set(false));
  document.addEventListener('keydown', e => e.key === 'Escape' && set(false));
  window.addEventListener('resize', () => innerWidth >= 1200 && set(false));
});
