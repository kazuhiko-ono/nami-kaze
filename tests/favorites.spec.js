const { test, expect } = require('@playwright/test');

test.describe('お気に入り機能 (map.html)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/map.html');
    // Clear favorites before each test
    await page.evaluate(() => localStorage.removeItem('nami-kaze-favorites'));
    // Clear guide shown flag so we can dismiss it
    await page.evaluate(() => localStorage.removeItem('nami-kaze-guide-shown'));
    await page.reload();
  });

  test('初回ガイドオーバーレイが表示される', async ({ page }) => {
    await expect(page.locator('#guideOverlay')).toBeVisible();
    await expect(page.locator('.guide-box p')).toContainText('お気に入りに追加');
  });

  test('ガイドOKボタンで閉じてlocalStorageに保存', async ({ page }) => {
    await expect(page.locator('#guideOverlay')).toBeVisible();
    await page.locator('#guideOkBtn').click();
    await expect(page.locator('#guideOverlay')).toHaveCount(0);
    const flag = await page.evaluate(() => localStorage.getItem('nami-kaze-guide-shown'));
    expect(flag).toBe('1');
  });

  test('ガイド表示済みなら再表示されない', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('nami-kaze-guide-shown', '1'));
    await page.reload();
    await expect(page.locator('#guideOverlay')).toHaveCount(0);
  });

  test('お気に入り未登録時の案内表示', async ({ page }) => {
    // Dismiss guide if shown
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();
    await expect(page.locator('.favorites-empty')).toBeVisible();
    await expect(page.locator('.favorites-empty')).toContainText('お気に入りに追加');
  });

  test('ポップアップの☆をタップしてお気に入り追加', async ({ page }) => {
    // Dismiss guide
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();

    await expect(page.locator('#map .leaflet-marker-icon').first()).toBeVisible({ timeout: 10000 });
    await page.locator('#map .leaflet-marker-icon').first().click({ force: true });
    await expect(page.locator('.popup-fav-btn')).toBeVisible({ timeout: 5000 });

    // Should show ☆ initially
    const btnText = await page.locator('.popup-fav-btn').textContent();
    expect(btnText.trim()).toBe('☆');

    // Click to add favorite
    await page.locator('.popup-fav-btn').click();

    // Should now show ★
    await expect(page.locator('.popup-fav-btn')).toHaveText('★');

    // Favorites bar should show the spot
    await expect(page.locator('.fav-chip')).toHaveCount(1);

    // localStorage should contain the spot
    const favs = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-favorites')));
    expect(favs).toHaveLength(1);
  });

  test('お気に入りをトグルで解除', async ({ page }) => {
    // Dismiss guide
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();

    // Add a favorite by clicking the first popup star
    await expect(page.locator('#map .leaflet-marker-icon').first()).toBeVisible({ timeout: 10000 });
    await page.locator('#map .leaflet-marker-icon').first().click({ force: true });
    await expect(page.locator('.popup-fav-btn')).toBeVisible({ timeout: 5000 });
    await page.locator('.popup-fav-btn').click();
    await expect(page.locator('.popup-fav-btn')).toHaveText('★');
    await expect(page.locator('.fav-chip')).toHaveCount(1);

    // Now click again to remove
    await page.locator('.popup-fav-btn').click();
    await expect(page.locator('.popup-fav-btn')).toHaveText('☆');
    await expect(page.locator('.favorites-empty')).toBeVisible();

    const favs = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-favorites')));
    expect(favs).toHaveLength(0);
  });

  test('最大3地点の制限', async ({ page }) => {
    // Dismiss guide
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();

    // Pre-set 3 favorites
    await page.evaluate(() => {
      localStorage.setItem('nami-kaze-favorites', JSON.stringify(['由比ヶ浜', '七里ヶ浜', '鵠沼']));
    });
    await page.reload();
    const guide2 = page.locator('#guideOverlay');
    if (await guide2.isVisible()) await page.locator('#guideOkBtn').click();

    await expect(page.locator('.fav-chip')).toHaveCount(3);

    // Try to add a 4th - handle the alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('無料版は3地点まで');
      await dialog.accept();
    });

    // Click a marker that's not in favorites
    await expect(page.locator('#map .leaflet-marker-icon').first()).toBeVisible({ timeout: 10000 });
    const markers = page.locator('#map .leaflet-marker-icon');
    const count = await markers.count();
    for (let i = 0; i < count; i++) {
      await markers.nth(i).click({ force: true });
      const popup = page.locator('.leaflet-popup');
      if (await popup.isVisible()) {
        const name = await page.locator('.popup-name').textContent();
        if (!['由比ヶ浜', '七里ヶ浜', '鵠沼'].includes(name.trim())) {
          // This one is not favorited, try adding
          await page.locator('.popup-fav-btn').click();
          break;
        }
        await page.locator('#map').click({ position: { x: 10, y: 10 } });
      }
    }

    // Should still be 3 favorites
    const favs = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-favorites')));
    expect(favs).toHaveLength(3);
  });

  test('お気に入りチップをタップでindex.htmlに遷移', async ({ page }) => {
    // Dismiss guide
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();

    await page.evaluate(() => {
      localStorage.setItem('nami-kaze-favorites', JSON.stringify(['由比ヶ浜']));
    });
    await page.reload();
    const guide2 = page.locator('#guideOverlay');
    if (await guide2.isVisible()) await page.locator('#guideOkBtn').click();

    const chip = page.locator('.fav-chip');
    await expect(chip).toBeVisible();
    const href = await chip.getAttribute('href');
    expect(href).toContain('index.html');
    expect(href).toContain('name=');
  });
});

