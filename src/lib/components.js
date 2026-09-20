import { esc, mark } from './util.js';
import { site, monetization } from '../config.js';

// Small UI components shared across page types. Everything returns HTML
// strings; the build step assembles them into full pages.

export function verifiedStamp() {
  return `<span class="verified"><span class="verified__dot" aria-hidden="true"></span>Data verified ${esc(site.verifiedLabel)}</span>`;
}

export function scorePill(score, note) {
  const pct = Math.round((score / 5) * 100);
  return `<span class="score" title="${esc(note || '')}">
    <span class="score__num">${esc(score.toFixed(1))}</span>
    <span class="score__bar" aria-hidden="true"><span style="width:${pct}%"></span></span>
    <span class="score__src">G2, approx</span>
  </span>`;
}

export function toolCard(tool, { showPricing = true } = {}) {
  return `<article class="tool-card">
    <div class="tool-card__head">
      <h3 class="tool-card__name"><a href="/tools/${tool.slug}/">${esc(tool.name)}</a></h3>
      ${scorePill(tool.g2, tool.g2Note)}
    </div>
    <p class="tool-card__tagline">${esc(tool.tagline)}</p>
    <dl class="tool-card__meta">
      ${showPricing ? `<div><dt>Reported price</dt><dd>${esc(tool.priceFrom)}</dd></div>` : ''}
      <div><dt>Frameworks</dt><dd>${esc(tool.frameworksCount)}</dd></div>
      <div><dt>Integrations</dt><dd>${esc(tool.integrations)}</dd></div>
    </dl>
    <div class="tool-card__links">
      <a class="btn btn--ghost btn--sm" href="/tools/${tool.slug}/">Profile</a>
      <a class="btn btn--ghost btn--sm" href="/alternatives/${tool.slug}/">Alternatives</a>
      <a class="btn btn--ghost btn--sm" href="/pricing/${tool.slug}/">Pricing</a>
    </div>
  </article>`;
}

export function visitCta(tool) {
  // Vendor links stay nofollow until affiliate programs are signed, then
  // they are marked sponsored. Either way the verdict never changes.
  const rel = monetization.affiliateLinksActive ? 'sponsored nofollow noopener' : 'nofollow noopener';
  return `<a class="btn btn--primary" href="${esc(tool.website)}" rel="${rel}" target="_blank">Visit ${esc(tool.name)}<span class="btn__ext" aria-hidden="true">↗</span></a>`;
}

export function quickAnswer(html) {
  return `<div class="quick-answer">
    <p class="quick-answer__label">Quick answer</p>
    <div class="quick-answer__body">${html}</div>
  </div>`;
}

export function chooseIf(aTool, aBullets, bTool, bBullets) {
  const list = (bullets) => bullets.map((b) => `<li>${esc(b)}</li>`).join('');
  return `<div class="choose">
    <div class="choose__col">
      <h3>Choose ${esc(aTool.name)} if</h3>
      <ul>${list(aBullets)}</ul>
      ${visitCta(aTool)}
    </div>
    <div class="choose__col">
      <h3>Choose ${esc(bTool.name)} if</h3>
      <ul>${list(bBullets)}</ul>
      ${visitCta(bTool)}
    </div>
  </div>`;
}

export function prosCons(strengths, weaknesses) {
  const s = strengths.map((x) => `<li>${esc(x)}</li>`).join('');
  const w = weaknesses.map((x) => `<li>${esc(x)}</li>`).join('');
  return `<div class="proscons">
    <div class="proscons__col proscons__col--pros">
      <h3>Strengths</h3>
      <ul>${s}</ul>
    </div>
    <div class="proscons__col proscons__col--cons">
      <h3>Weaknesses</h3>
      <ul>${w}</ul>
    </div>
  </div>`;
}

export function faqBlock(faqs) {
  const items = faqs
    .map(
      (f) => `<details class="faq__item">
        <summary>${esc(f.q)}</summary>
        <div class="faq__answer"><p>${esc(f.a)}</p></div>
      </details>`
    )
    .join('');
  return `<section class="faq" aria-labelledby="faq-heading">
    <h2 id="faq-heading">Frequently asked questions</h2>
    ${items}
  </section>`;
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Feature comparison table for vs pages. rows: [label, keyOrFn, options]
export function vsTable(aTool, bTool, rows) {
  const body = rows
    .map(([label, getter, highlight]) => {
      const av = typeof getter === 'function' ? getter(aTool) : aTool[getter];
      const bv = typeof getter === 'function' ? getter(bTool) : bTool[getter];
      const am = mark(av);
      const bm = mark(bv);
      const aWin = highlight === 'a' ? ' class="cell-win"' : '';
      const bWin = highlight === 'b' ? ' class="cell-win"' : '';
      return `<tr>
        <th scope="row">${esc(label)}</th>
        <td${aWin}><span class="${am.cls}">${esc(am.label)}</span></td>
        <td${bWin}><span class="${bm.cls}">${esc(bm.label)}</span></td>
      </tr>`;
    })
    .join('');
  return `<div class="table-scroll" data-table-scroll>
    <table class="vs-table">
      <thead>
        <tr>
          <th scope="col"><span class="sr-only">Criteria</span></th>
          <th scope="col">${esc(aTool.name)}</th>
          <th scope="col">${esc(bTool.name)}</th>
        </tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
  </div>`;
}

export function toolsTable(tools, caption) {
  const rows = tools
    .map(
      (t) => `<tr>
        <th scope="row"><a href="/tools/${t.slug}/">${esc(t.name)}</a></th>
        <td>${esc(t.priceFrom)}</td>
        <td>${esc(t.frameworksCount)}</td>
        <td>${esc(t.integrations)}</td>
        <td>${scorePill(t.g2, t.g2Note)}</td>
        <td><a class="btn btn--ghost btn--sm" href="/alternatives/${t.slug}/">Alternatives</a></td>
      </tr>`
    )
    .join('');
  return `<div class="table-scroll" data-table-scroll>
    <table class="data-table">
      ${caption ? `<caption>${esc(caption)}</caption>` : ''}
      <thead>
        <tr>
          <th scope="col">Tool</th>
          <th scope="col">Reported price</th>
          <th scope="col">Frameworks</th>
          <th scope="col">Integrations</th>
          <th scope="col">G2 rating</th>
          <th scope="col"><span class="sr-only">Links</span></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

export function relatedGrid(title, links) {
  const items = links
    .map((l) => `<li><a href="${l.href}">${esc(l.label)}</a>${l.note ? `<span>${esc(l.note)}</span>` : ''}</li>`)
    .join('');
  return `<section class="related" aria-labelledby="related-heading">
    <h2 id="related-heading">${esc(title)}</h2>
    <ul class="related__grid">${items}</ul>
  </section>`;
}

export function frameworkChips(toolFrameworks, allFrameworks) {
  const chips = toolFrameworks
    .map((slug) => {
      const fw = allFrameworks.find((f) => f.slug === slug);
      return fw ? `<a class="chip" href="/frameworks/${fw.slug}/">${esc(fw.shortName)}</a>` : '';
    })
    .join('');
  return `<div class="chips">${chips}</div>`;
}

export function pageHeader({ h1, lede, meta }) {
  return `<header class="page-header">
    <h1>${esc(h1)}</h1>
    ${lede ? `<p class="lede">${esc(lede)}</p>` : ''}
    ${meta ? `<div class="page-header__meta">${meta}</div>` : ''}
  </header>`;
}

export function noteBox(html, tone = 'info') {
  return `<div class="note note--${tone}">${html}</div>`;
}
