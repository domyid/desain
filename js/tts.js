// =========================================================
// Narasi suara (text-to-speech) bahasa Indonesia, supaya anak
// yang belum lancar membaca tetap bisa mengikuti materi.
// Memakai Web Speech API bawaan browser.
// =========================================================

export function ttsTersedia() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function suaraIndonesia() {
  const daftar = window.speechSynthesis.getVoices() || [];
  return daftar.find((v) => /id[-_]?ID/i.test(v.lang)) ||
         daftar.find((v) => /indonesia/i.test(v.name)) || null;
}

/** Bacakan teks (HTML akan dibersihkan). @returns {boolean} berhasil mulai */
export function bacakan(teks) {
  if (!ttsTersedia()) return false;
  const bersih = String(teks).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!bersih) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(bersih);
  u.lang = 'id-ID';
  u.rate = 0.95;
  u.pitch = 1.15;
  const v = suaraIndonesia();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
  return true;
}

export function stopBacakan() {
  if (ttsTersedia()) window.speechSynthesis.cancel();
}

// Beberapa browser memuat daftar suara secara asinkron.
if (ttsTersedia() && typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = () => { /* memicu pemuatan suara */ };
}
