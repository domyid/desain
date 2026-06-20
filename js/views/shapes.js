// =========================================================
// Gambar bentuk dasar & ilustrasi gabungan (SVG) untuk
// materi "Dunia Bentuk".
// =========================================================

export function bentukSVG(jenis, warna = '#7ec8f3') {
  const g = '#ffffff';
  const sw = 'stroke="#ffffff" stroke-width="3"';
  switch (jenis) {
    case 'lingkaran':
      return svg(`<circle cx="50" cy="50" r="40" fill="${warna}" ${sw}/>`);
    case 'persegi':
      return svg(`<rect x="12" y="12" width="76" height="76" rx="10" fill="${warna}" ${sw}/>`);
    case 'segitiga':
      return svg(`<polygon points="50,10 88,86 12,86" fill="${warna}" ${sw} stroke-linejoin="round"/>`);
    case 'persegiPanjang':
      return svg(`<rect x="8" y="28" width="84" height="44" rx="10" fill="${warna}" ${sw}/>`);
    case 'bintang':
      return svg(`<polygon points="${bintangTitik(50, 52, 40, 18)}" fill="${warna}" ${sw} stroke-linejoin="round"/>`);
    default:
      return svg(`<circle cx="50" cy="50" r="40" fill="${g}"/>`);
  }
}

/** Ilustrasi gabungan beberapa bentuk (mis. rumah). */
export function ilustrasiSVG(nama) {
  if (nama === 'rumah') {
    return `
<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-label="Rumah dari bentuk-bentuk">
  <circle cx="166" cy="34" r="18" fill="#ffd93b"/>            <!-- matahari: lingkaran -->
  <polygon points="100,18 168,78 32,78" fill="#ff7aa8"/>      <!-- atap: segitiga -->
  <rect x="48" y="78" width="104" height="74" rx="6" fill="#7ec8f3"/>   <!-- badan: persegi -->
  <rect x="88" y="104" width="28" height="48" rx="4" fill="#a96fd0"/>   <!-- pintu: persegi panjang -->
  <rect x="60" y="94" width="22" height="22" rx="4" fill="#fff7e6"/>    <!-- jendela: persegi -->
  <rect x="122" y="94" width="22" height="22" rx="4" fill="#fff7e6"/>
  <circle cx="100" cy="120" r="3" fill="#4a4a6a"/>            <!-- gagang pintu -->
</svg>`;
  }
  if (nama === 'karakter') {
    // Kucing lucu dari lingkaran + segitiga (telinga).
    return `
<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg" aria-label="Karakter kucing dari bentuk">
  <polygon points="62,40 84,84 40,84" fill="#ffd1a8"/>
  <polygon points="138,40 160,84 116,84" fill="#ffd1a8"/>
  <polygon points="66,52 80,80 52,80" fill="#ff9fb6"/>
  <polygon points="134,52 148,80 120,80" fill="#ff9fb6"/>
  <circle cx="100" cy="98" r="56" fill="#ffd1a8"/>
  <circle cx="80" cy="92" r="8" fill="#4a4a6a"/>
  <circle cx="120" cy="92" r="8" fill="#4a4a6a"/>
  <circle cx="77" cy="89" r="2.6" fill="#fff"/>
  <circle cx="117" cy="89" r="2.6" fill="#fff"/>
  <polygon points="100,104 94,110 106,110" fill="#ff7aa8"/>
  <path d="M100 110 Q92 120 84 114 M100 110 Q108 120 116 114" fill="none" stroke="#4a4a6a" stroke-width="3" stroke-linecap="round"/>
  <circle cx="64" cy="108" r="9" fill="#ffb6d5" opacity=".7"/>
  <circle cx="136" cy="108" r="9" fill="#ffb6d5" opacity=".7"/>
  <line x1="40" y1="100" x2="20" y2="96" stroke="#4a4a6a" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="40" y1="108" x2="20" y2="110" stroke="#4a4a6a" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="160" y1="100" x2="180" y2="96" stroke="#4a4a6a" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="160" y1="108" x2="180" y2="110" stroke="#4a4a6a" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;
  }

  if (nama === 'pemandangan') {
    return `
<svg viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg" aria-label="Pemandangan latar">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#bfe9ff"/><stop offset="1" stop-color="#eaf7ff"/></linearGradient></defs>
  <rect x="0" y="0" width="240" height="150" rx="14" fill="url(#lg)"/>
  <circle cx="200" cy="34" r="20" fill="#ffe39b"/>
  <path d="M0 110 Q60 78 120 104 T240 96 V150 H0 Z" fill="#9fe0b4"/>
  <path d="M0 128 Q70 108 140 126 T240 120 V150 H0 Z" fill="#7ed29a"/>
  <rect x="40" y="92" width="10" height="34" rx="4" fill="#b07a4f"/>
  <circle cx="45" cy="84" r="22" fill="#6cc98a"/>
  <circle cx="150" cy="38" r="14" fill="#fff"/><circle cx="168" cy="40" r="11" fill="#fff"/><circle cx="135" cy="42" r="11" fill="#fff"/>
</svg>`;
  }

  if (nama === 'cerita') {
    // 3 panel: biji -> tunas -> bunga (awal, tengah, akhir).
    const panel = (x, isi, label) => `
      <g transform="translate(${x},6)">
        <rect x="0" y="0" width="68" height="68" rx="10" fill="#fff" stroke="#e7f1fa" stroke-width="2"/>
        ${isi}
        <text x="34" y="84" text-anchor="middle" font-family="Baloo 2,sans-serif" font-size="11" fill="#8a8aa8">${label}</text>
      </g>`;
    return `
<svg viewBox="0 0 224 100" xmlns="http://www.w3.org/2000/svg" aria-label="Cerita tiga bagian">
  ${panel(2, `<ellipse cx="34" cy="50" rx="8" ry="11" fill="#b07a4f"/><path d="M14 60 H54" stroke="#9fe0b4" stroke-width="4" stroke-linecap="round"/>`, 'Awal')}
  ${panel(78, `<path d="M34 58 V36" stroke="#6cc98a" stroke-width="4" stroke-linecap="round"/><path d="M34 44 q10 -2 12 -10 M34 50 q-10 -2 -12 -10" fill="none" stroke="#6cc98a" stroke-width="4" stroke-linecap="round"/><path d="M14 60 H54" stroke="#9fe0b4" stroke-width="4" stroke-linecap="round"/>`, 'Tengah')}
  ${panel(154, `<path d="M34 60 V40" stroke="#6cc98a" stroke-width="4" stroke-linecap="round"/>${[0,1,2,3,4].map(i=>{const a=i*2*Math.PI/5-Math.PI/2;return `<circle cx="${(34+Math.cos(a)*8).toFixed(1)}" cy="${(28+Math.sin(a)*8).toFixed(1)}" r="6" fill="#ff7aa8"/>`;}).join('')}<circle cx="34" cy="28" r="5" fill="#ffe39b"/><path d="M14 60 H54" stroke="#9fe0b4" stroke-width="4" stroke-linecap="round"/>`, 'Akhir')}
</svg>`;
  }

  return '';
}

function svg(isi) {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${isi}</svg>`;
}

function bintangTitik(cx, cy, luar, dalam) {
  let t = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? luar : dalam;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    t.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return t.join(' ');
}
