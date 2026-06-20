// =========================================================
// Penyimpanan "Galeri Karyaku" — menyimpan gambar hasil anak
// (sebagai data URL PNG) di localStorage, terpisah dari progres
// supaya tidak membebani data utama.
// =========================================================

const KEY = 'dunia-awan-galeri-v1';
const MAKS = 40; // batas jumlah karya tersimpan

function muat() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}

function simpan(arr) {
  try { localStorage.setItem(KEY, JSON.stringify(arr)); return true; }
  catch { return false; } // mis. kuota penuh
}

/** Daftar karya, terbaru di depan. */
export function daftarKarya() {
  return muat().slice().reverse();
}

export function jumlahKarya() {
  return muat().length;
}

/**
 * Simpan satu karya. Tahan-kuota: kalau penyimpanan gagal,
 * buang karya terlama satu per satu sampai muat.
 * @returns {string|null} id karya, atau null kalau gagal total
 */
export function tambahKarya({ pertemuanId, judul, gambar, waktu }) {
  const arr = muat();
  const item = { id: `k${waktu}-${pertemuanId}`, pertemuanId, judul, gambar, waktu };
  arr.push(item);
  while (arr.length > MAKS) arr.shift();
  while (!simpan(arr)) {
    if (arr.length <= 1) return null; // benar-benar tidak muat
    arr.shift();
  }
  return item.id;
}

export function hapusKarya(id) {
  simpan(muat().filter((k) => k.id !== id));
}
