// =========================================================
// Membuat sertifikat kelulusan sebagai gambar PNG (data URL),
// lengkap dengan nama anak, jumlah bintang & lencana, tanggal,
// dan maskot Awan. Bisa diunduh / dibagikan ke keluarga.
// =========================================================

import { mascotSVG } from './mascot.js';

const W = 1000;
const H = 700;

function radius(x, rx, ry, w, h, r) {
  x.beginPath();
  x.moveTo(rx + r, ry);
  x.arcTo(rx + w, ry, rx + w, ry + h, r);
  x.arcTo(rx + w, ry + h, rx, ry + h, r);
  x.arcTo(rx, ry + h, rx, ry, r);
  x.arcTo(rx, ry, rx + w, ry, r);
  x.closePath();
}

function bintang(x, cx, cy, luar, dalam, isi) {
  x.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? luar : dalam;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    i === 0 ? x.moveTo(px, py) : x.lineTo(px, py);
  }
  x.closePath();
  x.fillStyle = isi;
  x.fill();
}

function gambarMaskot(x, cx, y, ukuran) {
  return new Promise((resolve) => {
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(mascotSVG('bangga'));
    const img = new Image();
    img.onload = () => { x.drawImage(img, cx - ukuran / 2, y, ukuran, ukuran); resolve(); };
    img.onerror = () => resolve();
    img.src = url;
  });
}

/**
 * @returns {Promise<string>} data URL PNG sertifikat
 */
export async function buatSertifikatURL(nama, { bintang: jBintang = 0, lencana = 0, tanggal = '' } = {}) {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch { /* abaikan */ }
  }
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');

  // latar
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#eaf7ff'); g.addColorStop(1, '#fff4fb');
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  // bingkai
  x.lineWidth = 16; x.strokeStyle = '#7ec8f3'; radius(x, 26, 26, W - 52, H - 52, 30); x.stroke();
  x.lineWidth = 5; x.strokeStyle = '#ffb6d5'; radius(x, 48, 48, W - 96, H - 96, 24); x.stroke();

  // bintang hias sudut
  bintang(x, 90, 90, 16, 7, '#ffe39b');
  bintang(x, W - 90, 90, 16, 7, '#ffe39b');

  x.textAlign = 'center';

  x.fillStyle = '#4a9fd6';
  x.font = "800 58px 'Baloo 2', 'Nunito', sans-serif";
  x.fillText('Sertifikat Desainer Hebat', W / 2, 150);

  x.fillStyle = '#8a8aa8';
  x.font = "700 26px 'Nunito', sans-serif";
  x.fillText('Kelas Desain — Dunia Ajaib Awan', W / 2, 192);

  x.fillStyle = '#4a4a6a';
  x.font = "600 24px 'Nunito', sans-serif";
  x.fillText('Dengan bangga diberikan kepada', W / 2, 270);

  // nama anak
  x.fillStyle = '#ff8fc0';
  x.font = "800 64px 'Baloo 2', 'Nunito', sans-serif";
  x.fillText(nama || 'Sahabat Desainer', W / 2, 344);
  // garis bawah nama
  const lebarNama = Math.min(560, Math.max(260, x.measureText(nama || '').width + 80));
  x.strokeStyle = '#ffd6ea'; x.lineWidth = 4; x.beginPath();
  x.moveTo(W / 2 - lebarNama / 2, 366); x.lineTo(W / 2 + lebarNama / 2, 366); x.stroke();

  x.fillStyle = '#4a4a6a';
  x.font = "600 23px 'Nunito', sans-serif";
  x.fillText('karena telah menamatkan 8 petualangan belajar desain', W / 2, 416);
  x.fillText('dengan penuh semangat dan kreativitas! 🌟', W / 2, 448);

  // baris bintang + jumlah
  bintang(x, W / 2 - 150, 506, 18, 8, '#ffce4d');
  x.fillStyle = '#4a4a6a'; x.font = "800 30px 'Baloo 2','Nunito',sans-serif"; x.textAlign = 'left';
  x.fillText(`${jBintang} Bintang`, W / 2 - 122, 516);
  x.textAlign = 'center';
  // lencana
  x.fillStyle = '#5fcf80'; radius(x, W / 2 + 40, 490, 36, 36, 12); x.fill();
  x.fillStyle = '#fff'; x.font = "800 22px 'Nunito'"; x.fillText('🏅', W / 2 + 58, 516);
  x.fillStyle = '#4a4a6a'; x.font = "800 30px 'Baloo 2','Nunito',sans-serif"; x.textAlign = 'left';
  x.fillText(`${lencana} Lencana`, W / 2 + 90, 516);
  x.textAlign = 'center';

  // maskot
  await gambarMaskot(x, W / 2, 540, 120);

  // tanggal & tanda tangan
  x.fillStyle = '#8a8aa8'; x.font = "600 20px 'Nunito', sans-serif";
  if (tanggal) x.fillText(tanggal, W / 2, 678);
  x.fillStyle = '#4a9fd6'; x.font = "700 22px 'Baloo 2','Nunito',sans-serif";
  x.fillText('Awan — Sahabat Desainermu', W / 2, 648);

  return c.toDataURL('image/png');
}
