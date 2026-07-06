import { test, expect } from '@playwright/test'

const NAV_PAGES = [
  { path: '/' },
  { path: '/menu' },
  { path: '/about' },
  { path: '/gallery' },
  { path: '/contact' },
] as const

test.describe('Navigation (Savora — editable)', () => {
  test('skip-to-content link is visible and functional', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeVisible()
    await skipLink.click()
    await expect(page.locator('#main-content')).toBeVisible()
  })

  test('header is visible on all pages', async ({ page }) => {
    for (const { path } of NAV_PAGES) {
      await page.goto(path)
      await expect(page.locator('header')).toBeVisible()
    }
  })

  test('desktop nav has links to all pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const mainNav = page.locator('nav[aria-label="Main navigation"]')
    await expect(mainNav).toBeVisible()

    // All 5 nav links should be present
    const links = mainNav.locator('a')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(NAV_PAGES.length)
  })

  test('nav links navigate to correct pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    // Click Menu link
    await page.getByRole('link', { name: /Menu/i }).first().click()
    await expect(page).toHaveURL(/\/menu/)

    // Click About link
    await page.getByRole('link', { name: /About/i }).first().click()
    await expect(page).toHaveURL(/\/about/)

    // Click Gallery link
    await page.getByRole('link', { name: /Gallery/i }).first().click()
    await expect(page).toHaveURL(/\/gallery/)

    // Click Contact link
    await page.getByRole('link', { name: /Contact/i }).first().click()
    await expect(page).toHaveURL(/\/contact/)

    // Brand logo should link to home
    await page.getByRole('link', { name: /Savora/i }).first().click()
    await expect(page).toHaveURL('/')
  })

  test('mobile menu toggles open and closed', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: /open menu/i })
    await expect(menuButton).toBeVisible()

    // Open
    await menuButton.click()
    const mobileNav = page.locator('#mobile-menu')
    await expect(mobileNav).toBeVisible()

    // Close
    const closeButton = page.getByRole('button', { name: /close menu/i })
    await closeButton.click()
    await expect(mobileNav).not.toBeVisible()
  })

  test('reserve CTA button links to contact', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const cta = page.getByRole('button', { name: /reserve/i })
    if (await cta.isVisible()) {
      await cta.click()
      await expect(page).toHaveURL(/\/contact/)
    }
  })

  test('footer is visible on all pages', async ({ page }) => {
    for (const { path } of NAV_PAGES) {
      await page.goto(path)
      await expect(page.locator('footer')).toBeVisible()
    }
  })
})
