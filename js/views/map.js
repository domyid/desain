// =========================================================
// Peta Pertemuan — kartu setiap pertemuan, terkunci/terbuka,
// menampilkan status selesai & bintang.
// =========================================================

import { el } from '../ui.js';
import { suara } from '../sound.js';
import { pertemuan } from '../data.js';
import { terbuka, sudahSelesai, bintangPertemuan } from '../storage.js';
import { jumlahKarya } from '../galeri.js';

export function viewMap() {
  const kembali = el('button', {
    class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/'; },
  }, '← Beranda');

  const kartu = pertemuan.map(buatKartu);

  return el('section', {}, [
    el('div', { class: 'page-head' }, [
      kembali,
      jumlahKarya() > 0
        ? el('button', { class: 'btn btn--ghost btn--mini', onclick: () => { suara.klik(); location.hash = '#/galeri'; } }, `🖼️ Galeri (${jumlahKarya()})`)
        : null,
      el('div', { class: 'spacer' }),
      el('h2', {}, 'Peta Petualangan 🗺️'),
    ]),
    el('div', { class: 'map-grid' }, kartu),
  ]);
}

function buatKartu(p) {
  const bisa = terbuka(p.id);
  const selesai = sudahSelesai(p.id);
  const bintang = bintangPertemuan(p.id);
  const adaIsi = p.langkah.length > 0;

  const anak = [
    selesai
      ? el('span', { class: 'lesson-card__done' }, '✓ Selesai')
      : (!bisa ? el('span', { class: 'lesson-card__lock' }, '🔒') : null),
    el('span', { class: 'lesson-card__emoji' }, p.emoji),
    el('span', { class: 'lesson-card__no' }, `Pertemuan ${p.id}`),
    el('span', { class: 'lesson-card__title' }, p.judul),
    el('span', { class: 'lesson-card__tag' }, adaIsi ? p.tag : 'Segera hadir ✨'),
    selesai ? el('div', { class: 'lesson-card__stars' }, '⭐'.repeat(bintang) + '☆'.repeat(3 - bintang)) : null,
  ];

  const terkunci = !bisa || !adaIsi;

  return el('button', {
    class: 'lesson-card' + (terkunci ? ' is-locked' : ''),
    style: { '--accent': p.warna },
    disabled: terkunci,
    'aria-label': `Pertemuan ${p.id}: ${p.judul}${terkunci ? ' (terkunci)' : ''}`,
    onclick: () => {
      if (terkunci) { suara.salah(); return; }
      suara.klik();
      location.hash = `#/pelajaran/${p.id}`;
    },
  }, anak);
}
