import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { profile, projects } from './data'

describe('App', () => {
  it('renders hero, all sections and nav links', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name)
    for (const name of ['About', 'Projects', 'Experience', 'Contact']) {
      expect(screen.getByRole('heading', { level: 2, name: new RegExp(name) })).toBeInTheDocument()
      expect(within(screen.getByRole('navigation')).getByRole('link', { name })).toHaveAttribute(
        'href',
        `#${name.toLowerCase()}`,
      )
    }
  })

  it('falls back to SVG cat when WebGL is unavailable', () => {
    render(<App />)
    expect(screen.getByRole('img', { name: /blue cat illustration/i })).toBeInTheDocument()
  })

  it('counts pets on the cat', async () => {
    render(<App />)
    const btn = screen.getByRole('button', { name: /pet the cat/i })
    expect(screen.getByText('No pets yet')).toBeInTheDocument()
    await userEvent.click(btn)
    expect(screen.getByText(/\(1 pet\)/)).toBeInTheDocument()
    await userEvent.click(btn)
    expect(screen.getByText(/\(2 pets\)/)).toBeInTheDocument()
  })

  it('toggles theme and persists it', async () => {
    render(<App />)
    const initial = document.documentElement.dataset.theme
    await userEvent.click(screen.getByRole('button', { name: /switch to/i }))
    const next = document.documentElement.dataset.theme
    expect(next).not.toBe(initial)
    expect(localStorage.getItem('theme')).toBe(next)
  })

  it('opens and closes the mobile menu', async () => {
    render(<App />)
    const menu = screen.getByRole('button', { name: /open menu/i })
    await userEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(screen.getByRole('link', { name: 'Projects' }))
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('filters projects by tag', async () => {
    render(<App />)
    const list = screen.getByRole('list', { name: 'Projects' })
    expect(within(list).getAllByRole('heading', { level: 3 })).toHaveLength(projects.length)
    await userEvent.click(screen.getByRole('button', { name: 'Java' }))
    const expected = projects.filter(p => p.tags.includes('Java')).length
    expect(within(list).getAllByRole('heading', { level: 3 })).toHaveLength(expected)
    expect(screen.getByRole('button', { name: 'Java' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('copies email to clipboard', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')
    render(<App />)
    await user.click(screen.getByRole('button', { name: /copy email/i }))
    expect(writeText).toHaveBeenCalledWith(profile.email)
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument()
  })

  it('opens external project links safely', () => {
    render(<App />)
    for (const link of within(screen.getByRole('list', { name: 'Projects' })).getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    }
  })
})
