const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const {parseHTML}=require('linkedom');
const root=path.join(__dirname,'..');
for(const [lang,file,price] of [['ro','index.html','Tarife în curând'],['en','en.html','Prices coming soon'],['fr','fr.html','Tarifs à venir'],['hu','hu.html','Árak hamarosan'],['de','de.html','Preise folgen']]){
 test(`${lang}: complete static content, local links, language navigation and consent integration`,()=>{
  const {document:d}=parseHTML(fs.readFileSync(path.join(root,file),'utf8'));
  assert.equal(d.documentElement.lang,lang);assert.equal(d.querySelectorAll('h1').length,1);assert.ok(d.querySelector('.pending').textContent===price);
  assert.equal(d.querySelector('#language option[selected]').value,file);assert.equal(d.querySelectorAll('.footer-languages a').length,5);
  assert.equal(d.querySelectorAll('link[hreflang]').length,6);
  for(const a of d.querySelectorAll('a[href^="#"]'))assert.ok(d.getElementById(a.getAttribute('href').slice(1)),a.outerHTML);
  for(const n of d.querySelectorAll('[src],link[href]:not([hreflang]):not([rel=canonical])')){const ref=n.getAttribute('src')||n.getAttribute('href');if(!ref.startsWith('http'))assert.ok(fs.existsSync(path.join(root,ref.split(/[?#]/)[0])),ref);}
  assert.equal(d.querySelectorAll('script[src="analytics.js"]').length,1);assert.equal(d.querySelector('#privacy'),null);
  if(lang!=='ro'){assert.ok(!d.body.textContent.includes('Tarife în curând'));assert.ok(!d.querySelector('meta[name=description]').content.includes('Patinoar'));assert.ok(!d.querySelector('img').alt.includes('Ilustrație'));}
 });
}