test.describe('お気に入り機能 (index.html)', () => {

  const INDEX_URL = '/index.html?lat=35.3065&lon=139.5398&name=由比ヶ浜&coast=180';

  test('ヘッダーに☆ボタンが表示される', async ({ page }) => {
    await page.goto(INDEX_URL);
    await page.evaluate(() => localStorage.removeItem('nami-kaze-favorites'));
    await page.reload();
    await expect(page.locator('#favToggle')).toBeVisible();
    await expect(page.locator('#favToggle')).toHaveText('☆');
  });

  test('☆タップで★に切り替わりlocalStorageに保存', async ({ page }) => {
    await page.goto(INDEX_URL);
    await page.evaluate(() => localStorage.removeItem('nami-kaze-favorites'));
    await page.reload();
    await page.locator('#favToggle').click();
    await expect(page.locator('#favToggle')).toHaveText('★');
    const favs = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-favorites')));
    expect(favs).toContain('由比ヶ浜');
  });

  test('★タップで☆に戻りlocalStorageから削除', async ({ page }) => {
    await page.goto(INDEX_URL);
    await page.evaluate(() => {
      localStorage.setItem('nami-kaze-favorites', JSON.stringify(['由比ヶ浜']));
    });
    await page.reload();
    await expect(page.locator('#favToggle')).toHaveText('★');
    await page.locator('#favToggle').click();
    await expect(page.locator('#favToggle')).toHaveText('☆');
    const favs = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-favorites')));
    expect(favs).not.toContain('由比ヶ浜');
  });

  test('お気に入り済みの地点は★で表示される', async ({ page }) => {
    await page.goto(INDEX_URL);
    await page.evaluate(() => {
      localStorage.setItem('nami-kaze-favorites', JSON.stringify(['由比ヶ浜']));
    });
    await page.reload();
    await expect(page.locator('#favToggle')).toHaveText('★');
  });

  test('3地点制限のalert表示', async ({ page }) => {
    await page.goto(INDEX_URL);
    await page.evaluate(() => {
      localStorage.setItem('nami-kaze-favorites', JSON.stringify(['七里ヶ浜', '鵠沼', '辻堂']));
    });
    await page.reload();

    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('無料版は3地点まで');
      await dialog.accept();
    });

    await page.locator('#favToggle').click();
    // Should still be ☆
    await expect(page.locator('#favToggle')).toHaveText('☆');
    const favs = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-favorites')));
    expect(favs).toHaveLength(3);
    expect(favs).not.toContain('由比ヶ浜');
  });
});

test.describe('メール登録フォーム (map.html)', () => {

  test('フォームが表示される', async ({ page }) => {
    await page.goto('/map.html');
    // Dismiss guide
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();

    await expect(page.locator('.subscribe-section')).toBeVisible();
    await expect(page.locator('#subscribeEmail')).toBeVisible();
  });

  test('メール送信でlocalStorageに保存される', async ({ page }) => {
    await page.goto('/map.html');
    // Dismiss guide
    const guide = page.locator('#guideOverlay');
    if (await guide.isVisible()) await page.locator('#guideOkBtn').click();

    // API won't be available, so it falls back to localStorage
    await page.locator('#subscribeEmail').fill('test@example.com');
    await page.locator('.subscribe-form button').click();

    await expect(page.locator('#subscribeMsg')).toContainText('登録ありがとうございます');

    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('nami-kaze-subscribers')));
    expect(stored).toContain('test@example.com');
  });
});
