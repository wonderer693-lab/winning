// Data validation. Runs before rendering so a bad data edit fails the
// build with a precise error instead of shipping broken pages.
//
// Everything here is structural: required fields, types, and
// cross-references between datasets. Editorial quality lives in the
// data files themselves.

import { tools } from '../data/tools.js';
import { frameworks } from '../data/frameworks.js';
import { segments } from '../data/segments.js';
import { pairs } from '../data/pairs.js';
import { guides } from '../data/guides.js';

const TOOL_FIELDS = [
  'slug',
  'name',
  'tagline',
  'category',
  'website',
  'hq',
  'customers',
  'scaleNote',
  'summary',
  'priceFrom',
  'priceProse',
  'negotiationNote',
  'switchContext',
  'pricingNote',
  'frameworksCount',
  'integrations',
  'g2Note',
];

const FEATURE_KEYS = ['trustCenter', 'questionnaires', 'vendorRisk', 'continuousMonitoring', 'auditSupport'];

export function validateData() {
  const errors = [];
  const fail = (msg) => errors.push(msg);

  const fwSlugs = new Set(frameworks.map((f) => f.slug));
  const segSlugs = new Set(segments.map((s) => s.slug));
  const toolSlugs = new Set();

  // Tools
  for (const t of tools) {
    const id = t.slug || '(missing slug)';
    if (toolSlugs.has(t.slug)) fail(`tools: duplicate slug "${t.slug}"`);
    toolSlugs.add(t.slug);

    for (const f of TOOL_FIELDS) {
      if (t[f] === undefined || t[f] === null || t[f] === '') fail(`tools: "${id}" is missing "${f}"`);
    }
    if (!/^https:\/\//.test(String(t.website))) fail(`tools: "${id}" website must be an https URL`);
    if (typeof t.founded !== 'number') fail(`tools: "${id}" founded must be a number`);
    if (typeof t.g2 !== 'number' || t.g2 < 0 || t.g2 > 5) fail(`tools: "${id}" g2 must be a number between 0 and 5`);
    if (typeof t.pricingPublic !== 'boolean') fail(`tools: "${id}" pricingPublic must be true or false`);
    if (!Array.isArray(t.frameworks) || t.frameworks.length === 0) {
      fail(`tools: "${id}" frameworks must be a non-empty array`);
    } else {
      for (const f of t.frameworks) if (!fwSlugs.has(f)) fail(`tools: "${id}" references unknown framework "${f}"`);
    }
    if (!Array.isArray(t.bestFor) || t.bestFor.length === 0) {
      fail(`tools: "${id}" bestFor must be a non-empty array`);
    } else {
      for (const s of t.bestFor) if (!segSlugs.has(s)) fail(`tools: "${id}" bestFor references unknown segment "${s}"`);
    }
    if (!Array.isArray(t.strengths) || t.strengths.length < 3) fail(`tools: "${id}" needs at least 3 strengths`);
    if (!Array.isArray(t.weaknesses) || t.weaknesses.length < 3) fail(`tools: "${id}" needs at least 3 weaknesses`);
    for (const k of FEATURE_KEYS) {
      if (t.features?.[k] === undefined) fail(`tools: "${id}" features.${k} is missing`);
    }
  }

  // Pairs
  const pairKeys = new Set();
  for (const p of pairs) {
    const id = p.slug || '(missing slug)';
    if (pairKeys.has(p.slug)) fail(`pairs: duplicate slug "${p.slug}"`);
    pairKeys.add(p.slug);
    for (const side of ['a', 'b']) {
      if (!toolSlugs.has(p[side])) fail(`pairs: "${id}" references unknown tool "${p[side]}"`);
    }
    if (p.a === p.b) fail(`pairs: "${id}" compares a tool with itself`);
    if (p.slug !== `${p.a}-vs-${p.b}`) fail(`pairs: "${id}" slug must match "${p.a}-vs-${p.b}"`);
    if (!p.verdict) fail(`pairs: "${id}" is missing a verdict`);
    for (const key of ['chooseA', 'chooseB']) {
      if (!Array.isArray(p[key]) || p[key].length < 2) fail(`pairs: "${id}" ${key} needs at least 2 bullets`);
    }
  }

  // Frameworks, segments, guides: required shape
  const slugSet = (list, label, fields) => {
    const seen = new Set();
    for (const item of list) {
      const id = item.slug || '(missing slug)';
      if (seen.has(item.slug)) fail(`${label}: duplicate slug "${item.slug}"`);
      seen.add(item.slug);
      for (const f of fields) {
        if (item[f] === undefined || item[f] === null || item[f] === '') fail(`${label}: "${id}" is missing "${f}"`);
      }
    }
  };
  slugSet(frameworks, 'frameworks', ['slug', 'shortName', 'title', 'summary', 'whoNeeds', 'typicalCost', 'typicalTimeline']);
  slugSet(segments, 'segments', ['slug', 'name', 'title', 'h1', 'lede', 'note']);
  slugSet(guides, 'guides', ['slug', 'title', 'h1', 'lede', 'description']);

  for (const fw of frameworks) {
    if (!Array.isArray(fw.body) || fw.body.length < 2) fail(`frameworks: "${fw.slug}" needs at least 2 body paragraphs`);
    if (!Array.isArray(fw.faqs) || fw.faqs.length < 2) fail(`frameworks: "${fw.slug}" needs at least 2 FAQs`);
  }
  for (const g of guides) {
    if (!Array.isArray(g.sections) || g.sections.length < 2) fail(`guides: "${g.slug}" needs at least 2 sections`);
    if (!Array.isArray(g.faqs) || g.faqs.length < 2) fail(`guides: "${g.slug}" needs at least 2 FAQs`);
  }

  if (errors.length) {
    throw new Error(`Data validation failed (${errors.length} problems):\n  - ${errors.join('\n  - ')}`);
  }
  return { tools: tools.length, frameworks: frameworks.length, segments: segments.length, pairs: pairs.length, guides: guides.length };
}
