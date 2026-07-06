import { test, expect } from '@playwright/test'

test.describe('Contact Page (Savora — editable)', () => {
  test('contact page loads successfully', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('#contact-heading')).toBeVisible()
  })

  test('contact form exists with required fields', async ({ page }) => {
    await page.goto('/contact')

    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Name field
    const nameInput = page.locator('#contact-name')
    await expect(nameInput).toBeVisible()
    await expect(nameInput).toHaveAttribute('required', '')
    await expect(nameInput).toHaveAttribute('aria-required', 'true')

    // Email field
    const emailInput = page.locator('#contact-email')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveAttribute('type', 'email')
    await expect(emailInput).toHaveAttribute('required', '')
    await expect(emailInput).toHaveAttribute('aria-required', 'true')

    // Phone field
    const phoneInput = page.locator('#contact-phone')
    await expect(phoneInput).toBeVisible()
    await expect(phoneInput).toHaveAttribute('type', 'tel')

    // Date field
    const dateInput = page.locator('#contact-date')
    await expect(dateInput).toBeVisible()
    await expect(dateInput).toHaveAttribute('type', 'date')
    await expect(dateInput).toHaveAttribute('required', '')

    // Time field
    const timeInput = page.locator('#contact-time')
    await expect(timeInput).toBeVisible()
    await expect(timeInput).toHaveAttribute('type', 'time')
    await expect(timeInput).toHaveAttribute('required', '')

    // Guests select
    const guestsSelect = page.locator('#contact-guests')
    await expect(guestsSelect).toBeVisible()
    await expect(guestsSelect).toHaveAttribute('required', '')

    // Message textarea
    const messageTextarea = page.locator('#contact-message')
    await expect(messageTextarea).toBeVisible()
  })

  test('submit button exists', async ({ page }) => {
    await page.goto('/contact')
    const submitBtn = page.locator('form button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await expect(submitBtn).not.toBeEmpty()
  })

  test('contact info sidebar is displayed', async ({ page }) => {
    await page.goto('/contact')

    // Hours heading
    await expect(page.getByRole('heading', { name: /hours/i, level: 3 })).toBeVisible()

    // Phone link
    const phoneLink = page.locator('a[href^="tel:"]')
    await expect(phoneLink.first()).toBeVisible()

    // Email link
    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink.first()).toBeVisible()

    // Map placeholder
    await expect(page.getByText(/find us/i)).toBeVisible()
  })

  test('form can be filled and submitted', async ({ page }) => {
    await page.goto('/contact')

    await page.fill('#contact-name', 'Jane Smith')
    await page.fill('#contact-email', 'jane@example.com')
    await page.fill('#contact-phone', '555-0123')
    await page.fill('#contact-date', '2026-12-25')
    await page.fill('#contact-time', '19:00')
    await page.selectOption('#contact-guests', '4')
    await page.fill('#contact-message', 'Celebrating an anniversary!')

    // Submit the form
    const submitBtn = page.locator('form button[type="submit"]')
    await submitBtn.click()

    // Wait for success message or status change
    // The form simulates an API call with 1s timeout
    const successMessage = page.locator('[role="alert"]').filter({ hasText: /success|thank|confirmed/i })
    await expect(successMessage).toBeVisible({ timeout: 5000 })
  })

  test('contact page is reachable from nav', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Contact/i }).first().click()
    await expect(page).toHaveURL(/\/contact/)
    await expect(page.locator('#contact-heading')).toBeVisible()
  })

  test('contact page has hero image', async ({ page }) => {
    await page.goto('/contact')

    const heroImg = page.locator('section img[aria-hidden="true"]').first()
    await expect(heroImg).toBeVisible()
    await expect(heroImg).toHaveAttribute('alt', '')
  })
})
