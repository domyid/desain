// =========================================================
// Galeri Karyaku — memajang semua gambar buatan anak,
// dengan tombol Bagikan, Unduh, dan Hapus tiap karya.
// =========================================================

import { el, pasang, toast } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { suara } from '../sound.js';
import { daftarKarya, hapusKarya } from '../galeri.js';
import { cariPertemuan } from '../data.js';
import { bagikanGambar, unduhGambar, bisaBagikanFile } from '../share.js';

export function viewGaleri() {
  const wadah = el('section', {});
  render();
  return wadah;

  function render() {
    const karya = daftarKarya();
    const kepala = el('div', { class: 'page-head' }, [
      el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/'; } }, '← Beranda'),
      el('div', { class: 'spacer' }),
      el('h2', {}, 'Galeri Karyaku 🖼️'),
    ]);

    if (!karya.length) {
      pasang(wadah, kepala, el('div', { class: 'card', style: { textAlign: 'center' } }, [
        el('div', { class: 'mascot', style: { width: '160px', margin: '0 auto 8px' }, html: mascotSVG('senang') }),
        el('h3', { style: { color: '#4a9fd6' } }, 'Galerimu masih kosong'),
        el('p', { style: { fontSize: '1.1rem', color: '#8a8aa8', fontWeight: '700' } }, 'Selesaikan aktivitas menggambar atau mewarnai, lalu karyamu akan muncul di sini! 🎨'),
        el('button', { class: 'btn btn--pink', style: { marginTop: '14px' }, onclick: () => { suara.klik(); location.hash = '#/peta'; } }, 'Mulai Berkarya 🚀'),
      ]));
      return;
    }

    const grid = el('div', { class: 'galeri-grid' }, karya.map(kartu));
    pasang(wadah, kepala,
      el('p', { class: 'galeri-info' }, `${karya.length} karya tersimpan. Ketuk Bagikan untuk mengirim ke keluarga! 💖`),
      grid);
  }

  function kartu(k) {
    const p = cariPertemuan(k.pertemuanId);
    const namaFile = `karyaku-${(p?.judul || 'gambar').toLowerCase().replace(/\s+/g, '-')}.png`;

    const bagikan = el('button', {
      class: 'btn btn--pink btn--mini',
      onclick: async () => {
        suara.klik();
        const hasil = await bagikanGambar(k.gambar, namaFile, `Karyaku: ${p?.judul || ''} 🎨`, 'Lihat hasil belajar desainku!');
        toast(hasil === 'diunduh' ? 'Gambar diunduh 📥' : hasil === 'dibagikan' ? 'Berhasil dibagikan! 💖' : 'Dibatalkan');
      },
    }, bisaBagikanFile() ? '📤 Bagikan' : '📤 Bagikan');

    const unduh = el('button', {
      class: 'btn btn--ghost btn--mini',
      onclick: () => { suara.klik(); unduhGambar(k.gambar, namaFile); toast('Gambar diunduh 📥'); },
    }, '📥 Unduh');

    const hapus = el('button', {
      class: 'ikon-hapus', 'aria-label': 'hapus karya',
      onclick: () => {
        if (!confirm('Hapus karya ini dari galeri?')) return;
        suara.salah(); hapusKarya(k.id); render();
      },
    }, '🗑️');

    return el('div', { class: 'galeri-card' }, [
      hapus,
      el('img', { class: 'galeri-img', src: k.gambar, alt: `Karya ${p?.judul || ''}`, loading: 'lazy' }),
      el('div', { class: 'galeri-meta' }, [
        el('span', { class: 'galeri-judul' }, `${p?.emoji || '🎨'} ${p?.judul || 'Karyaku'}`),
        el('span', { class: 'galeri-tanggal' }, tanggalTeks(k.waktu)),
      ]),
      el('div', { class: 'galeri-aksi' }, [bagikan, unduh]),
    ]);
  }
}

function tanggalTeks(ms) {
  try {
    return new Date(ms).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
}
