const skillGroups = [
  {
    heading: 'Craft',
    items: [
      'Cross-functional delivery',
      'Project planning & prioritization',
      'Stakeholder communication',
      'Change enablement & adoption',
      'Agile workflows',
    ],
  },
  {
    heading: 'Domain',
    items: [
      'B2B SaaS implementations',
      'Learning & enablement programs',
      'System rollouts & migrations',
      'Risk & scope management',
      'Requirements gathering',
    ],
  },
  {
    heading: 'Tools',
    items: [
      'Jira · Asana · Trello',
      'Confluence · Airtable · Figma',
      'Salesforce · Zendesk · Tableau',
    ],
  },
]

export default function About() {
  return (
    <div className="about">

      {/* ── Intro ───────────────────────────────────────────────── */}
      <section className="about-intro">
        <div className="about-intro-text">
          <span className="about-eyebrow">Associate Product Manager</span>
          <h1>Hi, I'm Taryn.</h1>
          <p className="about-lead">
            Based in Hamilton, Ontario. I lead the kind of work that's easy to
            underestimate — the implementations, rollouts, and enablement
            programs that make ambitious initiatives actually land.
          </p>
          <p className="about-sub">
            Mom of two toddlers. Watercolour painter. Cyclist. In my spare time
            you can find me at the playground.
          </p>
          <a href="mailto:hello@tarynreithofer.com" className="btn btn-primary about-cta">
            Get in touch
          </a>
        </div>
        <div className="about-photo-wrap">
          <img
            src="/taryn.png"
            alt="Taryn Reithofer"
            className="about-photo"
          />
        </div>
      </section>

      {/* ── Intention + Skills ──────────────────────────────────── */}
      <section className="about-body">
        <div className="about-body-inner">
          <div className="about-copy">
            <h2>I build with intention.</h2>
            <p>
              With experience across B2B SaaS, fintech, and enterprise system
              rollouts, I specialize in the work that makes complexity
              manageable — clear processes, aligned stakeholders, and delivery
              you can trust.
            </p>
            <p>
              I bring a calm, systems-focused approach to cross-functional work.
              The projects I'm most proud of are the ones that ran smoothly,
              landed well, and left teams better than I found them.
            </p>
            <p>
              Outside of work, I'm drawn to design, systems thinking, and
              anything that sits at the edge of structure and creativity.
            </p>
          </div>

          <div className="about-skills">
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
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────── */}
      <section className="about-contact">
        <div className="about-contact-inner">
          <span className="about-eyebrow">Let's talk</span>
          <h2>Open to new opportunities.</h2>
          <p>
            If you're building something ambitious in fintech and looking for a
            PM who cares deeply about craft and outcome — I'd love to hear from
            you.
          </p>
          <a href="mailto:hello@tarynreithofer.com" className="btn btn-primary">
            hello@tarynreithofer.com
          </a>
          <div className="about-contact-links">
            <a href="https://linkedin.com/in/tarynreithofer" target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href="/resume" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </section>

    </div>
  )
}
