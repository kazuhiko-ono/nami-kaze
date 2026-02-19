# CLAUDE.md - 全国の波と風

## これは何か

全国のビーチの風・波・潮位をリアルタイム表示するWebアプリ。
URLパラメータで地点を切り替えられる。全国マップから地点を選択可能。

## 技術方針

- HTML + CSS + JavaScript の単一ファイル構成（フレームワーク不要、ビルド不要）
- データソース: Open-Meteo API（無料・APIキー不要）
- テスト: Playwright でUI自動検証
- ホスティング: Cloudflare Pages（GitHub連携で自動デプロイ）
- 開発: Claude Code + Context7 MCP

## ファイル構成

- `index.html` - コンディション表示ページ（メイン）
- `map.html` - 全国マップページ（地点選択）
- `config.js` - デフォルト設定（緯度経度・地名・海岸方位）
- `spots.js` - 全国の地点データ

## URLパラメータ仕様

`index.html` は以下のURLパラメータに対応:

| パラメータ | 説明 | デフォルト |
|-----------|------|-----------|
| `lat` | 緯度 | 35.308652 |
| `lon` | 経度 | 139.535305 |
| `name` | 地点名 | 由比ヶ浜 |
| `coast` | 海岸方位（度） | 180 |

例: `index.html?lat=35.3730&lon=140.3880&name=一宮&coast=90`

パラメータがない場合は `config.js` の `DEFAULT_CONFIG` を使用。

## API

- Weather: `https://api.open-meteo.com/v1/forecast`
- Marine: `https://marine-api.open-meteo.com/v1/marine`
- 実装前に Context7 で最新の仕様を必ず確認すること

## 開発ルール

1. フェーズごとに小さく作り、動作確認してから次へ進む
2. Playwright テスト（`tests/`）を書いて通す
3. テストが壊れていないことを確認してからコミットする
4. 外部ライブラリは CDN のみ（npm はテスト専用）
5. モバイルファースト（最小幅 320px）
6. エラーハンドリングは毎フェーズ必ず含める

## Playwright 設定

- ローカルサーバ: `npx http-server -p 8080 -c-1 .`
- ビューポート: 375×812（iPhone SE 相当）
- API モックは使わない（実際の Open-Meteo にアクセス）
- エラー系テストは `route.abort` で模擬

## 地点追加方法

`spots.js` に新しいエントリを追加:
```javascript
{ name: '地点名', lat: 緯度, lon: 経度, coast: 海岸方位, area: 'エリア名' },
```
