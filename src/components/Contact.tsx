import { useState } from 'react'
import { profile } from '../data'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked; mailto link still works */ }
  }

  return (
    <section id="contact" className="section container contact">
      <h2 className="section-title center"><span>04</span> Contact</h2>
      <p className="lead">
        I'm always open to connecting about opportunities, projects, or questions — or swapping cat pictures.
      </p>
      <div className="buttons center">
        <a href={`mailto:${profile.email}`} className="btn primary">Say hello</a>
        <button className="btn ghost" onClick={copy}>{copied ? 'Copied!' : 'Copy email'}</button>
      </div>
      <div className="socials">
        {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>}
        {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
      </div>
    </section>
  )
}
