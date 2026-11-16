# Târgul de Iarnă Cluj
Site static, fără build sau servicii externe de tracking. GitHub Pages: main / root.

## De completat
- Perioada evenimentului.
- Tarife patinoar și carusel, condiții și eventuale servicii suplimentare confirmate.
- Oferta celor doi vendori.
- Domeniul final, apoi CNAME în GitHub Pages și DNS în Cloudflare.

Imaginile sunt concepte ilustrative generate, etichetate pe site. Nu reprezintă fotografii ale amenajării reale.
Fonturi locale Cormorant Garamond și Manrope, licențe în assets/fonts.

## Languages and statistics
RO / EN / FR / HU / DE are static pages. Edit templates/index.ro.html and locales/translations.json, then run `npm run build`. The generator refuses untranslated text nodes. Run `npm install` and `npm test` for the development checks.

Google Analytics: G-FLSRTSDZ8H, property “Târgul de Iarnă Cluj”, web stream 16353870639. Analytics loads only after statistics consent, valid for 180 days. Visitors can reopen preferences from the footer and withdraw consent. No Meta Pixel or advertising consent. Cookies use the winterfair prefix and the current site directory; consent uses winter-consent-v1.

Events: page_view, section_select, section_view, map_open, language_select. Page and referrer URLs exclude query strings and fragments. Enhanced measurement is disabled in the stream to avoid duplicate navigation events. Tracking is sent only to this site's property. After changing the public domain, update the stream URL and BASE in scripts/build-locales.py, then rebuild.
