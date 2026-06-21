// =========================================================
// Titik masuk aplikasi: router berbasis hash + tombol suara.
// Rute:
//   #/                  -> Beranda
//   #/peta              -> Peta pertemuan
//   #/pelajaran/<id>    -> Halaman pelajaran
// =========================================================

import { pasang } from './ui.js';
import { suara, bangunkanAudio } from './sound.js';
import { suaraAktif, setSuara, catatStreak } from './storage.js';
import { stopBacakan } from './tts.js';
import { viewHome } from './views/home.js';
import { viewMap } from './views/map.js';
import { viewLesson } from './views/lesson.js';
import { viewGaleri } from './views/galeri.js';
import { viewSertifikat } from './views/sertifikat.js';
import { viewLaporan } from './views/laporan.js';

const app = document.getElementById('app');

// Catat kehadiran hari ini untuk streak (sekali saat aplikasi dibuka).
catatStreak();

function render() {
  const hash = location.hash || '#/';
  const bagian = hash.replace(/^#\//, '').split('/'); // ['', ...] atau ['peta'] dst.
  window.scrollTo({ top: 0, behavior: 'smooth' });
  stopBacakan(); // hentikan narasi halaman sebelumnya

  let view;
  if (bagian[0] === 'peta') view = viewMap();
  else if (bagian[0] === 'pelajaran') view = viewLesson(bagian[1]);
  else if (bagian[0] === 'galeri') view = viewGaleri();
  else if (bagian[0] === 'sertifikat') view = viewSertifikat();
  else if (bagian[0] === 'laporan') view = viewLaporan();
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

// ---- PWA: service worker + tombol pasang ----
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); });
}

let promptPasang = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptPasang = e;
  let tombol = document.getElementById('install-btn');
  if (!tombol) {
    tombol = document.createElement('button');
    tombol.id = 'install-btn';
    tombol.className = 'install-btn';
    tombol.textContent = '📲 Pasang Aplikasi';
    tombol.addEventListener('click', async () => {
      if (!promptPasang) return;
      promptPasang.prompt();
      await promptPasang.userChoice;
      promptPasang = null;
      tombol.remove();
    });
    document.body.appendChild(tombol);
  }
});
window.addEventListener('appinstalled', () => {
  promptPasang = null;
  document.getElementById('install-btn')?.remove();
});

// Render awal bila DOMContentLoaded sudah lewat.
if (document.readyState !== 'loading') render();
