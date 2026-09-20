// Build script: renders every route to static HTML, copies assets,
// writes sitemap.xml, robots.txt, favicon and the OG image. Zero
// dependencies. Fails loudly on duplicate routes, broken internal
// links, or a breached page budget.

import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './config.js';
import { layout } from './lib/layout.js';
import { renderOgImage } from './lib/og.js';
import { validateData } from './lib/validate.js';

import { homePage } from './pages/home.js';
import { toolPages } from './pages/tools.js';
import { alternativePages } from './pages/alternatives.js';
import { comparePages } from './pages/compare.js';
import { frameworkPages } from './pages/frameworks.js';
import { bestPages } from './pages/best.js';
import { pricingPages } from './pages/pricing.js';
import { guidePages } from './pages/guides.js';
import { staticPages } from './pages/static.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ASSETS = join(ROOT, 'assets');
const PAGE_LIMIT = 100;

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><rect x="1" y="1" width="24" height="24" rx="6" fill="#0d7a5f"/><path d="M8 13.2l3.2 3.2L18.4 9.6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

// Files that exist in dist/ but are not routes, so the link checker
// accepts references to them.
const STATIC_FILES = new Set([
  '/assets/styles.css',
  '/assets/app.js',
  '/favicon.svg',
  '/og-image.png',
  '/sitemap.xml',
  '/robots.txt',
]);

function outPathFor(path) {
  if (path.endsWith('.html')) return join(DIST, path.slice(1));
  return join(DIST, path.slice(1), 'index.html');
}

async function writeRoute(route, html) {
  const outPath = outPathFor(route.path);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

function sitemap(routes) {
  const urls = routes
    .filter((r) => !r.noindex && !r.path.endsWith('.html'))
    .map((r) => {
      const priority = r.path === '/' ? '1.0' : r.path.split('/').filter(Boolean).length === 1 ? '0.8' : '0.6';
      return `  <url>
    <loc>${site.url}${r.path}</loc>
    <lastmod>${r.lastmod || site.verifiedDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
}

async function build() {
  const started = Date.now();
  console.log('Building', site.name, '...');

  // Data first: an invalid edit fails the build here with a precise
  // error, before a single page is rendered.
  validateData();

  const routes = [
    homePage(),
    ...toolPages(),
    ...alternativePages(),
    ...comparePages(),
    ...frameworkPages(),
    ...bestPages(),
    ...pricingPages(),
    ...guidePages(),
    ...staticPages(),
  ];

  // Guardrail: duplicate paths.
  const seen = new Set();
  for (const r of routes) {
    if (seen.has(r.path)) throw new Error(`Duplicate route: ${r.path}`);
    seen.add(r.path);
  }

  // Guardrail: page budget counts indexable pages only.
  const indexable = routes.filter((r) => !r.noindex);
  if (indexable.length > PAGE_LIMIT) {
    throw new Error(`Page budget exceeded: ${indexable.length} > ${PAGE_LIMIT}. Trim routes or raise the limit deliberately.`);
  }

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  // Render every route, checking each internal link against the route
  // list as we go. Guardrail: a broken link fails the build.
  const routePaths = new Set(routes.map((r) => r.path));
  const missing = new Set();
  let linkCount = 0;
  for (const route of routes) {
    const html = layout(route);
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      linkCount++;
      if (!routePaths.has(m[1]) && !STATIC_FILES.has(m[1])) missing.add(`${route.path} -> ${m[1]}`);
    }
    await writeRoute(route, html);
  }
  if (missing.size) {
    throw new Error(`Broken internal links (${missing.size}):\n  ${[...missing].join('\n  ')}`);
  }

  await cp(ASSETS, join(DIST, 'assets'), { recursive: true });
  await writeFile(join(DIST, 'favicon.svg'), FAVICON, 'utf8');
  await writeFile(join(DIST, 'og-image.png'), renderOgImage());
  await writeFile(join(DIST, 'sitemap.xml'), sitemap(routes), 'utf8');
  await writeFile(join(DIST, 'robots.txt'), robotsTxt(), 'utf8');

  const ms = Date.now() - started;
  console.log(`Done: ${routes.length} pages (${indexable.length} indexable, limit ${PAGE_LIMIT}) in ${ms}ms`);
  console.log(`Checked ${linkCount} internal links, 0 broken`);
  console.log(`Output: ${DIST}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
