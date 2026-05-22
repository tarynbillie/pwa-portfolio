const photos = [
  { src: '/IMG_0357%202.JPG',                          alt: 'At the waterfront with my dog' },
  { src: '/DSC_3756.JPG',                              alt: 'Working on a puzzle' },
  { src: '/DSC_4581.JPG',                              alt: 'In the kitchen' },
  { src: '/37472261-ED6E-4EBA-AC80-68D7EC0F4949.JPG', alt: 'At the dog park' },
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
      'Discovery Facilitation',
      'Sprint Planning',
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
            consequences. With experience across B2B &amp; B2C SaaS,
            fintech, and enterprise system rollouts, I specialize in making complexity manageable:
            clear processes, aligned stakeholders, and delivery you can trust. I own the full
            lifecycle — research, requirements, and delivery — working directly with engineering,
            design, and compliance teams to ship things that actually hold up.
          </p>
          <p className="about-lead">
            I bring a calm, systems-focused approach. The features and projects I'm most proud of are the ones
            that left teams and customers better than I found them — and because I prototype with
            AI, I'm never waiting on someone else to test what's possible.
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

      {/* ── Photos + tagline ─────────────────────────────────────── */}
      <section className="about-photos-section">
        <div className="about-photos-inner">
          <p className="about-photos-tagline">
            Located in Hamilton, Ontario. Mom of two toddlers. Watercolour painter. Cyclist.
            In my spare time, you can find me at the playground, splash pad, or community garden.
          </p>
          <div className="about-photos-wrap">
            {photos.map(({ src, alt }, i) => (
              <img key={src} src={src} alt={alt} className={`about-photo about-photo--${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────── */}
      <section className="about-body">
        <span className="about-eyebrow">Core Skills</span>
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

    </div>
  )
}
