const VALID_KANKU = ['01kanku','02kanku','03kanku','04kanku','05kanku','06kanku','07kanku','08kanku','09kanku','10kanku','11kanku'];

const KANKU_NAMES = {
  '01kanku': '第一管区(小樽)', '02kanku': '第二管区(塩釜)', '03kanku': '第三管区(横浜)',
  '04kanku': '第四管区(名古屋)', '05kanku': '第五管区(神戸)', '06kanku': '第六管区(広島)',
  '07kanku': '第七管区(北九州)', '08kanku': '第八管区(舞鶴)', '09kanku': '第九管区(新潟)',
  '10kanku': '第十管区(鹿児島)', '11kanku': '第十一管区(那覇)',
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
      stations.push({
        id: match[1],
        name: match[3],
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
