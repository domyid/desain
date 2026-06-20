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

  {
    id: 2,
    judul: 'Dunia Bentuk',
    emoji: '🔷',
    tag: 'Bentuk dasar',
    warna: '#ffb6d5',
    lencana: { ikon: '⭐', nama: 'Penjelajah Bentuk' },

    langkah: [
      {
        tipe: 'teks',
        mood: 'semangat',
        judul: 'Masuk ke Dunia Bentuk!',
        teks: 'Tahukah kamu? <strong>Semua gambar</strong> tersusun dari bentuk-bentuk sederhana. Kalau kita tahu bentuk dasar, kita bisa menggambar <strong>apa saja</strong>! Yuk berkenalan dengan mereka. 🔷',
      },
      {
        tipe: 'bentuk',
        mood: 'senang',
        judul: 'Bentuk Dasar',
        teks: 'Ini tiga bentuk paling sering dipakai. Coba sebutkan namanya bersama Awan!',
        bentuk: [
          { bentuk: 'lingkaran', warna: '#4fc3f7', nama: 'Lingkaran' },
          { bentuk: 'persegi', warna: '#5fcf80', nama: 'Persegi' },
          { bentuk: 'segitiga', warna: '#ffb74d', nama: 'Segitiga' },
        ],
      },
      {
        tipe: 'teks',
        mood: 'mikir',
        judul: 'Bentuk Ada di Mana-mana',
        teks: 'Coba lihat sekelilingmu! 🎡 Roda itu <strong>lingkaran</strong>, jendela itu <strong>persegi</strong>, dan atap rumah itu <strong>segitiga</strong>. Bentuk bersembunyi di banyak benda!',
      },
      {
        tipe: 'bentuk',
        mood: 'semangat',
        judul: 'Menggabungkan Bentuk',
        teks: 'Sihir desain: gabungkan bentuk jadi gambar baru! <strong>Segitiga + persegi = rumah</strong> 🏠. Bentuk-bentuk kecil bekerja sama.',
        ilustrasi: 'rumah',
      },
      {
        tipe: 'teks',
        mood: 'bangga',
        judul: 'Kamu Hampir Jago!',
        teks: 'Sekarang kamu tahu rahasianya: untuk menggambar sesuatu yang sulit, pecah dulu jadi <strong>bentuk-bentuk sederhana</strong>. Ayo buktikan di kuis & gambar! ✨',
      },
    ],

    kuis: [
      { soal: 'Bentuk yang bulat tanpa sudut?', pilihan: ['Segitiga', 'Lingkaran', 'Persegi'], benar: 1 },
      { soal: 'Atap rumah biasanya berbentuk?', pilihan: ['Lingkaran', 'Persegi', 'Segitiga'], benar: 2 },
      { soal: 'Berapa jumlah sisi persegi?', pilihan: ['3', '4', '5'], benar: 1 },
      { soal: 'Bola dan roda berbentuk seperti?', pilihan: ['Lingkaran', 'Segitiga', 'Persegi'], benar: 0 },
    ],

    aktivitas: {
      tipe: 'menggambar',
      judul: 'Gambar Rumah Impianmu! 🏠',
      petunjuk: 'Pakai persegi, segitiga, dan lingkaran untuk menggambar rumah, pohon, atau apa pun yang kamu suka. Pilih warna & ukuran kuas, lalu coret di kanvas!',
      palet: ['#4fc3f7', '#5fcf80', '#ffd93b', '#ff7aa8', '#ff9f43', '#a96fd0', '#4a4a6a', '#ffffff'],
    },
  },
  {
    id: 3,
    judul: 'Dunia Garis',
    emoji: '✏️',
    tag: 'Garis & goresan',
    warna: '#b8f0d8',
    lencana: { ikon: '✏️', nama: 'Tukang Garis' },
    langkah: [
      { tipe: 'teks', mood: 'semangat', judul: 'Selamat Datang di Dunia Garis!',
        teks: 'Setiap gambar dimulai dari sebuah <strong>garis</strong>. Garis adalah jejak yang ditinggalkan pensilmu saat berjalan. Yuk kenali macam-macam garis! ✏️' },
      { tipe: 'garis', mood: 'senang', judul: 'Macam-Macam Garis',
        teks: 'Ada garis <strong>lurus</strong>, <strong>lengkung</strong>, dan <strong>zigzag</strong>. Masing-masing punya rasa berbeda!',
        garis: [
          { garis: 'lurus', warna: '#4a9fd6', nama: 'Lurus' },
          { garis: 'lengkung', warna: '#5fcf80', nama: 'Lengkung' },
          { garis: 'zigzag', warna: '#ff9f43', nama: 'Zigzag' },
        ] },
      { tipe: 'garis', mood: 'mikir', judul: 'Garis Punya Perasaan',
        teks: 'Garis <strong>lurus</strong> terasa tenang & kuat. Garis <strong>lengkung</strong> terasa lembut & ceria. Garis <strong>zigzag</strong> terasa seru & bersemangat!',
        garis: [
          { garis: 'tebal', warna: '#a96fd0', nama: 'Tebal = berani' },
          { garis: 'putus', warna: '#7ec8f3', nama: 'Putus-putus = lembut' },
        ] },
      { tipe: 'teks', mood: 'bangga', judul: 'Garis Membangun Gambar',
        teks: 'Gabungkan banyak garis, jadilah gambar! Rambut keriting dari garis lengkung, gunung dari garis zigzag, pagar dari garis lurus. Sekarang giliranmu bereksperimen! 🌟' },
    ],
    kuis: [
      { soal: 'Garis yang naik-turun tajam seperti gigi gergaji disebut?', pilihan: ['Lurus', 'Zigzag', 'Lengkung'], benar: 1 },
      { soal: 'Untuk menggambar rambut keriting, garis apa yang cocok?', pilihan: ['Lengkung', 'Lurus', 'Putus-putus'], benar: 0 },
      { soal: 'Garis yang terasa paling tenang dan kuat adalah?', pilihan: ['Zigzag', 'Lurus', 'Spiral'], benar: 1 },
    ],
    aktivitas: { tipe: 'menggambar', judul: 'Bermain dengan Garis! ✏️',
      petunjuk: 'Coba gambar pakai bermacam garis: lurus, lengkung, dan zigzag. Buat ombak, gunung, atau apa pun yang kamu mau!',
      palet: ['#4a9fd6', '#5fcf80', '#ff9f43', '#a96fd0', '#ff7aa8', '#4a4a6a', '#ffd93b', '#ffffff'] },
  },

  {
    id: 4,
    judul: 'Dunia Pola',
    emoji: '🌸',
    tag: 'Pola & motif',
    warna: '#ffe39b',
    lencana: { ikon: '🌸', nama: 'Pencipta Pola' },
    langkah: [
      { tipe: 'teks', mood: 'semangat', judul: 'Masuk ke Dunia Pola!',
        teks: 'Pola adalah gambar yang <strong>berulang</strong> lagi dan lagi. Pola ada di baju, selimut, ubin, dan banyak benda. Pola membuat sesuatu terlihat rapi dan cantik! 🌸' },
      { tipe: 'pola', mood: 'senang', judul: 'Contoh Pola',
        teks: 'Lihat, motif kecil yang diulang membentuk pola yang indah:',
        pola: [
          { pola: 'titik', warna: '#ff7aa8', nama: 'Titik' },
          { pola: 'garis', warna: '#7ec8f3', nama: 'Garis' },
          { pola: 'bunga', warna: '#ff9f43', warna2: '#ffe39b', nama: 'Bunga' },
        ] },
      { tipe: 'pola', mood: 'mikir', judul: 'Pola dari Apa Saja',
        teks: 'Kamu bisa membuat pola dari bentuk apa pun — bahkan dari <strong>hati</strong>! Rahasianya: ulangi dengan jarak yang sama. 💕',
        pola: [
          { pola: 'hati', warna: '#ff7aa8', warna2: '#ffb6d5', nama: 'Hati' },
        ] },
      { tipe: 'teks', mood: 'bangga', judul: 'Kamu Pencipta Pola!',
        teks: 'Pilih satu motif kesukaanmu, lalu ulangi. Itulah cara desainer membuat motif baju dan kertas kado. Ayo coba buat polamu sendiri! ✨' },
    ],
    kuis: [
      { soal: 'Pola adalah gambar yang...', pilihan: ['Berulang', 'Sekali saja', 'Berantakan'], benar: 0 },
      { soal: 'Supaya pola rapi, jaraknya sebaiknya?', pilihan: ['Acak', 'Sama', 'Makin jauh'], benar: 1 },
      { soal: 'Mana yang biasanya punya pola?', pilihan: ['Batu kerikil', 'Kain batik', 'Air'], benar: 1 },
    ],
    aktivitas: { tipe: 'menggambar', judul: 'Buat Polamu Sendiri! 🌸',
      petunjuk: 'Pilih satu bentuk kecil (titik, bunga, atau hati), lalu ulangi di seluruh kanvas. Jadikan pola kertas kado yang cantik!',
      palet: ['#ff7aa8', '#ffb6d5', '#7ec8f3', '#5fcf80', '#ff9f43', '#ffd93b', '#a96fd0', '#ffffff'] },
  },

  {
    id: 5,
    judul: 'Dunia Karakter',
    emoji: '🐶',
    tag: 'Membuat tokoh',
    warna: '#d3b8f5',
    lencana: { ikon: '🐶', nama: 'Perancang Karakter' },
    langkah: [
      { tipe: 'teks', mood: 'semangat', judul: 'Ayo Buat Karakter!',
        teks: 'Karakter adalah <strong>tokoh</strong> dalam gambar kita — bisa hewan, manusia, atau makhluk ajaib. Kabar baiknya: karakter juga dibuat dari <strong>bentuk sederhana</strong>! 🐶' },
      { tipe: 'bentuk', mood: 'senang', judul: 'Mulai dari Bentuk',
        teks: 'Wajah bulat dari <strong>lingkaran</strong>, telinga dari <strong>segitiga</strong>. Gabungkan, jadilah kepala karakter!',
        bentuk: [
          { bentuk: 'lingkaran', warna: '#ffd1a8', nama: 'Wajah' },
          { bentuk: 'segitiga', warna: '#ff9fb6', nama: 'Telinga' },
        ] },
      { tipe: 'teks', mood: 'mikir', judul: 'Mata Membuatnya Hidup',
        teks: 'Rahasia karakter lucu ada di <strong>mata besar</strong> dan <strong>pipi merona</strong>! Senyum kecil bikin karakter terlihat ramah. 😊',
        ilustrasi: 'karakter' },
      { tipe: 'teks', mood: 'bangga', judul: 'Karaktermu, Aturanmu!',
        teks: 'Karakter buatanmu bebas berwarna apa saja — kucing ungu, anjing biru, semua boleh! Yuk wujudkan karakter impianmu. 🌈' },
    ],
    kuis: [
      { soal: 'Karakter biasanya dimulai dari bentuk apa untuk wajahnya?', pilihan: ['Lingkaran', 'Zigzag', 'Garis lurus'], benar: 0 },
      { soal: 'Apa yang membuat karakter terlihat lucu & hidup?', pilihan: ['Mata besar', 'Tidak ada wajah', 'Warna abu-abu'], benar: 0 },
      { soal: 'Warna karakter ciptaanmu boleh...', pilihan: ['Hanya hitam', 'Apa saja sesukamu', 'Tidak boleh berwarna'], benar: 1 },
    ],
    aktivitas: { tipe: 'mewarnai', scene: 'karakter', judul: 'Warnai Si Burung Hantu! 🦉',
      petunjuk: 'Beri warna pada karakter burung hantu ini sesukamu. Pilih warna lalu ketuk bagian gambar!',
      palet: ['#ffb74d', '#a96fd0', '#7ec8f3', '#5fcf80', '#ff7aa8', '#ffd93b', '#b07a4f', '#ffffff'] },
  },

  {
    id: 6,
    judul: 'Dunia Latar',
    emoji: '🏰',
    tag: 'Latar & suasana',
    warna: '#9fd8ef',
    lencana: { ikon: '🏰', nama: 'Pembangun Dunia' },
    langkah: [
      { tipe: 'teks', mood: 'semangat', judul: 'Bangun Dunia di Belakang!',
        teks: 'Latar adalah <strong>pemandangan di belakang</strong> karakter — langit, gunung, rumah, atau kastil. Latar memberi tahu kita: cerita ini terjadi di mana? 🏰' },
      { tipe: 'teks', mood: 'senang', judul: 'Jauh & Dekat',
        teks: 'Benda yang <strong>jauh</strong> digambar kecil di atas; yang <strong>dekat</strong> digambar besar di bawah. Itulah cara membuat gambar terasa luas!',
        ilustrasi: 'pemandangan' },
      { tipe: 'warna', mood: 'mikir', judul: 'Warna Menentukan Suasana',
        teks: 'Latar <strong>biru muda</strong> = siang cerah ☀️. Latar <strong>ungu gelap</strong> = malam misterius 🌙. Warna latar membuat perasaan cerita!',
        contoh: [
          { warna: '#bfe9ff', nama: 'Siang' },
          { warna: '#ffd6a8', nama: 'Senja' },
          { warna: '#5b4b8a', nama: 'Malam' },
        ] },
      { tipe: 'teks', mood: 'bangga', judul: 'Dunia Ajaibmu',
        teks: 'Sekarang kamu bisa membangun dunia untuk karaktermu! Mau kastil di awan, atau rumah di hutan? Kamu yang menentukan! ✨' },
    ],
    kuis: [
      { soal: 'Latar berguna untuk menunjukkan...', pilihan: ['Di mana cerita terjadi', 'Tidak ada gunanya', 'Warna favorit'], benar: 0 },
      { soal: 'Benda yang jauh sebaiknya digambar...', pilihan: ['Besar', 'Kecil', 'Sama besar'], benar: 1 },
      { soal: 'Latar warna ungu gelap cocok untuk suasana?', pilihan: ['Siang cerah', 'Malam', 'Pantai'], benar: 1 },
    ],
    aktivitas: { tipe: 'mewarnai', scene: 'kastil', judul: 'Warnai Kastil Ajaib! 🏰',
      petunjuk: 'Beri warna pada kastil dan langitnya. Mau suasana siang atau malam? Kamu yang pilih!',
      palet: ['#bfe9ff', '#5b4b8a', '#ff7aa8', '#ffd93b', '#a96fd0', '#5fcf80', '#b07a4f', '#ffffff'] },
  },

  {
    id: 7,
    judul: 'Dunia Cerita',
    emoji: '📖',
    tag: 'Bercerita lewat gambar',
    warna: '#ffc6a8',
    lencana: { ikon: '📖', nama: 'Pendongeng Gambar' },
    langkah: [
      { tipe: 'teks', mood: 'semangat', judul: 'Gambar Bisa Bercerita!',
        teks: 'Desainer hebat tidak cuma menggambar — mereka <strong>bercerita</strong>. Satu gambar bisa menyimpan sebuah kisah. 📖' },
      { tipe: 'teks', mood: 'senang', judul: 'Awal, Tengah, Akhir',
        teks: 'Setiap cerita punya 3 bagian: <strong>awal</strong> (mulai), <strong>tengah</strong> (kejadian), dan <strong>akhir</strong> (selesai). Lihat kisah biji tumbuh jadi bunga:',
        ilustrasi: 'cerita' },
      { tipe: 'teks', mood: 'mikir', judul: 'Gabungkan Semua Ilmumu',
        teks: 'Sekarang kamu punya semuanya: <strong>warna</strong>, <strong>bentuk</strong>, <strong>garis</strong>, <strong>karakter</strong>, dan <strong>latar</strong>. Gabungkan jadi satu gambar bercerita! 🎨' },
      { tipe: 'teks', mood: 'bangga', judul: 'Kamu Pendongeng!',
        teks: 'Pikirkan: siapa tokohnya? Di mana? Apa yang terjadi? Lalu gambarkan. Cerita sederhana pun bisa sangat berkesan. ✨' },
    ],
    kuis: [
      { soal: 'Tiga bagian cerita adalah awal, tengah, dan...', pilihan: ['Akhir', 'Warna', 'Garis'], benar: 0 },
      { soal: 'Untuk membuat gambar bercerita, kita gabungkan?', pilihan: ['Karakter & latar', 'Hanya satu warna', 'Tidak ada apa-apa'], benar: 0 },
      { soal: 'Bagian yang menunjukkan cerita "selesai" adalah?', pilihan: ['Awal', 'Tengah', 'Akhir'], benar: 2 },
    ],
    aktivitas: { tipe: 'menggambar', judul: 'Gambar Ceritamu! 📖',
      petunjuk: 'Gambar satu adegan cerita: ada tokoh, ada latar, ada sesuatu yang terjadi. Ceritakan kisahmu lewat gambar!',
      palet: ['#7ec8f3', '#5fcf80', '#ffd93b', '#ff7aa8', '#ff9f43', '#a96fd0', '#4a4a6a', '#ffffff'] },
  },

  {
    id: 8,
    judul: 'Pameran Karya',
    emoji: '🎉',
    tag: 'Pamerkan hasilmu',
    warna: '#ff9fc4',
    lencana: { ikon: '🏆', nama: 'Desainer Hebat' },
    langkah: [
      { tipe: 'teks', mood: 'semangat', judul: 'Selamat Datang di Pameran! 🎉',
        teks: 'Kamu sudah belajar <strong>banyak sekali</strong>: warna, bentuk, garis, pola, karakter, latar, dan cerita. Hari ini saatnya <strong>memamerkan</strong> karya terbaikmu!' },
      { tipe: 'bentuk', mood: 'bangga', judul: 'Lihat Semua yang Kamu Kuasai!',
        teks: 'Dari bentuk sederhana ini, kamu kini bisa membuat apa saja. Hebat! ⭐',
        bentuk: [
          { bentuk: 'lingkaran', warna: '#4fc3f7', nama: 'Warna' },
          { bentuk: 'segitiga', warna: '#ffb74d', nama: 'Bentuk' },
          { bentuk: 'bintang', warna: '#ff7aa8', nama: 'Karya' },
        ] },
      { tipe: 'teks', mood: 'bangga', judul: 'Mahakarya Terakhir',
        teks: 'Untuk lulus jadi <strong>Desainer Hebat</strong>, buatlah satu karya bebas — gabungkan semua yang kamu pelajari. Bebas berkreasi! 🌈' },
    ],
    kuis: [
      { soal: 'Selama kursus, kamu sudah belajar tentang warna, bentuk, dan...', pilihan: ['Garis & cerita', 'Memasak', 'Berenang'], benar: 0 },
      { soal: 'Seorang desainer yang baik selalu...', pilihan: ['Berani berkreasi', 'Takut salah', 'Meniru saja'], benar: 0 },
    ],
    aktivitas: { tipe: 'menggambar', judul: 'Mahakarya Bebasmu! 🏆',
      petunjuk: 'Inilah panggungmu! Gambar apa pun yang kamu banggakan dengan semua ilmu desainmu. Tunjukkan pada dunia!',
      palet: ['#ff7aa8', '#7ec8f3', '#5fcf80', '#ffd93b', '#ff9f43', '#a96fd0', '#4a4a6a', '#ffffff'] },
  },
];

export function cariPertemuan(id) {
  return pertemuan.find((p) => p.id === Number(id));
}

export const totalPertemuan = pertemuan.length;
