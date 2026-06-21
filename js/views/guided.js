// =========================================================
// Aktivitas "menggambar bertahap" — tutorial ikuti-aku.
// Anak menebalkan garis panduan abu-abu langkah demi langkah,
// menggambar di kanvas sendiri. Hasil kanvas disimpan ke galeri.
// =========================================================

import { el } from '../ui.js';
import { suara } from '../sound.js';

/** @returns {HTMLElement} wadah berisi <canvas> (agar bisa ditangkap & disimpan) */
export function widgetMenggambarBertahap(a) {
  const W = a.lebar || 360;
  const H = a.tinggi || 360;
  const langkah = a.langkah || [];
  let ke = 0;

  // --- Lapisan panduan (SVG, redup) ---
  const guide = el('div', { class: 'guided__guide' });
  function gambarPanduan() {
    const lama = langkah.slice(0, ke).map((s) => s.svg).join('');
    const kini = langkah[ke] ? langkah[ke].svg : '';
    guide.innerHTML = `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#d3dae6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${lama}</g>
  <g fill="none" stroke="#ff9ec6" stroke-width="4" stroke-dasharray="7 7" stroke-linecap="round" stroke-linejoin="round" class="guided__kini">${kini}</g>
</svg>`;
  }

  // --- Lapisan gambar anak (kanvas) ---
  const canvas = el('canvas', { width: W, height: H, class: 'draw-canvas', 'aria-label': 'Area menggambar' });
  const ctx = canvas.getContext('2d');
  function bersih() { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; }
  bersih();

  let warna = (a.palet && a.palet[0]) || '#4a4a6a';
  let tebal = 6;
  let menggambar = false, last = null;
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) }; };
  const titik = (p) => { ctx.fillStyle = warna; ctx.beginPath(); ctx.arc(p.x, p.y, tebal / 2, 0, Math.PI * 2); ctx.fill(); };
  canvas.addEventListener('pointerdown', (e) => { menggambar = true; canvas.setPointerCapture(e.pointerId); last = pos(e); titik(last); });
  canvas.addEventListener('pointermove', (e) => { if (!menggambar) return; const p = pos(e); ctx.strokeStyle = warna; ctx.lineWidth = tebal; ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); last = p; });
  const stop = () => { menggambar = false; };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);
  canvas.addEventListener('pointerleave', stop);

  // --- Kontrol warna & kuas ---
  const palet = (a.palet || ['#4a4a6a', '#ff7aa8', '#7ec8f3', '#ffffff']).map((w, i) => {
    const b = el('button', {
      class: 'paint' + (i === 0 ? ' is-active' : ''),
      style: { background: w, ...(w === '#ffffff' ? { borderColor: '#ccc' } : {}) },
      'aria-label': w === '#ffffff' ? 'penghapus' : 'pilih warna',
      onclick: () => { warna = w; suara.klik(); paletBtn.forEach((x) => x.classList.remove('is-active')); b.classList.add('is-active'); },
    });
    return b;
  });
  const paletBtn = palet;

  const ukuran = [{ n: 4, d: 8 }, { n: 7, d: 14 }, { n: 12, d: 20 }];
  const kuas = ukuran.map((u, i) => {
    const b = el('button', {
      class: 'brush' + (i === 0 ? ' is-active' : ''), 'aria-label': 'ukuran kuas',
      onclick: () => { tebal = u.n; suara.klik(); kuas.forEach((x) => x.classList.remove('is-active')); b.classList.add('is-active'); },
    }, [el('span', { class: 'brush__dot', style: { width: u.d + 'px', height: u.d + 'px' } })]);
    return b;
  });

  // --- Navigasi langkah ---
  const instruksi = el('div', { class: 'guided__instruksi' });
  const prev = el('button', { class: 'btn btn--ghost btn--mini', onclick: () => mundur() }, '← Sebelumnya');
  const next = el('button', { class: 'btn btn--mini', onclick: () => maju() }, 'Langkah Berikutnya →');
  const hapus = el('button', { class: 'btn btn--ghost btn--mini', onclick: () => { bersih(); suara.pop(); } }, '🧽 Hapus');

  function perbarui() {
    instruksi.textContent = `Langkah ${ke + 1} dari ${langkah.length}: ${langkah[ke] ? langkah[ke].teks : ''}`;
    prev.disabled = ke === 0;
    next.disabled = ke >= langkah.length - 1;
    gambarPanduan();
  }
  function maju() { if (ke < langkah.length - 1) { ke++; suara.klik(); perbarui(); } }
  function mundur() { if (ke > 0) { ke--; suara.klik(); perbarui(); } }

  perbarui();

  return el('div', { class: 'guided' }, [
    instruksi,
    el('div', { class: 'guided__stage', style: { aspectRatio: `${W} / ${H}` } }, [guide, canvas]),
    el('div', { class: 'guided__nav' }, [prev, next]),
    el('div', { class: 'draw__tools', style: { marginTop: '10px' } }, [
      el('div', { class: 'palette', style: { marginBottom: '0' } }, palet),
      el('div', { class: 'brush-row' }, kuas),
    ]),
    el('div', { style: { marginTop: '10px' } }, [hapus]),
  ]);
}
