// =========================================================
// Efek suara dibuat langsung dengan Web Audio API.
// Tidak perlu file audio — jadi ringan & bisa jalan offline.
// =========================================================

import { suaraAktif } from './storage.js';

let ctx = null;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/** Mainkan satu nada lembut. */
function nada(freq, mulai, durasi, tipe = 'sine', volume = 0.18) {
  const a = ac();
  if (!a) return;
  const t0 = a.currentTime + mulai;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = tipe;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + durasi);
  osc.connect(gain).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + durasi + 0.02);
}

function boleh() {
  return suaraAktif();
}

export const suara = {
  klik() {
    if (!boleh()) return;
    nada(660, 0, 0.08, 'triangle', 0.12);
  },
  benar() {
    if (!boleh()) return;
    nada(659.25, 0, 0.12, 'sine');      // E5
    nada(783.99, 0.1, 0.18, 'sine');     // G5
  },
  salah() {
    if (!boleh()) return;
    nada(311.13, 0, 0.16, 'sine', 0.14); // Eb4
    nada(233.08, 0.12, 0.22, 'sine', 0.14);
  },
  pop() {
    if (!boleh()) return;
    nada(880, 0, 0.06, 'triangle', 0.1);
  },
  menang() {
    if (!boleh()) return;
    const melodi = [523.25, 659.25, 783.99, 1046.5]; // C-E-G-C
    melodi.forEach((f, i) => nada(f, i * 0.12, 0.22, 'sine', 0.16));
  },
};

/** Browser butuh interaksi pengguna dulu sebelum audio jalan. */
export function bangunkanAudio() {
  ac();
}
