import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { frameworks } from '../data/frameworks.js';
import { esc, truncate } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import {
  toolsTable,
  faqBlock,
  faqSchema,
  relatedGrid,
  verifiedStamp,
  pageHeader,
  noteBox,
} from '../lib/components.js';

export function frameworksIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Frameworks', path: '/frameworks/' },
  ];
  const items = frameworks
    .map(
      (f) => `<li><a class="framework-card" href="/frameworks/${f.slug}/">
        <span class="framework-card__name">${esc(f.shortName)}</span>
        <span class="framework-card__sum">${esc(f.summary.slice(0, 140))}…</span>
      </a></li>`
    )
    .join('');
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: 'Compliance frameworks, explained plainly',
      lede: 'What each framework actually requires, who needs it, what it costs, and which tools handle it best. No legal theater, just the working details.',
      meta: verifiedStamp(),
    })}
    <ul class="framework-grid framework-grid--full">${items}</ul>
  </div>`;
  return {
    path: '/frameworks/',
    title: `Compliance frameworks explained: SOC 2, ISO 27001, HIPAA, more | ${site.name}`,
    description: `Plain-English guides to ${frameworks.map((f) => f.shortName).join(', ')}: requirements, costs, timelines and the best tools for each.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function frameworkPage(fw) {
  const supporting = tools.filter((t) => t.frameworks.includes(fw.slug));
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Frameworks', path: '/frameworks/' },
    { name: fw.shortName, path: `/frameworks/${fw.slug}/` },
  ];

  const related = [
    ...frameworks
      .filter((f) => f.slug !== fw.slug)
      .slice(0, 4)
      .map((f) => ({ href: `/frameworks/${f.slug}/`, label: `${f.shortName} software` })),
    { href: '/guides/choose-compliance-software/', label: 'How to choose compliance software' },
    { href: '/tools/', label: 'All tools compared' },
  ];

  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: `${fw.title}: requirements, costs and the best tools (${site.verifiedLabel})`,
      lede: fw.summary,
      meta: verifiedStamp(),
    })}

    <div class="facts-row">
      <div class="fact-box">
        <h2>Who needs it</h2>
        <p>${esc(fw.whoNeeds)}</p>
      </div>
      <div class="fact-box">
        <h2>Typical cost</h2>
        <p>${esc(fw.typicalCost)}</p>
      </div>
      <div class="fact-box">
        <h2>Typical timeline</h2>
        <p>${esc(fw.typicalTimeline)}</p>
      </div>
    </div>

    ${fw.body.map((p) => `<p class="body-copy">${esc(p)}</p>`).join('')}

    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading">Best ${esc(fw.shortName)} software</h2>
      <p>${supporting.length} tools we track support ${esc(fw.shortName)}. Reported pricing and coverage:</p>
      ${toolsTable(supporting, `Tools supporting ${fw.shortName}`)}
      ${noteBox('Framework support is self-reported by vendors and verified against documentation where possible. Depth varies: some tools map a handful of controls, others automate most evidence collection.', 'info')}
    </section>

    ${faqBlock(fw.faqs)}
    ${relatedGrid('Related frameworks and guides', related)}
  </div>`;

  return {
    path: `/frameworks/${fw.slug}/`,
    title: `${fw.title}: requirements, cost, best tools (${site.verifiedLabel})`,
    description: truncate(`${fw.summary} Cost, timeline, and the best ${fw.shortName} software compared.`, 155),
    body,
    schemas: [breadcrumbSchema(crumbItems), faqSchema(fw.faqs)],
  };
}

export function frameworkPages() {
  return [frameworksIndexPage(), ...frameworks.map(frameworkPage)];
}
