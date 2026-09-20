import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { esc, truncate } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import {
  faqBlock,
  faqSchema,
  relatedGrid,
  verifiedStamp,
  pageHeader,
  noteBox,
  visitCta,
} from '../lib/components.js';

// Tools with a dedicated pricing research page.
const PRICING_TARGETS = [
  'vanta',
  'drata',
  'secureframe',
  'sprinto',
  'thoropass',
  'hyperproof',
  'scytale',
  'delve',
  'onetrust',
  'upguard',
];

export function pricingIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing/' },
  ];
  const rows = PRICING_TARGETS.map((slug) => {
    const t = tools.find((x) => x.slug === slug);
    return `<tr>
      <th scope="row"><a href="/pricing/${t.slug}/">${esc(t.name)} pricing</a></th>
      <td>${esc(t.priceFrom)}</td>
      <td>${t.pricingPublic ? 'Yes' : 'No'}</td>
    </tr>`;
  }).join('');
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: 'Compliance software pricing, researched',
      lede: 'Most vendors in this category hide pricing behind sales calls. We collect reported prices from buyer reports, community threads and demo quotes, and mark every number that is not official.',
      meta: verifiedStamp(),
    })}
    <div class="table-scroll" data-table-scroll>
      <table class="data-table">
        <caption>Reported starting prices, ${esc(site.verifiedLabel)}</caption>
        <thead>
          <tr><th scope="col">Tool</th><th scope="col">Reported starting price</th><th scope="col">Public rate card</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${noteBox('Treat every figure as a negotiation starting point, not a quote. Headcount, frameworks, contract length and timing all move the real number.', 'warn')}
  </div>`;
  return {
    path: '/pricing/',
    title: `Compliance software pricing: reported costs for ${PRICING_TARGETS.length} tools | ${site.name}`,
    description: `Reported pricing for ${PRICING_TARGETS.map((s) => tools.find((t) => t.slug === s).name).slice(0, 6).join(', ')} and more. What compliance software actually costs.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function pricingPage(tool) {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing/' },
    { name: `${tool.name} pricing`, path: `/pricing/${tool.slug}/` },
  ];

  const rivals = tools.filter((t) => t.slug !== tool.slug && t.category === tool.category).slice(0, 4);

  const faqs = [
    {
      q: `How much does ${tool.name} cost?`,
      a: `${tool.name} does not publish a full rate card. ${tool.pricingNote}`,
    },
    {
      q: `Does ${tool.name} have a free trial?`,
      a: 'Most vendors in this category offer a demo rather than a self-serve trial, because onboarding means connecting your cloud and identity systems. Ask for a scoped pilot on your own stack before signing an annual contract.',
    },
    {
      q: `How do I negotiate a better ${tool.name} price?`,
      a: 'Three levers work consistently: get competing quotes from two rivals, sign near quarter-end when sales teams are flexible, and lock a renewal cap in writing at your expected headcount for month 12. Multi-year deals discount 10 to 20 percent but only make sense with that cap.',
    },
  ];

  const related = [
    { href: `/tools/${tool.slug}/`, label: `${tool.name} review` },
    { href: `/alternatives/${tool.slug}/`, label: `${tool.name} alternatives` },
    ...rivals.map((t) => ({ href: `/pricing/${t.slug}/`, label: `${t.name} pricing` })),
    { href: '/guides/soc-2-cost/', label: 'Full SOC 2 cost breakdown' },
  ];

  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: `${tool.name} pricing: what it really costs (${site.verifiedLabel})`,
      lede: `${tool.name} ${tool.pricingPublic ? 'publishes some pricing' : 'hides pricing behind sales calls'}. Here is what buyers actually report paying, and how to land a better number.`,
      meta: verifiedStamp(),
    })}

    <section aria-labelledby="reported-heading">
      <h2 id="reported-heading">Reported pricing</h2>
      <p class="price-line">${esc(tool.priceFrom)}</p>
      <p>${esc(tool.pricingNote)}</p>
      ${noteBox('This is reported pricing from buyer reports and community threads, re-checked each data pass. It is a negotiation baseline, not a quote.', 'warn')}
    </section>

    <section aria-labelledby="drivers-heading">
      <h2 id="drivers-heading">What moves your quote</h2>
      <ul class="criteria-list">
        <li><strong>Headcount.</strong> Most platforms price by employee count, because that proxies for devices, accounts and controls in scope. A hiring year can move you a tier.</li>
        <li><strong>Frameworks.</strong> SOC 2 alone is the entry tier. Adding ISO 27001, HIPAA or PCI DSS adds real money at most vendors.</li>
        <li><strong>Modules.</strong> Trust centers, vendor risk and questionnaire automation are often separate line items.</li>
        <li><strong>The audit itself.</strong> Software is not the audit. Budget $10,000 to $30,000 for a SOC 2 Type II audit from a CPA firm unless you buy a bundle like Thoropass.</li>
      </ul>
    </section>

    <section aria-labelledby="compare-heading">
      <h2 id="compare-heading">How rivals compare</h2>
      <div class="table-scroll" data-table-scroll>
        <table class="data-table">
          <thead><tr><th scope="col">Tool</th><th scope="col">Reported starting price</th><th scope="col">G2 (approx)</th></tr></thead>
          <tbody>
            <tr class="row-current">
              <th scope="row">${esc(tool.name)}</th>
              <td>${esc(tool.priceFrom)}</td>
              <td>${esc(tool.g2.toFixed(1))}</td>
            </tr>
            ${rivals
              .map(
                (r) => `<tr>
                  <th scope="row"><a href="/pricing/${r.slug}/">${esc(r.name)}</a></th>
                  <td>${esc(r.priceFrom)}</td>
                  <td>${esc(r.g2.toFixed(1))}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section aria-labelledby="negotiate-heading">
      <h2 id="negotiate-heading">Negotiation notes</h2>
      <p class="body-copy">Get two competing quotes before you talk numbers with anyone. Vendors in this category expect negotiation, and a written rival quote is the single strongest lever you have. Sign near quarter-end if you can. Whatever you agree, get the renewal cap in writing: the expensive surprise is rarely year one, it is the year-two renewal at a higher headcount tier.</p>
      ${visitCta(tool)}
    </section>

    ${faqBlock(faqs)}
    ${relatedGrid('Keep researching', related)}
  </div>`;

  return {
    path: `/pricing/${tool.slug}/`,
    title: `${tool.name} pricing (${site.verifiedLabel}): what buyers really pay`,
    description: truncate(`${tool.name} pricing research: ${tool.pricingNote}`, 155),
    body,
    schemas: [breadcrumbSchema(crumbItems), faqSchema(faqs)],
  };
}

export function pricingPages() {
  return [
    pricingIndexPage(),
    ...PRICING_TARGETS.map((slug) => pricingPage(tools.find((t) => t.slug === slug))),
  ];
}
