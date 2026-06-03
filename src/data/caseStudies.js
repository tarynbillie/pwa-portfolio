export const caseStudies = [
  {
    id: 'portfolio-widget',
    slug: 'portfolio-intelligence',
    navLabel: 'Portfolio Intelligence',
    tag: 'Discovery',
    year: '2026',
    title: "Defining a fintech platform's first portfolio intelligence features from scratch",
    artifact: {
      src: '/figjam-portfolio-widgets.png',
      caption: 'FigJam board used to scope MVP criteria for Beat the Market, Trending Swaps, and Top Movers — presented to my director before going to the CEO.',
    },
    contextLabel: 'Opportunity',
    contextParagraphs: [
      "A crypto wallet platform was introducing a biweekly feature launch cadence — shipping something small, intentional, and visible every two weeks. The portfolio widget initiative was the first major application of that cadence.",
      "No one had defined what portfolio intelligence should look like for crypto users. There was no existing benchmark, and no PRDs for multiple baseline features — unrealized gain/loss, cost basis, percentage allocation per asset — that every credible wallet was already shipping.",
      "The initiative was structured around three phases: closing table stakes gaps first, then parity-plus features that do what competitors do but better, then a sprint-by-sprint differentiation layer — features that give users a reason to open the app on days when nothing in their portfolio has changed.",
    ],
    process: [
      {
        label: "Competitive benchmarking across 11 wallets",
        detail: "Swept eleven wallets and fintech apps to identify table stakes gaps and above-parity opportunities. Confirmed that the platform was missing unrealized gain/loss per asset, total cost basis, and percentage allocation — baseline features with no PRDs found. That audit set the priority order before any feature debate started.",
      },
      {
        label: "Social modelling across four personas",
        detail: "Designed a repeatable prompt framework for each user archetype — each prompt seeded with the persona's risk tolerance, crypto experience level, and primary motivation — then ran it against every feature before a single screen was designed. The Crypto Curious user never sees Trending Swaps V1. Beat the Market ships descriptive-only first. Top Movers gets a friction tooltip on 'most sold' before launch. This approach compressed what would have been weeks of research sessions into rapid, structured iteration across all persona-feature combinations.",
      },
      {
        label: "Adversarial debate framework for MVP criteria",
        detail: "Engineered a multi-round adversarial prompt structure — a pro agent advocating for shipping and a locked against agent representing the most at-risk persona — iterated for at least 10 rounds per feature until no new objections surfaced. The output was 17 minimum viable requirements across the three features: persona gates, opt-in toggles, explicit 'trending' definitions, V2 commitments required before V1 ships. Each requirement was then T-shirt sized (XS–L) and classified as sand, pebble, or rock so engineering had a clear effort signal before design kicked off. Two features were explicitly upsized as a direct result — Top Movers from XS to S, Trending Swaps from S to S–M — because the debates surfaced scope that wasn't visible in the initial estimate.",
      },
    ],
    outcomes: [
      { num: '11',  label: 'wallets benchmarked' },
      { num: '17',  label: 'minimum viable requirements defined across 3 features' },
      { num: '3',   label: 'features placed on the roadmap' },
      { num: '20+', label: 'features backlogged, sized, and sequenced' },
    ],
    reflectionHeading: "What followed",
    reflection: "After completing this discovery work, I identified portfolio intelligence as an unowned product surface — a Confluence ownership gap analysis confirmed every other major product area had an assigned PM except this one. Pitched it to my manager as a specialization area, backed by the benchmarking evidence. It became a formal part of my roadmap.",
    personalTakeaway: "Identifying an unowned product surface and building the business case to own it was the most consequential move I made this cycle. I went in thinking the benchmarking was just research. It ended up being the thing that made the ownership conversation impossible to ignore. I learned that the PM contribution isn't always in the PRD. Sometimes it's in the org chart conversation that happens before one is written.\n\nWhat I carry forward: most teams have surfaces nobody owns but everybody depends on. I've gotten good at spotting those early, and using the benchmarking work as the thing that makes the conversation impossible to sidestep. That's honestly where I think I add the most value — finding what's falling through the cracks before it becomes someone's emergency.",
  },
  {
    id: 'settings-self-serve',
    slug: 'account-management',
    navLabel: 'Account Management',
    tag: 'Settings',
    year: '2026',
    title: 'Replacing compliance-gated workarounds with self-serve account management for email and phone updates',
    contextLabel: 'The Problem',
    contextParagraphs: [
      "The same SOP governed both email and phone number updates — users had to create a secondary account, deliberately fail email verification, and wait up to 24 hours for Compliance to complete a manual update.",
      "Email-related tickets represented 4–10% of total support volume; phone accounted for another 5% through the same process. Neither flow existed as a designed product experience.",
      "For a returning user blocked before a transaction, the wait wasn't friction — it was a reason to leave.",
    ],
    process: [
      {
        label: "Paired discovery briefs, two approved PRDs",
        detail: "Ran the full lifecycle from discovery brief through PRD for both email and phone number. Presented both features together — same philosophy, same trust moment, same root cause. Managed parallel scopes so engineering could plan each independently without blocking each other. Both PRDs approved and ready for grooming.",
      },
      {
        label: "Engineering efficiency decisions built into scope",
        detail: "Three deliberate decisions reduced build effort: email verification screens and OTP logic from onboarding were repurposed without modification — no net-new screens required. Phone number verification delegated entirely to the Sumsub SDK, which owns country code selection, format validation, auto-populate, and OTP — minimal custom build. A 24-hour cooldown mechanic was designed as a generic, reusable flag applicable to any future security-sensitive action.",
      },
      {
        label: "Stakeholder alignment across both features",
        detail: "Managed design review feedback from two designers, customer success resurface of descoped items, and compliance routing requirements for both flows in parallel. Every open question resolved at the PRD stage before engineering began. No compliance blockers carried into development on either feature.",
      },
    ],
    outcomes: [
      { num: '~15%', label: 'of total support volume targeted for elimination' },
      { num: '≥95%', label: 'target self-serve verification rate' },
      { num: '0',    label: 'net-new verification screens required' },
    ],
    personalTakeaway: "Running two parallel feature lifecycles simultaneously sharpened how I think about scope boundaries. The instinct to merge them into one project was real — same trust moment, same root cause — but keeping them separate gave engineering clean, independently plannable work. I left this one with a stronger lens on efficiency as a PM responsibility, not just an engineering concern.\n\nWhat I carry forward: sloppy scope boundaries are expensive, and that cost usually lands on engineering. I now think about how a feature is structured as part of the PM job, not something to sort out later. And before I write a single requirement, I'm asking what already exists in the product that solves part of this — because the 0 net-new screens result didn't come from good design, it came from asking that question early enough. That kind of thinking compounds. Every unnecessary build you avoid is time and budget that goes toward something that actually moves the needle.",
  },
  {
    id: 'q4-support-ops',
    slug: 'support-operations',
    navLabel: 'CX & Support Ops',
    company: 'Q4 Inc.',
    gated: false,
    tag: 'CX & Ops',
    year: '2020–2025',
    title: "Rebuilding Q4's support operation from the inside: AI triage, workflow redesign, and the product advocacy that reduced volume",
    contextLabel: 'The Problem',
    contextParagraphs: [
      "Q4 Inc. built investor relations websites for public companies — a time-sensitive, high-stakes environment where earnings events go live on a fixed schedule and SLA failures are visible to the market. The support team handled CMS updates, front-end fixes, and live event support under windows measured in minutes.",
      "The operation was reactive. Case volume was growing, triage was manual, routing was inconsistent, and Time to First Pending sat at 4.4 hours — long enough that client trust eroded before the problem was even touched. The team was scaling headcount to absorb load rather than addressing the structural causes.",
      "A parallel failure lived in the knowledge layer. Internal documentation was fragmented across multiple systems, new agents had no reliable source of truth, and support escalations were high partly because the people handling tickets didn't have what they needed to resolve cases without asking someone else.",
    ],
    process: [
      {
        label: "Deployed Forethought AI triage in Salesforce Service Console",
        detail: "Partnered with Business Operations and the internal Salesforce team to evaluate, configure, and deploy Forethought — an AI-powered triage tool — designing queue logic, escalation rules, and routing criteria from scratch. The value wasn't the tool; it was how the system was configured: which signals triggered which routes, what escalation conditions looked like, and how to prevent false-positive routing that would erode analyst trust before the system had a chance to prove itself. Cut Time to First Pending from 4.4 to 1.4 hours — a 70% reduction. Reduced case backlog by 30% during peak quarters.",
      },
      {
        label: "Redesigned workflows using CRM data and process automation",
        detail: "Applied Salesforce and Tableau data to surface volume trends, uncover prioritization failures, and build the analytical case for where manual routing was breaking down. Built process automation and redesigned escalation workflows around what the data showed — not what the team assumed. Sustained 90%+ SLA attainment across a team of 13 analysts through two high-growth quarters, including the S&P Global Market Intelligence migration that onboarded approximately 500 new IR sites onto Q4's platform. The SLA result wasn't from headcount. It was from understanding where time was being lost and designing structure around the gaps.",
      },
      {
        label: "Advocated for self-serve features that reduced inbound support volume",
        detail: "Identified a category of support tickets that were a product gap, not a people gap — clients creating cases for routine CMS tasks the product should have let them do themselves. Brought quantified volume data into the conversation with Customer Experience and Product, framing the support load as a signal about where the product was failing users. Self-serve features shipped, freeing the team to focus on higher-complexity work. This was the most consequential move of that period — it required treating my team's ticket queue as a product signal and taking that argument to the people who could actually change the product.",
      },
      {
        label: "Led end-to-end implementation of Spekit, an AI-powered knowledge platform",
        detail: "After moving into the Revenue and Enablement Specialist role, designed and executed the full implementation: content architecture, taxonomy, and migration of 1,500+ assets to a unified source of truth across internal systems. The Spekit work was the completion of a thread that started on the Team Lead side — AI triage fixed the routing problem, but agents still needed better information to resolve cases without escalating. 30% increase in self-serve knowledge access, measurable reduction in support escalations, 20% faster average onboarding ramp, and 100% satisfaction on training feedback surveys.",
      },
    ],
    outcomes: [
      { num: '13',     label: 'analysts led through two consecutive high-growth quarters' },
      { num: '70%',    label: 'reduction in Time to First Pending — 4.4 hours to 1.4' },
      { num: '30%',    label: 'reduction in case backlog during peak quarters' },
      { num: '90%+',   label: 'SLA attainment sustained across the team' },
      { num: '~500',   label: 'IR sites onboarded during the S&P Global migration' },
      { num: '30%',    label: 'increase in self-serve knowledge access post-Spekit' },
      { num: '20%',    label: 'faster average onboarding ramp for new agents' },
      { num: '100%',   label: 'satisfaction score on training feedback surveys' },
      { num: '1,500+', label: 'knowledge assets migrated to a unified source of truth' },
      { num: '5',      label: 'lifelong friendships, give or take' },
    ],
    personalTakeaway: "The through-line across five years at Q4 is that I was doing PM work before I had the title. I owned a problem space, drove tooling decisions, measured outcomes, and advocated for product changes that addressed root causes — not just symptoms. The Forethought deployment, the workflow redesign, the self-serve advocacy, the Spekit implementation — those are connected. Each one addressed a different layer of the same underlying failure.\n\nWhat I carry forward: support operations is a product signal. The tickets your team handles, the escalations that keep repeating, the knowledge gaps agents fill with guesswork — those are all telling you something about where the product is failing users. I spent five years on the inside of that, which means I recognize those signals before they show up in a dashboard. That's not context you get from a briefing — it's what you earn from living inside the operation.",
  },
  {
    id: 'compliance-infra',
    slug: 'compliance-infrastructure',
    navLabel: 'Compliance & Infrastructure',
    tag: 'Compliance',
    year: '2026',
    title: 'Three compliance and infrastructure initiatives — from misaligned framing to approval-ready PRDs',
    contextLabel: 'The Problem',
    contextParagraphs: [
      "These three initiatives share a pattern: the real work happens before a single screen is designed.",
      "Address update was blocked because stakeholders were debating the wrong problem. Sumsub transaction monitoring closed an AML compliance gap that had no user-facing surface. Transaction email templates exposed an infrastructure scope risk before it became a delivery problem.",
      "In each case, the contribution was defining what the problem actually was — and reframing it so the right solution became obvious.",
    ],
    process: [
      {
        label: "Address update: reframing the problem unlocked alignment",
        detail: "The brief came in as a routine address change feature. Three stakeholder conversations in, no one agreed on what 'address update' meant from a compliance standpoint — the team was debating KYC verification requirements, proof-of-address documentation, and pending states that shouldn't exist. Traced the misalignment to a fundamental framing problem: the platform doesn't verify address authenticity, it re-evaluates user jurisdiction category on address change. Retired 'verification' and 'validation' language across all documentation. That reframe resolved six of eight open compliance questions before development began. Before handing off, ran a cross-document alignment audit across the PRD and all four user stories — catching and resolving 17 inconsistencies before engineering ever saw the document.",
        reflection: "The requirement arrived as an ambiguous roadmap item with almost no context, and I wrote the brief before fully understanding the product's compliance model. The real learning: when a roadmap item arrives without a problem statement, interrogate the frame before writing a word — not after the discovery brief alignment call.",
      },
      {
        label: "Sumsub transaction monitoring: closing a material AML gap",
        detail: "RockWallet had fraud-focused monitoring via Sardine and identity verification at onboarding via Sumsub KYC — but no continuous AML transaction monitoring. A user who onboards as a school teacher and begins executing million-dollar trades wasn't flagged, because no system was watching for that pattern. Ran a coverage analysis confirming Sardine and Sumsub are complementary, not interchangeable — dual integration, not a migration. Defined the data pipeline requirements to connect RockWallet's transaction data warehouse to Sumsub's risk scoring engine. PRD drafted and presented to leadership at the March 18 Discovery Review.",
      },
      {
        label: "Transaction email templates: scope protection and infrastructure clarity",
        detail: "Leadership flagged an opportunity to upgrade the visual quality of transactional emails on AWS SES — a template and design initiative, not a copy rewrite. Confirmed the platform's email infrastructure stack and identified the Sumsub vs. AWS SES email scope split before it became a delivery risk. When a full copy rewrite was proposed in stakeholder review, escalated it to the room rather than resolving it unilaterally — a scope call with compliance implications isn't a PM decision to make alone. Surfaced a viable path for non-technical template editing post-launch. Brief presented at the March 25 Discovery Review. Low dev effort target maintained throughout.",
      },
    ],
    outcomes: [
      { num: '1',  label: 'active AML compliance gap remediated — high-value trades were going unflagged' },
      { num: '17', label: 'cross-document inconsistencies resolved before engineering handoff' },
      { num: '6',  label: 'of 8 compliance blockers resolved before development began' },
    ],
    personalTakeaway: "The common thread across these three was learning to resist the pull toward the solution. Each arrived as a \"what.\" The PM work was converting it to a \"why\" before anything was written — and in the address update case, retiring the wrong framing entirely. I came out of this quarter with a more disciplined instinct for interrogating the problem statement before engaging with scope.\n\nWhat I carry forward: the most expensive problems a product team faces are usually the ones nobody spotted early enough. A misframed brief, an undetected compliance gap, a scope split that becomes a delivery crisis — none of those are engineering problems, they're PM problems that showed up late. I've gotten a lot more comfortable sitting in the discomfort of \"I don't think we've framed this right yet\" before moving forward, because that discomfort is almost always cheaper than what comes after.",
  },
]
