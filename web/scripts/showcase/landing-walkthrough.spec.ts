import { test, expect } from '@playwright/test'

test('landing page walkthrough', async ({ page }) => {
  // Navigate to the landing page
  await page.goto('/')

  // Check page title and heading
  await expect(page).toHaveTitle('life-system-template')
  const heading = page.locator('h1')
  await expect(heading).toContainText('life-system-template')

  // Take screenshot of landing
  await page.screenshot({ path: 'docs/showcase/01-landing.png' })

  // Verify key sections are visible
  const features = page.locator('h2')
  await expect(features.first()).toBeVisible()

  // Scroll down to see features
  await page.evaluate(() => window.scrollBy(0, 500))
  await page.waitForTimeout(300)

  // Take screenshot of features
  await page.screenshot({ path: 'docs/showcase/02-features.png' })

  // Verify vault navigator is visible
  const vaultSection = page.locator('text=Vault Structure')
  await expect(vaultSection).toBeVisible()

  // Click on a vault folder to expand it
  const areaButton = page.locator('button', { hasText: 'Areas' })
  await areaButton.click()
  await page.waitForTimeout(200)

  // Take screenshot of expanded section
  await page.screenshot({ path: 'docs/showcase/03-vault-expanded.png' })
})

test('tour page navigation', async ({ page }) => {
  // Navigate to home
  await page.goto('/')

  // Find and click tour link if present
  const tourLink = page.locator('a[href="/tour"]')
  if (await tourLink.count() > 0) {
    await tourLink.click()
  } else {
    // Navigate directly
    await page.goto('/tour')
  }

  // Check tour page title
  await expect(page).toHaveTitle('life-system-template')
  const tourHeading = page.locator('h1')
  await expect(tourHeading).toContainText('Guided Tour')

  // Take screenshot
  await page.screenshot({ path: 'docs/showcase/04-tour-page.png' })
})

test('responsive design - mobile view', async ({ page }) => {
  // Set viewport to mobile size
  await page.setViewportSize({ width: 390, height: 844 })

  // Navigate to landing
  await page.goto('/')

  // Verify content is still readable
  const heading = page.locator('h1')
  await expect(heading).toBeVisible()

  // Take mobile screenshot
  await page.screenshot({ path: 'docs/showcase/05-mobile-landing.png' })

  // Scroll and take more screenshots
  await page.evaluate(() => window.scrollBy(0, 500))
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'docs/showcase/06-mobile-features.png' })
})
