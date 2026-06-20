// =========================================================
// Halaman Sertifikat — tampil bila semua pertemuan selesai.
// Menampilkan pratinjau sertifikat + tombol Unduh & Bagikan.
// =========================================================

import { el, pasang, toast, konfeti } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { suara } from '../sound.js';
import { totalBintang, totalSelesai, daftarLencana, namaAnak } from '../storage.js';
import { totalPertemuan } from '../data.js';
import { buatSertifikatURL } from '../sertifikat.js';
import { bagikanGambar, unduhGambar } from '../share.js';

export function viewSertifikat() {
  const wadah = el('section', {});
  const kepala = el('div', { class: 'page-head' }, [
    el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/'; } }, '← Beranda'),
    el('div', { class: 'spacer' }),
    el('h2', {}, 'Sertifikat 🏆'),
  ]);

  const selesai = totalSelesai();
  if (selesai < totalPertemuan) {
    pasang(wadah, kepala, el('div', { class: 'card', style: { textAlign: 'center' } }, [
      el('div', { class: 'mascot', style: { width: '150px', margin: '0 auto 8px' }, html: mascotSVG('semangat') }),
      el('h3', { style: { color: '#4a9fd6' } }, 'Sedikit lagi! 🔒'),
      el('p', { style: { fontSize: '1.15rem', fontWeight: '700' } },
        `Selesaikan semua ${totalPertemuan} pertemuan untuk mendapat sertifikat Desainer Hebat. Kamu sudah menyelesaikan ${selesai} dari ${totalPertemuan}!`),
      el('button', { class: 'btn btn--pink', style: { marginTop: '14px' }, onclick: () => { suara.klik(); location.hash = '#/peta'; } }, 'Lanjut Belajar 🚀'),
    ]));
    return wadah;
  }

  const kotak = el('div', { class: 'card', style: { textAlign: 'center' } }, [
    el('div', { class: 'mascot', style: { width: '120px', margin: '0 auto' }, html: mascotSVG('bangga') }),
    el('p', { style: { fontSize: '1.1rem', fontWeight: '700', color: '#8a8aa8' } }, 'Menyiapkan sertifikatmu… ✨'),
  ]);
  pasang(wadah, kepala, kotak);

  const nama = namaAnak() || 'Sahabat Desainer';
  const tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  buatSertifikatURL(nama, { bintang: totalBintang(), lencana: daftarLencana().length, tanggal })
    .then((url) => {
      suara.menang();
      konfeti(120);
      const namaFile = `sertifikat-${nama.toLowerCase().replace(/\s+/g, '-')}.png`;
      pasang(kotak,
        el('h3', { style: { color: '#ff8fc0', fontSize: '1.6rem' } }, `Selamat, ${nama}! 🎉`),
        el('img', { class: 'sertifikat-img', src: url, alt: 'Sertifikat kelulusan' }),
        el('div', { class: 'finish__btns' }, [
          el('button', {
            class: 'btn btn--pink',
            onclick: async () => {
              suara.klik();
              const h = await bagikanGambar(url, namaFile, 'Sertifikat Desainer Hebat 🏆', `${nama} lulus kelas desain!`);
              toast(h === 'diunduh' ? 'Sertifikat diunduh 📥' : h === 'dibagikan' ? 'Berhasil dibagikan! 💖' : 'Dibatalkan');
            },
          }, '📤 Bagikan'),
          el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); unduhGambar(url, namaFile); toast('Sertifikat diunduh 📥'); } }, '📥 Unduh'),
        ]),
      );
    })
    .catch(() => {
      pasang(kotak, el('p', { style: { fontWeight: '700' } }, 'Maaf, sertifikat gagal dibuat. Coba lagi ya.'));
    });

  return wadah;
}
