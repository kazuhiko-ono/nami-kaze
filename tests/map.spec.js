const { test, expect } = require('@playwright/test');

test.describe('全国マップページ', () => {

  test('map.html が開ける', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('.header-title')).toContainText('全国の波と風');
  });

  test('#map が表示されている', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('#map')).toBeVisible();
  });

  test('Leaflet タイルレイヤーが読み込まれている', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('#map .leaflet-tile-pane img').first()).toBeVisible({ timeout: 10000 });
  });

  test('マーカーが13個以上存在する', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('#map .leaflet-marker-icon').first()).toBeVisible({ timeout: 10000 });
    const count = await page.locator('#map .leaflet-marker-icon').count();
    expect(count).toBeGreaterThanOrEqual(13);
  });

  test('マーカークリックでポップアップが表示される', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('#map .leaflet-marker-icon').first()).toBeVisible({ timeout: 10000 });
    await page.locator('#map .leaflet-marker-icon').first().click({ force: true });
    await expect(page.locator('.leaflet-popup')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.popup-btn')).toBeVisible();
    await expect(page.locator('.popup-btn')).toContainText('コンディションを見る');
  });

  test('ポップアップのリンクに正しいURLパラメータが含まれる', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('#map .leaflet-marker-icon').first()).toBeVisible({ timeout: 10000 });
    await page.locator('#map .leaflet-marker-icon').first().click({ force: true });
    await expect(page.locator('.popup-btn')).toBeVisible({ timeout: 5000 });
    const href = await page.locator('.popup-btn').getAttribute('href');
    expect(href).toContain('index.html');
    expect(href).toContain('lat=');
    expect(href).toContain('lon=');
    expect(href).toContain('name=');
    expect(href).toContain('coast=');
  });

  test('凡例が表示されている', async ({ page }) => {
    await page.goto('/map.html');
    await expect(page.locator('#legend')).toBeVisible();
    await expect(page.locator('.legend-item').first()).toBeVisible();
  });

});
