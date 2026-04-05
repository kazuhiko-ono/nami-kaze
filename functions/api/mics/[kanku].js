const VALID_KANKU = ['01kanku','02kanku','03kanku','04kanku','05kanku','06kanku','07kanku','08kanku','09kanku','10kanku','11kanku'];

const KANKU_NAMES = {
  '01kanku': '第一管区(小樽)', '02kanku': '第二管区(塩釜)', '03kanku': '第三管区(横浜)',
  '04kanku': '第四管区(名古屋)', '05kanku': '第五管区(神戸)', '06kanku': '第六管区(広島)',
  '07kanku': '第七管区(北九州)', '08kanku': '第八管区(舞鶴)', '09kanku': '第九管区(新潟)',
  '10kanku': '第十管区(鹿児島)', '11kanku': '第十一管区(那覇)',
};

const LIGHTHOUSE_COORDS = {
  // 01kanku
  '132': { lat: 41.927, lon: 143.246 },  // 襟裳岬
  '133': { lat: 41.801, lon: 141.175 },  // 恵山岬
  '138': { lat: 44.115, lon: 144.224 },  // 能取岬
  '139': { lat: 43.385, lon: 145.753 },  // 納沙布岬
  '142': { lat: 43.335, lon: 140.357 },  // 神威岬
  '145': { lat: 45.432, lon: 141.991 },  // 金田ノ岬
  // 02kanku
  '147': { lat: 41.431, lon: 141.461 },  // 尻屋埼
  '148': { lat: 41.258, lon: 140.344 },  // 龍飛埼
  '149': { lat: 38.294, lon: 141.569 },  // 金華山
  '151': { lat: 39.951, lon: 139.703 },  // 入道埼
  '158': { lat: 36.950, lon: 140.961 },  // 塩屋埼
  // 03kanku
  '159': { lat: 35.708, lon: 140.869 },  // 犬吠埼
  '160': { lat: 34.902, lon: 139.887 },  // 野島埼
  '161': { lat: 33.128, lon: 139.837 },  // 八丈島
  '162': { lat: 34.608, lon: 138.845 },  // 石廊埼
  '167': { lat: 36.392, lon: 140.623 },  // 磯埼
  '176': { lat: 34.803, lon: 139.357 },  // 伊豆大島
  // 04kanku
  '178': { lat: 34.272, lon: 136.902 },  // 大王埼
  '179': { lat: 34.283, lon: 136.833 },  // 御座埼
  '180': { lat: 34.579, lon: 137.019 },  // 伊良湖岬
  '181': { lat: 34.957, lon: 136.649 },  // 四日市
  '182': { lat: 34.533, lon: 136.867 },  // 桃頭島
  '183': { lat: 34.596, lon: 138.226 },  // 波ケ埼
  // 05kanku
  '184': { lat: 33.438, lon: 135.754 },  // 潮岬
  '186': { lat: 33.248, lon: 134.178 },  // 室戸岬
  '187': { lat: 32.728, lon: 133.016 },  // 足摺岬
  '189': { lat: 34.178, lon: 134.636 },  // 孫埼
  '192': { lat: 34.283, lon: 135.028 },  // 友ケ島
  '193': { lat: 34.613, lon: 135.028 },  // 江埼
  '124280': { lat: 34.637, lon: 135.425 }, // 大阪
  // 06kanku
  '194': { lat: 34.313, lon: 133.791 },  // 青ノ山
  '197': { lat: 34.083, lon: 132.517 },  // 地蔵埼
  '198': { lat: 34.067, lon: 132.983 },  // 今治
  '204': { lat: 34.370, lon: 132.467 },  // 宇品
  '206': { lat: 33.350, lon: 132.017 },  // 佐田岬
  // 07kanku
  '210': { lat: 32.567, lon: 128.633 },  // 女島
  '211': { lat: 34.767, lon: 131.117 },  // 見島北
  '212': { lat: 33.950, lon: 130.867 },  // 若宮
  '213': { lat: 34.083, lon: 129.217 },  // 三島(対馬)
  '216': { lat: 33.917, lon: 130.717 },  // 妙見埼(若松)
  '220': { lat: 32.783, lon: 128.650 },  // 三井楽長崎鼻
  // 08kanku
  '223': { lat: 35.567, lon: 135.217 },  // 三度埼
  '224': { lat: 35.783, lon: 135.267 },  // 経ケ岬
  '226': { lat: 35.574, lon: 133.322 },  // 美保関
  '228': { lat: 35.008, lon: 132.283 },  // 石見大崎鼻
  '230': { lat: 35.967, lon: 135.967 },  // 越前岬
  // 09kanku
  '233': { lat: 37.850, lon: 136.917 },  // 舳倉島
  '234': { lat: 38.316, lon: 138.267 },  // 弾埼(佐渡)
  '235': { lat: 37.800, lon: 138.233 },  // 沢崎鼻(佐渡)
  '236': { lat: 38.908, lon: 139.686 },  // 鳥ケ首岬
  '237': { lat: 36.789, lon: 137.067 },  // 伏木
  '238': { lat: 36.517, lon: 136.600 },  // 大野
  // 10kanku
  '239': { lat: 31.367, lon: 131.317 },  // 都井岬
  '241': { lat: 32.433, lon: 131.683 },  // 細島
  '245': { lat: 29.833, lon: 129.867 },  // 中之島
  '247': { lat: 28.432, lon: 129.650 },  // 国頭岬
  '248': { lat: 32.583, lon: 130.017 },  // 四季咲岬
  '249': { lat: 32.183, lon: 130.050 },  // 射手埼
  // 11kanku
  '250': { lat: 24.600, lon: 124.283 },  // 平久保埼
  '251': { lat: 24.939, lon: 125.235 },  // 池間島
  '252': { lat: 24.449, lon: 122.934 },  // 西埼(与那国)
  '253': { lat: 26.333, lon: 126.700 },  // 久米島
  '254': { lat: 27.067, lon: 127.967 },  // 伊平屋島
};

function parseWindSpeed(text) {
  if (!text || text === '-1' || text === '不明') return null;
  if (text === '風弱く') return 0;
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1]) : null;
}

function parsePressure(text) {
  if (!text || text === '-1' || text === '不明') return null;
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1]) : null;
}

function parseWaveHeight(text) {
  if (!text || text === '-1' || text === '不明') return null;
  const m = text.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : null;
}

function parseWindDir(text) {
  if (!text || text === '-' || text === '-1' || text === '不明') return null;
  if (text === '風弱く') return null;
  return text;
}

export async function onRequestGet(context) {
  const kanku = context.params.kanku;

  if (!VALID_KANKU.includes(kanku)) {
    return new Response(JSON.stringify({ error: 'Invalid kanku' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const url = `https://www6.kaiho.mlit.go.jp/${kanku}/kisyou.html`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'NamiKaze/1.0' },
      cf: { cacheTtl: 600 },
    });

    if (!res.ok) throw new Error(`MICS HTTP ${res.status}`);
    const html = await res.text();

    const regex = /set_bubble\(\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\)/g;

    const stations = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      const id = match[1];
      const coords = LIGHTHOUSE_COORDS[id] || null;
      stations.push({
        id,
        name: match[3],
        lat: coords ? coords.lat : null,
        lon: coords ? coords.lon : null,
        windDir: parseWindDir(match[4]),
        windSpeed: parseWindSpeed(match[5]),
        pressure: parsePressure(match[6]),
        waveHeight: parseWaveHeight(match[7]),
      });
    }

    return new Response(JSON.stringify({ kanku, kankuName: KANKU_NAMES[kanku], stations }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=600',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
