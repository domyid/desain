// =========================================================
// Penyimpanan kemajuan belajar di localStorage.
// Menyimpan: pertemuan selesai, jumlah bintang, lencana.
// =========================================================

const KEY = 'dunia-awan-v1';

const kosong = () => ({ selesai: [], bintang: {}, lencana: [], suara: true, nama: '', streak: 0, streakBest: 0, lastTanggal: '' });

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

export function namaAnak() {
  return (muat().nama || '').trim();
}

export function setNama(nama) {
  const data = muat();
  data.nama = String(nama || '').slice(0, 20);
  return simpan(data);
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

// ---- Streak harian ----
function tanggalHariIni() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function selisihHari(a, b) {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const ms = Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad);
  return Math.round(ms / 86400000);
}

/**
 * Catat kunjungan hari ini & perbarui streak.
 * @returns {{streak:number, naik:boolean}} naik=true bila streak bertambah hari ini
 */
export function catatStreak() {
  const data = muat();
  const hari = tanggalHariIni();
  if (data.lastTanggal === hari) {
    return { streak: data.streak || 1, naik: false };
  }
  const beda = data.lastTanggal ? selisihHari(data.lastTanggal, hari) : null;
  if (beda === 1) data.streak = (data.streak || 0) + 1; // lanjut dari kemarin
  else data.streak = 1;                                  // mulai/ulang dari hari ini
  data.lastTanggal = hari;
  data.streakBest = Math.max(data.streakBest || 0, data.streak);
  simpan(data);
  return { streak: data.streak, naik: true };
}

export function streakSekarang() {
  return muat().streak || 0;
}

export function streakTerbaik() {
  return muat().streakBest || 0;
}
