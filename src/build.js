// Build script: renders every route to static HTML, copies assets,
// writes sitemap.xml, robots.txt and favicon. Zero dependencies.

import { mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './config.js';
import { layout } from './lib/layout.js';
import { isoDate } from './lib/util.js';

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

function outPathFor(path) {
  if (path.endsWith('.html')) return join(DIST, path.slice(1));
  return join(DIST, path.slice(1), 'index.html');
}

async function writeRoute(route) {
  const html = layout(route);
  const outPath = outPathFor(route.path);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

function sitemap(routes) {
  const today = isoDate();
  const urls = routes
    .filter((r) => !r.noindex && !r.path.endsWith('.html'))
    .map((r) => {
      const priority = r.path === '/' ? '1.0' : r.path.split('/').filter(Boolean).length === 1 ? '0.8' : '0.6';
      return `  <url>
    <loc>${site.url}${r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
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

  // Guardrails: duplicate paths and the page budget.
  const seen = new Set();
  for (const r of routes) {
    if (seen.has(r.path)) throw new Error(`Duplicate route: ${r.path}`);
    seen.add(r.path);
  }
  const indexable = routes.filter((r) => !r.noindex && !r.path.endsWith('.html'));
  if (indexable.length > PAGE_LIMIT) {
    throw new Error(`Page budget exceeded: ${indexable.length} > ${PAGE_LIMIT}. Trim routes or raise the limit deliberately.`);
  }

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  for (const route of routes) {
    await writeRoute(route);
  }

  await copyFile(join(ASSETS, 'styles.css'), join(DIST, 'assets', 'styles.css')).catch(async () => {
    await mkdir(join(DIST, 'assets'), { recursive: true });
    await copyFile(join(ASSETS, 'styles.css'), join(DIST, 'assets', 'styles.css'));
  });
  await copyFile(join(ASSETS, 'app.js'), join(DIST, 'assets', 'app.js'));
  await writeFile(join(DIST, 'favicon.svg'), FAVICON, 'utf8');
  await writeFile(join(DIST, 'sitemap.xml'), sitemap(routes), 'utf8');
  await writeFile(join(DIST, 'robots.txt'), robotsTxt(), 'utf8');

  const ms = Date.now() - started;
  console.log(`Done: ${routes.length} pages (${indexable.length} indexable, limit ${PAGE_LIMIT}) in ${ms}ms`);
  console.log(`Output: ${DIST}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
