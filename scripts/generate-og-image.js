const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Register Noto Sans JP font
registerFont('/tmp/NotoSansJP-Bold.ttf', { family: 'Noto Sans JP', weight: 'bold' });

const WIDTH = 1200;
const HEIGHT = 630;
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// --- Background gradient (dark navy to blue) ---
const bgGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
bgGrad.addColorStop(0, '#061220');
bgGrad.addColorStop(0.5, '#0b1929');
bgGrad.addColorStop(1, '#0f2a45');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// --- Wind streaks (decorative lines) ---
ctx.lineCap = 'round';
const windLines = [
  { x1: 80, y1: 120, x2: 450, y2: 120, w: 6 },
  { x1: 150, y1: 155, x2: 520, y2: 155, w: 4 },
  { x1: 100, y1: 185, x2: 400, y2: 185, w: 3 },
  { x1: 750, y1: 100, x2: 1100, y2: 100, w: 5 },
  { x1: 800, y1: 135, x2: 1050, y2: 135, w: 3 },
];
for (const line of windLines) {
  const grad = ctx.createLinearGradient(line.x1, 0, line.x2, 0);
  grad.addColorStop(0, 'rgba(0, 212, 255, 0.6)');
  grad.addColorStop(1, 'rgba(0, 170, 238, 0.1)');
  ctx.strokeStyle = grad;
  ctx.lineWidth = line.w;
  ctx.beginPath();
  ctx.moveTo(line.x1, line.y1);
  ctx.lineTo(line.x2, line.y2);
  ctx.stroke();
}

// --- Wave layers ---
function drawWave(yBase, amplitude, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-50, yBase);
  for (let x = -50; x <= WIDTH + 50; x += 5) {
    const y = yBase + Math.sin((x / WIDTH) * Math.PI * 3 + amplitude * 0.01) * amplitude;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(WIDTH + 50, HEIGHT);
  ctx.lineTo(-50, HEIGHT);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Wave gradient helpers
function waveGradient(c1, c2) {
  const grad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  grad.addColorStop(0, c1);
  grad.addColorStop(0.5, c2);
  grad.addColorStop(1, c1);
  return grad;
}

drawWave(520, 40, waveGradient('#003366', '#005599'), 0.5);
drawWave(490, 45, waveGradient('#004488', '#0077bb'), 0.6);
drawWave(510, 35, waveGradient('#0066bb', '#00aaee'), 0.4);

// --- Small wave icon (decorative) ---
ctx.save();
ctx.globalAlpha = 0.5;
ctx.strokeStyle = '#00d4ff';
ctx.lineWidth = 4;
ctx.lineCap = 'round';
ctx.beginPath();
ctx.moveTo(520, 210);
ctx.quadraticCurveTo(555, 185, 585, 210);
ctx.quadraticCurveTo(615, 235, 645, 210);
ctx.quadraticCurveTo(665, 195, 690, 210);
ctx.stroke();
ctx.restore();

// --- Main title ---
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Title gradient fill
const titleGrad = ctx.createLinearGradient(0, 250, 0, 310);
titleGrad.addColorStop(0, '#ffffff');
titleGrad.addColorStop(1, '#c0ddf0');

ctx.font = 'bold 72px "Noto Sans JP"';
ctx.fillStyle = titleGrad;
ctx.fillText('全国の波と風', WIDTH / 2, 280);

// --- Subtitle ---
ctx.font = 'bold 30px "Noto Sans JP"';
ctx.fillStyle = '#7aa2c4';
ctx.fillText('風・波・潮位をリアルタイム表示', WIDTH / 2, 355);

// --- Output ---
const outPath = path.join(__dirname, '..', 'og-image.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outPath, buffer);
console.log(`Generated: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
