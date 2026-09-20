// Editorial guides. Long-form, hand-written, sentence-case headings.

export const guides = [
  {
    slug: 'soc-2-cost',
    title: 'How much does SOC 2 cost? The full 2026 breakdown',
    h1: 'How much does SOC 2 cost? The full 2026 breakdown',
    description:
      'Real numbers for SOC 2 in 2026: automation software, the audit itself, penetration testing and the internal time nobody budgets for.',
    lede:
      'Ask a vendor what SOC 2 costs and you will hear about their software price. The real number is bigger. Here is the full first-year breakdown, line by line, so the invoice never surprises you.',
    sections: [
      {
        h: 'The short answer',
        body: [
          'Most companies spend $20,000 to $60,000 in year one, all in. Year two drops to roughly half that, because the evidence machine is already running and only the Type II audit and renewals remain.',
          'Very small teams doing everything manually can spend less on paper and more in engineer time. Enterprises with complex scope spend more. The range above covers the typical 20 to 200 person SaaS company.',
        ],
      },
      {
        h: 'Line item 1: compliance automation software',
        body: [
          'Expect $7,500 to $15,000 per year for a startup plan from Vanta, Drata or Secureframe, and $5,000 to $10,000 from price leaders like Sprinto, Scytale or Delve. Pricing scales with employee count and frameworks, so a 200-person company pays noticeably more than a 20-person one.',
          'You can skip this line and run the audit on spreadsheets. Companies that do typically report 200 to 400 engineer-hours per audit cycle on evidence collection. At any realistic loaded engineering rate, the software is cheaper.',
        ],
      },
      {
        h: 'Line item 2: the audit itself',
        body: [
          'CPA firms charge $10,000 to $30,000 for a SOC 2 Type II audit, depending on scope, firm prestige and how many Trust Services Criteria you include beyond security. Type I is cheaper, often $7,000 to $15,000.',
          'Big 4 firms cost multiples of boutique firms and are rarely necessary unless your customers specifically demand them. A reputable boutique that knows your automation platform is the usual answer. Bundled options like Thoropass roll this into one contract, which is worth comparing against buying separately.',
        ],
      },
      {
        h: 'Line item 3: penetration testing',
        body: [
          'Most auditors and many enterprise customers expect a recent penetration test. Budget $5,000 to $15,000 for a credible third-party test of a typical SaaS application. Automated scanning is cheaper but does not satisfy most enterprise security reviews on its own.',
        ],
      },
      {
        h: 'Line item 4: internal time',
        body: [
          'The hidden line. Even with automation, someone has to write policies, review flagged controls, fix failing checks, and coordinate with the auditor. Plan for 40 to 100 hours of internal effort for a first SOC 2 with software, more without it. Founders usually own this at small companies, which is why it feels free until it is not.',
        ],
      },
      {
        h: 'Year two and beyond',
        body: [
          'Renewals are kinder. Software renews at similar rates (watch for uplift clauses), but the Type II audit becomes routine, policies already exist, and evidence collects itself. Most companies report year-two costs of $15,000 to $30,000.',
          'One negotiation tip: multi-year software contracts often discount 10 to 20 percent, but read the renewal cap language. The expensive surprise in this category is rarely year one; it is the year-two renewal at a higher headcount tier.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the cheapest legitimate way to get SOC 2?',
        a: 'A budget automation platform (Sprinto, Scytale or Delve tier), a boutique audit firm, and a scoped Type I first. That path lands around $15,000 to $25,000 all in. Cheaper than that usually means cutting corners the auditor will find.',
      },
      {
        q: 'Is SOC 2 a one-time cost?',
        a: 'No. Type II reports cover an observation period and enterprise buyers expect a current report, so budget annually: software renewal plus audit each year.',
      },
      {
        q: 'Does cyber insurance or SOC 2 come first?',
        a: 'They are different purchases. SOC 2 proves controls to customers; insurance transfers risk. Many companies buy both in the same year because enterprise contracts ask for both.',
      },
    ],
  },
  {
    slug: 'choose-compliance-software',
    title: 'How to choose compliance software: a buyer’s checklist',
    h1: 'How to choose compliance software: a buyer’s checklist',
    description:
      'A practical checklist for choosing SOC 2 and GRC software: frameworks, auditors, integrations, evidence depth, trust centers and the pricing traps to avoid.',
    lede:
      'Every vendor demo looks good. The differences show up in month three, at renewal, and during the audit. This checklist is the order we evaluate platforms, and the questions that surface real answers.',
    sections: [
      {
        h: 'Start with the frameworks you will actually need',
        body: [
          'Write down the next 24 months, not the next audit. SOC 2 alone points one direction. SOC 2 plus ISO 27001 plus HIPAA points at breadth players like Secureframe or Vanta. Privacy-heavy scope points at OneTrust. Vendor risk points at UpGuard or Whistic.',
          'Buying for a framework list you will never use is the most common waste in this category. Buying a tool that cannot grow into year two’s framework is the second most common.',
        ],
      },
      {
        h: 'Ask how evidence is actually collected',
        body: [
          'The marketing says "automated evidence collection". The question is how much. Good answer: continuous API-based tests across your cloud, identity provider, code repos and HR system, with failing controls flagged daily. Bad answer: a dashboard that reminds you to upload screenshots.',
          'Ask the vendor to show, live, which controls are API-tested versus manually uploaded for a stack like yours. The ratio tells you how much of the promise is real.',
        ],
      },
      {
        h: 'Check the auditor situation before you sign',
        body: [
          'Three models exist: partner networks (Vanta, Drata, Sprinto), bundled in-house audit (Thoropass), and bring-your-own. Each works. What matters is knowing which you are buying and what the audit costs on top of the software.',
          'Ask for two auditor introductions before signing and get real quotes. Software at $10,000 with a $25,000 audit is not cheaper than software at $12,000 with a $12,000 audit.',
        ],
      },
      {
        h: 'Read the renewal clause, not the landing page',
        body: [
          'Pricing in this category scales with headcount and frameworks. A quote that fits today can jump 30 to 50 percent at renewal after a hiring year. Ask for the renewal cap in writing, and price the contract at your expected headcount in month 12, not month 1.',
          'Multi-year deals discount 10 to 20 percent and are worth signing only with that renewal cap locked.',
        ],
      },
      {
        h: 'Score the trust center and questionnaire features',
        body: [
          'If your sales team answers security questionnaires weekly, these features pay for themselves. Test the AI answer quality with a real questionnaire from your inbox, not the vendor’s demo data. Conveyor and Drata’s SafeBase lead here; the platform-native modules vary.',
        ],
      },
      {
        h: 'The shortlist we would start from',
        body: [
          'Startups on a budget: Sprinto, Scytale, Delve. Growth-stage SaaS: Vanta or Drata. Multi-framework mid-market: Secureframe or Hyperproof. First-timers who want the audit bundled: Thoropass. Enterprise GRC: OneTrust, AuditBoard, LogicGate. Vendor risk: UpGuard or Whistic. Questionnaires and trust centers: Conveyor or SafeBase.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I choose based on G2 ratings?',
        a: 'Use them as a filter, not a verdict. In this category the top tools all sit between about 4.6 and 4.8, so ratings separate them less than fit, price and auditor network do.',
      },
      {
        q: 'How long should implementation take?',
        a: 'For a startup with a standard stack, days to a couple of weeks to connected integrations and a readiness score. If a vendor quotes months for a standard setup, that tells you something.',
      },
      {
        q: 'Is the cheapest platform a false economy?',
        a: 'Sometimes. The certificate is the same either way, but weak evidence automation costs engineer-hours all year, and a platform your team hates using gets worked around. Price matters; daily usability matters more.',
      },
    ],
  },
  {
    slug: 'soc-2-type-1-vs-type-2',
    title: 'SOC 2 Type I vs Type II: what is the difference?',
    h1: 'SOC 2 Type I vs Type II: what is the difference?',
    description:
      'Type I checks your controls exist. Type II checks they worked for months. Which to do first, what each costs, and how enterprise buyers read them.',
    lede:
      'The single most common SOC 2 question, answered plainly: Type I is a snapshot, Type II is a movie. Here is what that means for your timeline, budget and the deal you are trying to close.',
    sections: [
      {
        h: 'Type I: the snapshot',
        body: [
          'A Type I report says your controls are designed correctly and exist, as of a specific date. An auditor reviews your policies, your control descriptions and evidence that each control is in place on that day.',
          'Timeline: 4 to 8 weeks with automation software, sometimes faster. Cost: usually $7,000 to $15,000 for the audit on top of your software. It is the fastest way to have something to hand a waiting customer.',
        ],
      },
      {
        h: 'Type II: the movie',
        body: [
          'A Type II report says your controls operated effectively over an observation period, typically 3 to 12 months. The auditor samples evidence from across the whole window: access reviews that actually happened, changes that were actually approved, alerts that were actually handled.',
          'This is the report enterprise security teams trust, because anyone can look compliant for a day. Six months of clean evidence is harder to fake.',
        ],
      },
      {
        h: 'Which one first?',
        body: [
          'Almost everyone: Type I first, start the Type II clock immediately after. The Type I unblocks the deal in front of you. The observation period then runs while you operate normally, and your automation platform collects the evidence in the background.',
          'The mistake to avoid is treating Type I as the finish line. Enterprise buyers increasingly write "Type II within 12 months" into contracts, and restarting the clock later costs you months.',
        ],
      },
      {
        h: 'What changes in your tooling',
        body: [
          'For Type I, almost any organized approach works, including disciplined spreadsheets. For Type II, continuous evidence collection stops being optional, because nobody can retroactively produce six months of access review records. This is the real reason automation platforms exist.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I skip Type I and go straight to Type II?',
        a: 'Yes, if you can wait the full observation period before having any report. Most companies cannot, because a deal is waiting, so they do Type I first.',
      },
      {
        q: 'How long should the Type II observation period be?',
        a: 'Three months is the minimum most auditors accept, six is common, twelve is the gold standard for conservative buyers. Your first Type II is often shorter, with later reports covering a full year.',
      },
      {
        q: 'Do customers accept Type I?',
        a: 'Many do for a first contract, especially with a written commitment to Type II. Regulated and larger enterprises increasingly insist on Type II from day one.',
      },
    ],
  },
];

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug);
}
