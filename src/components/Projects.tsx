import { useState } from 'react'
import { projects } from '../data'

const tags = ['All', ...new Set(projects.flatMap(p => p.tags))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter))

  return (
    <section id="projects" className="section container">
      <h2 className="section-title"><span>02</span> Projects</h2>
      <div className="filters" role="group" aria-label="Filter projects by technology">
        {tags.map(t => (
          <button key={t} className="chip filter" aria-pressed={filter === t} onClick={() => setFilter(t)}>
            {t}
          </button>
        ))}
      </div>
      <ul className="cards" aria-label="Projects">
        {shown.map((p, i) => (
          <li key={p.title + i} className="card project">
            <span className="paw" aria-hidden="true">🐾</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="tags">
              {p.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
            {p.link && (
              <a href={p.link} className="project-link" target="_blank" rel="noreferrer">
                View project <span aria-hidden="true">→</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
