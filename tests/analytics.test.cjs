const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {parseHTML}=require('linkedom');
function page(lang='ro',saved){
 const {document}=parseHTML(`<html lang="${lang}"><head></head><body><button class="privacy-open">Cookies</button><a href="#tarife">Prices</a><a data-track="map_open" href="https://www.google.com/maps/search/?api=1&query=Horia">Map</a><select id="language"><option value="en.html">EN</option></select></body></html>`);
 const window={addEventListener:()=>{}};
 const storage=new Map(saved?[['winter-consent-v1',JSON.stringify(saved)]]:[]);
 window.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
 window.location={href:'https://example.com/fair/index.html?email=private@example.com',origin:'https://example.com',pathname:'/fair/index.html',reload:()=>{window.reloaded=true}};
 document.cookie='';document.referrer='https://example.org/?email=secret@example.org';
 vm.runInNewContext(fs.readFileSync(__dirname+'/../analytics.js','utf8'),{window,document,URL,Date,console,Set});
 return {window,document,storage};
}
test('all languages show translated consent and make no Google requests before opt-in',()=>{for(const lang of ['ro','en','fr','hu','de']){const {window,document}=page(lang);assert.equal(document.querySelectorAll('script[src*="google"]').length,0);assert.equal(window.dataLayer,undefined);assert.equal(document.querySelector('#cookie-banner').hidden,false);}});
test('accept sends one clean page view to the winter property with advertising disabled',()=>{
 const {window,document}=page();document.querySelector('[data-consent="accept"]').click();document.querySelector('[data-consent="accept"]').click();
 assert.equal(document.querySelectorAll('script[src*="google"]').length,1);
 assert.equal(window.dataLayer.filter(a=>a[0]==='event'&&a[1]==='page_view').length,1);
 assert.ok(!JSON.stringify(window.dataLayer).includes('private@'));assert.ok(!JSON.stringify(window.dataLayer).includes('secret@'));
 const config=window.dataLayer.find(a=>a[0]==='config');assert.equal(config[1],'G-FLSRTSDZ8H');assert.equal(config[2].cookie_prefix,'winterfair');assert.equal(config[2].cookie_path,'/fair/');
 assert.equal(window.dataLayer.find(a=>a[0]==='consent')[2].ad_storage,'denied');
});
test('reject, expired and malformed choices keep tracking blocked',()=>{
 const rejected=page();rejected.document.querySelector('[data-consent="reject"]').click();assert.equal(rejected.document.querySelectorAll('script[src*="google"]').length,0);
 for(const saved of [{analytics:true,at:Date.now()-181*86400000},{analytics:true,at:Date.now()+86400000},{analytics:'true',at:Date.now()}]){const {document}=page('en',saved);assert.equal(document.querySelectorAll('script[src*="google"]').length,0);assert.equal(document.querySelector('#cookie-banner').hidden,false);}
});
test('withdrawal stops collection and reloads, and no interactions are sent after refusal',()=>{
 const {window,document}=page('ro',{analytics:true,at:Date.now()});document.querySelector('[data-consent="reject"]').click();document.querySelector('a').click();assert.equal(window['ga-disable-G-FLSRTSDZ8H'],true);assert.equal(window.reloaded,true);assert.equal(window.dataLayer.filter(a=>a[1]==='section_select').length,0);
});
test('tariff and map clicks are recorded only after acceptance',()=>{
 const {window,document}=page();document.querySelector('a').click();assert.equal(window.dataLayer,undefined);document.querySelector('[data-consent="accept"]').click();document.querySelector('a').click();document.querySelector('[data-track="map_open"]').click();
 assert.equal(window.dataLayer.filter(a=>a[1]==='section_select'&&a[2].section==='tarife').length,1);assert.equal(window.dataLayer.filter(a=>a[1]==='map_open').length,1);
});
