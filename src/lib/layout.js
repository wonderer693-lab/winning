import { esc, jsonLd } from './util.js';
import { site, monetization } from '../config.js';

const NAV = [
  { href: '/compare/', label: 'Compare' },
  { href: '/alternatives/', label: 'Alternatives' },
  { href: '/frameworks/', label: 'Frameworks' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/best/', label: 'Best for' },
  { href: '/guides/', label: 'Guides' },
];

function logo() {
  return `<a class="logo" href="/" aria-label="${esc(site.name)} home">
    <svg class="logo__mark" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="23" height="23" rx="6" fill="var(--accent)"/>
      <path d="M8 13.2l3.2 3.2L18.4 9.6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="logo__word">${esc(site.name)}</span>
  </a>`;
}

function header(activePath) {
  const links = NAV.map(
    (item) =>
      `<a href="${item.href}"${activePath.startsWith(item.href) ? ' aria-current="page"' : ''}>${esc(item.label)}</a>`
  ).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container site-header__inner">
      ${logo()}
      <nav class="site-nav" id="site-nav" aria-label="Primary">${links}</nav>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
        <span class="nav-toggle__bar"></span>
        <span class="sr-only">Menu</span>
      </button>
    </div>
  </header>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          ${logo()}
          <p>${esc(site.tagline)} Independent research on compliance and security software. Pricing marked "reported" comes from buyer reports, not vendor rate cards.</p>
        </div>
        <nav class="site-footer__col" aria-label="Compare">
          <h2>Compare</h2>
          <a href="/compare/vanta-vs-drata/">Vanta vs Drata</a>
          <a href="/compare/vanta-vs-sprinto/">Vanta vs Sprinto</a>
          <a href="/compare/secureframe-vs-sprinto/">Secureframe vs Sprinto</a>
          <a href="/compare/">All comparisons</a>
        </nav>
        <nav class="site-footer__col" aria-label="Frameworks">
          <h2>Frameworks</h2>
          <a href="/frameworks/soc-2/">SOC 2</a>
          <a href="/frameworks/iso-27001/">ISO 27001</a>
          <a href="/frameworks/hipaa/">HIPAA</a>
          <a href="/frameworks/">All frameworks</a>
        </nav>
        <nav class="site-footer__col" aria-label="Company">
          <h2>Company</h2>
          <a href="/about/">About</a>
          <a href="/methodology/">How we research</a>
          <a href="/tools/">All tools</a>
          <a href="/privacy/">Privacy</a>
        </nav>
      </div>
      <div class="site-footer__base">
        <p>© ${year} ${esc(site.name)}. ${esc(monetization.disclosure)}</p>
      </div>
    </div>
  </footer>`;
}

export function layout({
  title,
  description,
  path,
  body,
  schemas = [],
  noindex = false,
  ogType = 'website',
}) {
  const canonical = `${site.url}${path}`;
  const schemaHtml = schemas.map((s) => jsonLd(s)).join('\n    ');
  return `<!doctype html>
<html lang="${site.language}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0d7a5f">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${canonical}">
    ${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
    <meta property="og:site_name" content="${esc(site.name)}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${site.url}/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${site.url}/og-image.png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <script>document.documentElement.classList.add('js');</script>
    <link rel="stylesheet" href="/assets/styles.css">
    ${schemaHtml}
  </head>
  <body>
    ${header(path)}
    <main id="main">
      ${body}
    </main>
    ${footer()}
    <script src="/assets/app.js" defer></script>
  </body>
</html>`;
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function crumbs(items) {
  const parts = items.map((item, i) => {
    const last = i === items.length - 1;
    return last
      ? `<li aria-current="page">${esc(item.name)}</li>`
      : `<li><a href="${item.path}">${esc(item.name)}</a></li>`;
  });
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${parts.join('')}</ol></nav>`;
}
