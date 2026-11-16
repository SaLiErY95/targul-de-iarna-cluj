const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigatie');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true')));
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const privacy = document.querySelector('#privacy');
document.querySelector('.privacy-open').addEventListener('click', () => privacy.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => privacy.close());
privacy.addEventListener('click', event => { if (event.target === privacy) { const box = privacy.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) privacy.close(); } });
