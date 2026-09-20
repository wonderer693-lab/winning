// Buyer segments for the "best for" pages. Recommendation logic is
// computed from each tool's bestFor field; this file holds the copy.

import { lowerFirst } from '../lib/util.js';

export const segments = [
  {
    slug: 'startups',
    name: 'startups',
    title: 'Best compliance software for startups',
    h1: 'Best compliance software for startups (2026)',
    lede:
      'A startup’s compliance problem is specific: an enterprise deal is waiting, the budget is a founder’s credit card, and nobody on the team has run an audit before. The right tool gets you SOC 2 Type I fast, at a price that does not hurt, with enough headroom for ISO 27001 next year.',
    criteria: [
      'Entry price under roughly $10,000 per year',
      'Fast onboarding measured in days or weeks, not months',
      'An auditor network so you are not hunting for a CPA firm separately',
      'Room to add ISO 27001 or HIPAA later without migrating platforms',
    ],
    note:
      'Sprinto, Scytale and Delve lead on price and speed. Vanta and Drata cost more but carry brand weight with conservative enterprise buyers, which can matter in a security review. Thoropass is worth a look if you want the audit bundled in.',
  },
  {
    slug: 'small-business',
    name: 'small businesses',
    title: 'Best compliance software for small businesses',
    h1: 'Best compliance software for small businesses (2026)',
    lede:
      'Small businesses need compliance without a compliance department. The priority is a tool that one operations or IT person can run alongside their actual job, with support that answers when you are stuck three days before an audit.',
    criteria: [
      'Simple enough for a non-specialist to operate',
      'Support quality that reviewers actually mention',
      'Pricing that survives contact with a small company budget',
      'Sensible defaults rather than infinite configuration',
    ],
    note:
      'Sprinto and Scytale fit best on price and hand-holding. Thoropass works if you want the audit handled end to end. Skip the enterprise GRC platforms entirely; they assume staff you do not have.',
  },
  {
    slug: 'mid-market',
    name: 'mid-market companies',
    title: 'Best compliance software for mid-market companies',
    h1: 'Best compliance software for mid-market companies (2026)',
    lede:
      'Mid-market is where compliance gets complicated: several frameworks running at once, a small compliance team, auditors asking for evidence across dozens of systems. The buying question shifts from "get me certified" to "run this program without drowning us".',
    criteria: [
      'Cross-framework control mapping so evidence is collected once',
      'Continuous monitoring depth, not just audit-time screenshots',
      'Workflow features: task assignment, evidence review, auditor access',
      'Pricing that scales predictably with headcount',
    ],
    note:
      'Drata and Secureframe are the natural shortlist, with Hyperproof for teams building a real compliance operations function. Vanta works but watch the renewal math at this size.',
  },
  {
    slug: 'enterprise',
    name: 'enterprises',
    title: 'Best compliance software for enterprises',
    h1: 'Best compliance software for enterprises (2026)',
    lede:
      'Enterprise compliance is governance, risk and audit at scale: multiple entities, custom workflows, board reporting, and regulators who know your name. The startup tools end here; this is GRC platform territory.',
    criteria: [
      'Multi-entity and multi-framework architecture',
      'Configurable workflows that match how your risk team actually works',
      'Internal audit and SOX capability where relevant',
      'Vendor risk management for hundreds of suppliers',
    ],
    note:
      'OneTrust, AuditBoard and LogicGate are the established choices, with Hyperproof as the modern challenger. Vanta and Drata sell up-market too, but their center of gravity is still the growth-stage company.',
  },
  {
    slug: 'fintech',
    name: 'fintech companies',
    title: 'Best compliance software for fintech',
    h1: 'Best compliance software for fintech (2026)',
    lede:
      'Fintech stacks frameworks like no other industry: SOC 2 for enterprise deals, PCI DSS for card data, DORA for European banks, SOX if you are public or heading there. The tool you want maps one control set across all of it.',
    criteria: [
      'PCI DSS and DORA framework support, not just SOC 2',
      'Strong evidence reuse across overlapping frameworks',
      'Vendor risk features, because your bank customers will ask about your vendors',
      'Continuous monitoring that satisfies both auditors and bank due diligence teams',
    ],
    note:
      'Vanta, Drata and Secureframe cover the framework spread best. Pair with UpGuard or Whistic if vendor risk volume justifies a dedicated tool.',
  },
  {
    slug: 'healthcare',
    name: 'healthcare companies',
    title: 'Best compliance software for healthcare',
    h1: 'Best compliance software for healthcare (2026)',
    lede:
      'Healthcare means HIPAA, and HIPAA means documentation: a real security risk analysis, safeguards you can prove, and BAAs with every vendor. Some buyers also want HITRUST on top. Choose a tool with genuine HIPAA depth, not a SOC 2 template with a health sticker.',
    criteria: [
      'HIPAA-specific control mappings and risk analysis workflows',
      'HITRUST support if your buyers ask for it',
      'BAA and vendor tracking',
      'Evidence organization that survives an HHS inquiry',
    ],
    note:
      'Secureframe is the standout for HIPAA plus HITRUST. Vanta and Hyperproof also run credible HIPAA programs. Whatever you pick, remember there is no official HIPAA certification; the documentation is the compliance.',
  },
  {
    slug: 'saas',
    name: 'SaaS companies',
    title: 'Best compliance software for SaaS companies',
    h1: 'Best compliance software for SaaS companies (2026)',
    lede:
      'The classic case: a B2B SaaS company whose deals keep stalling in security review. You need SOC 2 to close, a trust center to stop answering the same questionnaire every week, and a path to ISO 27001 when Europe calls.',
    criteria: [
      'Fast SOC 2 Type I, then a managed Type II observation window',
      'A trust center to deflect repetitive security questionnaires',
      'Questionnaire automation for the ones that still arrive',
      'Integrations with your actual stack: AWS, GitHub, Google Workspace, your HR system',
    ],
    note:
      'Vanta and Drata own this segment for a reason. Sprinto, Scytale and Delve deliver the same outcome for less money. Add Conveyor or a Drata-bundled SafeBase when questionnaire volume becomes a sales bottleneck.',
  },
  {
    slug: 'first-soc-2',
    name: 'first-time SOC 2 teams',
    title: 'Best software for a first SOC 2',
    h1: 'Best software for getting your first SOC 2 (2026)',
    lede:
      'Your first SOC 2 is 20% tooling and 80% coordination: policies, evidence, an auditor, a penetration test, and a founder checking a dashboard at midnight. The best tool for a first-timer removes coordination, not just screenshots.',
    criteria: [
      'A clear readiness workflow that tells you exactly what is missing',
      'An auditor network, or a bundled audit, so you are not cold-emailing CPA firms',
      'Policy templates that a lawyer would not laugh at',
      'Honest pricing for year one, including what the audit itself costs',
    ],
    note:
      'Thoropass bundles software and audit into one contract, which is the lowest-coordination path. Sprinto, Scytale and Delve are the budget-friendly unbundled route. Vanta is the safe default if the deal waiting on you is big enough to justify the price.',
  },
];

export function getSegment(slug) {
  return segments.find((s) => s.slug === slug);
}

// Display labels for bestFor slugs, used in prose, breadcrumbs and lists.
export const SEGMENT_LABELS = {
  startups: 'Startups',
  'small-business': 'Small businesses',
  'mid-market': 'Mid-market companies',
  enterprise: 'Enterprises',
  fintech: 'Fintech',
  healthcare: 'Healthcare',
  saas: 'SaaS',
  'first-soc-2': 'First SOC 2 teams',
};

// "startups and SaaS" — describes a tool's audience in prose.
export function audiencePhrase(tool) {
  const labels = tool.bestFor.slice(0, 2).map((s) => SEGMENT_LABELS[s]).filter(Boolean);
  if (!labels.length) return 'teams';
  return lowerFirst(labels.length > 1 ? `${labels[0]} and ${labels[1]}` : labels[0]);
}
