import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('loads with title, hero and no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.reload()
  await expect(page).toHaveTitle(/Katharine Ringo/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Katharine Ringo')
  expect(errors).toEqual([])
})

test('renders the cat (3D canvas or SVG fallback)', async ({ page }) => {
  const canvas = page.locator('[data-testid="cat-canvas"] canvas')
  const fallback = page.getByRole('img', { name: /blue cat illustration/i })
  await expect(canvas.or(fallback).first()).toBeVisible()
})

test('petting the cat updates the counter', async ({ page }) => {
  await page.getByRole('button', { name: /pet the cat/i }).click()
  await expect(page.getByText(/\(1 pet\)/)).toBeVisible()
})

test('theme toggle switches data-theme', async ({ page, isMobile }) => {
  if (isMobile) await page.getByRole('button', { name: /open menu/i }).click()
  const html = page.locator('html')
  const before = await html.getAttribute('data-theme')
  await page.getByRole('button', { name: /switch to/i }).click()
  await expect(html).not.toHaveAttribute('data-theme', before ?? '')
})

test('nav link scrolls to section', async ({ page, isMobile }) => {
  if (isMobile) await page.getByRole('button', { name: /open menu/i }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('heading', { name: /Projects/, level: 2 })).toBeInViewport()
})

test('project filter narrows the list', async ({ page }) => {
  const cards = page.getByRole('list', { name: 'Projects' }).getByRole('heading', { level: 3 })
  const total = await cards.count()
  await page.getByRole('button', { name: 'Java', exact: true }).click()
  await expect(cards).not.toHaveCount(total)
})

test('no horizontal overflow', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
