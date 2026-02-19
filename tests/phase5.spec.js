const { test, expect } = require('@playwright/test');

test.describe('Phase 5: 時間別予報', () => {

  test('.hour-item が20個以上ある', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hourly-scroll')).toBeVisible({ timeout: 15000 });
    const count = await page.locator('.hour-item').count();
    expect(count).toBeGreaterThanOrEqual(20);
  });

  test('.hour-item.now が存在して表示されている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hourly-scroll')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.hour-item.now')).toBeVisible();
  });

  test('.hourly-scroll が overflow-x: auto または scroll である', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hourly-scroll')).toBeVisible({ timeout: 15000 });
    const overflowX = await page.locator('.hourly-scroll').evaluate(
      el => getComputedStyle(el).overflowX
    );
    expect(['auto', 'scroll']).toContain(overflowX);
  });

  test('.hour-item の1つ目に .h-wind と .h-wave が存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hourly-scroll')).toBeVisible({ timeout: 15000 });
    const firstItem = page.locator('.hour-item').first();
    await expect(firstItem.locator('.h-wind')).toBeVisible();
    await expect(firstItem.locator('.h-wave')).toBeVisible();
  });

  test('.hour-item 内に風向矢印（.h-wind-arrow）が存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hourly-scroll')).toBeVisible({ timeout: 15000 });
    const firstItem = page.locator('.hour-item').first();
    await expect(firstItem.locator('.h-wind-arrow')).toBeVisible();
    const style = await firstItem.locator('.h-wind-arrow').getAttribute('style');
    expect(style).toContain('rotate');
  });

  test('風速グラフの canvas 要素（#windChart）が存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#windChart')).toBeVisible({ timeout: 15000 });
  });

  test('潮位グラフの canvas 要素（#tideChart）が存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#tideChart')).toBeVisible({ timeout: 15000 });
  });

});
