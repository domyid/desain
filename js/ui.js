// =========================================================
// Kumpulan fungsi bantu kecil untuk membuat tampilan.
// =========================================================

/**
 * Membuat elemen DOM dengan ringkas.
 * @param {string} tag  nama tag, mis. 'div', 'button'
 * @param {object} props atribut/properti (class, onclick, html, dll.)
 * @param {Array|Node|string} anak isi elemen
 */
export function el(tag, props = {}, anak = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const c of [].concat(anak)) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

/** Kosongkan lalu isi sebuah wadah. */
export function pasang(wadah, ...anak) {
  wadah.replaceChildren(...anak);
  return wadah;
}

/** Pindah halaman lewat hash. */
export function pergiKe(rute) {
  if (location.hash === rute) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = rute;
}

/** Hujan konfeti warna-warni. */
export function konfeti(jumlah = 80) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const warna = ['#7ec8f3', '#ffb6d5', '#b8f0d8', '#ffe39b', '#d3b8f5', '#ff9f43'];
  for (let i = 0; i < jumlah; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = warna[i % warna.length];
    p.style.animationDuration = 2 + Math.random() * 1.5 + 's';
    p.style.animationDelay = Math.random() * 0.6 + 's';
    if (i % 3 === 0) p.style.borderRadius = '50%';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 4200);
  }
}

/** Tampilkan bintang ⭐ sejumlah n dari maksimum maks. */
export function bintangTeks(n, maks = 3) {
  return '⭐'.repeat(n) + '☆'.repeat(Math.max(0, maks - n));
}
