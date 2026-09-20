import { site, monetization } from '../config.js';
import { esc } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import { pageHeader } from '../lib/components.js';

export function aboutPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
  ];
  const body = `<div class="container container--article">
    ${crumbs(crumbItems)}
    ${pageHeader({ h1: `About ${site.name}`, lede: site.tagline })}
    <p class="body-copy">${esc(site.name)} exists because buying compliance software is harder than it should be. Vendors hide pricing behind sales calls, every review site ranks whoever pays the most, and the honest answers live scattered across founder communities and Reddit threads. We collect that scattered information, check it, and publish it in one place.</p>
    <p class="body-copy">We are researchers, not resellers. Vendors cannot pay for rankings, verdicts or placement. Where a number comes from a buyer report rather than a public rate card, we say so. Where we are not sure, we say that too.</p>
    <h2>What we cover</h2>
    <p class="body-copy">Compliance automation platforms, GRC suites, vendor risk tools, trust centers and security questionnaire software, across SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, the EU AI Act, DORA and SOX.</p>
    <h2>Contact</h2>
    <p class="body-copy">Corrections, pricing reports from your own purchase, and research questions: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>. Vendor outreach is read but does not change rankings.</p>
  </div>`;
  return {
    path: '/about/',
    title: `About | ${site.name}`,
    description: `Who is behind ${site.name}, what we cover, and how vendors can and cannot influence our research.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function methodologyPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Methodology', path: '/methodology/' },
  ];
  const body = `<div class="container container--article">
    ${crumbs(crumbItems)}
    ${pageHeader({ h1: 'How we research', lede: 'Every number on this site has a source. This page explains what kind, and what each label means.' })}
    <h2>Where our data comes from</h2>
    <ul class="criteria-list">
      <li><strong>Vendor documentation.</strong> Feature coverage, framework lists and integration counts start from official docs and are spot-checked against the product where possible.</li>
      <li><strong>Buyer reports.</strong> Pricing in this category is mostly hidden. We collect reported quotes and renewals from buyer communities, founder networks and readers who share their invoices.</li>
      <li><strong>Review platforms.</strong> G2 and Capterra ratings are recorded as approximate snapshots and re-checked each data pass. We label them "approx" because they move.</li>
      <li><strong>Public filings and announcements.</strong> ARR, funding and customer counts come from company announcements and credible press, and are attributed as company-reported.</li>
    </ul>
    <h2>What "reported pricing" means</h2>
    <p class="body-copy">When a vendor publishes a rate card, we link it. When they do not, we publish a reported range and label it clearly. A reported range is a negotiation baseline from real buyer data points, not a quote. Your number will move with headcount, frameworks, contract length and timing.</p>
    <h2>How rankings and verdicts are made</h2>
    <p class="body-copy">Verdicts weigh fit, evidence depth, pricing behavior and support reputation, in that order. Brand size is noted but not rewarded by itself. No vendor sees a verdict before publication, and no vendor can pay to change one.</p>
    <h2 id="disclosure">Money and independence</h2>
    <p class="body-copy">${esc(monetization.disclosure)}</p>
    <h2>Corrections</h2>
    <p class="body-copy">Pricing and features change. If you spot something stale or wrong, email <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> with a source and we will fix it in the next data pass. Last full pass: ${esc(site.verifiedLabel)}.</p>
  </div>`;
  return {
    path: '/methodology/',
    title: `How we research | ${site.name}`,
    description: `Our data sources, what "reported pricing" means, how verdicts are made, and how ${site.name} stays independent.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function privacyPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Privacy', path: '/privacy/' },
  ];
  const body = `<div class="container container--article">
    ${crumbs(crumbItems)}
    ${pageHeader({ h1: 'Privacy policy', lede: 'The short version: this site collects almost nothing about you.' })}
    <h2>What we collect</h2>
    <p class="body-copy">This site is static. There are no accounts, no cookies for tracking, and no analytics that identify you. If we add privacy-respecting analytics later, they will measure page views, not people.</p>
    <h2>Email</h2>
    <p class="body-copy">If you email us, we keep your message only as long as needed to answer or act on it. We do not add you to lists, and we do not share your address.</p>
    <h2>Outbound links</h2>
    <p class="body-copy">Links to vendor sites are marked and may be sponsored in the future. Vendors see standard referral information in their own analytics when you click, which we do not control.</p>
    <h2>Changes</h2>
    <p class="body-copy">If this policy changes, the change appears on this page. Questions: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p>
  </div>`;
  return {
    path: '/privacy/',
    title: `Privacy policy | ${site.name}`,
    description: `What ${site.name} collects (almost nothing), how email is handled, and how outbound links work.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function notFoundPage() {
  const body = `<div class="container container--article">
    <div class="notfound">
      <p class="notfound__code">404</p>
      <h1>That page does not exist.</h1>
      <p class="body-copy">The link may be old, or the page moved in a restructure. The comparisons are still here:</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="/compare/">Compare tools</a>
        <a class="btn btn--ghost" href="/">Back to home</a>
      </div>
    </div>
  </div>`;
  return {
    path: '/404.html',
    title: `Page not found | ${site.name}`,
    description: 'This page does not exist.',
    body,
    noindex: true,
    schemas: [],
  };
}

export function staticPages() {
  return [aboutPage(), methodologyPage(), privacyPage(), notFoundPage()];
}
