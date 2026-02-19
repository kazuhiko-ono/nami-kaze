const { test, expect } = require('@playwright/test');

test.describe('Phase 7: デザイン仕上げ', () => {

  test('ビューポート 375px で横はみ出しなし', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toContainText(/取得成功|一部エラー|エラー/, { timeout: 15000 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });

  test('.card 要素が3つ以上ある', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toContainText(/取得成功|一部エラー/, { timeout: 15000 });
    const count = await page.locator('.card').count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('body の背景が暗い色である（RGB平均 < 80）', async ({ page }) => {
    await page.goto('/');
    const bgColor = await page.evaluate(() => {
      const style = getComputedStyle(document.body);
      return style.backgroundColor;
    });
    const match = bgColor.match(/\d+/g);
    const avg = match ? (parseInt(match[0]) + parseInt(match[1]) + parseInt(match[2])) / 3 : 255;
    expect(avg).toBeLessThan(80);
  });

  test('#updateTime に「更新」テキストが含まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toContainText(/取得成功|一部エラー|エラー/, { timeout: 15000 });
    await expect(page.locator('#updateTime')).toContainText('更新');
  });

  test('#reloadBtn が存在して表示されている', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#reloadBtn')).toBeVisible();
  });

});
