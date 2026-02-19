const { test, expect } = require('@playwright/test');

test.describe('Phase 6: 3日間予報', () => {

  test('.daily-row が7つある', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.daily-row').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.daily-row')).toHaveCount(7);
  });

  test('1つ目の .daily-row に「今日」が含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.daily-row').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.daily-row').nth(0)).toContainText('今日');
  });

  test('2つ目の .daily-row に「明日」が含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.daily-row').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.daily-row').nth(1)).toContainText('明日');
  });

  test('.daily-row 内に気温（°）が表示されている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.daily-row').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.daily-row').first()).toContainText('\u00B0');
  });

});
