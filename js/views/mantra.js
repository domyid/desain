// =========================================================
// Aktivitas "Pembuat Mantra Ajaib" untuk pelajaran AI.
// Anak merangkai kalimat perintah (prompt) untuk AI dengan
// memilih kartu di tiap baris. Hasilnya bisa disalin/dibagikan
// ke orang dewasa untuk dicoba di alat AI sungguhan.
// =========================================================

import { el, toast } from '../ui.js';
import { suara } from '../sound.js';
import { salinTeks, bagikanTeks } from '../share.js';

/** @returns {HTMLElement} */
export function widgetMantra(a) {
  const pilihan = a.bagian.map(() => 0); // indeks terpilih tiap baris
  let gerakan = 0;                        // 0 = diam (gambar biasa)

  const hasilTeks = el('div', { class: 'mantra__teks' });

  function rangkai() {
    const bagian = a.bagian.map((b, i) => b.pilihan[pilihan[i]]);
    // pola: <tokoh> <aksi> di <tempat>, gaya <gaya>
    let kalimat = bagian.join(' ');
    if (a.pola) {
      kalimat = a.pola;
      a.bagian.forEach((b, i) => { kalimat = kalimat.replace(`{${i}}`, bagian[i]); });
    }
    const g = a.gerakan && a.gerakan[gerakan];
    if (g && gerakan > 0) kalimat += `. Buat jadi video: ${g}`;
    return kalimat;
  }

  function perbarui() {
    hasilTeks.textContent = '“' + rangkai() + '”';
  }

  // baris pilihan (tokoh/aksi/tempat/gaya)
  const baris = a.bagian.map((b, i) => {
    const chips = b.pilihan.map((teks, j) => {
      const c = el('button', {
        class: 'chip' + (j === 0 ? ' is-active' : ''),
        onclick: () => {
          pilihan[i] = j; suara.klik();
          baris[i].querySelectorAll('.chip').forEach((x) => x.classList.remove('is-active'));
          c.classList.add('is-active');
          perbarui();
        },
      }, teks);
      return c;
    });
    return el('div', { class: 'mantra__baris' }, [
      el('span', { class: 'mantra__label' }, b.label),
      el('div', { class: 'mantra__chips' }, chips),
    ]);
  });

  // baris gerakan (untuk video) — opsional
  let barisGerakan = null;
  if (a.gerakan && a.gerakan.length) {
    const chips = a.gerakan.map((teks, j) => {
      const c = el('button', {
        class: 'chip chip--video' + (j === 0 ? ' is-active' : ''),
        onclick: () => {
          gerakan = j; suara.klik();
          barisGerakan.querySelectorAll('.chip').forEach((x) => x.classList.remove('is-active'));
          c.classList.add('is-active');
          perbarui();
        },
      }, teks);
      return c;
    });
    barisGerakan = el('div', { class: 'mantra__baris' }, [
      el('span', { class: 'mantra__label' }, '🎬 Video'),
      el('div', { class: 'mantra__chips' }, chips),
    ]);
  }

  const acak = el('button', {
    class: 'btn btn--ghost btn--mini',
    onclick: () => {
      suara.pop();
      a.bagian.forEach((b, i) => { pilihan[i] = Math.floor(Math.random() * b.pilihan.length); });
      baris.forEach((row, i) => {
        row.querySelectorAll('.chip').forEach((x, j) => x.classList.toggle('is-active', j === pilihan[i]));
      });
      perbarui();
    },
  }, '🎲 Acak');

  const salin = el('button', {
    class: 'btn btn--mini',
    onclick: async () => { suara.klik(); toast((await salinTeks(rangkai())) ? 'Mantra disalin! 📋' : 'Gagal menyalin'); },
  }, '📋 Salin');

  const bagikan = el('button', {
    class: 'btn btn--pink btn--mini',
    onclick: async () => {
      suara.klik();
      const h = await bagikanTeks(rangkai(), 'Mantra Gambar AI ✨');
      toast(h === 'disalin' ? 'Mantra disalin! 📋' : h === 'dibagikan' ? 'Terkirim! 💖' : h === 'batal' ? 'Dibatalkan' : 'Gagal');
    },
  }, '📤 Bagikan ke Mama/Papa');

  perbarui();

  return el('div', { class: 'mantra' }, [
    ...baris,
    barisGerakan,
    el('div', { class: 'mantra__hasil' }, [
      el('span', { class: 'mantra__hasil-judul' }, '✨ Mantramu:'),
      hasilTeks,
    ]),
    el('div', { class: 'mantra__aksi' }, [acak, salin, bagikan]),
  ]);
}
