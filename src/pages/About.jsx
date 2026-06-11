import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

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
      'Agentic AI Workflows',
      'MCP Integrations',
      'Figma',
      'JIRA · Asana · Confluence',
      'Salesforce · Zendesk',
      'Omnichannel',
    ],
  },
]

const TESTIMONIALS = [
  {
    name: 'Megan Conard',
    avatar: '/Megan.jpeg',
    title: 'Head of Product Management · RockWallet',
    relationship: 'Managed Taryn directly',
    quote: "Although I only had the opportunity to work with Taryn for a relatively short time, she made an immediate and lasting impression. Despite coming in with limited formal product management experience, she operated with the maturity, thoughtfulness, and instincts of someone who had been in the field for years. Taryn consistently approached her work with diligence, depth, and a genuine curiosity to learn quickly. She demonstrated strong empathy for users, excellent product instincts, and an impressive ability to adapt to new challenges and information. She also communicated with professionalism and clarity, confidently holding her own with complex stakeholders and difficult conversations alike. I'm excited to see where her career takes her — she has tremendous potential as a product leader.",
  },
  {
    name: 'Alex Straus',
    avatar: '/Alex.jpeg',
    title: 'Senior Product Manager · RockWallet',
    relationship: 'Managed Taryn directly',
    quote: "I had the good fortune of being Taryn's manager while at RockWallet. Like others have said here, Taryn is a powerhouse and a force multiplier for any team. She learns fast, adopts new tech at light speed, has excellent product sense, and works well with everyone. She is also calm, thoughtful, kind and has a wonderful sense of humor. She genuinely brings joy to the workplace on a daily basis. If you are considering hiring Taryn, you would be lucky to do so. It was a pleasure getting to work with Taryn.",
  },
  {
    name: 'Federico Ostan Bazan',
    avatar: '/Federico.png',
    title: 'Head of Product Design · RockWallet',
    relationship: 'Worked with Taryn on the same team',
    quote: "Taryn joined the team as a Product Manager — within weeks she was effectively running projects solo, owning stakeholder reviews, going deep into research, and taking direct (sometimes heavy) feedback from the company's owner without missing a beat. What stood out most wasn't experience, it was her personality and sense of responsibility. From week one she was on top of every situation, calm under pressure, and clearly accountable for the work. She's a great reminder that great PMs are defined by temperament and personality. A perfect fit for product, and someone I'd happily work with again any day.",
  },
  {
    name: 'Sandra Drakulic',
    avatar: '/Sandra.jpeg',
    title: 'Product Manager · RockWallet',
    relationship: 'Worked with Taryn on the same team',
    quote: "Working alongside Taryn was a great pleasure. This was her first product role, but you genuinely could not tell. She came in sharp, picked things up incredibly fast, and carried herself with the confidence and competence of someone who had been doing this for years. What really impressed me was her work ethic. Her output was exceptional and she consistently delivered at a speed that made everyone around her take notice. She stayed on top of everything, never let things slip, and somehow always seemed one step ahead. I truly do not know how she did it all!",
  },
  {
    name: 'Aviss K. Zhao',
    avatar: '/Aviss.jpeg',
    title: 'UI/UX & Product Designer · RockWallet',
    relationship: 'Worked with Taryn on the same team',
    quote: "I've worked with Taryn across a few projects, and she consistently made collaboration smooth and efficient. She's the kind of product manager who takes questions head-on, quickly digs into the problem, and comes back with clear direction or actionable feedback. When something wasn't working, Taryn didn't hesitate to rethink the approach and propose better solutions, often improving the direction of the work in the process. Working with her made it easy to stay on the same page and move projects forward with clarity and momentum.",
  },
  {
    name: 'Inna Posokhova',
    avatar: '/Inna.jpeg',
    title: 'Product & UI/UX Designer · RockWallet',
    relationship: 'Worked with Taryn on the same team',
    quote: "Taryn is one of those rare people who makes everyone around her better. As a Product Owner, she brings genuine curiosity to every project and consistently asks the right questions — the kind that push you to refine and improve your flows in ways you wouldn't have considered on your own. She's passionate, sharp, and a wonderful collaborator. Any team that gets to work with Taryn is genuinely lucky, and I have no doubt she has an incredible career ahead of her!",
  },
  {
    name: 'Elizabeth Wood',
    avatar: '/Elizabeth.jpeg',
    title: 'Data-Driven Operations Leader · Q4 Inc.',
    relationship: 'Managed Taryn directly',
    quote: "Taryn is a self-starter, and an absolute pleasure to work with. Shortly after she joined our Web Content Services team in early 2020, we found ourselves in a period of rapid growth that required an expansion to our leadership team. Though quite junior in tenure, through her meticulous attention to detail, sense of compassion for clients, and strong rapport with her peers, Taryn's contributions rendered her the obvious choice for the role. It was truly a pleasure watching Taryn transition from a top performing individual contributor to a leader of people. Wherever Taryn goes, she will undoubtedly be an asset.",
  },
  {
    name: 'Richard Thibault',
    avatar: '/Richard.jpeg',
    title: 'Revenue Enablement Leader · Q4 Inc.',
    relationship: 'Managed Taryn directly',
    quote: "Taryn brought structure, accountability, and creativity to two key areas of our enablement operations: project management for our Web Content Specialists and ownership of our Spekit knowledge enablement platform. She became the driving force behind our Spekit development — elevating the platform's effectiveness by redesigning enablement flows, organizing content into intuitive structures, and collaborating with subject matter experts to produce high-impact walkthroughs and tool tips. Her work directly contributed to improved rep onboarding and faster time-to-productivity across support teams. Taryn is both a strategic partner and an expert problem solver who is easily trusted with large, complex projects.",
  },
  {
    name: 'Meaghan E. Kennedy',
    avatar: '/Meaghan.jpeg',
    title: 'Revenue Operations Leader · Q4 Inc.',
    relationship: 'Senior to Taryn at Q4',
    quote: "Taryn is a highly adaptable technical powerhouse. I had the pleasure of working with Taryn for several years while at Q4, most closely in her role focused on Revenue Enablement. Taryn is a fast learner, curious, and builds strong relationships quickly. One of Taryn's strengths is being able to see the big picture and understand how both her individual and team's contributions impact the company as a whole. I would absolutely jump at the chance to work with Taryn again.",
  },
  {
    name: 'Nataly Zatroutine',
    avatar: '/Nataly.jpeg',
    title: 'Corporate IT & Procurement · Q4 Inc.',
    relationship: 'Managed Taryn directly',
    quote: "From the start, Taryn stood out as a quick learner who asked thoughtful and important questions during onboarding — making it clear she was invested in not just learning the role but improving how the team worked. She played a key role in improving documentation and streamlining processes that had a lasting impact on the team. It was no surprise to anyone that her skills ultimately led her to a well-deserved promotion as a Team Lead at Q4. Taryn is an excellent communicator, highly organized, and deeply committed to quality work.",
  },
  {
    name: 'Stephen McMullin',
    avatar: '/Stephen.jpeg',
    title: 'Software Developer · Q4 Inc.',
    relationship: 'Reported to Taryn directly',
    quote: "I have had the privilege of working closely with Taryn and have witnessed firsthand her ability to inspire and motivate the team to achieve our goals. Taryn's strong communication skills, strategic thinking, and problem-solving abilities have consistently helped us overcome challenges and deliver exceptional results. It has been a privilege to work under her guidance, and I am grateful for the opportunities she provided me to excel in my role.",
  },
  {
    name: 'Brittany Barnard',
    avatar: '/Brittany.jpeg',
    title: 'Full Stack Developer · Q4 Inc.',
    relationship: 'Reported to Taryn directly',
    quote: "I truly wish more people had the opportunity to report to such an amazing Team Lead. I had the pleasure of working with Taryn for just under a year. Right away, she was extremely approachable, organized, and solution oriented. Her one-on-ones were a helpful combination of constructive feedback, understanding, and data-driven thinking to get the best outcome out of me. She would be an amazing, positive asset anywhere she goes.",
  },
  {
    name: 'Aymen Mahmod',
    title: 'Front End Developer · Q4 Inc.',
    relationship: 'Reported to Taryn directly',
    quote: "Taryn's exceptional leadership skills show clearly as she leads daily stand-ups and 1-on-1s with empathy and support that has nurtured, organized, and guided our team's productivity. Her deep knowledge within Salesforce and Content Management Systems, along with her high attention to detail, has consistently made her a reliable asset that is able to solve any technical issue thrown her way. Taryn would make a great addition to any team she chooses to join.",
  },
]

