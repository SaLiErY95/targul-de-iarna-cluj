/* Google Analytics is loaded only after an explicit statistics opt-in. */
(()=>{
'use strict';
const ID='G-FLSRTSDZ8H', KEY='winter-consent-v1', TTL=180*86400000;
const lang=document.documentElement.lang||'ro';
const cookiePath=window.location.pathname.slice(0,window.location.pathname.lastIndexOf('/')+1)||'/';
const copy={
ro:['Preferințe cookie-uri','Folosim Google Analytics doar cu acordul tău pentru a înțelege vizitele și interacțiunile cu tarifele, experiențele și harta. Alegerea ta este păstrată 180 de zile în acest browser.','Accept statisticile','Refuz statisticile','Detalii și preferințe','Închide','Cookie-uri și date','Statisticile sunt opționale. Site-ul funcționează și dacă le refuzi. După accept, Google Analytics primește date tehnice despre dispozitiv, pagini și acțiuni. Google poate procesa date și în afara Spațiului Economic European. Nu trimitem intenționat nume, adrese de e-mail, numere de telefon sau conținut introdus în formulare. Nu folosim Meta Pixel sau personalizarea reclamelor.','Cookie-urile Google winterfair_ga și winterfair_ga_* identifică browserul pentru statistici (durata configurată: maximum 180 de zile). Alegerea este salvată local în winter-consent-v1. Poți retrage acordul oricând de aici; colectarea este oprită și cookie-urile statistice accesibile sunt șterse. Datele deja trimise nu sunt șterse automat.','Politica Google de confidențialitate'],
en:['Cookie preferences','We use Google Analytics only with your permission to understand visits and interactions with the prices, experiences and map. Your choice is stored in this browser for 180 days.','Accept statistics','Reject statistics','Details and preferences','Close','Cookies and data','Statistics are optional. The site works if you reject them. After acceptance, Google Analytics receives technical device data, page views and actions. Google may process data outside the European Economic Area. We do not intentionally send names, email addresses, phone numbers or form contents. We do not use Meta Pixel or ad personalisation.','Google cookies winterfair_ga and winterfair_ga_* identify the browser for statistics (configured lifetime: up to 180 days). Your choice is stored locally in winter-consent-v1. You can withdraw consent here at any time; collection stops and accessible analytics cookies are deleted. Previously sent data is not automatically deleted.','Google privacy policy'],
fr:['Préférences de cookies','Nous utilisons Google Analytics uniquement avec votre accord pour comprendre les visites et les interactions avec les tarifs, les expériences et la carte. Votre choix est conservé 180 jours dans ce navigateur.','Accepter les statistiques','Refuser les statistiques','Détails et préférences','Fermer','Cookies et données','Les statistiques sont facultatives. Le site fonctionne en cas de refus. Après acceptation, Google Analytics reçoit des données techniques sur votre appareil, les pages et les actions. Google peut traiter les données hors de l’Espace économique européen. Nous n’envoyons intentionnellement ni noms, ni adresses e-mail, ni numéros de téléphone, ni contenu des formulaires. Nous n’utilisons ni Meta Pixel ni personnalisation publicitaire.','Les cookies Google winterfair_ga et winterfair_ga_* identifient le navigateur pour les statistiques (durée configurée : 180 jours maximum). Le choix est enregistré localement dans winter-consent-v1. Vous pouvez retirer votre accord ici à tout moment ; la collecte s’arrête et les cookies statistiques accessibles sont supprimés. Les données déjà envoyées ne sont pas supprimées automatiquement.','Politique de confidentialité Google'],
de:['Cookie-Einstellungen','Wir verwenden Google Analytics nur mit deiner Einwilligung, um Besuche und Interaktionen mit Preisen, Erlebnissen und Karte zu verstehen. Deine Wahl wird in diesem Browser 180 Tage gespeichert.','Statistik akzeptieren','Statistik ablehnen','Details und Einstellungen','Schließen','Cookies und Daten','Statistiken sind optional. Die Website funktioniert auch bei Ablehnung. Nach Zustimmung erhält Google Analytics technische Gerätedaten, Seitenaufrufe und Aktionen. Google kann Daten außerhalb des Europäischen Wirtschaftsraums verarbeiten. Wir senden bewusst keine Namen, E-Mail-Adressen, Telefonnummern oder Formularinhalte. Wir verwenden weder Meta Pixel noch personalisierte Werbung.','Google-Cookies winterfair_ga und winterfair_ga_* erkennen den Browser für Statistiken (konfigurierte Laufzeit: höchstens 180 Tage). Die Wahl wird lokal unter winter-consent-v1 gespeichert. Du kannst hier jederzeit widerrufen; die Erfassung stoppt und zugängliche Statistik-Cookies werden gelöscht. Bereits übermittelte Daten werden nicht automatisch gelöscht.','Google-Datenschutzerklärung'],
hu:['Sütibeállítások','A Google Analytics szolgáltatást csak az engedélyeddel használjuk a látogatások, az árak, az élmények és a térkép használatának megértésére. Választásodat 180 napig tároljuk ebben a böngészőben.','Statisztikák elfogadása','Statisztikák elutasítása','Részletek és beállítások','Bezárás','Sütik és adatok','A statisztikák opcionálisak. Az oldal elutasítás esetén is működik. Elfogadás után a Google Analytics technikai eszközadatokat, oldalmegtekintéseket és műveleteket kap. A Google az Európai Gazdasági Térségen kívül is kezelhet adatokat. Szándékosan nem továbbítunk neveket, e-mail-címeket, telefonszámokat vagy űrlaptartalmakat. Nem használunk Meta Pixelt vagy személyre szabott hirdetéseket.','A Google winterfair_ga és winterfair_ga_* sütik statisztikai célból azonosítják a böngészőt (beállított élettartam: legfeljebb 180 nap). A választást helyben, a winter-consent-v1 kulcs alatt tároljuk. A hozzájárulás itt bármikor visszavonható; az adatgyűjtés leáll, és a hozzáférhető statisztikai sütik törlődnek. A korábban elküldött adatok nem törlődnek automatikusan.','A Google adatvédelmi irányelvei']
}[lang]||null;
const c=copy; if(!c)return;
const validSections=new Set(['acasa','continut','experiente','tarife','vizita']);
let allowed=false,loaded=false;
function el(tag,text){const node=document.createElement(tag);if(text)node.textContent=text;return node;}
function eraseCookies(){
 const host=new URL(window.location.href).hostname, parts=window.location.pathname.split('/');
 const domains=['',host,'.'+host]; for(let i=1;i<host.split('.').length-1;i++)domains.push('.'+host.split('.').slice(i).join('.'));
 const paths=['/'];let path='';for(const part of parts.slice(1,-1)){path+='/'+part;paths.push(path,path+'/');}
 for(const entry of document.cookie.split(';')){const name=entry.trim().split('=')[0];if(!/^winterfair_ga(?:_|$)/.test(name))continue;
 for(const domain of domains)for(const p of paths)document.cookie=name+'=; Max-Age=0; path='+p+(domain?'; domain='+domain:'')+'; SameSite=Lax';}
}
function gtag(){window.dataLayer.push(arguments);}
function event(name,params={}){if(allowed)gtag('event',name,{...params,send_to:ID});}
function start(){
 allowed=true;window['ga-disable-'+ID]=false;if(loaded)return;loaded=true;
 window.dataLayer=window.dataLayer||[];
 gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 gtag('js',new Date());
 const clean=window.location.origin+window.location.pathname;
 let ref='';try{const u=new URL(document.referrer);ref=u.origin+u.pathname;}catch{}
 gtag('config',ID,{send_page_view:false,page_location:clean,page_referrer:ref,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false,cookie_prefix:'winterfair',cookie_path:cookiePath,cookie_domain:window.location.hostname||new URL(window.location.href).hostname});
 const s=el('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.append(s);
 event('page_view',{page_location:clean,page_referrer:ref,page_title:document.title,language:lang});
 observeSections();
}
const banner=el('section');banner.id='cookie-banner';banner.className='cookie-banner';banner.setAttribute('aria-label',c[0]);banner.hidden=true;
const title=el('h2',c[0]);banner.append(title,el('p',c[1]));
const buttons=el('div');buttons.className='cookie-actions';
function button(text,action){const b=el('button',text);b.type='button';b.dataset.consent=action;return b;}
buttons.append(button(c[2],'accept'),button(c[3],'reject'),button(c[4],'details'));banner.append(buttons);document.body.append(banner);
const details=el('dialog');details.id='cookie-details';details.className='cookie-details';details.setAttribute('aria-labelledby','cookie-details-title');
const h=el('h2',c[6]);h.id='cookie-details-title';details.append(h,el('p',c[7]),el('p',c[8]));
const policy=el('a',c[9]);policy.href='https://policies.google.com/privacy';policy.target='_blank';policy.rel='noopener noreferrer';details.append(policy);
const actions=el('div');actions.className='cookie-actions';actions.append(button(c[2],'accept'),button(c[3],'reject'),button(c[5],'close'));details.append(actions);document.body.append(details);
function close(){if(details.open)details.close();}
function choose(yes){const wasAllowed=allowed;allowed=yes;try{window.localStorage.setItem(KEY,JSON.stringify({analytics:yes,at:Date.now()}));}catch{}
 banner.hidden=true;close();if(yes)start();else{window['ga-disable-'+ID]=true;eraseCookies();if(wasAllowed)window.location.reload();}}
for(const b of document.querySelectorAll('[data-consent]'))b.addEventListener('click',()=>{
 const action=b.dataset.consent;if(action==='accept')choose(true);else if(action==='reject')choose(false);else if(action==='details')details.showModal();else close();
});
const privacy=document.querySelector('.privacy-open');if(privacy){privacy.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();details.showModal();},true);}
try{const saved=JSON.parse(window.localStorage.getItem(KEY));if(saved&&typeof saved.analytics==='boolean'&&Number.isFinite(saved.at)&&Date.now()-saved.at>=0&&Date.now()-saved.at<TTL){if(saved.analytics)start();else eraseCookies();}else{eraseCookies();banner.hidden=false;}}catch{banner.hidden=false;}
// Send only bounded public navigation identifiers, never user-entered values.

document.addEventListener('click',e=>{
 const node=e.target.closest?.('a,button');if(!node||node.closest('#cookie-banner,#cookie-details'))return;
 if(node.dataset.track==='map_open')event('map_open',{language:lang});
 else if(node.dataset.language)event('language_select',{language:lang,target_language:node.dataset.language});
 else if(node.tagName==='A'){
  const href=node.getAttribute('href')||'';
  if(href.startsWith('#')&&validSections.has(href.slice(1)))event('section_select',{section:href.slice(1),language:lang});
 }
});
document.addEventListener('change',e=>{
 if(e.target.id==='language'){
  const target={'index.html':'ro','en.html':'en','fr.html':'fr','hu.html':'hu','de.html':'de'}[e.target.value];
  if(target)event('language_select',{language:lang,target_language:target});
 }
},true);
function observeSections(){
 if(!window.IntersectionObserver)return;
 const observer=new window.IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting&&allowed){event('section_view',{section:entry.target.id,language:lang});observer.unobserve(entry.target);}
 },{threshold:.25});
 for(const id of ['experiente','tarife','vizita']){const section=document.getElementById(id);if(section)observer.observe(section);}
}
window.addEventListener('storage',e=>{if(e.key===KEY)window.location.reload();});
})();
