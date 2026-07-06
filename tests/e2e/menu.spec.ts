import { test, expect } from '@playwright/test'

test.describe('Menu Page (Savora — editable)', () => {
  test('menu page loads successfully', async ({ page }) => {
    const response = await page.goto('/menu')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('#menu-heading')).toBeVisible()
  })

  test('menu heading is present', async ({ page }) => {
    await page.goto('/menu')
    const heading = page.locator('#menu-heading')
    await expect(heading).toBeVisible()
    await expect(heading).not.toBeEmpty()
  })

  test('category tabs are displayed', async ({ page }) => {
    await page.goto('/menu')

    // Tablist should be visible
    const tablist = page.locator('[role="tablist"]')
    await expect(tablist).toBeVisible()

    // Each category tab should be present
    const tabs = tablist.locator('[role="tab"]')
    const tabCount = await tabs.count()
    expect(tabCount).toBeGreaterThanOrEqual(3)

    // Verify tab switching works
    const secondTab = tabs.nth(1)
    const secondTabName = await secondTab.textContent()
    await secondTab.click()
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')

    // The corresponding tabpanel should be visible
    const activePanel = page.locator('[role="tabpanel"]:not([hidden])')
    await expect(activePanel).toBeVisible()
  })

  test('menu items are displayed in cards', async ({ page }) => {
    await page.goto('/menu')

    // Wait for the default tab (starters) to show items
    const firstTabpanel = page.locator('[role="tabpanel"]:not([hidden])')
    await expect(firstTabpanel).toBeVisible()

    // Items should be displayed as cards in a grid
    // Check that at least some content is rendered in the active tab
    const activeContent = firstTabpanel.locator('> div')
    await expect(activeContent).toBeVisible()
  })

  test('dietary legend is displayed', async ({ page }) => {
    await page.goto('/menu')

    const dietarySection = page.locator('section[aria-label="Dietary information"]')
    await expect(dietarySection).toBeVisible()

    // Should show Vegetarian, Vegan, Gluten Free, Spicy indicators
    const legendItems = dietarySection.locator('span.flex')
    const legendCount = await legendItems.count()
    expect(legendCount).toBeGreaterThanOrEqual(3)
  })

  test('each category tab can be selected and shows items', async ({ page }) => {
    await page.goto('/menu')

    const tabs = page.locator('[role="tablist"] [role="tab"]')
    const tabCount = await tabs.count()

    for (let i = 0; i < tabCount; i++) {
      const tab = tabs.nth(i)
      await tab.click()

      // Tab should be selected
      await expect(tab).toHaveAttribute('aria-selected', 'true')

      // Its panel should be visible (either has content or empty state message)
      const panelId = await tab.getAttribute('aria-controls')
      expect(panelId).toBeTruthy()

      const panel = page.locator(`#${panelId}`)
      // Panel should not be hidden
      const isHidden = await panel.getAttribute('hidden')
      expect(isHidden).toBeNull()
    }
  })

  test('menu page has hero image', async ({ page }) => {
    await page.goto('/menu')

    // Hero section with background image
    const heroImg = page.locator('section img[aria-hidden="true"]').first()
    await expect(heroImg).toBeVisible()
    await expect(heroImg).toHaveAttribute('alt', '')
  })
})
