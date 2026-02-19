const { test, expect } = require('@playwright/test');

test.describe('Phase 1: 風データ取得と表示', () => {

  test('ページを開いてデータが表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#weather-table')).toBeVisible();
  });

  test('風速（m/s）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#result')).toContainText('m/s');
  });

  test('気温（°C）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#result')).toContainText('°C');
  });

  test('再取得ボタンで再取得できる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });

    // 再取得ボタンをクリック
    await page.click('#refresh');

    // 一時的に「読み込み中...」になった後、再度取得成功になる
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('#weather-table')).toBeVisible();
  });

  test('APIエラー時にエラーメッセージが表示される', async ({ page }) => {
    // Open-Meteo APIへのリクエストをabortで模擬
    await page.route('**/api.open-meteo.com/**', (route) => route.abort());

    await page.goto('/');

    await expect(page.locator('#status')).toContainText('エラー', { timeout: 15000 });
  });

});
