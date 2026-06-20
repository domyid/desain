// =========================================================
// Beranda — sambutan maskot + tombol mulai + ringkasan kemajuan.
// =========================================================

import { el } from '../ui.js';
import { mascotSVG } from '../mascot.js';
import { suara } from '../sound.js';
import { totalBintang, totalSelesai, daftarLencana } from '../storage.js';
import { totalPertemuan } from '../data.js';

export function viewHome() {
  const lanjutkan = totalSelesai() > 0;

  const mulai = el('button', {
    class: 'btn btn--besar btn--pink',
    onclick: () => { suara.klik(); location.hash = '#/peta'; },
  }, lanjutkan ? 'Lanjut Belajar 🚀' : 'Mulai Petualangan! 🚀');

  return el('section', { class: 'home card', style: { background: 'transparent', boxShadow: 'none', padding: '8px' } }, [
    el('div', { class: 'home__mascot mascot mascot--float', html: mascotSVG('semangat') }),
    el('h1', { class: 'home__title', html: 'Dunia Ajaib <span class="pink">Awan</span>' }),
    el('p', { class: 'home__sub' }, 'Kelas desain & menggambar yang seru ✨'),
    el('div', { class: 'home__cta' }, [mulai]),
    el('div', { class: 'home__stats' }, [
      pill('⭐', totalBintang(), 'bintang'),
      pill('📚', `${totalSelesai()}/${totalPertemuan}`, 'pertemuan'),
      pill('🏅', daftarLencana().length, 'lencana'),
    ]),
  ]);
}

function pill(ikon, nilai, label) {
  return el('div', { class: 'stat-pill' }, [
    el('span', {}, ikon),
    el('span', { class: 'big' }, String(nilai)),
    el('span', {}, label),
  ]);
}
