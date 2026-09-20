import { site } from '../config.js';
import { tools } from '../data/tools.js';
import { esc, lowerFirst, truncate } from '../lib/util.js';
import { crumbs, breadcrumbSchema } from '../lib/layout.js';
import {
  quickAnswer,
  toolsTable,
  faqBlock,
  faqSchema,
  relatedGrid,
  verifiedStamp,
  pageHeader,
  noteBox,
} from '../lib/components.js';

// Tools that get a dedicated alternatives page. Every tool in the dataset
// is listed here, so links from profiles and tables always resolve.
const ALTERNATIVE_TARGETS = [
  'vanta',
  'drata',
  'secureframe',
  'sprinto',
  'thoropass',
  'hyperproof',
  'scytale',
  'delve',
  'onetrust',
  'auditboard',
  'logicgate',
  'upguard',
  'conveyor',
  'safebase',
  'whistic',
];

// Hand-written switching context per target: why people actually leave.
const SWITCH_CONTEXT = {
  vanta:
    'The usual triggers are renewal quotes that jumped with headcount, a feeling that the platform optimizes for checkbox compliance rather than real security work, or a first quote that simply did not fit a seed-stage budget.',
  drata:
    'Teams look elsewhere when tier pricing jumps, when post-acquisition packaging confused their renewal, or when a smaller, cheaper platform covers everything they actually use.',
  secureframe:
    'Switching searches here are usually about brand weight: a big customer asked why they are not on Vanta or Drata, or the team wants deeper AI questionnaire automation.',
  sprinto:
    'Teams outgrow Sprinto when they need a larger US auditor network, deeper enterprise features, or a brand their Fortune 500 buyers recognize on sight.',
  thoropass:
    'The common trigger is the bundle itself: teams that want to choose their own auditor, or whose board wants auditor independence, start looking at unbundled platforms.',
  hyperproof:
    'Hyperproof buyers rarely complain about capability. They look for alternatives when the price and implementation effort outweigh what a smaller team can use.',
  scytale:
    'Teams look beyond Scytale when they need a bigger integration ecosystem, more enterprise references, or a platform their auditors already know well.',
  delve:
    'As the newest platform in this category, Delve loses deals when buyers want a longer track record, a bigger auditor network, or enterprise features like multi-entity management.',
  onetrust:
    'OneTrust switching searches are about weight and cost: teams that bought an enterprise privacy suite for a SOC 2 problem find it heavy, slow and priced for a different buyer.',
  upguard:
    'Teams look for UpGuard alternatives when vendor risk pricing grows with vendor count, or when they realize they need internal compliance automation, not third-party monitoring.',
  conveyor:
    'Conveyor users look elsewhere when per-room and per-seat costs add up, or when they want questionnaire automation bundled inside a full compliance platform.',
  safebase:
    'Since the Drata acquisition, SafeBase switching searches are mostly standalone customers asking what happens to their plan, and whether Conveyor or a platform-native trust center fits better.',
  auditboard:
    'Switching searches here come from growth-stage teams that were sold an enterprise audit suite: too much platform, too much implementation, and enterprise pricing. Public companies running SOX rarely leave; teams that bought it for a first SOC 2 usually do.',
  logicgate:
    'Teams leave LogicGate when the configuration effort outgrows the need. Risk Cloud rewards organizations with mature, custom risk processes and punishes everyone else with a build project, so buyers who wanted a working program in weeks look at packaged platforms.',
  whistic:
    'Whistic buyers look elsewhere when vendor review volume is low and the exchange network does not cover their actual suppliers, or when they realize they need internal compliance automation alongside third-party reviews.',
};

// Rank replacements: same category first, then by shared framework
// coverage, breaking ties by circular distance from the target. The
// distance tie-break rotates each page's shortlist so tables do not
// repeat the same rows in the same order across 15 pages.
function alternativesFor(target) {
  const n = tools.length;
  const idx = tools.findIndex((t) => t.slug === target.slug);
  const overlap = (t) => t.frameworks.filter((f) => target.frameworks.includes(f)).length;
  const distance = (t) => {
    const i = tools.findIndex((x) => x.slug === t.slug);
    const d = Math.abs(i - idx);
    return Math.min(d, n - d);
  };
  const sameCat = tools.filter((t) => t.slug !== target.slug && t.category === target.category);
  const others = tools
    .filter((t) => t.slug !== target.slug && t.category !== target.category)
    .sort((x, y) => overlap(y) - overlap(x) || distance(x) - distance(y));
  return [...sameCat, ...others].slice(0, 8);
}

