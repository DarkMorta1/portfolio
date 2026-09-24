import Link from "next/link"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"

const highlights = [
  {
    eyebrow: "Advanced",
    title: "Theoretical Physics",
    body: "Exploring the invisible forces that shape our universe through curiosity, rigor, and a willingness to ask better questions.",
    tag: "01 / 03",
  },
  {
    eyebrow: "Classical",
    title: "Literature",
    body: "Finding new ways to understand people, places, and the quiet details that make a story stay with you.",
    tag: "02 / 03",
  },
  {
    eyebrow: "Structural",
    title: "Architecture",
    body: "Designing digital spaces with a sense of balance, intention, and an appreciation for what happens between the lines.",
    tag: "03 / 03",
  },
]

const projects = [
  { name: "Portfolio system", type: "Product design / 2024", number: "01" },
  { name: "Smart insights", type: "Interface development / 2024", number: "02" },
  { name: "Experimental studies", type: "Research / 2023", number: "03" },
]

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="#top" className="wordmark" aria-label="Ojash Osti home">
          OJASH<span>OSTI</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="#work">Selected work</Link>
          <Link href="#about">About me</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <Link href="#contact" className="header-cta">Let&apos;s talk <ArrowUpRight aria-hidden="true" /></Link>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">Independent designer &amp; developer <span>— Kathmandu / Nepal</span></p>
          <h1>Expand your <em>horizon</em></h1>
          <p className="hero-description">I build thoughtful digital experiences for people and teams moving toward something new.</p>
          <Link href="#work" className="text-link">Explore the work <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="hero-scroll"><span /> Scroll to discover</div>
      </section>

      <section id="about" className="section highlights-section">
        <div className="section-heading"><p className="eyebrow">01 — Perspective</p><h2>Curriculum <em>highlights</em></h2></div>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.title}>
              <div className="card-meta"><span>{item.eyebrow}</span><span>{item.tag}</span></div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="card-arrow">↗</span>
            </article>
          ))}
          <blockquote className="quote-card">“The beautiful thing about learning is that nobody can take it away from you.”<cite>— B. B. King</cite></blockquote>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="section-heading"><p className="eyebrow">02 — Selected work</p><h2>Ideas made <em>visible</em></h2></div>
        <div className="work-layout">
          <div className="work-index" aria-label="Selected projects">
            {projects.map((project) => <div className="project-row" key={project.number}><span>{project.number}</span><div><h3>{project.name}</h3><p>{project.type}</p></div><ArrowUpRight aria-hidden="true" /></div>)}
          </div>
          <div className="work-note"><p>Every project is a chance to make something clearer, more useful, and a little more human.</p><Link className="text-link" href="#contact">Start a conversation <ArrowUpRight aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="eyebrow">03 — Open invitation</p>
        <h2>Have a good idea?<br /><em>Let&apos;s shape it.</em></h2>
        <div className="contact-footer"><a href="mailto:ostiojash2061@gmail.com"><Mail aria-hidden="true" /> ostiojash2061@gmail.com</a><span><MapPin aria-hidden="true" /> Kathmandu, Nepal</span><span>© 2024 Ojash Osti</span></div>
      </section>
    </main>
  )
}

