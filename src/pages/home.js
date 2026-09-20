import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { frameworks } from '../data/frameworks.js';
import { pairs } from '../data/pairs.js';
import { guides } from '../data/guides.js';
import { esc } from '../lib/util.js';
import { toolCard, verifiedStamp } from '../lib/components.js';

export function homePage() {
  const featuredPairs = pairs.slice(0, 6);
  const featuredTools = tools.slice(0, 6);

  const body = `
  <section class="hero">
    <div class="container">
      <p class="hero__eyebrow">${verifiedStamp()}</p>
      <h1>Compliance software, compared honestly.</h1>
      <p class="hero__lede">SOC 2, ISO 27001, HIPAA and GRC tools with real pricing research, framework coverage and plain verdicts. No vendor pays for a ranking here.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="/compare/">Compare tools</a>
        <a class="btn btn--ghost" href="/frameworks/soc-2/">Start with SOC 2</a>
      </div>
      <dl class="hero__stats">
        <div><dt>${tools.length}</dt><dd>tools reviewed</dd></div>
        <div><dt>${frameworks.length}</dt><dd>frameworks covered</dd></div>
        <div><dt>${pairs.length}</dt><dd>head-to-head tests</dd></div>
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__head">
        <h2>Most-read comparisons</h2>
        <a class="section__more" href="/compare/">All ${pairs.length} comparisons</a>
      </div>
      <ul class="pair-grid">
        ${featuredPairs
          .map((p) => {
            const a = tools.find((t) => t.slug === p.a);
            const b = tools.find((t) => t.slug === p.b);
            return `<li><a class="pair-card" href="/compare/${p.slug}/">
              <span class="pair-card__names">${esc(a.name)} <em>vs</em> ${esc(b.name)}</span>
              <span class="pair-card__cats">${esc(a.category)} · ${esc(b.category)}</span>
            </a></li>`;
          })
          .join('')}
      </ul>
    </div>
  </section>

  <section class="section section--tinted">
    <div class="container">
      <div class="section__head">
        <h2>The tools, with reported pricing</h2>
        <a class="section__more" href="/tools/">All ${tools.length} tools</a>
      </div>
      <div class="card-grid">
        ${featuredTools.map((t) => toolCard(t)).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__head">
        <h2>Browse by framework</h2>
        <a class="section__more" href="/frameworks/">All frameworks</a>
      </div>
      <ul class="framework-grid">
        ${frameworks
          .map(
            (f) => `<li><a class="framework-card" href="/frameworks/${f.slug}/">
              <span class="framework-card__name">${esc(f.shortName)}</span>
              <span class="framework-card__sum">${esc(f.summary.slice(0, 110))}…</span>
            </a></li>`
          )
          .join('')}
      </ul>
    </div>
  </section>

  <section class="section section--tinted">
    <div class="container">
      <div class="section__head">
        <h2>From the guides</h2>
        <a class="section__more" href="/guides/">All guides</a>
      </div>
      <ul class="guide-grid">
        ${guides
          .map(
            (g) => `<li><a class="guide-card" href="/guides/${g.slug}/">
              <span class="guide-card__title">${esc(g.title)}</span>
              <span class="guide-card__lede">${esc(g.lede.slice(0, 120))}…</span>
            </a></li>`
          )
          .join('')}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="method-teaser">
        <h2>How we research</h2>
        <p>Vendors in this category hide pricing behind sales calls. We collect reported prices from buyer reports, community threads and demo quotes, then mark every number that is not from a public rate card. <a href="/methodology/">Read the full methodology</a>.</p>
      </div>
    </div>
  </section>`;

  return {
    path: '/',
    title: `${site.name}: compliance software, compared honestly`,
    description: site.description,
    body,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
        description: site.description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        email: site.email,
      },
    ],
  };
}
