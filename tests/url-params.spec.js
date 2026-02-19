const { test, expect } = require('@playwright/test');

test.describe('URLパラメータ対応', () => {

  test('パラメータなしでデフォルト地点（由比ヶ浜）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#headerSub')).toContainText('由比ヶ浜');
  });

  test('URLパラメータで地点名が変わる', async ({ page }) => {
    await page.goto('/?lat=35.3730&lon=140.3880&name=一宮&coast=90');
    await expect(page.locator('#headerSub')).toContainText('一宮');
  });

  test('URLパラメータ指定時もデータが取得できる', async ({ page }) => {
    await page.goto('/?lat=35.3730&lon=140.3880&name=一宮&coast=90');
    await expect(page.locator('#status')).toContainText(/取得成功|一部エラー/, { timeout: 15000 });
  });

  test('ヘッダーに「全国の波と風」が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#headerTitle')).toContainText('全国の波と風');
  });

  test('全国マップへのリンクが存在する', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('#mapLink');
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toContain('map.html');
  });

});
