// =========================================================
// Halaman Pelajaran — mesin sederhana yang menampilkan tahap:
//   belajar (slide) → kuis → aktivitas → selesai (lencana)
// =========================================================

import { el, pasang, konfeti, bintangTeks, toast } from '../ui.js';
import { mascotSVG, renderMascot } from '../mascot.js';
import { suara } from '../sound.js';
import { bacakan, stopBacakan, ttsTersedia } from '../tts.js';
import { cariPertemuan } from '../data.js';
import { selesaikan } from '../storage.js';
import { tangkapGambar } from '../capture.js';
import { tambahKarya } from '../galeri.js';
import { bagikanGambar, unduhGambar } from '../share.js';
import { sceneMewarnai } from './coloring.js';
import { widgetMenggambar } from './draw.js';
import { widgetMantra } from './mantra.js';
import { bentukSVG, ilustrasiSVG } from './shapes.js';
import { garisSVG, polaSVG } from './decor.js';

export function viewLesson(idStr) {
  const p = cariPertemuan(idStr);
  const wadah = el('section', { class: 'lesson card' });

  if (!p || p.langkah.length === 0) {
    pasang(wadah,
      el('div', { class: 'finish' }, [
        el('div', { class: 'finish__mascot mascot', html: mascotSVG('mikir') }),
        el('h2', {}, 'Belum siap 🛠️'),
        el('p', { style: { fontSize: '1.2rem' } }, 'Pertemuan ini masih disiapkan oleh Awan. Sampai jumpa nanti, ya!'),
        el('div', { class: 'finish__btns' }, [tombolPeta()]),
      ]),
    );
    return wadah;
  }

  // ---- Susun daftar tahap ----
  const tahap = [];
  p.langkah.forEach((l) => tahap.push({ jenis: 'belajar', data: l }));
  if (p.kuis.length) tahap.push({ jenis: 'kuis' });
  if (p.aktivitas) tahap.push({ jenis: 'aktivitas' });

  const state = { i: 0, benar: 0, totalKuis: p.kuis.length, karya: null };

  // ---- Bar kemajuan ----
  const fill = el('div', { class: 'progress-fill' });
  const track = el('div', { class: 'progress-track' }, [fill]);
  const isi = el('div');

  function aturProgress() {
    const persen = (state.i / tahap.length) * 100;
    fill.style.width = persen + '%';
  }

  function render() {
    aturProgress();
    const t = tahap[state.i];
    if (!t) return renderSelesai();
    if (t.jenis === 'belajar') return renderBelajar(t.data);
    if (t.jenis === 'kuis') return renderKuis();
    if (t.jenis === 'aktivitas') return renderAktivitas();
  }

  function maju() { stopBacakan(); state.i++; suara.klik(); render(); }

  // Tombol "bacakan" materi (text-to-speech) untuk anak yang belum lancar baca.
  function tombolBacakan(teks) {
    if (!ttsTersedia()) return null;
    return el('button', {
      class: 'btn-bacakan', type: 'button', 'aria-label': 'Bacakan materi',
      onclick: (e) => { e.currentTarget.blur(); bacakan(teks); },
    }, '🔊 Bacakan');
  }

  // ---- Tahap: belajar (slide) ----
  function renderBelajar(l) {
    const mascotBox = el('div', { class: 'teach__mascot mascot mascot--float' });
    renderMascot(mascotBox, l.mood || 'senang', 'mascot--float');

    const isiTengah = [];
    if (l.tipe === 'warna' && l.contoh) {
      isiTengah.push(el('div', { class: 'swatch-row' },
        l.contoh.map((c) => el('div', { class: 'swatch', style: { background: c.warna } }, c.nama))));
    }
    if (l.tipe === 'bentuk' && l.bentuk) {
      isiTengah.push(el('div', { class: 'shape-row' }, l.bentuk.map((b) =>
        el('div', { class: 'shape-item' }, [
          el('div', { class: 'shape-box', html: bentukSVG(b.bentuk, b.warna) }),
          el('span', { class: 'shape-name' }, b.nama),
        ]))));
    }
    if (l.tipe === 'garis' && l.garis) {
      isiTengah.push(el('div', { class: 'shape-row' }, l.garis.map((b) =>
        el('div', { class: 'shape-item' }, [
          el('div', { class: 'garis-box', html: garisSVG(b.garis, b.warna) }),
          el('span', { class: 'shape-name' }, b.nama),
        ]))));
    }
    if (l.tipe === 'pola' && l.pola) {
      isiTengah.push(el('div', { class: 'shape-row' }, l.pola.map((b) =>
        el('div', { class: 'shape-item' }, [
          el('div', { class: 'shape-box', html: polaSVG(b.pola, b.warna, b.warna2) }),
          el('span', { class: 'shape-name' }, b.nama),
        ]))));
    }
    if (l.ilustrasi) {
      isiTengah.push(el('div', { class: 'ilustrasi', html: ilustrasiSVG(l.ilustrasi) }));
    }
    if (l.tipe === 'campur' && l.campuran) {
      isiTengah.push(el('div', {}, l.campuran.map((m) =>
        el('div', { class: 'mix-row' }, [
          el('div', { class: 'mix-chip', style: { background: m.a } }),
          el('span', { class: 'mix-eq' }, '+'),
          el('div', { class: 'mix-chip', style: { background: m.b } }),
          el('span', { class: 'mix-eq' }, '='),
          el('div', { class: 'mix-chip', style: { background: m.hasil } }),
          el('strong', { style: { fontSize: '1.1rem', color: '#4a4a6a' } }, m.nama),
        ]))));
    }

    const lanjut = el('button', { class: 'btn', onclick: maju },
      state.i === tahap.length - 1 ? 'Selesai 🎉' : 'Lanjut ✨');

    const bacaBtn = tombolBacakan(`${l.judul}. ${l.teks}`);

    pasang(isi, el('div', { class: 'step teach' }, [
      mascotBox,
      el('h3', {}, l.judul),
      ...isiTengah,
      el('p', { class: 'teach__body', html: l.teks }),
      bacaBtn ? el('div', { class: 'baca-baris' }, [bacaBtn]) : null,
      el('div', { class: 'step-nav' }, [lanjut]),
    ]));
  }

  // ---- Tahap: kuis ----
  function renderKuis() {
    let ke = 0;

    function soalKe() {
      const q = p.kuis[ke];
      const feedback = el('div', { class: 'quiz__feedback' }, ' ');
      let terjawab = false;
      const navBaris = el('div', { class: 'step-nav', style: { marginTop: '8px' } });
      const lanjut = () => {
        stopBacakan();
        ke++;
        if (ke < p.kuis.length) soalKe();
        else { state.i++; render(); }
      };

      const opsi = q.pilihan.map((teks, idx) => el('button', {
        class: 'opt',
        onclick: (e) => {
          if (terjawab) return;
          terjawab = true;
          jawab(e.currentTarget, idx, opsi, q, feedback, navBaris, lanjut, ke === p.kuis.length - 1);
        },
      }, teks));

      const bacaBtn = tombolBacakan(q.soal);

      pasang(isi, el('div', { class: 'step quiz' }, [
        el('div', { class: 'quiz__nomor' }, `Soal ${ke + 1} dari ${p.kuis.length} 🧠`),
        el('p', { class: 'quiz__q' }, q.soal),
        bacaBtn ? el('div', { class: 'baca-baris', style: { marginBottom: '12px' } }, [bacaBtn]) : null,
        el('div', { class: 'quiz__options' }, opsi),
        feedback,
        navBaris,
      ]));
    }

    soalKe();
  }

  function jawab(btn, idx, opsi, q, feedback, navBaris, lanjut, terakhir) {
    opsi.forEach((o) => (o.disabled = true));
    if (idx === q.benar) {
      btn.classList.add('is-correct');
      feedback.textContent = pujian();
      feedback.className = 'quiz__feedback good';
      state.benar++;
      suara.benar();
      konfeti(30);
    } else {
      btn.classList.add('is-wrong');
      opsi[q.benar].classList.add('is-correct');
      feedback.textContent = 'Belum tepat. Jawaban benar berwarna hijau 💛';
      feedback.className = 'quiz__feedback bad';
      suara.salah();
    }
    if (q.penjelasan) {
      navBaris.appendChild(el('p', { class: 'quiz__penjelasan' }, `💡 ${q.penjelasan}`));
    }
    navBaris.appendChild(el('button', { class: 'btn', onclick: lanjut },
      terakhir ? 'Lihat Hasil 🎉' : 'Lanjut →'));
  }

  // ---- Tahap: aktivitas (mewarnai) ----
  function renderAktivitas() {
    const a = p.aktivitas;

    if (a.tipe === 'menggambar') return renderMenggambar(a);
    if (a.tipe === 'mantra') return renderMantra(a);

    let warnaAktif = a.palet[0];

    const svgWrap = el('div', { class: 'coloring', html: sceneMewarnai(a.scene) });
    svgWrap.querySelectorAll('[data-region]').forEach((reg) => {
      reg.addEventListener('click', () => { reg.setAttribute('fill', warnaAktif); suara.pop(); });
    });

    const tombolPalet = a.palet.map((w, i) => {
      const b = el('button', {
        class: 'paint' + (i === 0 ? ' is-active' : ''),
        style: { background: w, ...(w === '#ffffff' ? { borderColor: '#ddd' } : {}) },
        'aria-label': 'pilih warna',
        onclick: () => {
          warnaAktif = w;
          suara.klik();
          tombolPalet.forEach((x) => x.classList.remove('is-active'));
          b.classList.add('is-active');
        },
      });
      return b;
    });

    const selesai = el('button', { class: 'btn btn--pink', onclick: () => simpanLaluMaju(svgWrap, selesai) }, 'Sudah Cantik! 🌟');

    pasang(isi, el('div', { class: 'step activity' }, [
      el('h3', {}, a.judul),
      el('p', { class: 'activity__hint' }, a.petunjuk),
      el('div', { class: 'palette' }, tombolPalet),
      svgWrap,
      el('div', { class: 'step-nav' }, [selesai]),
    ]));
  }

  // Tangkap gambar -> simpan ke galeri -> lanjut ke layar lencana.
  async function simpanLaluMaju(wadahEl, tombol) {
    if (tombol) { tombol.disabled = true; tombol.textContent = 'Menyimpan… ✨'; }
    konfeti(50);
    try {
      const url = await tangkapGambar(wadahEl);
      tambahKarya({ pertemuanId: p.id, judul: p.judul, gambar: url, waktu: Date.now() });
      state.karya = { url, namaFile: `karyaku-${slug(p.judul)}.png` };
      toast('Tersimpan di galeri! 🖼️');
    } catch {
      toast('Karya tak bisa disimpan, tapi tetap lanjut ya 😊');
    }
    maju();
  }

  // ---- Aktivitas: pembuat mantra AI (tanpa gambar tersimpan) ----
  function renderMantra(a) {
    const selesai = el('button', { class: 'btn btn--pink', onclick: () => { konfeti(40); maju(); } }, 'Selesai 🎉');
    pasang(isi, el('div', { class: 'step activity' }, [
      el('h3', {}, a.judul),
      el('p', { class: 'activity__hint' }, a.petunjuk),
      widgetMantra(a),
      el('div', { class: 'step-nav' }, [selesai]),
    ]));
  }

  // ---- Aktivitas: menggambar bebas di kanvas ----
  function renderMenggambar(a) {
    const board = widgetMenggambar(a.palet);
    const selesai = el('button', { class: 'btn btn--pink', onclick: () => simpanLaluMaju(board, selesai) }, 'Karyaku Selesai! 🌟');
    pasang(isi, el('div', { class: 'step activity' }, [
      el('h3', {}, a.judul),
      el('p', { class: 'activity__hint' }, a.petunjuk),
      board,
      el('div', { class: 'step-nav' }, [selesai]),
    ]));
  }

  // ---- Tahap: selesai + lencana ----
  function renderSelesai() {
    fill.style.width = '100%';
    const bintang = hitungBintang(state.benar, state.totalKuis);
    selesaikan(p.id, bintang, p.lencana.nama);
    suara.menang();
    konfeti(120);

    // Bagian "pamer karya": tampil bila ada karya yang tersimpan.
    let karyaBox = null;
    if (state.karya) {
      const { url, namaFile } = state.karya;
      const bagikan = el('button', {
        class: 'btn btn--pink', onclick: async () => {
          suara.klik();
          const h = await bagikanGambar(url, namaFile, `Karyaku: ${p.judul} 🎨`, 'Lihat hasil belajar desainku!');
          toast(h === 'diunduh' ? 'Gambar diunduh 📥' : h === 'dibagikan' ? 'Berhasil dibagikan! 💖' : 'Dibatalkan');
        },
      }, '📤 Pamerkan');
      const unduh = el('button', {
        class: 'btn btn--ghost', onclick: () => { suara.klik(); unduhGambar(url, namaFile); toast('Gambar diunduh 📥'); },
      }, '📥 Unduh');
      karyaBox = el('div', { class: 'karya-pamer' }, [
        el('p', { class: 'karya-pamer__judul' }, 'Lihat karyamu! Tunjukkan ke keluarga 💖'),
        el('img', { class: 'karya-pamer__img', src: url, alt: 'Karyamu' }),
        el('div', { class: 'finish__btns' }, [bagikan, unduh]),
      ]);
    }

    pasang(isi, el('div', { class: 'step finish' }, [
      el('div', { class: 'finish__mascot mascot mascot--bounce', html: mascotSVG('bangga') }),
      el('h2', {}, 'Hebat! Kamu Lulus! 🎉'),
      el('div', { class: 'badge' }, [
        el('div', { class: 'badge__icon' }, p.lencana.ikon),
        el('div', { class: 'badge__name' }, p.lencana.nama),
      ]),
      el('p', { style: { fontSize: '1.15rem', fontWeight: 700 } }, `Kamu dapat lencana baru: ${p.lencana.nama}!`),
      el('div', { class: 'finish__stars' }, bintangTeks(bintang)),
      karyaBox,
      el('div', { class: 'finish__btns' }, [
        el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); state.i = 0; state.benar = 0; state.karya = null; render(); } }, 'Ulangi 🔁'),
        state.karya ? el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/galeri'; } }, '🖼️ Galeri') : null,
        tombolPeta('Lanjut ke Peta →', 'btn btn--pink'),
      ]),
    ]));
  }

  // ---- Rangka halaman ----
  const judul = el('div', { class: 'page-head' }, [
    el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); location.hash = '#/peta'; } }, '← Peta'),
    el('div', { class: 'spacer' }),
    el('h2', {}, `${p.emoji} ${p.judul}`),
  ]);

  pasang(wadah, judul, track, isi);
  render();
  return wadah;
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hitungBintang(benar, total) {
  if (!total) return 3;
  const r = benar / total;
  if (r >= 0.99) return 3;
  if (r >= 0.6) return 2;
  return 1;
}

function pujian() {
  const p = ['Benar! Hebat! 🎉', 'Keren sekali! ✨', 'Pintar! 💖', 'Yeay, tepat! 🌟', 'Wow, jago! 🚀'];
  return p[Math.floor((Date.now() / 1000) % p.length)];
}

function tombolPeta(teks = '← Kembali ke Peta', kelas = 'btn') {
  return el('button', { class: kelas, onclick: () => { suara.klik(); location.hash = '#/peta'; } }, teks);
}
