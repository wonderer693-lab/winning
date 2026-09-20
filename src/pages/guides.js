import { site } from '../config.js';
import { guides } from '../data/guides.js';
import { esc, truncate } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import { faqBlock, faqSchema, relatedGrid, verifiedStamp, pageHeader } from '../lib/components.js';

export function guidesIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
  ];
  const items = guides
    .map(
      (g) => `<li><a class="guide-card" href="/guides/${g.slug}/">
        <span class="guide-card__title">${esc(g.title)}</span>
        <span class="guide-card__lede">${esc(g.lede)}</span>
      </a></li>`
    )
    .join('');
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: 'Compliance guides',
      lede: 'Long-form answers to the questions that come up in every compliance buying process. Written to be useful, not to rank and disappoint.',
      meta: verifiedStamp(),
    })}
    <ul class="guide-grid guide-grid--full">${items}</ul>
  </div>`;
  return {
    path: '/guides/',
    title: `Compliance guides: costs, choices, frameworks | ${site.name}`,
    description: truncate(`Practical guides: ${guides.map((g) => g.title).join('; ')}.`, 155),
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function guidePage(guide) {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: guide.title, path: `/guides/${guide.slug}/` },
  ];

  const related = [
    ...guides.filter((g) => g.slug !== guide.slug).map((g) => ({ href: `/guides/${g.slug}/`, label: g.title })),
    { href: '/tools/', label: 'All tools compared' },
    { href: '/pricing/', label: 'Reported pricing research' },
  ];

  const sections = guide.sections
    .map((s) => {
      const id = s.h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return `<section aria-labelledby="${esc(id)}">
        <h2 id="${esc(id)}">${esc(s.h)}</h2>
        ${s.body.map((p) => `<p class="body-copy">${esc(p)}</p>`).join('')}
      </section>`;
    })
    .join('');

  const body = `<div class="container container--article">
    ${crumbs(crumbItems)}
    <article>
      ${pageHeader({ h1: guide.h1, lede: guide.lede, meta: `${verifiedStamp()} · By ${esc(site.author)}` })}
      ${sections}
      ${faqBlock(guide.faqs)}
    </article>
    ${relatedGrid('Keep reading', related)}
  </div>`;

  return {
    path: `/guides/${guide.slug}/`,
    title: `${guide.title} | ${site.name}`,
    description: truncate(guide.description, 155),
    body,
    ogType: 'article',
    schemas: [
      breadcrumbSchema(crumbItems),
      faqSchema(guide.faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.h1,
        description: guide.description,
        author: { '@type': 'Organization', name: site.author },
        publisher: { '@type': 'Organization', name: site.name },
        datePublished: site.verifiedDate,
        dateModified: site.verifiedDate,
        mainEntityOfPage: `${site.url}/guides/${guide.slug}/`,
      },
    ],
  };
}

export function guidePages() {
  return [guidesIndexPage(), ...guides.map(guidePage)];
}
