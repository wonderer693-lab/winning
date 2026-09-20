// Compliance frameworks covered on the site. Copy is hand-written.

export const frameworks = [
  {
    slug: 'soc-2',
    name: 'SOC 2',
    shortName: 'SOC 2',
    title: 'SOC 2 compliance software',
    summary:
      'SOC 2 is an audit report from the AICPA that tells enterprise customers your company handles their data responsibly. It is not a legal requirement, but it has become a commercial one: most enterprise procurement teams now ask for it before signing.',
    whoNeeds:
      'Any B2B SaaS company selling to mid-market or enterprise customers. If a deal has ever stalled in "security review", SOC 2 is the unblock.',
    typicalCost:
      'First-year all-in cost usually lands between $20,000 and $60,000: $7,500 to $15,000 for automation software, $10,000 to $30,000 for the audit itself, plus a penetration test and internal time.',
    typicalTimeline:
      'Type I can be done in 4 to 8 weeks with automation software. Type II requires a 3 to 12 month observation period, so most companies start it immediately after Type I.',
    body: [
      'SOC 2 audits test your controls against the AICPA Trust Services Criteria: security is mandatory, and availability, processing integrity, confidentiality and privacy are optional add-ons. A Type I report checks that controls exist at a point in time. A Type II report checks that they actually worked over several months, which is what enterprise buyers really want to see.',
      'Roughly 15,000 to 20,000 SOC 2 reports are now issued each year, up from about 10,000 a few years ago. The driver is procurement: more than 70% of enterprise buyers ask for SOC 2 before signing a software contract, and a third of organizations say they have lost deals for lacking it.',
      'This is the framework that created the compliance automation category. Tools like Vanta, Drata, Secureframe and Sprinto connect to your cloud, code repos and HR systems, collect evidence continuously, and cut audit prep from hundreds of engineer-hours to a manageable workflow.',
    ],
    faqs: [
      {
        q: 'How much does SOC 2 cost in total?',
        a: 'Plan for $20,000 to $60,000 in year one: automation software ($7,500 to $15,000), the audit ($10,000 to $30,000 depending on scope and firm), a penetration test ($5,000 to $15,000) and internal time. Renewals cost less because evidence collection is already running.',
      },
      {
        q: 'What is the difference between SOC 2 Type I and Type II?',
        a: 'Type I verifies your controls are designed correctly at a single point in time. Type II verifies they operated effectively over a 3 to 12 month period. Most companies do Type I first to unblock deals, then run the Type II observation window.',
      },
      {
        q: 'Do I need software to get SOC 2?',
        a: 'No, but doing it with spreadsheets typically costs 200 to 400 engineer-hours per audit cycle. Automation software pays for itself if your engineers cost more than about $50 an hour, which they do.',
      },
    ],
  },
  {
    slug: 'iso-27001',
    name: 'ISO 27001',
    shortName: 'ISO 27001',
    title: 'ISO 27001 compliance software',
    summary:
      'ISO 27001 is the international standard for information security management systems. Where SOC 2 is a US audit report, ISO 27001 is a certifiable global standard, and it is the one European and international buyers ask for by name.',
    whoNeeds:
      'Companies selling outside the US, especially into Europe, and any company whose customers explicitly name ISO 27001 in contracts or RFPs.',
    typicalCost:
      'Similar to SOC 2: $7,500 to $15,000 for software, plus certification body fees of $10,000 to $25,000 for the stage 1 and stage 2 audits, plus surveillance audits in years two and three.',
    typicalTimeline:
      'Three to six months with automation software and an existing security baseline. Longer if you are building the ISMS from scratch.',
    body: [
      'ISO 27001 certifies your information security management system: the policies, risk assessments and controls that protect information. The 2022 revision reorganized controls into four themes and 93 controls, and certificates older than the 2022 version have now expired, which pushed a wave of recertification work through 2025 and 2026.',
      'Unlike SOC 2, ISO 27001 produces an actual certificate with a three-year cycle: stage 1 (documentation review), stage 2 (implementation audit), then annual surveillance audits. Certification bodies, not CPA firms, issue it.',
      'The same automation platforms that handle SOC 2 handle ISO 27001, and most companies pursuing both reuse 60 to 80 percent of the same controls and evidence. If you know international deals are coming, doing both in one program is far cheaper than doing them a year apart.',
    ],
    faqs: [
      {
        q: 'Is ISO 27001 or SOC 2 better?',
        a: 'They answer the same question for different audiences. US enterprise buyers ask for SOC 2; international buyers, especially in Europe, ask for ISO 27001. Many B2B companies end up with both, and the tools on this site map controls across the two.',
      },
      {
        q: 'How long is an ISO 27001 certificate valid?',
        a: 'Three years, with annual surveillance audits to keep it. Year two and three surveillance audits are smaller and cheaper than the initial certification.',
      },
      {
        q: 'Can one platform handle both SOC 2 and ISO 27001?',
        a: 'Yes. Vanta, Drata, Secureframe, Sprinto and most tools listed here map overlapping controls so evidence collected once serves both frameworks.',
      },
    ],
  },
  {
    slug: 'hipaa',
    name: 'HIPAA',
    shortName: 'HIPAA',
    title: 'HIPAA compliance software',
    summary:
      'HIPAA is US law for protecting health data. One honest note up front: there is no official HIPAA certification. Any vendor selling you a "HIPAA certificate" is selling a piece of paper auditors do not recognize. What matters is implementing the required safeguards and being able to prove it.',
    whoNeeds:
      'Healthcare providers, health plans, and any software company that touches protected health information as a business associate. If your SaaS stores patient data for clinic customers, this means you.',
    typicalCost:
      'Software runs $8,000 to $20,000 per year. Add a security risk analysis ($5,000 to $20,000 from a consultant) and remediation work. There is no audit fee because there is no official audit.',
    typicalTimeline:
      'Two to six months to implement safeguards and complete a documented risk analysis, depending on your starting point.',
    body: [
      'HIPAA has three relevant rules: the Privacy Rule (who can see health data), the Security Rule (the administrative, physical and technical safeguards you must implement) and the Breach Notification Rule (what you do when data leaks). The Security Rule is where software helps most.',
      'Because there is no certification, HIPAA compliance is about evidence: a documented security risk analysis, policies, training records, access controls, encryption, and business associate agreements with every vendor that touches PHI. In an HHS investigation, the documentation is the defense.',
      'Secureframe, Vanta and Hyperproof have the strongest HIPAA programs in this category, with HIPAA-specific control mappings and, in Secureframe’s case, HITRUST support for companies that want a certifiable framework on top of HIPAA.',
    ],
    faqs: [
      {
        q: 'Is there an official HIPAA certification?',
        a: 'No. HHS does not certify companies. Third-party "HIPAA certified" badges are marketing. What regulators ask for is proof you implemented the required safeguards, starting with a documented security risk analysis.',
      },
      {
        q: 'Does my SaaS need HIPAA compliance?',
        a: 'If you create, receive, maintain or transmit protected health information on behalf of a healthcare customer, yes, and they will ask you to sign a business associate agreement. If you never touch PHI, no.',
      },
      {
        q: 'What is HITRUST and do I need it?',
        a: 'HITRUST CSF is a certifiable framework that includes HIPAA requirements. Some large healthcare buyers ask for it because it is auditable and certifiable, unlike HIPAA itself. It costs significantly more than HIPAA compliance alone.',
      },
    ],
  },
  {
    slug: 'gdpr',
    name: 'GDPR',
    shortName: 'GDPR',
    title: 'GDPR compliance software',
    summary:
      'GDPR is the EU’s data protection law, and it applies to any company that handles EU residents’ data, wherever the company is based. Like HIPAA, there is no GDPR certificate. Compliance means lawful processing, documented records, honored data subject rights and, for many companies, a representative in the EU.',
    whoNeeds:
      'Any company with EU customers, EU website visitors, or EU employees. If your SaaS has users in Europe, GDPR applies to you.',
    typicalCost:
      'Privacy software ranges from free tiers for cookie consent to $25,000+ per year for enterprise privacy suites. A consultant-led gap assessment runs $10,000 to $30,000.',
    typicalTimeline:
      'One to three months for core compliance: records of processing, cookie consent, DSR workflows and updated contracts.',
    body: [
      'GDPR compliance breaks into concrete workstreams: a record of processing activities, a lawful basis for everything you collect, cookie and consent management on your sites, data subject request workflows (access, deletion, portability), data processing agreements with your vendors, and breach notification within 72 hours.',
      'Fines get the headlines, up to 4% of global revenue, but the everyday pressure is commercial: EU enterprise buyers send data protection questionnaires, and weak answers stall deals the same way a missing SOC 2 does in the US.',
      'OneTrust is the heavyweight here, with the deepest privacy feature set. For smaller companies, the compliance automation platforms (Vanta, Drata, Secureframe) cover GDPR control mapping, and dedicated consent tools handle the cookie banner piece at low cost.',
    ],
    faqs: [
      {
        q: 'Does GDPR apply to US companies?',
        a: 'Yes, if you offer goods or services to people in the EU or monitor their behavior. There is no minimum company size. A US SaaS with EU users is in scope.',
      },
      {
        q: 'Is there a GDPR certification?',
        a: 'No official one. GDPR compliance is demonstrated through documentation: records of processing, data protection impact assessments, contracts and working consent and request workflows.',
      },
      {
        q: 'What does a cookie consent tool actually do?',
        a: 'It blocks non-essential trackers until the visitor consents, records that consent, and lets visitors change their mind, which is what the ePrivacy rules and GDPR require. This is the most visible and most frequently fined part of privacy compliance.',
      },
    ],
  },
  {
    slug: 'pci-dss',
    name: 'PCI DSS',
    shortName: 'PCI DSS',
    title: 'PCI DSS compliance software',
    summary:
      'PCI DSS is the payment card industry’s security standard. If you store, process or transmit cardholder data, your card brands and acquiring bank require it. Version 4.0 is now fully in force, and its future-dated requirements became mandatory in March 2025.',
    whoNeeds:
      'Merchants and service providers that touch card data. If you use Stripe or a similar processor and never touch card numbers yourself, your scope shrinks dramatically, often to a self-assessment questionnaire.',
    typicalCost:
      'SAQ-level compliance can cost almost nothing beyond time. A full Report on Compliance from a QSA runs $30,000 to $100,000+ for larger environments, plus remediation.',
    typicalTimeline:
      'Weeks for a scoped-down SAQ. Six to twelve months for a full RoC in a complex environment.',
    body: [
      'PCI DSS v4.0 has 12 requirement areas covering network security, access control, monitoring and testing. The March 2025 deadline turned dozens of "best practice" items into hard requirements, including more rigorous multi-factor authentication and e-commerce payment page script inventory.',
      'The single biggest cost lever is scope reduction. Companies that never let card numbers touch their own systems, using hosted fields or a processor’s checkout, answer a short self-assessment instead of hiring a QSA for a full assessment.',
      'Compliance automation platforms cover PCI DSS control mapping and evidence collection for companies already running SOC 2 programs. Dedicated QSA firms handle the formal assessment for companies that need a Report on Compliance.',
    ],
    faqs: [
      {
        q: 'Do I need PCI DSS if I use Stripe?',
        a: 'Yes, but scope matters. If card data never touches your servers, you usually qualify for a short self-assessment questionnaire (SAQ A). Your processor and bank will tell you which SAQ applies.',
      },
      {
        q: 'What changed in PCI DSS v4.0?',
        a: 'Dozens of future-dated requirements became mandatory in March 2025: stronger MFA, payment page script management, targeted risk analyses and more. Companies assessed under v3.2.1 had to upgrade their programs.',
      },
      {
        q: 'Who performs a PCI DSS assessment?',
        a: 'Qualified Security Assessors (QSAs) issue Reports on Compliance for Level 1 merchants and service providers. Smaller merchants self-assess using the SAQ that matches their payment setup.',
      },
    ],
  },
  {
    slug: 'eu-ai-act',
    name: 'EU AI Act',
    shortName: 'EU AI Act',
    title: 'EU AI Act compliance software',
    summary:
      'The EU AI Act is the first broad law regulating artificial intelligence. It bans certain AI practices, sets rules for general-purpose AI models, and imposes documentation, risk management and transparency duties on high-risk AI systems. Obligations phase in from 2025 through 2027.',
    whoNeeds:
      'Any company that builds or deploys AI systems used in the EU. If your SaaS ships AI features to European customers, at minimum the transparency and AI literacy duties apply to you.',
    typicalCost:
      'Too new for stable benchmarks. Early AI governance tooling runs from startup-tier SaaS pricing to enterprise contracts. The bigger cost is internal: inventorying AI systems and classifying their risk.',
    typicalTimeline:
      'Prohibited practices and AI literacy duties applied from February 2025. General-purpose AI obligations from August 2025. Most high-risk system obligations land in August 2026 and 2027.',
    body: [
      'The Act sorts AI into risk tiers. Unacceptable-risk uses (social scoring, manipulative techniques, most real-time biometric ID in public) are banned. High-risk systems (hiring, credit, education, critical infrastructure) need risk management, data governance, technical documentation, human oversight and conformity assessment. Limited-risk systems mainly owe transparency, like labeling AI-generated content.',
      'The compliance work starts with an inventory: every AI system you build or use, its purpose, and its risk class. Most companies discover they use more AI than they thought, embedded in vendor tools, which is why AI governance platforms appeared almost immediately after the law passed.',
      'This is the newest framework on this site and the one with the least mature tooling. Vanta, Drata and OneTrust have added AI governance modules, and a wave of specialists is emerging. Expect this category to look different every six months.',
    ],
    faqs: [
      {
        q: 'Does the EU AI Act apply to non-EU companies?',
        a: 'Yes, if your AI system’s output is used in the EU. A US SaaS company selling AI features to European customers is in scope, similar to how GDPR reaches across borders.',
      },
      {
        q: 'What are the penalties?',
        a: 'Up to €35 million or 7% of global turnover for prohibited practices, and up to €15 million or 3% for most other violations. Enforcement ramps up as obligations phase in.',
      },
      {
        q: 'What should a SaaS company do first?',
        a: 'Inventory every AI system and feature you build or embed, classify each against the risk tiers, and assign an owner. The inventory drives everything else, and it is the part auditors and customers will ask to see first.',
      },
    ],
  },
  {
    slug: 'dora',
    name: 'DORA',
    shortName: 'DORA',
    title: 'DORA compliance software',
    summary:
      'DORA is the EU’s Digital Operational Resilience Act. It tells banks, insurers and other financial entities how to manage ICT risk, report incidents, test resilience and, critically for software vendors, how to oversee their technology suppliers. It has applied since January 2025.',
    whoNeeds:
      'EU financial entities directly, and their ICT vendors indirectly. If you sell software to European banks or insurers, their DORA duties flow into your contracts and questionnaires.',
    typicalCost:
      'For vendors, the cost shows up as contract amendments, registers of information support and deeper security questionnaires. Regulated entities themselves face full resilience programs.',
    typicalTimeline:
      'In force since January 17, 2025. Financial entities and their vendors are now operating under it, with supervision still maturing.',
    body: [
      'DORA has five pillars: ICT risk management, incident reporting, resilience testing, third-party risk oversight and information sharing. The third-party pillar is the one software vendors feel: financial entities must maintain a register of their ICT providers, flow specific clauses into contracts, and assess concentration risk.',
      'For a SaaS company selling into EU finance, DORA shows up as longer security questionnaires, new contract clauses (audit rights, exit strategies, subcontractor visibility) and requests for evidence that maps to DORA’s requirements. Vendors with SOC 2 or ISO 27001 already have most of the underlying evidence.',
      'Compliance platforms are adding DORA frameworks and register-of-information support. If EU financial services is a target market, mapping your existing SOC 2 evidence to DORA once, inside your compliance tool, is far cheaper than answering each bank’s questionnaire by hand.',
    ],
    faqs: [
      {
        q: 'Does DORA apply to software vendors?',
        a: 'Not directly in most cases. It regulates financial entities, but they push requirements down to their ICT vendors through contracts and due diligence. Critical third-party providers can be designated for direct oversight.',
      },
      {
        q: 'What is a register of information?',
        a: 'A documented list of a financial entity’s ICT providers and contracts that regulators can request. Vendors should expect customers to ask for the data points needed to complete it.',
      },
      {
        q: 'How does DORA relate to SOC 2?',
        a: 'SOC 2 evidence covers much of what DORA due diligence asks for, but the mapping is not one-to-one. Tools that support both frameworks let you reuse evidence instead of rebuilding it per customer.',
      },
    ],
  },
  {
    slug: 'sox',
    name: 'SOX',
    shortName: 'SOX',
    title: 'SOX compliance software',
    summary:
      'The Sarbanes-Oxley Act is US law for public companies, requiring management and auditors to attest that internal controls over financial reporting actually work. In practice, a large share of SOX work is IT general controls: access, change management and operations.',
    whoNeeds:
      'US public companies, companies preparing to IPO, and their subsidiaries. Private companies feel it too when they are acquired by or audited alongside public companies.',
    typicalCost:
      'SOX programs are among the most expensive in compliance: six to seven figures annually for large companies when tooling, internal audit staff and external audit fees are combined.',
    typicalTimeline:
      'Continuous. Controls operate all year, with testing each quarter and an annual auditor opinion.',
    body: [
      'SOX section 404 is the expensive part: management must assess internal control over financial reporting, and external auditors must attest to it. IT general controls sit underneath: who has access to financial systems, how changes are approved and deployed, and how data is backed up.',
      'This is AuditBoard’s home turf, with LogicGate and OneTrust also strong. The compliance automation startups (Vanta, Drata) added SOX templates, but their sweet spot remains security frameworks; enterprise SOX programs still run on dedicated audit platforms.',
      'For pre-IPO companies, the practical advice is to start SOX readiness 12 to 18 months before listing. Retrofitting IT general controls under IPO pressure is one of the most reliably miserable projects in enterprise software.',
    ],
    faqs: [
      {
        q: 'Does SOX apply to private companies?',
        a: 'Not directly, but it reaches them anyway: pre-IPO companies need it before listing, and private subsidiaries of public companies get pulled into the parent’s control environment.',
      },
      {
        q: 'What are IT general controls?',
        a: 'The baseline IT controls SOX auditors test: access management, change management, and computer operations for systems that touch financial reporting. Most SOX deficiencies are ITGC deficiencies.',
      },
      {
        q: 'Can compliance automation tools handle SOX?',
        a: 'They can track controls and evidence, and Vanta and Drata offer SOX templates. For full internal audit management, enterprise tools like AuditBoard are built for the job.',
      },
    ],
  },
];

export function getFramework(slug) {
  return frameworks.find((f) => f.slug === slug);
}
