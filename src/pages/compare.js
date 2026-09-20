import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { pairs } from '../data/pairs.js';
import { esc, truncate } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import {
  quickAnswer,
  vsTable,
  chooseIf,
  faqBlock,
  faqSchema,
  relatedGrid,
  verifiedStamp,
  pageHeader,
  noteBox,
} from '../lib/components.js';

const VS_ROWS = [
  ['Category', 'category'],
  ['Reported starting price', 'priceFrom'],
  ['Public pricing', (t) => (t.pricingPublic ? 'yes' : 'no')],
  ['Frameworks covered', 'frameworksCount'],
  ['Integrations', 'integrations'],
  ['Trust center', (t) => t.features.trustCenter],
  ['Questionnaire automation', (t) => t.features.questionnaires],
  ['Vendor risk module', (t) => t.features.vendorRisk],
  ['Continuous monitoring', (t) => t.features.continuousMonitoring],
  ['Audit support', (t) => t.features.auditSupport],
  ['G2 rating (approx)', (t) => `${t.g2.toFixed(1)} / 5`],
];

export function compareIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare/' },
  ];
  const items = pairs
    .map((p) => {
      const a = tools.find((t) => t.slug === p.a);
      const b = tools.find((t) => t.slug === p.b);
      return `<li><a class="pair-card" href="/compare/${p.slug}/">
        <span class="pair-card__names">${esc(a.name)} <em>vs</em> ${esc(b.name)}</span>
        <span class="pair-card__cats">${esc(a.category)} · ${esc(b.category)}</span>
      </a></li>`;
    })
    .join('');
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: `Head-to-head compliance software comparisons`,
      lede: `${pairs.length} honest matchups. Real pricing research, feature tables, and a plain verdict on who each tool actually fits.`,
      meta: verifiedStamp(),
    })}
    <ul class="pair-grid pair-grid--full">${items}</ul>
  </div>`;
  return {
    path: '/compare/',
    title: `Compare compliance software: ${pairs.length} head-to-head tests | ${site.name}`,
    description: `Head-to-head comparisons: ${pairs
      .slice(0, 4)
      .map((p) => {
        const a = tools.find((t) => t.slug === p.a);
        const b = tools.find((t) => t.slug === p.b);
        return `${a.name} vs ${b.name}`;
      })
      .join(', ')} and more.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function vsPage(pair) {
  const a = tools.find((t) => t.slug === pair.a);
  const b = tools.find((t) => t.slug === pair.b);
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare/' },
    { name: `${a.name} vs ${b.name}`, path: `/compare/${pair.slug}/` },
  ];

  const faqs = [
    {
      q: `Is ${a.name} or ${b.name} cheaper?`,
      a: `Neither publishes full pricing. Reported figures: ${a.name} starts around "${a.priceFrom.replace(/^Reported /, '')}", ${b.name} around "${b.priceFrom.replace(/^Reported /, '')}". Quotes move with headcount and frameworks, so compare total first-year cost including the audit, not the software line alone.`,
    },
    {
      q: `Which is better for a first SOC 2, ${a.name} or ${b.name}?`,
      a: `Both can get you there. ${a.name} fits teams that ${a.bestFor.includes('first-soc-2') ? 'are getting their first certification and want ' + a.tagline.toLowerCase() : 'match its strengths: ' + a.tagline.toLowerCase()}. ${b.name} fits teams that want ${b.tagline.toLowerCase()}. The auditor relationship and total cost usually decide it.`,
    },
    {
      q: `Can I switch from ${a.name} to ${b.name} later?`,
      a: 'Yes, and teams do. Plan for two to six weeks of parallel running, export your evidence history, and ask the new vendor about migration support. The certificate itself transfers; the evidence history needs rebuilding.',
    },
  ];

  const otherPairs = pairs
    .filter((p) => p.slug !== pair.slug && (p.a === a.slug || p.b === a.slug || p.a === b.slug || p.b === b.slug))
    .slice(0, 6)
    .map((p) => {
      const pa = tools.find((t) => t.slug === p.a);
      const pb = tools.find((t) => t.slug === p.b);
      return { href: `/compare/${p.slug}/`, label: `${pa.name} vs ${pb.name}` };
    });

  const related = [
    { href: `/tools/${a.slug}/`, label: `${a.name} review` },
    { href: `/tools/${b.slug}/`, label: `${b.name} review` },
    { href: `/alternatives/${a.slug}/`, label: `${a.name} alternatives` },
    { href: `/alternatives/${b.slug}/`, label: `${b.name} alternatives` },
    ...otherPairs,
  ];

  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: `${a.name} vs ${b.name}: an honest comparison (${site.verifiedLabel})`,
      lede: `${a.tagline} against ${b.tagline.toLowerCase()}. Reported pricing, feature depth, and a plain verdict.`,
      meta: verifiedStamp(),
    })}

    ${quickAnswer(`<p>${esc(pair.verdict.split('. ')[0])}. ${esc(pair.verdict.split('. ')[1] || '')}</p>`)}

    <section aria-labelledby="table-heading">
      <h2 id="table-heading">${esc(a.name)} vs ${esc(b.name)}: side by side</h2>
      ${vsTable(a, b, VS_ROWS)}
      ${noteBox('Feature marks reflect vendor documentation and our research. "Partial" means the capability exists with real limits. Pricing is reported, not from public rate cards.', 'info')}
    </section>

    <section aria-labelledby="verdict-heading">
      <h2 id="verdict-heading">The verdict</h2>
      <p>${esc(pair.verdict)}</p>
      ${chooseIf(a, pair.chooseA, b, pair.chooseB)}
    </section>

    <section aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">Pricing, honestly</h2>
      <p><strong>${esc(a.name)}:</strong> ${esc(a.pricingNote)}</p>
      <p><strong>${esc(b.name)}:</strong> ${esc(b.pricingNote)}</p>
      <p>More detail: <a href="/pricing/${a.slug}/">${esc(a.name)} pricing research</a> and <a href="/pricing/${b.slug}/">${esc(b.name)} pricing research</a>.</p>
    </section>

    ${faqBlock(faqs)}
    ${relatedGrid('Keep comparing', related)}
  </div>`;

  return {
    path: `/compare/${pair.slug}/`,
    title: `${a.name} vs ${b.name} (2026): pricing, features, honest verdict`,
    description: truncate(`${a.name} vs ${b.name}: ${pair.verdict}`, 155),
    body,
    schemas: [breadcrumbSchema(crumbItems), faqSchema(faqs)],
  };
}

export function comparePages() {
  return [compareIndexPage(), ...pairs.map(vsPage)];
}
