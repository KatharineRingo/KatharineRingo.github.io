import { lazy, Suspense, useState } from 'react'
import { profile } from '../data'
import { hasWebGL } from '../hooks'
import CatFallback from './CatFallback'

const CatScene = lazy(() => import('./CatScene'))
const purrs = ['purr…', 'mrrp!', 'meow ♥', 'prrrr', '=^.^=']

export default function Hero() {
  const [pets, setPets] = useState(0)
  const [webgl] = useState(hasWebGL)
  const pet = () => setPets(p => p + 1)

  return (
    <section id="top" className="hero container">
      <div className="hero-text">
        <p className="eyebrow">{profile.year} · {profile.role}</p>
        <h1>
          Hi, I'm <span className="gradient">{profile.name}</span>
        </h1>
        <p className="lead">{profile.tagline}</p>
        <p className="school">{profile.school}</p>
        <div className="buttons">
          <a href="#projects" className="btn primary">View projects</a>
          <a href="#contact" className="btn ghost">Get in touch</a>
        </div>
      </div>

      <div className="hero-cat">
        {webgl ? (
          <Suspense fallback={<CatFallback />}>
            <CatScene petCount={pets} onPet={pet} />
          </Suspense>
        ) : (
          <CatFallback />
        )}
        <div className="pet-row">
          <button className="btn small" onClick={pet}>🐾 Pet the cat</button>
          <span className="pet-count" aria-live="polite">
            {pets === 0 ? 'No pets yet' : `${purrs[(pets - 1) % purrs.length]} (${pets} ${pets === 1 ? 'pet' : 'pets'})`}
          </span>
        </div>
      </div>
    </section>
  )
}
