const { test, expect } = require('@playwright/test');

test.describe('Phase 2: 波データ追加', () => {

  test('2つのAPIを並列取得してデータが表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#weather-table')).toBeVisible();
    await expect(page.locator('#marine-table')).toBeVisible();
  });

  test('波高（m）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#marine-table')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#marine-table')).toContainText('m');
    await expect(page.locator('#marine-table')).toContainText('波高');
  });

  test('波周期（s）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#marine-table')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#marine-table')).toContainText('s');
    await expect(page.locator('#marine-table')).toContainText('波周期');
  });

  test('うねりデータが表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#marine-table')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#marine-table')).toContainText('うねり高');
    await expect(page.locator('#marine-table')).toContainText('うねり周期');
  });

  test('Weather API失敗時でも波データは表示される', async ({ page }) => {
    await page.route('**/api.open-meteo.com/**', (route) => route.abort());

    await page.goto('/');

    // 波データは表示される
    await expect(page.locator('#marine-table')).toBeVisible({ timeout: 15000 });
    // ステータスは一部エラー
    await expect(page.locator('#status')).toContainText('一部エラー');
    await expect(page.locator('#status')).toContainText('風データ');
  });

  test('Marine API失敗時でも風データは表示される', async ({ page }) => {
    await page.route('**/marine-api.open-meteo.com/**', (route) => route.abort());

    await page.goto('/');

    // 風データは表示される
    await expect(page.locator('#weather-table')).toBeVisible({ timeout: 15000 });
    // ステータスは一部エラー
    await expect(page.locator('#status')).toContainText('一部エラー');
    await expect(page.locator('#status')).toContainText('波データ');
  });

  test('両方のAPI失敗時にエラーメッセージが表示される', async ({ page }) => {
    await page.route('**/api.open-meteo.com/**', (route) => route.abort());
    await page.route('**/marine-api.open-meteo.com/**', (route) => route.abort());

    await page.goto('/');

    await expect(page.locator('#status')).toContainText('エラー', { timeout: 15000 });
  });

});
