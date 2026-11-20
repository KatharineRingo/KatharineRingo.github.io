import { profile, skills } from '../data'

export default function About() {
  return (
    <section id="about" className="section container">
      <h2 className="section-title"><span>01</span> About</h2>
      <div className="about-grid">
        <div className="about-text">
          {profile.about.map(p => <p key={p}>{p}</p>)}
        </div>
        <div className="card">
          {profile.photo && <img src={profile.photo} alt={profile.name} className="photo" />}
          <h3>Toolbox</h3>
          <ul className="chips" aria-label="Skills">
            {skills.map(s => <li key={s} className="chip">{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
