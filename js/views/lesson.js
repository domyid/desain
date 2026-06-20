// =========================================================
// Halaman Pelajaran — mesin sederhana yang menampilkan tahap:
//   belajar (slide) → kuis → aktivitas → selesai (lencana)
// =========================================================

import { el, pasang, konfeti, bintangTeks } from '../ui.js';
import { mascotSVG, renderMascot } from '../mascot.js';
import { suara } from '../sound.js';
import { cariPertemuan } from '../data.js';
import { selesaikan } from '../storage.js';
import { sceneMewarnai } from './coloring.js';
import { widgetMenggambar } from './draw.js';
import { bentukSVG, ilustrasiSVG } from './shapes.js';

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

  const state = { i: 0, benar: 0, totalKuis: p.kuis.length };

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

  function maju() { state.i++; suara.klik(); render(); }

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

    pasang(isi, el('div', { class: 'step teach' }, [
      mascotBox,
      el('h3', {}, l.judul),
      ...isiTengah,
      el('p', { class: 'teach__body', html: l.teks }),
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

      const opsi = q.pilihan.map((teks, idx) => el('button', {
        class: 'opt',
        onclick: (e) => jawab(e.currentTarget, idx, opsi, q, feedback, () => {
          ke++;
          if (ke < p.kuis.length) soalKe();
          else { state.i++; render(); }
        }, () => (terjawab ? true : (terjawab = true, false))),
      }, teks));

      pasang(isi, el('div', { class: 'step quiz' }, [
        el('h3', {}, `Kuis ${q ? ke + 1 : ''} dari ${p.kuis.length} 🧠`),
        el('p', { class: 'quiz__q' }, q.soal),
        el('div', { class: 'quiz__options' }, opsi),
        feedback,
      ]));
    }

    soalKe();
  }

  function jawab(btn, idx, opsi, q, feedback, lanjut, sudah) {
    if (sudah()) return;
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
      feedback.textContent = 'Hampir! Jawabannya yang hijau ya 💛';
      feedback.className = 'quiz__feedback bad';
      suara.salah();
    }
    setTimeout(lanjut, 1400);
  }

  // ---- Tahap: aktivitas (mewarnai) ----
  function renderAktivitas() {
    const a = p.aktivitas;

    if (a.tipe === 'menggambar') return renderMenggambar(a);

    let warnaAktif = a.palet[0];

    const svgWrap = el('div', { class: 'coloring', html: sceneMewarnai() });
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

    const selesai = el('button', { class: 'btn btn--pink', onclick: () => { konfeti(50); maju(); } }, 'Sudah Cantik! 🌟');

    pasang(isi, el('div', { class: 'step activity' }, [
      el('h3', {}, a.judul),
      el('p', { class: 'activity__hint' }, a.petunjuk),
      el('div', { class: 'palette' }, tombolPalet),
      svgWrap,
      el('div', { class: 'step-nav' }, [selesai]),
    ]));
  }

  // ---- Aktivitas: menggambar bebas di kanvas ----
  function renderMenggambar(a) {
    const selesai = el('button', { class: 'btn btn--pink', onclick: () => { konfeti(50); maju(); } }, 'Karyaku Selesai! 🌟');
    pasang(isi, el('div', { class: 'step activity' }, [
      el('h3', {}, a.judul),
      el('p', { class: 'activity__hint' }, a.petunjuk),
      widgetMenggambar(a.palet),
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

    pasang(isi, el('div', { class: 'step finish' }, [
      el('div', { class: 'finish__mascot mascot mascot--bounce', html: mascotSVG('bangga') }),
      el('h2', {}, 'Hebat! Kamu Lulus! 🎉'),
      el('div', { class: 'badge' }, [
        el('div', { class: 'badge__icon' }, p.lencana.ikon),
        el('div', { class: 'badge__name' }, p.lencana.nama),
      ]),
      el('p', { style: { fontSize: '1.15rem', fontWeight: 700 } }, `Kamu dapat lencana baru: ${p.lencana.nama}!`),
      el('div', { class: 'finish__stars' }, bintangTeks(bintang)),
      el('div', { class: 'finish__btns' }, [
        el('button', { class: 'btn btn--ghost', onclick: () => { suara.klik(); state.i = 0; state.benar = 0; render(); } }, 'Ulangi 🔁'),
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
