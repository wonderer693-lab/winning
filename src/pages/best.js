import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { segments, SEGMENT_LABELS } from '../data/segments.js';
import { esc, truncate, windowAround } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import {
  toolsTable,
  toolCard,
  relatedGrid,
  verifiedStamp,
  pageHeader,
  noteBox,
} from '../lib/components.js';

export function bestIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Best for', path: '/best/' },
  ];
  const links = segments.map((s) => ({
    href: `/best/${s.slug}/`,
    label: s.title,
    note: `${tools.filter((t) => t.bestFor.includes(s.slug)).length} tools shortlisted`,
  }));
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: 'The best compliance software for your situation',
      lede: 'Generic "top 10" lists ignore why you are buying. These shortlists start from your company type, budget and framework reality.',
      meta: verifiedStamp(),
    })}
    ${relatedGrid('Shortlists by buyer type', links)}
  </div>`;
  return {
    path: '/best/',
    title: `Best compliance software by company type | ${site.name}`,
    description: truncate(
      `Shortlists for ${segments.map((s) => s.name).join(', ')}: honest picks with reported pricing for each buyer type.`,
      155
    ),
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function bestPage(segment) {
  const picks = tools.filter((t) => t.bestFor.includes(segment.slug));
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Best for', path: '/best/' },
    { name: SEGMENT_LABELS[segment.slug] ?? segment.name, path: `/best/${segment.slug}/` },
  ];

  const others = segments.filter((s) => s.slug !== segment.slug);
  const start = segments.findIndex((s) => s.slug === segment.slug) % others.length;
  const related = [
    ...windowAround(others, start, 4).map((s) => ({ href: `/best/${s.slug}/`, label: s.title })),
    { href: '/guides/choose-compliance-software/', label: 'How to choose compliance software' },
  ];

  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: segment.h1,
      lede: segment.lede,
      meta: verifiedStamp(),
    })}

    <section aria-labelledby="criteria-heading">
      <h2 id="criteria-heading">What actually matters here</h2>
      <ul class="criteria-list">
        ${segment.criteria.map((c) => `<li>${esc(c)}</li>`).join('')}
      </ul>
    </section>

    <section aria-labelledby="picks-heading">
      <h2 id="picks-heading">The shortlist</h2>
      <div class="card-grid">
        ${picks.map((t) => toolCard(t)).join('')}
      </div>
    </section>

    <section aria-labelledby="note-heading">
      <h2 id="note-heading">Our read on this segment</h2>
      <p class="body-copy">${esc(segment.note)}</p>
      ${noteBox('Reported ranges, not rate cards. Get direct quotes at your real headcount.', 'warn')}
    </section>

    ${relatedGrid('Other shortlists', related)}
  </div>`;

  return {
    path: `/best/${segment.slug}/`,
    title: `${segment.title} (${site.verifiedLabel}): ${picks.length} honest picks`,
    description: truncate(`${segment.lede}`, 155),
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function bestPages() {
  return [bestIndexPage(), ...segments.map(bestPage)];
}
