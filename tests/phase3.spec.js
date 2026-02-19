const { test, expect } = require('@playwright/test');

test.describe('Phase 3: 風向コンパスと波高ビジュアル', () => {

  test('.wind-arrow 要素が存在して表示されている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#weather-table')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.wind-arrow')).toBeVisible();
  });

  test('.wind-arrow の style に rotate が含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.wind-arrow')).toBeVisible({ timeout: 15000 });
    const style = await page.locator('.wind-arrow').getAttribute('style');
    expect(style).toContain('rotate');
  });

  test('.compass-labels に N と S が含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.compass-labels')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.compass-labels')).toContainText('N');
    await expect(page.locator('.compass-labels')).toContainText('S');
  });

  test('.wave-bar 要素が存在して表示されている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#marine-table')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.wave-bar')).toBeVisible();
  });

  test('.wave-bar の style に height が含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.wave-bar')).toBeVisible({ timeout: 15000 });
    const style = await page.locator('.wave-bar').getAttribute('style');
    expect(style).toContain('height');
  });

});
