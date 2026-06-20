// =========================================================
// Kurikulum "Dunia Ajaib Awan" — kelas desain untuk anak.
// 8 pertemuan. Pertemuan 1 lengkap; sisanya kerangka siap diisi.
//
// Cara menambah materi: tinggal isi `langkah`, `kuis`, dan
// `aktivitas` pada pertemuan berikutnya dengan pola yang sama.
// =========================================================

export const pertemuan = [
  {
    id: 1,
    judul: 'Dunia Warna',
    emoji: '🌈',
    tag: 'Mengenal warna',
    warna: '#7ec8f3',
    lencana: { ikon: '🎨', nama: 'Ahli Warna' },

    // Langkah belajar (slide). Tipe: 'teks' atau 'warna' (pakai contoh warna).
    langkah: [
      {
        tipe: 'teks',
        mood: 'semangat',
        judul: 'Halo, Sahabat Desainer!',
        teks: 'Aku <strong>Awan</strong>! Hari ini kita masuk ke <strong>Dunia Warna</strong>. Di dunia desain, warna itu seperti <strong>sihir</strong> — bisa membuat gambar jadi hidup dan punya perasaan. Yuk mulai! 💫',
      },
      {
        tipe: 'warna',
        mood: 'senang',
        judul: '3 Warna Utama',
        teks: 'Ada 3 warna <strong>utama</strong> (disebut warna primer): <strong>Merah, Kuning, dan Biru</strong>. Dari tiga warna ajaib ini, kita bisa membuat hampir semua warna lain!',
        contoh: [
          { warna: '#ff5a5a', nama: 'Merah' },
          { warna: '#ffd93b', nama: 'Kuning' },
          { warna: '#4a9fd6', nama: 'Biru' },
        ],
      },
      {
        tipe: 'campur',
        mood: 'mikir',
        judul: 'Mencampur Warna',
        teks: 'Kalau dua warna utama dicampur, lahir warna baru! Coba lihat keajaibannya:',
        campuran: [
          { a: '#4a9fd6', b: '#ffd93b', hasil: '#5fcf80', nama: 'Hijau' },
          { a: '#ff5a5a', b: '#ffd93b', hasil: '#ff9f43', nama: 'Oranye' },
          { a: '#ff5a5a', b: '#4a9fd6', hasil: '#a96fd0', nama: 'Ungu' },
        ],
      },
      {
        tipe: 'warna',
        mood: 'senang',
        judul: 'Warna Hangat & Sejuk',
        teks: 'Warna <strong>hangat</strong> (merah, oranye, kuning) terasa seperti <strong>matahari & api</strong> ☀️. Warna <strong>sejuk</strong> (biru, hijau, ungu) terasa seperti <strong>air & es</strong> 🧊.',
        contoh: [
          { warna: '#ff7043', nama: 'Hangat' },
          { warna: '#ffb74d', nama: 'Hangat' },
          { warna: '#4fc3f7', nama: 'Sejuk' },
          { warna: '#81c784', nama: 'Sejuk' },
        ],
      },
      {
        tipe: 'teks',
        mood: 'bangga',
        judul: 'Warna Punya Perasaan',
        teks: 'Hebatnya, warna bisa membuat kita <strong>merasa</strong> sesuatu! Kuning bikin <strong>ceria</strong> 😄, biru bikin <strong>tenang</strong> 😌, merah bikin <strong>bersemangat</strong> 🔥. Desainer memilih warna sesuai perasaan yang ingin disampaikan.',
      },
    ],

    // Kuis pilihan ganda. `benar` = indeks jawaban benar.
    kuis: [
      {
        soal: 'Biru dicampur Kuning jadi warna apa?',
        pilihan: ['Hijau', 'Ungu', 'Cokelat'],
        benar: 0,
      },
      {
        soal: 'Mana yang termasuk warna hangat?',
        pilihan: ['Biru', 'Oranye', 'Ungu'],
        benar: 1,
      },
      {
        soal: 'Ada berapa jumlah warna utama (primer)?',
        pilihan: ['2', '3', '5'],
        benar: 1,
      },
      {
        soal: 'Warna yang membuat tenang seperti langit dan laut?',
        pilihan: ['Merah', 'Kuning', 'Biru'],
        benar: 2,
      },
    ],

    // Aktivitas kreatif: mewarnai pemandangan.
    aktivitas: {
      tipe: 'mewarnai',
      judul: 'Ayo Warnai Taman Awan!',
      petunjuk: 'Pilih warna di atas, lalu ketuk bagian gambar untuk mewarnainya. 🖌️',
      palet: ['#4fc3f7', '#5fcf80', '#ffd93b', '#ff7aa8', '#ff9f43', '#a96fd0', '#ffffff', '#7a5230'],
    },
  },

  // -------- Pertemuan berikutnya (terkunci, kerangka siap diisi) --------
  { id: 2, judul: 'Dunia Bentuk', emoji: '🔷', tag: 'Bentuk dasar', warna: '#ffb6d5',
    lencana: { ikon: '⭐', nama: 'Penjelajah Bentuk' }, langkah: [], kuis: [], aktivitas: null },
  { id: 3, judul: 'Dunia Garis', emoji: '✏️', tag: 'Garis & goresan', warna: '#b8f0d8',
    lencana: { ikon: '✏️', nama: 'Tukang Garis' }, langkah: [], kuis: [], aktivitas: null },
  { id: 4, judul: 'Dunia Pola', emoji: '🌸', tag: 'Pola & motif', warna: '#ffe39b',
    lencana: { ikon: '🌸', nama: 'Pencipta Pola' }, langkah: [], kuis: [], aktivitas: null },
  { id: 5, judul: 'Dunia Karakter', emoji: '🐶', tag: 'Membuat tokoh', warna: '#d3b8f5',
    lencana: { ikon: '🐶', nama: 'Perancang Karakter' }, langkah: [], kuis: [], aktivitas: null },
  { id: 6, judul: 'Dunia Latar', emoji: '🏰', tag: 'Latar & suasana', warna: '#9fd8ef',
    lencana: { ikon: '🏰', nama: 'Pembangun Dunia' }, langkah: [], kuis: [], aktivitas: null },
  { id: 7, judul: 'Dunia Cerita', emoji: '📖', tag: 'Bercerita lewat gambar', warna: '#ffc6a8',
    lencana: { ikon: '📖', nama: 'Pendongeng Gambar' }, langkah: [], kuis: [], aktivitas: null },
  { id: 8, judul: 'Pameran Karya', emoji: '🎉', tag: 'Pamerkan hasilmu', warna: '#ff9fc4',
    lencana: { ikon: '🏆', nama: 'Desainer Hebat' }, langkah: [], kuis: [], aktivitas: null },
];

export function cariPertemuan(id) {
  return pertemuan.find((p) => p.id === Number(id));
}

export const totalPertemuan = pertemuan.length;
