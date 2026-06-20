// =========================================================
// Penyimpanan kemajuan belajar di localStorage.
// Menyimpan: pertemuan selesai, jumlah bintang, lencana.
// =========================================================

const KEY = 'dunia-awan-v1';

const kosong = () => ({ selesai: [], bintang: {}, lencana: [], suara: true });

export function muat() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return data && typeof data === 'object' ? { ...kosong(), ...data } : kosong();
  } catch {
    return kosong();
  }
}

function simpan(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* mode privat: abaikan */ }
  return data;
}

export function sudahSelesai(id) {
  return muat().selesai.includes(id);
}

/** Pertemuan terbuka kalau pertemuan pertama, atau pertemuan sebelumnya sudah selesai. */
export function terbuka(id) {
  if (id === 1) return true;
  return muat().selesai.includes(id - 1);
}

export function bintangPertemuan(id) {
  return muat().bintang[id] || 0;
}

/** Tandai pertemuan selesai. Menyimpan bintang terbaik + lencana. */
export function selesaikan(id, bintang, namaLencana) {
  const data = muat();
  if (!data.selesai.includes(id)) data.selesai.push(id);
  data.bintang[id] = Math.max(data.bintang[id] || 0, bintang);
  if (namaLencana && !data.lencana.includes(namaLencana)) data.lencana.push(namaLencana);
  return simpan(data);
}

export function totalBintang() {
  const b = muat().bintang;
  return Object.values(b).reduce((a, n) => a + n, 0);
}

export function totalSelesai() {
  return muat().selesai.length;
}

export function daftarLencana() {
  return muat().lencana;
}

export function suaraAktif() {
  return muat().suara !== false;
}

export function setSuara(aktif) {
  const data = muat();
  data.suara = !!aktif;
  return simpan(data);
}

/** Hapus semua kemajuan (untuk tombol "mulai ulang" orang tua). */
export function resetSemua() {
  simpan(kosong());
}
