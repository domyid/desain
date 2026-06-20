// =========================================================
// Gambar garis & pola (SVG) untuk materi "Dunia Garis"
// dan "Dunia Pola".
// =========================================================

/** Contoh jenis garis. viewBox 120x60. */
export function garisSVG(jenis, warna = '#7ec8f3') {
  const s = `fill="none" stroke="${warna}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
  let d;
  switch (jenis) {
    case 'lengkung': d = `<path d="M10 30 Q35 4 60 30 T110 30" ${s}/>`; break;
    case 'zigzag': d = `<polyline points="10,42 32,16 54,42 76,16 98,42 110,28" ${s}/>`; break;
    case 'tebal': d = `<line x1="12" y1="30" x2="108" y2="30" fill="none" stroke="${warna}" stroke-width="14" stroke-linecap="round"/>`; break;
    case 'putus': d = `<line x1="12" y1="30" x2="108" y2="30" ${s} stroke-dasharray="2 16"/>`; break;
    case 'spiral': d = `<path d="M60 30 m0 0 a8 8 0 1 1 -8 8 a16 16 0 1 1 16 -16 a24 24 0 1 1 -24 24" ${s}/>`; break;
    default: d = `<line x1="12" y1="30" x2="108" y2="30" ${s}/>`; // lurus
  }
  return `<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">${d}</svg>`;
}

/** Tile pola berulang. viewBox 100x100. */
export function polaSVG(jenis, warna = '#ff7aa8', warna2 = '#ffe39b') {
  let isi = '';
  if (jenis === 'titik') {
    for (let y = 16; y < 100; y += 24)
      for (let x = 16; x < 100; x += 24)
        isi += `<circle cx="${x}" cy="${y}" r="7" fill="${warna}"/>`;
  } else if (jenis === 'garis') {
    for (let i = -100; i < 140; i += 20)
      isi += `<line x1="${i}" y1="0" x2="${i + 100}" y2="100" stroke="${warna}" stroke-width="8" stroke-linecap="round"/>`;
  } else if (jenis === 'hati') {
    for (let y = 22; y < 100; y += 30)
      for (let x = 22; x < 100; x += 30)
        isi += hati(x, y, 9, (x + y) % 60 === 0 ? warna2 : warna);
  } else { // bunga
    for (let y = 24; y < 100; y += 30)
      for (let x = 24; x < 100; x += 30)
        isi += bunga(x, y, warna, warna2);
  }
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="96" height="96" rx="16" fill="#fff" stroke="#e7f1fa" stroke-width="2"/>
    <clipPath id="kp"><rect x="2" y="2" width="96" height="96" rx="16"/></clipPath>
    <g clip-path="url(#kp)">${isi}</g></svg>`;
}

function bunga(cx, cy, w, w2) {
  let p = '';
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    p += `<circle cx="${(cx + Math.cos(a) * 7).toFixed(1)}" cy="${(cy + Math.sin(a) * 7).toFixed(1)}" r="5" fill="${w}"/>`;
  }
  return p + `<circle cx="${cx}" cy="${cy}" r="4" fill="${w2}"/>`;
}

function hati(cx, cy, s, w) {
  return `<path transform="translate(${cx - s},${cy - s})" d="M${s} ${s * 1.7} C${s} ${s * 1.7} 0 ${s} 0 ${s * 0.6} C0 ${s * 0.2} ${s * 0.5} ${s * 0.2} ${s} ${s * 0.7} C${s * 1.5} ${s * 0.2} ${s * 2} ${s * 0.2} ${s * 2} ${s * 0.6} C${s * 2} ${s} ${s} ${s * 1.7} ${s} ${s * 1.7} Z" fill="${w}"/>`;
}
