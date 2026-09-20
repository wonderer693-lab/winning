# ComplyStack

A programmatic SEO comparison site for compliance and security software (SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, EU AI Act, DORA, SOX), built as a zero-dependency Node.js static site generator.

## Stack

- Plain Node.js (ES modules), no dependencies
- Builds ~86 static HTML pages in under a second
- No JavaScript shipped to browsers (progressive enhancement only)
- Deploy `dist/` to any static host

## Structure

```
src/
  build.js        SSG entry: renders routes, sitemap.xml, robots.txt, favicon
  serve.js        local preview server (`localhost:4173`)
  config.js       site name, URL, verified date, affiliate flag
  data/           content datasets — the moat
    tools.js       tool profiles (reported pricing, strengths, weaknesses)
    frameworks.js framework hubs (SOC 2, ISO 27001, ...)
    segments.js   buyer segments
    pairs.js      18 vs. comparison pages with hand-written verdicts
    guides.js     long-form guides
  lib/            layout, components, utils
  pages/          page renderers (home, tools, alternatives, compare, best, pricing, frameworks, guides, static)
assets/
  styles.css      design system
  app.js          30 lines of progressive enhancement
dist/             build output (gitignored)
```

## Usage

```bash
npm run build    # generates dist/
npm run serve    # preview at localhost:4173
```

## Adding a tool

Add one entry to `src/data/tools.js`, rebuild. A new profile, alternatives pages, pricing page, and every relevant framework/segment table entry are generated automatically. Removing a tool removes it from all indexes.

## Guardrails

- Build fails if indexable pages exceed 100
- Build fails on duplicate routes
- `<100` lines of client JS total, all optional