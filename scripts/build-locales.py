"""Build complete static language pages from one Romanian template (stdlib only)."""
import json
from html import escape
from html.parser import HTMLParser
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
LANGS = ['ro', 'en', 'fr', 'hu', 'de']
FILES = dict(zip(LANGS, ['index.html', 'en.html', 'fr.html', 'hu.html', 'de.html']))
NAMES = ['Română', 'English', 'Français', 'Magyar', 'Deutsch']
TRANSLATIONS = json.loads((ROOT / 'locales/translations.json').read_text())
BASE = 'https://saliery95.github.io/targul-de-iarna-cluj/'
LITERALS = {'01', '02', '10:00 — 22:00', '10:00', '—', '22:00', 'Horia Demian', 'CLUJ-NAPOCA'}
class Localize(HTMLParser):
    def __init__(self, lang):
        super().__init__(convert_charrefs=True)
        self.lang, self.out = lang, []
    def tr(self, text, required=False):
        key = text.strip()
        if key in TRANSLATIONS:
            result = key if self.lang == 'ro' else TRANSLATIONS[key][LANGS.index(self.lang)-1]
            return text[:len(text)-len(text.lstrip())] + result + text[len(text.rstrip()):]
        if required and key and key not in LITERALS and '{{' not in key:
            raise ValueError('Untranslated text: ' + repr(key))
        return text
    def handle_decl(self, decl): self.out.append('<!' + decl + '>')
    def handle_starttag(self, tag, attrs):
        values = []
        for name, value in attrs:
            if tag == 'html' and name == 'lang': value = self.lang
            elif value is not None and name in ('alt', 'aria-label'): value = self.tr(value, required=True)
            elif value is not None and tag == 'meta' and name == 'content':
                key = dict(attrs).get('name') or dict(attrs).get('property')
                value = self.tr(value, required=key in ('description', 'og:title', 'og:description'))
            values.append(' ' + name + ('' if value is None else '="' + escape(value, quote=True) + '"'))
        self.out.append('<' + tag + ''.join(values) + '>')
    def handle_endtag(self, tag): self.out.append('</' + tag + '>')
    def handle_data(self, data): self.out.append(escape(self.tr(data, required=True), quote=False))
    def handle_comment(self, data): self.out.append('<!--' + data + '-->')

# Inline vectors avoid platform-dependent emoji presentation (notably on iOS).
ICON_PATHS = {
    'STAR': 'M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9',
    'ARROW': 'M6 18L18 6M6 6h12v12',
    'DOWN': 'M12 4v16M6 14l6 6 6-6',
    'MENU': 'M4 6h16M4 12h16M4 18h16',
}
ICONS = {name: '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="' + path + '"></path></svg>' for name, path in ICON_PATHS.items()}

template = (ROOT / 'templates/index.ro.html').read_text()
for lang in LANGS:
    p = Localize(lang); p.feed(template)
    html = ''.join(p.out)
    options = ''.join(f'<option value="{FILES[l]}" lang="{l}"'+(' selected' if l == lang else '')+f'>{l.upper()}</option>' for l in LANGS)
    links = ''.join(f'<a href="{FILES[l]}" hreflang="{l}" lang="{l}" data-language="{l}"'+(' aria-current="page"' if l == lang else '')+f'>{NAMES[i]}</a>' for i,l in enumerate(LANGS))
    alternates = '\n'.join(f'<link rel="alternate" hreflang="{l}" href="{BASE}{FILES[l]}">' for l in LANGS)
    alternates += f'\n<link rel="alternate" hreflang="x-default" href="{BASE}"><link rel="canonical" href="{BASE}{FILES[lang]}">'
    html = html.replace('{{LANGUAGE_OPTIONS}}', options).replace('{{LANGUAGE_LINKS}}', links).replace('{{ALTERNATES}}', alternates)
    for name, svg in ICONS.items(): html = html.replace('{{' + name + '}}', svg)
    (ROOT / FILES[lang]).write_text(html)
print('Built RO, EN, FR, HU, DE: complete pages, metadata and accessible labels.')
