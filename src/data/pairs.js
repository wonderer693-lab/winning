// Head-to-head pair data. Verdicts are hand-written per pair; this is
// the content that makes vs pages worth reading instead of template spam.

export const pairs = [
  {
    slug: 'vanta-vs-drata',
    a: 'vanta',
    b: 'drata',
    verdict:
      'This is the closest race in compliance software, and the honest answer is that both will get you certified. Vanta wins on ecosystem: more frameworks, a bigger auditor network, and an AI agent that is genuinely useful for questionnaires. Drata wins on engineering depth: continuous monitoring is more granular, and the SafeBase acquisition gave it the best trust center in the category. Pricing is a wash; both hide it and both start around the same place.',
    chooseA: [
      'You want the broadest framework coverage for the next three years, not just this audit',
      'Your team answers a lot of security questionnaires and wants AI help with them',
      'You value the largest auditor and partner network',
    ],
    chooseB: [
      'Your team is engineering-led and wants deep, code-level continuous monitoring',
      'A polished trust center matters, since SafeBase is now built in',
      'You prefer a UI that non-specialists consistently rate as easier to run',
    ],
  },
  {
    slug: 'vanta-vs-secureframe',
    a: 'vanta',
    b: 'secureframe',
    verdict:
      'Vanta is the safer default; Secureframe is the framework-breadth play. If your roadmap is SOC 2 now and maybe ISO 27001 later, Vanta’s ecosystem and brand carry more weight in enterprise security reviews. If you already know you need HIPAA, HITRUST and a stack of frameworks in one year, Secureframe’s 35+ framework catalog and strong support reviews make it the smarter pick.',
    chooseA: [
      'Brand recognition with your enterprise buyers matters',
      'You want the largest auditor network and ecosystem',
      'AI questionnaire automation is high on your list',
    ],
    chooseB: [
      'You need HIPAA or HITRUST alongside SOC 2',
      'Multi-framework scope is your reality from day one',
      'Onboarding and support quality outrank brand for you',
    ],
  },
  {
    slug: 'vanta-vs-sprinto',
    a: 'vanta',
    b: 'sprinto',
    verdict:
      'This comparison is really about budget. Sprinto delivers the same core outcome, a SOC 2 report, for meaningfully less money, with support reviews that match or beat Vanta’s. What you give up is brand weight with conservative buyers, a smaller US auditor network, and thinner enterprise features. For a seed-stage startup, Sprinto is often the rational choice. For a company selling to Fortune 500 security teams, Vanta’s name still opens doors.',
    chooseA: [
      'You sell to large enterprises that ask which platform you use',
      'You need the broadest framework and integration coverage',
      'Budget is secondary to deal velocity',
    ],
    chooseB: [
      'Price matters and you still want the full outcome',
      'You are seed or Series A stage with a lean team',
      'You want fast onboarding and hands-on support',
    ],
  },
  {
    slug: 'vanta-vs-thoropass',
    a: 'vanta',
    b: 'thoropass',
    verdict:
      'Different philosophies. Vanta is software you pair with an auditor of your choice. Thoropass is software plus the audit itself in one contract. First-time teams often underestimate the auditor coordination problem, and Thoropass deletes it. Vanta gives you more platform depth and more auditor choice, which matters more on your second and third framework than your first.',
    chooseA: [
      'You want to choose your own auditor, or already have one',
      'Platform depth and framework breadth matter beyond this audit',
      'You expect to add ISO 27001 or HIPAA within a year',
    ],
    chooseB: [
      'This is your first SOC 2 and you want one vendor accountable for everything',
      'Predictable bundled pricing beats à la carte flexibility',
      'Your team has zero audit experience and wants a guided path',
    ],
  },
  {
    slug: 'drata-vs-secureframe',
    a: 'drata',
    b: 'secureframe',
    verdict:
      'Drata leads on monitoring depth and product polish; Secureframe leads on framework count and support reputation. SaaS companies with strong engineering teams tend to land on Drata. Healthcare and multi-framework buyers tend to land on Secureframe. Both sit in the same price band, so the decision is fit, not cost.',
    chooseA: [
      'Continuous monitoring depth is your top priority',
      'You want the SafeBase trust center included',
      'Your team prefers a polished, modern UI',
    ],
    chooseB: [
      'You need 35+ frameworks including HITRUST',
      'Support and onboarding quality drive your decision',
      'Healthcare compliance is part of your scope',
    ],
  },
  {
    slug: 'drata-vs-sprinto',
    a: 'drata',
    b: 'sprinto',
    verdict:
      'Drata is the deeper platform; Sprinto is the better deal. Engineering-led teams that will live in the monitoring dashboard daily get more from Drata. Startups that need the certificate to unblock a deal, at the lowest credible price, get more from Sprinto. The gap in outcome is smaller than the gap in price.',
    chooseA: [
      'You want granular, real-time control monitoring',
      'A built-in trust center via SafeBase appeals to you',
      'Your budget comfortably covers US-market pricing',
    ],
    chooseB: [
      'Getting certified affordably is the goal',
      'You value hands-on onboarding support',
      'APAC data residency would help',
    ],
  },
  {
    slug: 'drata-vs-thoropass',
    a: 'drata',
    b: 'thoropass',
    verdict:
      'Drata gives you a deeper platform and freedom to pick your auditor. Thoropass gives you the auditor. Teams with security experience usually prefer Drata’s flexibility and monitoring depth. Teams doing this for the first time, with no auditor relationships, often prefer Thoropass’s single-contract simplicity.',
    chooseA: [
      'You have, or want to choose, your own audit firm',
      'Monitoring depth and integrations matter most',
      'You are building a multi-year compliance program',
    ],
    chooseB: [
      'You want software and audit from one accountable vendor',
      'This is your first certification',
      'Bundled, predictable pricing is a priority',
    ],
  },
  {
    slug: 'secureframe-vs-sprinto',
    a: 'secureframe',
    b: 'sprinto',
    verdict:
      'Both punch above their brand weight. Secureframe’s edge is framework breadth and its healthcare story. Sprinto’s edge is price and speed. A US healthcare startup should shortlist Secureframe first. A cost-sensitive SaaS startup should shortlist Sprinto first. Everyone else should demo both; support quality is a genuine strength at each.',
    chooseA: [
      'HIPAA or HITRUST is in scope',
      'You need a long framework list',
      'You are mid-market with multiple frameworks running',
    ],
    chooseB: [
      'Budget is the primary constraint',
      'You want to be audit-ready in weeks',
      'You are a startup buying your first platform',
    ],
  },
  {
    slug: 'secureframe-vs-thoropass',
    a: 'secureframe',
    b: 'thoropass',
    verdict:
      'Secureframe is the broader platform; Thoropass is the simpler transaction. If you know you will run several frameworks and want to pick your auditor, Secureframe fits. If this is your first SOC 2 and you want one vendor to just handle it, Thoropass’s bundle is hard to beat on coordination cost.',
    chooseA: [
      'Multi-framework scope is certain',
      'You want auditor independence',
      'Integration count matters',
    ],
    chooseB: [
      'First SOC 2, no auditor relationships',
      'One contract for software and audit appeals',
      'You want a guided, low-coordination path',
    ],
  },
  {
    slug: 'sprinto-vs-thoropass',
    a: 'sprinto',
    b: 'thoropass',
    verdict:
      'Two different answers to the same first-timer problem. Sprinto is cheaper software plus your choice of auditor. Thoropass costs more but includes the audit. If you have an auditor quote you like, Sprinto wins on total cost. If the auditor search itself feels like the hard part, Thoropass’s bundle earns its premium.',
    chooseA: [
      'Lowest software cost is the goal',
      'You already have an auditor or want to shop for one',
      'Speed and support matter more than bundling',
    ],
    chooseB: [
      'You want one vendor for software and audit',
      'Predictable total cost beats the lowest line item',
      'Coordination overhead is your main fear',
    ],
  },
  {
    slug: 'vanta-vs-hyperproof',
    a: 'vanta',
    b: 'hyperproof',
    verdict:
      'These barely compete. Vanta is built to get companies their first few certifications fast. Hyperproof is built for compliance teams running an ongoing program across many frameworks. If you do not have a compliance person yet, buy Vanta. If you have three and they are drowning in evidence requests across eight frameworks, look at Hyperproof.',
    chooseA: [
      'You are getting your first or second certification',
      'Speed and ecosystem matter most',
      'Nobody on the team has "compliance" in their title yet',
    ],
    chooseB: [
      'You have a dedicated compliance team',
      'You run many frameworks and need control mapping',
      'Evidence operations, not audit prep, is the bottleneck',
    ],
  },
  {
    slug: 'drata-vs-hyperproof',
    a: 'drata',
    b: 'hyperproof',
    verdict:
      'Drata is the better tool for getting and keeping certifications with an engineering-led team. Hyperproof is the better tool for operationalizing compliance across a large organization. Growth-stage SaaS companies pick Drata. Mid-market companies with compliance staff and framework sprawl pick Hyperproof.',
    chooseA: [
      'Certification speed and monitoring depth are the goals',
      'Your team is engineering-heavy',
      'You want the SafeBase trust center',
    ],
    chooseB: [
      'Compliance operations across many frameworks is the job',
      'You have dedicated compliance staff',
      'Cross-framework evidence reuse is the pain',
    ],
  },
  {
    slug: 'vanta-vs-scytale',
    a: 'vanta',
    b: 'scytale',
    verdict:
      'Vanta is the incumbent with the ecosystem; Scytale is the challenger with the price and the hands-on support. For startups where budget decides, Scytale covers the same core frameworks for less, and reviewers consistently praise the onboarding. Vanta still wins when brand, breadth and AI questionnaire volume matter.',
    chooseA: [
      'Enterprise buyers ask what platform you use',
      'You need 20+ frameworks and 300+ integrations',
      'Questionnaire automation at scale matters',
    ],
    chooseB: [
      'Budget is a real constraint',
      'You want named, hands-on onboarding support',
      'Your framework list is the standard startup set',
    ],
  },
  {
    slug: 'vanta-vs-delve',
    a: 'vanta',
    b: 'delve',
    verdict:
      'The established leader against the AI-native newcomer. Delve was built after the incumbents, so automation that Vanta added over years is native in Delve, and setup is fast. What Delve cannot match yet is the ecosystem: auditors, integrations, enterprise references. Risk-averse buyers pick Vanta. Price-sensitive startups who like new tools pick Delve.',
    chooseA: [
      'You want the proven, auditor-recognized platform',
      'Ecosystem breadth matters for your roadmap',
      'Your buyers are conservative enterprises',
    ],
    chooseB: [
      'You want AI-native automation at a startup price',
      'Fast setup is a priority',
      'You are comfortable with a younger vendor',
    ],
  },
  {
    slug: 'vanta-vs-onetrust',
    a: 'vanta',
    b: 'onetrust',
    verdict:
      'Different buyers, different jobs. Vanta gets a growth-stage company certified and keeps the evidence flowing. OneTrust runs privacy and GRC for large organizations, with GDPR depth Vanta does not attempt. If you are a startup reading this, buy Vanta. If you are a Fortune 1000 privacy office, you already know OneTrust.',
    chooseA: [
      'SOC 2 or ISO 27001 is the immediate need',
      'You are a startup or mid-market company',
      'Speed and price matter',
    ],
    chooseB: [
      'Privacy and GDPR are the core problem',
      'You are an enterprise consolidating vendors',
      'You need consent management and DSR workflows',
    ],
  },
  {
    slug: 'conveyor-vs-safebase',
    a: 'conveyor',
    b: 'safebase',
    verdict:
      'The two trust center specialists, now on different paths. Conveyor stayed independent and doubled down on questionnaire automation with strong AI answers. SafeBase got acquired by Drata, so its future is as a feature inside Drata bundles. If you want a standalone tool, Conveyor is the pick. If you are buying Drata anyway, you get SafeBase with it.',
    chooseA: [
      'You want a standalone questionnaire and trust center tool',
      'AI answer quality from your knowledge base is the priority',
      'You are not buying a full compliance platform',
    ],
    chooseB: [
      'You are already a Drata customer or plan to be',
      'The smoothest buyer-facing trust center UX is the goal',
      'Bundled pricing inside a platform deal appeals',
    ],
  },
  {
    slug: 'upguard-vs-whistic',
    a: 'upguard',
    b: 'whistic',
    verdict:
      'Both handle vendor risk, with different centers of gravity. UpGuard leads on external signals: security ratings, attack surface monitoring, breach detection. Whistic leads on workflow: the assessment exchange and AI-assisted document review. Teams that want continuous outside-in monitoring pick UpGuard. Teams buried in inbound and outbound assessments pick Whistic.',
    chooseA: [
      'Continuous monitoring of vendor security posture matters',
      'You want security ratings and breach alerts',
      'Attack surface visibility is part of the job',
    ],
    chooseB: [
      'Assessment workflow volume is the pain',
      'Reusing completed assessments via an exchange appeals',
      'AI document review would save your team hours weekly',
    ],
  },
  {
    slug: 'vanta-vs-upguard',
    a: 'vanta',
    b: 'upguard',
    verdict:
      'Complements more than competitors. Vanta proves your company is compliant; UpGuard watches whether your vendors are safe. Many mid-market companies run both. If forced to pick one, the question is which problem you actually have: certification pressure (Vanta) or third-party risk pressure (UpGuard).',
    chooseA: [
      'You need SOC 2, ISO 27001 or HIPAA for deals',
      'Internal compliance evidence is the gap',
      'Certification is blocking revenue',
    ],
    chooseB: [
      'Vendor and third-party risk is the mandate',
      'You need security ratings and monitoring',
      'Your own certifications are already handled',
    ],
  },
];

export function getPair(slug) {
  return pairs.find((p) => p.slug === slug);
}
