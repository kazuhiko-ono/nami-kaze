const { test, expect } = require('@playwright/test');

test.describe('Phase 9: 風向マップ', () => {

  test('#wind-map が存在して表示されている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#wind-map')).toBeVisible();
  });

  test('#wind-map の高さが 200px 以上ある', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    const height = await page.locator('#wind-map').evaluate(el => el.offsetHeight);
    expect(height).toBeGreaterThanOrEqual(200);
  });

  test('Leaflet タイルレイヤーが読み込まれている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#wind-map .leaflet-tile-pane img').first()).toBeVisible({ timeout: 10000 });
  });

  test('風向矢印マーカーが地図上に9つ存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#wind-map .wind-map-arrow svg')).toHaveCount(9);
  });

  test('矢印 SVG に rotate が含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    const style = await page.locator('#wind-map .wind-map-arrow svg').first().getAttribute('style');
    expect(style).toContain('rotate');
  });

});
