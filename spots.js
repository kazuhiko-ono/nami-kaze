const SPOTS = [
  // 湘南
  { name: '由比ヶ浜', lat: 35.300805, lon: 139.540638, coast: 180, area: '湘南', tide: { pc: 14, hc: 19 } },
  { name: '七里ヶ浜', lat: 35.3020, lon: 139.5114, coast: 200, area: '湘南', tide: { pc: 14, hc: 19 } },
  { name: '鵠沼', lat: 35.3122, lon: 139.4684, coast: 190, area: '湘南', tide: { pc: 14, hc: 19 } },
  { name: '辻堂', lat: 35.3154, lon: 139.4251, coast: 190, area: '湘南', tide: { pc: 14, hc: 19 } },
  { name: '茅ヶ崎', lat: 35.3148, lon: 139.3982, coast: 190, area: '湘南', tide: { pc: 14, hc: 19 } },
  // 三浦
  { name: '津久井浜', lat: 35.1898, lon: 139.6747, coast: 150, area: '三浦', tide: { pc: 14, hc: 19 } },
  { name: '逗子', lat: 35.289884, lon: 139.568849, coast: 185, area: '三浦', tide: { pc: 14, hc: 19 } },
  // 千葉
  { name: '検見川', lat: 35.612261, lon: 140.058372, coast: 200, area: '千葉', tide: { pc: 12, hc: 18 } },
  { name: '一宮', lat: 35.3726, lon: 140.3720, coast: 90, area: '千葉', tide: { pc: 12, hc: 5 } },
  { name: '鴨川', lat: 35.1041, lon: 140.1105, coast: 135, area: '千葉', tide: { pc: 12, hc: 6 } },
  { name: '御宿', lat: 35.1809, lon: 140.3580, coast: 100, area: '千葉', tide: { pc: 12, hc: 5 } },
  { name: '館山 北条海岸', lat: 35.005819, lon: 139.846906, coast: 225, area: '千葉', tide: { pc: 12, hc: 19 } },
  // 浜名湖
  { name: '舘山寺', lat: 34.742915, lon: 137.579238, coast: 180, area: '浜名湖', tide: { pc: 22, hc: 18 } },
  // 関西
  { name: '磯ノ浦', lat: 34.2587, lon: 135.0948, coast: 285, area: '関西', tide: { pc: 30, hc: 11 } },
  // 四国
  { name: '生見', lat: 33.5250, lon: 134.2864, coast: 110, area: '四国', tide: { pc: 39, hc: 1 } },
  // 宮崎
  { name: '木崎浜', lat: 31.8321, lon: 131.4561, coast: 100, area: '宮崎', tide: { pc: 45, hc: 9 } },
  // 唐津
  { name: '唐津', lat: 33.460927, lon: 130.012627, coast: 315, area: '唐津', tide: { pc: 41, hc: 1 } },
  // 福岡
  { name: '今宿', lat: 33.586249, lon: 130.273788, coast: 0, area: '福岡', tide: { pc: 40, hc: 21 } },
  { name: '芥屋', lat: 33.602894, lon: 130.131878, coast: 315, area: '福岡', tide: { pc: 40, hc: 16 } },
  // 北九州
  { name: '福間', lat: 33.760493, lon: 130.434813, coast: 0, area: '北九州', tide: { pc: 40, hc: 18 } },
  // 大分
  { name: '住吉浜', lat: 33.402883, lon: 131.657977, coast: 90, area: '大分', tide: { pc: 44, hc: 5 } },
  // 沖縄
  { name: '海中道路', lat: 26.343825, lon: 127.901545, coast: 0, area: '沖縄', tide: { pc: 47, hc: 32 } },
  { name: '瀬長島', lat: 26.182440, lon: 127.639657, coast: 270, area: '沖縄', tide: { pc: 47, hc: 5 } },
  // 奄美・沖縄
  { name: 'クレータービーチ', lat: 28.4220, lon: 129.6323, coast: 90, area: '奄美・沖縄', tide: { pc: 46, hc: 28 } },
  { name: '前浜ビーチ', lat: 24.7332, lon: 125.2581, coast: 250, area: '宮古島', tide: { pc: 47, hc: 13 } },
];
