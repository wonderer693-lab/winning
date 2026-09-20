# ComplyStack

A programmatic SEO comparison site for compliance and security software (SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, EU AI Act, DORA, SOX), built as a zero-dependency Node.js static site generator.

## Stack

- Plain Node.js (ES modules), no npm dependencies
- Builds 94 static HTML pages in under a second
- About 30 lines of optional progressive enhancement (nav toggle, scroll hint); the content works fully without JavaScript
- Self-hosted Inter font subsets; zero third-party requests
- Deploy `dist/` to any static host

## Structure

```
src/
  build.js        SSG entry: renders routes, sitemap.xml, robots.txt, favicon, OG image
  serve.js        local preview server (localhost:4173), traversal-guarded
  config.js       site name, URL, verified date, affiliate flag
  data/           content datasets — the moat
    tools.js      15 tool profiles (reported pricing, strengths, weaknesses, negotiation notes)
    frameworks.js framework hubs (SOC 2, ISO 27001, ...)
    segments.js   buyer segments and display labels
    pairs.js      18 vs. comparison pages with hand-written verdicts
    guides.js     long-form guides
  lib/            layout, components, utils, OG image renderer
  pages/          page renderers (home, tools, alternatives, compare, best, pricing, frameworks, guides, static)
assets/
  styles.css      design system
  app.js          progressive enhancement
  fonts/          self-hosted Inter subsets
dist/             build output (gitignored)
```

## Usage

```bash
npm run build    # generates dist/
npm run serve    # preview at localhost:4173
```

## Adding a tool

Add one entry to `src/data/tools.js` (including `priceProse` and `negotiationNote`), rebuild. A profile, alternatives page, pricing page, and every relevant framework/segment table entry are generated automatically. Removing a tool removes it from all indexes.

## Guardrails

The build fails loudly instead of shipping a broken page:

- Duplicate route detection
- 100-page budget (currently 93 indexable), checked on every build
- Internal link checker: every `href` in the output must resolve to a route or a static file; the build throws otherwise
- JSON-LD is parse-validated by construction and never contains a raw `<`

## Notes

- Pricing is always labeled "reported" unless a vendor publishes a rate card; the methodology page explains the process
- Vendor links carry `rel="nofollow noopener"` until affiliate programs are signed, then `monetization.affiliateLinksActive` flips them to `sponsored`
- `Product` structured data intentionally omits `offers` because no official offers exist to reference
