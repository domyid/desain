// =========================================================
// Aktivitas "menggambar bebas" — kanvas yang bisa dicoret
// dengan pilihan warna & ukuran kuas. Dukung mouse & sentuh.
// =========================================================

import { el } from '../ui.js';
import { suara } from '../sound.js';

const LEBAR = 480;
const TINGGI = 340;

/** Bangun widget menggambar. @returns {HTMLElement} */
export function widgetMenggambar(palet) {
  const canvas = el('canvas', { width: LEBAR, height: TINGGI, class: 'draw-canvas', 'aria-label': 'Area menggambar' });
  const ctx = canvas.getContext('2d');
  bersihkan();

  let warna = palet.find((w) => w !== '#ffffff') || palet[0];
  let tebal = 10;
  let menggambar = false;
  let last = null;

  function bersihkan() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, LEBAR, TINGGI);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function posisi(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (LEBAR / r.width), y: (e.clientY - r.top) * (TINGGI / r.height) };
  }
  function titik(p) {
    ctx.fillStyle = warna;
    ctx.beginPath();
    ctx.arc(p.x, p.y, tebal / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  function garis(p) {
    ctx.strokeStyle = warna;
    ctx.lineWidth = tebal;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  canvas.addEventListener('pointerdown', (e) => {
    menggambar = true;
    canvas.setPointerCapture(e.pointerId);
    last = posisi(e);
    titik(last);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!menggambar) return;
    const p = posisi(e);
    garis(p);
    last = p;
  });
  const stop = () => { menggambar = false; };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);
  canvas.addEventListener('pointerleave', stop);

  // ---- Palet warna ----
  const tombolWarna = palet.map((w, i) => {
    const b = el('button', {
      class: 'paint' + (w === warna ? ' is-active' : ''),
      style: { background: w, ...(w === '#ffffff' ? { borderColor: '#ccc' } : {}) },
      'aria-label': w === '#ffffff' ? 'penghapus' : 'pilih warna',
      title: w === '#ffffff' ? 'Penghapus' : 'Warna',
      onclick: () => {
        warna = w; suara.klik();
        tombolWarna.forEach((x) => x.classList.remove('is-active'));
        b.classList.add('is-active');
      },
    });
    return b;
  });

  // ---- Ukuran kuas ----
  const ukuran = [
    { label: 'Kecil', nilai: 5, titik: 8 },
    { label: 'Sedang', nilai: 10, titik: 14 },
    { label: 'Besar', nilai: 20, titik: 22 },
  ];
  const tombolUkuran = ukuran.map((u) => {
    const b = el('button', {
      class: 'brush' + (u.nilai === tebal ? ' is-active' : ''),
      title: u.label, 'aria-label': `kuas ${u.label}`,
      onclick: () => {
        tebal = u.nilai; suara.klik();
        tombolUkuran.forEach((x) => x.classList.remove('is-active'));
        b.classList.add('is-active');
      },
    }, [el('span', { class: 'brush__dot', style: { width: u.titik + 'px', height: u.titik + 'px' } })]);
    return b;
  });

  const hapus = el('button', {
    class: 'btn btn--ghost btn--mini',
    onclick: () => { bersihkan(); suara.pop(); },
  }, '🧽 Hapus Semua');

  return el('div', { class: 'draw' }, [
    el('div', { class: 'draw__tools' }, [
      el('div', { class: 'palette', style: { marginBottom: '0' } }, tombolWarna),
      el('div', { class: 'brush-row' }, tombolUkuran),
    ]),
    el('div', { class: 'draw__board' }, [canvas]),
    el('div', { style: { marginTop: '12px' } }, [hapus]),
  ]);
}
