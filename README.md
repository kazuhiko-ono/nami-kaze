# 全国の波と風 🌊💨

全国のビーチの風・波・潮位をリアルタイム表示するWebアプリ。

## 公開URL

<!-- デプロイ後に追記 -->

## 使用技術

- HTML / CSS / JavaScript（単一ファイル構成）
- [Open-Meteo API](https://open-meteo.com/)（天気・海洋データ）
- [Leaflet.js](https://leafletjs.com/)（地図表示）
- [Cloudflare Pages](https://pages.cloudflare.com/)（ホスティング）

## 使い方

### 全国マップから選ぶ

`map.html` を開くと全国のビーチが地図上にマーカーで表示されます。
マーカーをタップして「コンディションを見る」で各地点のコンディションを確認できます。

### URLパラメータで直接指定

```
index.html?lat=35.3730&lon=140.3880&name=一宮&coast=90
```

| パラメータ | 説明 | デフォルト |
|-----------|------|-----------|
| `lat` | 緯度 | 35.308652（由比ヶ浜） |
| `lon` | 経度 | 139.535305（由比ヶ浜） |
| `name` | 地点名 | 由比ヶ浜 |
| `coast` | 海岸方位（度） | 180 |

パラメータなしで開くとデフォルト（由比ヶ浜）のコンディションを表示します。

## 地点追加方法

`spots.js` に新しいエントリを追加するだけ:

```javascript
{ name: '地点名', lat: 緯度, lon: 経度, coast: 海岸方位, area: 'エリア名' },
```

`map.html` のマーカーに自動で反映されます。

## ローカル起動

```bash
npx http-server -p 8080 .
```

ブラウザで http://localhost:8080 を開く。

## テスト実行

```bash
npm install
npx playwright install
npx playwright test
```
