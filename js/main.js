// =========================================================
// Titik masuk aplikasi: router berbasis hash + tombol suara.
// Rute:
//   #/                  -> Beranda
//   #/peta              -> Peta pertemuan
//   #/pelajaran/<id>    -> Halaman pelajaran
// =========================================================

import { pasang } from './ui.js';
import { suara, bangunkanAudio } from './sound.js';
import { suaraAktif, setSuara } from './storage.js';
import { viewHome } from './views/home.js';
import { viewMap } from './views/map.js';
import { viewLesson } from './views/lesson.js';

const app = document.getElementById('app');

function render() {
  const hash = location.hash || '#/';
  const bagian = hash.replace(/^#\//, '').split('/'); // ['', ...] atau ['peta'] dst.
  window.scrollTo({ top: 0, behavior: 'smooth' });

  let view;
  if (bagian[0] === 'peta') view = viewMap();
  else if (bagian[0] === 'pelajaran') view = viewLesson(bagian[1]);
  else view = viewHome();

  pasang(app, view);
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

// ---- Tombol suara melayang ----
const tombolSuara = document.getElementById('sound-toggle');
function perbaruiTombolSuara() {
  const aktif = suaraAktif();
  tombolSuara.textContent = aktif ? '🔊' : '🔇';
  tombolSuara.classList.toggle('is-muted', !aktif);
}
tombolSuara.addEventListener('click', () => {
  const baru = !suaraAktif();
  setSuara(baru);
  perbaruiTombolSuara();
  if (baru) { bangunkanAudio(); suara.pop(); }
});
perbaruiTombolSuara();

// Bangunkan audio pada interaksi pertama (kebijakan browser).
window.addEventListener('pointerdown', () => bangunkanAudio(), { once: true });

// Render awal bila DOMContentLoaded sudah lewat.
if (document.readyState !== 'loading') render();
