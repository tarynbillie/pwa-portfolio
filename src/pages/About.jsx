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

      {/* ── Intro ───────────────────────────────────────────────── */}
      <section className="about-intro">
        <div className="about-intro-text">
          <span className="about-eyebrow">Product Manager</span>
          <h1>Hi, I'm Taryn.</h1>
          <p className="about-lead">
            Based in Hamilton, Ontario. I lead the kind of work that's easy to
            underestimate — the implementations, rollouts, and enablement
            programs that make ambitious initiatives actually land.
          </p>
          <p className="about-sub">
            Mom of two toddlers. Watercolour painter. Cyclist. In my spare time,
            you can find me at the playground.
          </p>
          <a href="mailto:tarynbillie@gmail.com" className="btn btn-primary about-cta">
            Get in touch
          </a>
        </div>
      </section>

      {/* ── Intention + Skills ──────────────────────────────────── */}
      <section className="about-body">
        <div className="about-body-copy">
          <h2>I build with intention.</h2>
          <div className="about-body-paras">
            <p>
              With experience across B2B & B2C SaaS, fintech, and enterprise system
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
        </div>

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
            If you're building something ambitious in fintech, where empathy isn't an afterthought, it's the whole point.
             I'd love to hear from you!
          </p>
          <a href="mailto:tarynbillie@gmail.com" className="btn btn-primary">
            tarynbillie@gmail.com
          </a>
          <div className="about-contact-links">
            <a href="https://linkedin.com/in/tarynreithofer" target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href="/taryn-reithofer-resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </section>

    </div>
  )
}