function TestimonialModal({ testimonial, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const { name, title, relationship, quote } = testimonial
  return (
    <div className="t-modal-overlay" onClick={onClose}>
      <div className="t-modal" onClick={e => e.stopPropagation()}>
        <button className="t-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={2} />
        </button>
        <div className="t-modal-quote-mark">"</div>
        <p className="t-modal-text">{quote}</p>
        <div className="t-modal-footer">
          <div className="testimonial-person">
            {testimonial.avatar
              ? <img src={testimonial.avatar} alt={name} className="testimonial-avatar testimonial-avatar--lg" />
              : <div className="testimonial-avatar testimonial-avatar--initials testimonial-avatar--lg">{name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
            }
            <div className="testimonial-person-info">
              <span className="testimonial-name">{name}</span>
              <span className="testimonial-role">{title}</span>
              <span className="testimonial-relationship">{relationship}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsCarousel() {
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)

  function scroll(dir) {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.testimonial-card')
    const amount = card ? card.offsetWidth + 20 : trackRef.current.clientWidth * 0.8
    trackRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="about-testimonials">
      <div className="about-testimonials-inner">
        <span className="about-eyebrow">Recommendations</span>
        <div className="testimonial-wrap">
          <button className="testimonial-arrow testimonial-arrow--left" onClick={() => scroll('left')} aria-label="Previous">
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div className="testimonial-track" ref={trackRef}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card" onClick={() => setSelected(t)}>
                <div className="testimonial-quote-mark">"</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-person">
                    {t.avatar
                      ? <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                      : <div className="testimonial-avatar testimonial-avatar--initials">{t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                    }
                    <div className="testimonial-person-info">
                      <span className="testimonial-name">{t.name}</span>
                      <span className="testimonial-role">{t.title}</span>
                      <span className="testimonial-relationship">{t.relationship}</span>
                    </div>
                  </div>
                  <span className="testimonial-expand">Read full recommendation →</span>
                </div>
              </div>
            ))}
          </div>
          <button className="testimonial-arrow testimonial-arrow--right" onClick={() => scroll('right')} aria-label="Next">
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
      {selected && <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

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

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <TestimonialsCarousel />

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
