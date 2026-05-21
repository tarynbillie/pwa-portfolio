const stats = [
  { num: '5',   label: 'Features owned end-to-end' },
  { num: '20+', label: 'Features backlogged, sized, and sequenced' },
  { num: '6',   label: 'Prototypes built with AI' },
  { num: '11',  label: 'Products competitively benchmarked' },
]

const skillGroups = [
  {
    heading: 'Craft',
    items: [
      'Discovery & Framing',
      'PRD and User Story Writing',
      'Requirements Gathering',
      'Success Metrics Definition',
      'Roadmap Prioritization',
      'Competitive Analysis',
      'Persona Development',
      'Storytelling',
      'AI-Assisted Prototyping',
    ],
  },
  {
    heading: 'Domain',
    items: [
      'Compliance & Regulatory Requirements',
      'Cross-Functional Collaboration',
      'Stakeholder Communication',
      'Agile Environment',
      'Problem-Solving',
      'Customer-Centric Mindset',
      'Customer Needs Analysis',
    ],
  },
  {
    heading: 'Tools',
    items: [
      'Claude Code',
      'Figma',
      'JIRA · Asana · Confluence',
      'Salesforce',
    ],
  },
]

export default function About() {
  return (
    <div className="about">

      {/* ── Intro — purple tinted with dot grid ─────────────────── */}
      <section className="about-intro">
        <div className="about-intro-text">
          <span className="about-eyebrow">Product Manager</span>
          <h1>I build in the hard spaces.</h1>
          <p className="about-lead">
            Regulated fintech, compliance infrastructure, features where getting it wrong has real
            consequences. With experience across B2B & B2C SaaS,
            fintech, and enterprise system rollouts, I specialize in making complexity manageable:
            clear processes, aligned stakeholders, and delivery you can trust. I own the full
            lifecycle — research, requirements, and delivery — working directly with engineering,
            design, and compliance teams to ship things that actually hold up.
          </p>
          <p className="about-lead">
            I bring a calm, systems-focused approach. The projects I'm most proud of are the ones
            that left teams and customers better than I found them — and because I prototype with
            AI, I'm never waiting on someone else to test what's possible.
          </p>
          <p className="about-sub">
            Located in Hamilton, Ontario. Mom of two toddlers. Watercolour painter. Cyclist. In my spare time,
            you can find me at the playground, splash pad, or community garden.
          </p>
          <a
            href="https://www.linkedin.com/messaging/compose/?recipient=tarynreithofer"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary about-cta"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="about-stats">
        {stats.map(({ num, label }) => (
          <div key={label} className="about-stat">
            <span className="about-stat-num">{num}</span>
            <span className="about-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Skills ──────────────────────────────────────────────── */}
      <section className="about-body">
        <div className="about-skills-grid">
          {skillGroups.map((group) => (
            <div key={group.heading} className="skill-group">
              <h4 className="skill-group-label">{group.heading}</h4>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────── */}
      <section className="about-contact">
        <div className="about-contact-inner">
          <span className="about-eyebrow">Let's talk</span>
          <h2>Open to new opportunities.</h2>
          <p>
            If you're building something ambitious in fintech — where empathy isn't an afterthought, it's the whole point — I'd love to hear from you.
          </p>
          <a href="mailto:tarynbillie@gmail.com" className="btn btn-primary">
            tarynbillie@gmail.com
          </a>
          <div className="about-contact-links">
            <a href="https://linkedin.com/in/tarynreithofer" target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/tarynbillie" target="_blank" rel="noreferrer">GitHub</a>
            <span aria-hidden="true">·</span>
            <a href="/taryn-reithofer-resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </section>

    </div>
  )
}
