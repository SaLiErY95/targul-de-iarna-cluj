const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigatie');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true')));
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const language = document.querySelector('#language');
language.addEventListener('change', () => {
 const files = ['index.html', 'en.html', 'fr.html', 'hu.html', 'de.html'];
 if (files.includes(language.value)) window.location.assign(language.value + window.location.hash);
});
for (const link of document.querySelectorAll('[data-language]')) link.addEventListener('click', () => { link.hash = window.location.hash; });
