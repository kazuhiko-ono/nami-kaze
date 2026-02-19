const { test, expect } = require('@playwright/test');

test.describe('Phase 4: コンディション判定', () => {

  test('.activity-card が3つ表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('.activity-card')).toHaveCount(3);
  });

  test('.activity-badge が3つ表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    await expect(page.locator('.activity-badge')).toHaveCount(3);
  });

  test('各 .activity-badge が active / marginal / inactive のいずれかのクラスを持ち、◎○△で表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    const badges = page.locator('.activity-badge');
    const count = await badges.count();
    expect(count).toBe(3);
    for (let i = 0; i < count; i++) {
      const classes = await badges.nth(i).getAttribute('class');
      const hasValidClass = ['active', 'marginal', 'inactive'].some(c => classes.includes(c));
      expect(hasValidClass).toBe(true);
      const text = await badges.nth(i).textContent();
      const hasSymbol = ['◎', '○', '△'].some(s => text.includes(s));
      expect(hasSymbol).toBe(true);
    }
  });

  test('風向分類ラベル（オフショア/オンショア/サイドショア/穏やか）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    const label = page.locator('.wind-type-label');
    await expect(label).toBeVisible();
    const text = await label.textContent();
    const valid = ['オフショア', 'オンショア', 'サイドショア', '穏やか'].some(l => text.includes(l));
    expect(valid).toBe(true);
  });

  test('3種目（ウィングフォイル・ウィンドサーフィン・SUP）が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    const text = await page.locator('.activity-list').textContent();
    expect(text).toContain('ウィングフォイル');
    expect(text).toContain('ウィンドサーフィン');
    expect(text).toContain('SUP');
  });

  test('.activity-note 要素が少なくとも1つ存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#status')).toHaveText('取得成功', { timeout: 15000 });
    const count = await page.locator('.activity-note').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

});
