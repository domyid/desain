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
