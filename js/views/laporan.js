// =========================================================
// Laporan untuk Orang Tua — ringkasan kemajuan belajar anak,
// nilai per pertemuan, yang perlu dilatih, dan kontrol orang tua.
// Dilindungi gerbang sederhana (soal hitung) agar tak mudah
// dibuka anak.
// =========================================================

import { el, pasang, toast } from '../ui.js';
import { suara } from '../sound.js';
import {
  namaAnak, totalSelesai, totalBintang, daftarLencana,
  streakSekarang, streakTerbaik, bintangPertemuan, sudahSelesai, terbuka, resetSemua,
} from '../storage.js';
import { jumlahKarya } from '../galeri.js';
import { pertemuan, totalPertemuan } from '../data.js';

export function viewLaporan() {
  const wadah = el('section', {});
  gerbang();
  return wadah;

  // --- Gerbang orang tua: soal hitung sederhana ---
  function gerbang() {
    const a = 3 + Math.floor(Math.random() * 7); // 3..9
    const b = 2 + Math.floor(Math.random() * 7); // 2..8
    const input = el('input', { class: 'nama-input', type: 'tel', inputmode: 'numeric', 'aria-label': 'jawaban', placeholder: '?' });
    const pesan = el('p', { class: 'gerbang__pesan' }, ' ');

    function cek() {
      if (Number(input.value) === a * b) { suara.benar(); render(); }
      else { suara.salah(); pesan.textContent = 'Coba lagi ya 🙂'; input.value = ''; input.focus(); }
    }
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') cek(); });

    pasang(wadah,
      el('div', { class: 'page-head' }, [
        el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/'; } }, '← Beranda'),
        el('div', { class: 'spacer' }),
        el('h2', {}, 'Untuk Orang Tua 📊'),
      ]),
      el('div', { class: 'card gerbang' }, [
        el('p', { class: 'gerbang__judul' }, 'Halaman ini untuk orang tua.'),
        el('p', { style: { color: '#8a8aa8', fontWeight: '700' } }, 'Jawab dulu untuk membuka:'),
        el('div', { class: 'gerbang__soal' }, `${a} × ${b} = ?`),
        input,
        el('button', { class: 'btn btn--pink', style: { marginTop: '12px' }, onclick: cek }, 'Buka 🔓'),
        pesan,
      ]),
    );
    setTimeout(() => input.focus(), 50);
  }

  // --- Isi laporan ---
  function render() {
    const nama = namaAnak() || 'Ananda';
    const selesai = totalSelesai();
    const perluLatih = pertemuan.filter((p) => sudahSelesai(p.id) && bintangPertemuan(p.id) < 3);
    const belum = pertemuan.filter((p) => !sudahSelesai(p.id));

    pasang(wadah,
      el('div', { class: 'page-head' }, [
        el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/'; } }, '← Beranda'),
        el('div', { class: 'spacer' }),
        el('h2', {}, 'Laporan Belajar 📊'),
      ]),

      el('div', { class: 'card' }, [
        el('h3', { style: { color: '#4a9fd6', marginBottom: '4px' } }, `Laporan untuk ${nama}`),
        el('p', { style: { color: '#8a8aa8', fontWeight: '700', marginBottom: '14px' } }, `Tanggal: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`),

        el('div', { class: 'laporan-ringkas' }, [
          ringkasKotak('📚', `${selesai}/${totalPertemuan}`, 'pertemuan selesai'),
          ringkasKotak('⭐', String(totalBintang()), 'total bintang'),
          ringkasKotak('🏅', String(daftarLencana().length), 'lencana'),
          ringkasKotak('🖼️', String(jumlahKarya()), 'karya'),
          ringkasKotak('🔥', String(streakSekarang()), `hari beruntun (rekor ${streakTerbaik()})`),
        ]),
      ]),

      // Tabel per pertemuan
      el('div', { class: 'card', style: { marginTop: '18px' } }, [
        el('h3', { style: { color: '#4a9fd6', marginBottom: '10px' } }, 'Rincian per Pertemuan'),
        el('div', { class: 'laporan-tabel' }, [
          baris(el('span', { class: 'th' }, 'Pertemuan'), el('span', { class: 'th' }, 'Status'), el('span', { class: 'th' }, 'Bintang'), true),
          ...pertemuan.map((p) => {
            const done = sudahSelesai(p.id);
            const bisa = terbuka(p.id);
            const status = done ? '✅ Selesai' : bisa ? '▶️ Bisa dikerjakan' : '🔒 Terkunci';
            const b = done ? '⭐'.repeat(bintangPertemuan(p.id)) + '☆'.repeat(3 - bintangPertemuan(p.id)) : '–';
            return baris(
              el('span', {}, `${p.emoji} ${p.judul}`),
              el('span', { class: done ? 'st-done' : (bisa ? 'st-open' : 'st-lock') }, status),
              el('span', {}, b),
            );
          }),
        ]),
      ]),

      // Yang perlu dilatih
      el('div', { class: 'card', style: { marginTop: '18px' } }, [
        el('h3', { style: { color: '#ff8fc0', marginBottom: '8px' } }, '💡 Saran untuk Didampingi'),
        (perluLatih.length || belum.length)
          ? el('ul', { class: 'saran-list' }, [
              ...perluLatih.map((p) => el('li', {}, `Ulangi "${p.judul}" untuk meraih 3 bintang (sekarang ${bintangPertemuan(p.id)}).`)),
              ...belum.slice(0, 2).map((p) => el('li', {}, `Ajak coba pertemuan berikutnya: "${p.judul}".`)),
            ])
          : el('p', { style: { fontWeight: '700', color: '#2a8f63' } }, 'Luar biasa! Semua pertemuan tuntas dengan nilai penuh. 🎉'),
        el('p', { class: 'tips-ortu' }, 'Tips: dampingi 15–20 menit per sesi, beri pujian pada usaha (bukan hanya hasil), dan biarkan anak memamerkan karyanya. Aktivitas menggambar paling nyaman di layar sentuh.'),
      ]),

      // Kontrol
      el('div', { class: 'card', style: { marginTop: '18px', textAlign: 'center' } }, [
        el('div', { class: 'finish__btns' }, [
          el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/galeri'; } }, '🖼️ Lihat Galeri'),
          el('button', {
            class: 'btn btn--ghost',
            onclick: () => {
              if (!confirm('Hapus SEMUA kemajuan belajar dan mulai dari awal? Tindakan ini tidak bisa dibatalkan.')) return;
              resetSemua(); toast('Kemajuan direset'); location.hash = '#/';
            },
          }, '🗑️ Reset Kemajuan'),
        ]),
      ]),
    );
  }
}

function ringkasKotak(ikon, nilai, label) {
  return el('div', { class: 'laporan-kotak' }, [
    el('span', { class: 'lk-ikon' }, ikon),
    el('span', { class: 'lk-nilai' }, nilai),
    el('span', { class: 'lk-label' }, label),
  ]);
}

function baris(c1, c2, c3, header = false) {
  return el('div', { class: 'laporan-baris' + (header ? ' is-header' : '') }, [c1, c2, c3]);
}