export function alternativesIndexPage() {
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Alternatives', path: '/alternatives/' },
  ];
  const links = ALTERNATIVE_TARGETS.map((slug) => {
    const t = tools.find((x) => x.slug === slug);
    return { href: `/alternatives/${slug}/`, label: `${t.name} alternatives`, note: t.category };
  });
  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: 'Compliance software alternatives',
      lede: 'Thinking about switching? Each page covers why teams leave, the best replacements with reported pricing, and who each replacement actually fits.',
      meta: verifiedStamp(),
    })}
    ${relatedGrid('Browse alternatives by tool', links)}
  </div>`;
  return {
    path: '/alternatives/',
    title: `Compliance software alternatives: switching guides | ${site.name}`,
    description: `Alternatives to ${ALTERNATIVE_TARGETS.map((s) => tools.find((t) => t.slug === s).name).slice(0, 6).join(', ')} and more, with reported pricing and honest fit guidance.`,
    body,
    schemas: [breadcrumbSchema(crumbItems)],
  };
}

export function alternativePage(target) {
  const alts = alternativesFor(target);
  const context = SWITCH_CONTEXT[target.slug];
  const crumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Alternatives', path: '/alternatives/' },
    { name: `${target.name} alternatives`, path: `/alternatives/${target.slug}/` },
  ];

  const faqs = [
    {
      q: `What is the best alternative to ${target.name}?`,
      a: `For most teams leaving ${target.name}, the closest like-for-like replacements are ${alts
        .slice(0, 3)
        .map((t) => t.name)
        .join(', ')}.`,
    },
    {
      q: `Is it hard to switch away from ${target.name}?`,
      a: `Budget two to six weeks of parallel running: evidence history rebuilds in the new platform, and both ${alts[0].name} and ${alts[1].name} offer migration help.`,
    },
    {
      q: `What do ${target.name} users complain about most?`,
      a: `${target.weaknesses[2]}`,
    },
  ];

  const related = [
    { href: `/tools/${target.slug}/`, label: `${target.name} review` },
    { href: `/pricing/${target.slug}/`, label: `${target.name} pricing` },
    ...alts.slice(0, 4).map((t) => ({ href: `/tools/${t.slug}/`, label: `${t.name} review` })),
  ];

  const body = `<div class="container">
    ${crumbs(crumbItems)}
    ${pageHeader({
      h1: `The best ${target.name} alternatives (${site.verifiedLabel})`,
      lede: `Why teams switch from ${target.name}, and the ${alts.length} replacements worth your shortlist, with reported pricing for each.`,
      meta: verifiedStamp(),
    })}

    ${quickAnswer(`<p>${esc(context)} The strongest like-for-like replacements are <a href="/tools/${alts[0].slug}/">${esc(alts[0].name)}</a>, <a href="/tools/${alts[1].slug}/">${esc(alts[1].name)}</a> and <a href="/tools/${alts[2].slug}/">${esc(alts[2].name)}</a>. Full comparison below.</p>`)}

    <section aria-labelledby="why-heading">
      <h2 id="why-heading">Why teams switch from ${esc(target.name)}</h2>
      <p>${esc(context)}</p>
      <p>Price check: ${esc(target.name)} ${esc(target.priceProse)}. If cost or fit is the problem, the shortlist below is the honest answer.</p>
    </section>

    <section aria-labelledby="table-heading">
      <h2 id="table-heading">${esc(target.name)} alternatives compared</h2>
      ${toolsTable(alts, `Alternatives to ${target.name}, with reported pricing`)}
      ${noteBox('Reported ranges, not rate cards. Get a direct quote; headcount and frameworks move the number.', 'warn')}
    </section>

    <section aria-labelledby="how-heading">
      <h2 id="how-heading">How to choose between them</h2>
      <p>Test each shortlisted tool against the problem that pushed you out: ${lowerFirst(target.weaknesses[0])}. If a replacement has the same flaw, you are buying a migration project, not a fix.</p>
      <p>Check total first-year cost including the audit, and whether your audit firm already knows ${esc(alts[0].name)}, ${esc(alts[1].name)} or ${esc(alts[2].name)}.</p>
    </section>

    ${faqBlock(faqs)}
    ${relatedGrid('Keep researching', related)}
  </div>`;

  return {
    path: `/alternatives/${target.slug}/`,
    title: `Best ${target.name} alternatives in 2026: ${alts.length} options compared`,
    description: truncate(
      `Why teams switch from ${target.name} and the ${alts.length} best alternatives with reported pricing: ${alts
        .slice(0, 4)
        .map((t) => t.name)
        .join(', ')}.`,
      155
    ),
    body,
    schemas: [breadcrumbSchema(crumbItems), faqSchema(faqs)],
  };
}

export function alternativePages() {
  return [
    alternativesIndexPage(),
    ...ALTERNATIVE_TARGETS.map((slug) => alternativePage(tools.find((t) => t.slug === slug))),
  ];
}
