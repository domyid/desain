// =========================================================
// Beranda — sambutan personal (pakai nama anak) + tombol mulai
// + ringkasan kemajuan.
// =========================================================

import { el, pasang } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { suara } from '../sound.js';
import {
  totalBintang, totalSelesai, daftarLencana,
  namaAnak, setNama,
} from '../storage.js';
import { jumlahKarya } from '../galeri.js';
import { totalPertemuan } from '../data.js';

export function viewHome() {
  const wadah = el('section', { class: 'home', style: { padding: '8px' } });
  render();
  return wadah;

  function render() {
    const nama = namaAnak();
    pasang(wadah,
      el('div', { class: 'home__mascot mascot mascot--float', html: mascotSVG('semangat') }),
      nama ? sapaan(nama) : el('h1', { class: 'home__title', html: 'Dunia Ajaib <span class="pink">Awan</span>' }),
      el('p', { class: 'home__sub' }, nama ? 'Yuk lanjut berpetualang di kelas desain! ✨' : 'Kelas desain & menggambar yang seru ✨'),
      nama ? bagianMulai(nama) : bagianNama(),
      nama ? statistik() : null,
    );
  }

  function sapaan(nama) {
    return el('h1', { class: 'home__title', html: `Halo, <span class="pink">${aman(nama)}</span>! 👋` });
  }

  // Tampilan pertama: minta nama anak.
  function bagianNama() {
    const input = el('input', {
      class: 'nama-input', type: 'text', maxlength: '20',
      placeholder: 'Tulis namamu di sini…', 'aria-label': 'Nama kamu',
    });
    const simpan = el('button', {
      class: 'btn btn--pink', onclick: () => {
        const v = input.value.trim();
        if (!v) { input.focus(); return; }
        suara.benar();
        setNama(v);
        render();
      },
    }, 'Ayo Mulai! 🚀');
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') simpan.click(); });

    setTimeout(() => input.focus(), 50);
    return el('div', { class: 'home__cta nama-box' }, [
      el('p', { class: 'nama-tanya' }, 'Siapa nama desainer cilik kita? 🌸'),
      input,
      simpan,
    ]);
  }

  // Sudah ada nama: tombol mulai + ganti nama.
  function bagianMulai(nama) {
    const mulai = el('button', {
      class: 'btn btn--besar btn--pink',
      onclick: () => { suara.klik(); location.hash = '#/peta'; },
    }, totalSelesai() > 0 ? 'Lanjut Belajar 🚀' : 'Mulai Petualangan! 🚀');

    const ganti = el('button', {
      class: 'tautan-ganti', type: 'button',
      onclick: () => { suara.klik(); setNama(''); render(); },
    }, `Bukan ${aman(nama)}? Ganti nama`);

    const pintasan = [];
    if (jumlahKarya() > 0) {
      pintasan.push(el('button', {
        class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/galeri'; },
      }, `🖼️ Galeri (${jumlahKarya()})`));
    }
    if (totalSelesai() >= totalPertemuan) {
      pintasan.push(el('button', {
        class: 'btn', onclick: () => { suara.klik(); location.hash = '#/sertifikat'; },
      }, '🏆 Sertifikat'));
    }

    return el('div', { class: 'home__cta' }, [
      mulai,
      pintasan.length ? el('div', { class: 'home__pintasan' }, pintasan) : null,
      el('div', {}, [ganti]),
    ]);
  }

  function statistik() {
    return el('div', { class: 'home__stats' }, [
      pill('⭐', totalBintang(), 'bintang'),
      pill('📚', `${totalSelesai()}/${totalPertemuan}`, 'pertemuan'),
      pill('🏅', daftarLencana().length, 'lencana'),
    ]);
  }
}

function pill(ikon, nilai, label) {
  return el('div', { class: 'stat-pill' }, [
    el('span', {}, ikon),
    el('span', { class: 'big' }, String(nilai)),
    el('span', {}, label),
  ]);
}

// Cegah teks nama merusak HTML.
function aman(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
