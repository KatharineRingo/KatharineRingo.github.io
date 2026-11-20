import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import ExperienceSection from './components/Experience'
import Contact from './components/Contact'
import { profile } from './data'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <ExperienceSection />
        <Contact />
      </main>
      <footer className="footer container">
        <p>© {new Date().getFullYear()} {profile.name} · Built with React, Three.js & plenty of cat naps</p>
      </footer>
    </>
  )
}
