import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { frameworks } from '../data/frameworks.js';
import { pairs } from '../data/pairs.js';
import { SEGMENT_LABELS, audiencePhrase } from '../data/segments.js';
import { esc, lowerFirst, truncate } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import {
  toolsTable,
  scorePill,
  verifiedStamp,
  prosCons,
  visitCta,
  frameworkChips,
  relatedGrid,
  faqBlock,
  faqSchema,
  pageHeader,
  noteBox,
} from '../lib/components.js';

export function toolsIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools/' },
  ];
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: `All ${tools.length} compliance and security tools, reviewed`,
      lede: 'Every tool we track, with reported pricing, framework coverage and honest strengths and weaknesses. Sorted by category relevance, not by who pays us. Nobody pays us.',
      meta: verifiedStamp(),
    })}
    ${toolsTable(tools, 'Compliance and security software compared')}
  </div>`;
  return {
    path: '/tools/',
    title: `All ${tools.length} compliance tools reviewed (${site.verifiedLabel}) | ${site.name}`,
    description: `Reported pricing, framework coverage and honest reviews for ${tools.map((t) => t.name).slice(0, 5).join(', ')} and ${tools.length - 5} more compliance tools.`,
    body,
    schemas: [
      breadcrumbSchema(crumbItems),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: tools.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          url: `${site.url}/tools/${t.slug}/`,
        })),
      },
    ],
  };
}

export function toolProfilePage(tool) {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools/' },
    { name: tool.name, path: `/tools/${tool.slug}/` },
  ];

  const toolPairs = pairs.filter((p) => p.a === tool.slug || p.b === tool.slug);
  const pairLinks = toolPairs.map((p) => {
    const other = tools.find((t) => t.slug === (p.a === tool.slug ? p.b : p.a));
    return { href: `/compare/${p.slug}/`, label: `${tool.name} vs ${other.name}` };
  });

  const facts = [
    ['Category', tool.category],
    ['Founded', String(tool.founded)],
    ['Headquarters', tool.hq],
    ['Customers', tool.customers],
    ['Frameworks', tool.frameworksCount],
    ['Integrations', tool.integrations],
    ['Public pricing', tool.pricingPublic ? 'Yes' : 'No, reported only'],
  ];

  const faqs = [
    {
      q: `How much does ${tool.name} cost?`,
      a: `${tool.pricingPublic ? 'Pricing is partly public. ' : 'It does not publish a full rate card. '}${tool.pricingNote}`,
    },
    {
      q: `What is ${tool.name} best for?`,
      a: `${tool.name} suits ${audiencePhrase(tool)}. The main draw: ${lowerFirst(tool.strengths[0])}. See the alternatives page for the closest rivals.`,
    },
  ];

  const body = `<div class="container">
    ${crumbs(crumbItems)}
    <div class="profile">
      <div class="profile__main">
        <header class="profile__head">
          <div>
            <h1>${esc(tool.name)} review</h1>
            <p class="profile__tagline">${esc(tool.tagline)}</p>
          </div>
          ${scorePill(tool.g2, tool.g2Note)}
        </header>
        <p class="profile__meta-line">${verifiedStamp()} · ${esc(tool.g2Note)}</p>

        <div class="profile__summary">
          <p>${esc(tool.summary)}</p>
        </div>

        <section aria-labelledby="facts-heading">
          <h2 id="facts-heading">${esc(tool.name)} at a glance</h2>
          <dl class="facts">
            ${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>
          <p class="fine-print">${esc(tool.scaleNote)}</p>
        </section>

        <section aria-labelledby="pricing-heading">
          <h2 id="pricing-heading">${esc(tool.name)} pricing</h2>
          <p class="price-line">${esc(tool.priceFrom)}</p>
          <p>${esc(tool.pricingNote)}</p>
          ${noteBox(`Reported pricing, not a public rate card. Your quote depends on headcount, frameworks and negotiation. <a href="/pricing/${tool.slug}/">Full ${esc(tool.name)} pricing research</a>.`, 'warn')}
        </section>

        <section aria-labelledby="frameworks-heading">
          <h2 id="frameworks-heading">Frameworks covered</h2>
          ${frameworkChips(tool.frameworks, frameworks)}
        </section>

        <section aria-labelledby="proscons-heading">
          <h2 id="proscons-heading">Strengths and weaknesses</h2>
          ${prosCons(tool.strengths, tool.weaknesses)}
        </section>

        ${pairLinks.length ? relatedGrid(`${esc(tool.name)} comparisons`, pairLinks) : ''}
        ${faqBlock(faqs)}
      </div>

      <aside class="profile__side">
        <div class="side-card">
          <h2 class="side-card__title">Quick facts</h2>
          <dl class="side-facts">
            <div><dt>Best for</dt><dd>${tool.bestFor
              .map((s) => `<a href="/best/${s}/">${esc(SEGMENT_LABELS[s] ?? s)}</a>`)
              .join(', ')}</dd></div>
            <div><dt>Price</dt><dd>${esc(tool.priceFrom)}</dd></div>
            <div><dt>G2 rating</dt><dd>${esc(tool.g2.toFixed(1))} (approx)</dd></div>
          </dl>
          ${visitCta(tool)}
          <div class="side-card__links">
            <a href="/alternatives/${tool.slug}/">${esc(tool.name)} alternatives</a>
            <a href="/pricing/${tool.slug}/">${esc(tool.name)} pricing</a>
          </div>
        </div>
      </aside>
    </div>
  </div>`;

  return {
    path: `/tools/${tool.slug}/`,
    title: `${tool.name} review: pricing, frameworks, pros and cons (${site.verifiedLabel})`,
    description: truncate(`${tool.name} review: ${tool.summary}`, 155),
    body,
    schemas: [
      breadcrumbSchema(crumbItems),
      faqSchema(faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: tool.name,
        description: tool.summary,
        category: tool.category,
        brand: { '@type': 'Brand', name: tool.name },
        url: `${site.url}/tools/${tool.slug}/`,
      },
    ],
  };
}

export function toolPages() {
  return [toolsIndexPage(), ...tools.map(toolProfilePage)];
}
