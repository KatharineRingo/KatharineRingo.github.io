import { experience } from '../data'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section container">
      <h2 className="section-title"><span>03</span> Experience</h2>
      <ol className="timeline">
        {experience.map(e => (
          <li key={e.title + e.org} className="timeline-item">
            <div className="timeline-head">
              <h3>{e.title} <span className="org">@ {e.org}</span></h3>
              <span className="date">{e.dates}</span>
            </div>
            <p>{e.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
