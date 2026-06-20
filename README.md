# Dunia Ajaib Awan ☁️🎨

Portal belajar **desain & menggambar** yang lucu dan menyenangkan untuk anak SD.
Dibuat dengan **HTML + CSS + Vanilla JavaScript (ESM)** — tanpa framework, tanpa build.

Terinspirasi gaya kursus desain anak (mis. Kodland "Fantastic Worlds Design"),
disusun **per pertemuan** seperti kelas sungguhan.

> Maskot **Awan** dibuat original (SVG) dengan gaya pastel yang menggemaskan,
> jadi tidak memakai gambar berhak cipta milik pihak lain.

## ✨ Fitur

- **Peta petualangan** berisi 8 pertemuan yang terbuka bertahap (selesaikan satu untuk membuka berikutnya).
- **Belajar** lewat slide bergambar maskot dengan ekspresi.
- **Kuis & bintang** ⭐ — jawaban benar memunculkan konfeti & suara ceria.
- **Aktivitas kreatif** — mewarnai gambar langsung di layar.
- **Lencana 🏅** dikumpulkan tiap pertemuan, kemajuan tersimpan di perangkat (localStorage).
- **Suara & animasi** lembut (bisa dimatikan lewat tombol 🔊 di pojok).
- Menghormati `prefers-reduced-motion` untuk anak yang sensitif animasi.

## ▶️ Cara menjalankan

Karena memakai modul ESM, file harus dibuka lewat **server lokal** (bukan klik dobel `index.html`).
Pilih salah satu:

```bash
# Python (biasanya sudah ada)
python3 -m http.server 8000

# atau Node
npx serve .
```

Lalu buka **http://localhost:8000** di browser.

## 🗂️ Struktur

```
index.html            Kerangka halaman + latar awan
css/style.css         Seluruh gaya (tema pastel)
js/
  main.js             Router (#/ , #/peta , #/pelajaran/<id>)
  data.js             Kurikulum 8 pertemuan  <- isi materi di sini
  storage.js          Simpan kemajuan (localStorage)
  sound.js            Efek suara (Web Audio, tanpa file)
  mascot.js           Maskot Awan (SVG original)
  ui.js               Fungsi bantu (buat elemen, konfeti)
  views/
    home.js           Beranda
    map.js            Peta pertemuan
    lesson.js         Alur pelajaran (belajar->kuis->aktivitas->lencana)
    coloring.js       Gambar mewarnai
```

## ➕ Menambah / mengisi pertemuan

Buka `js/data.js`. Tiap pertemuan punya pola yang sama:

- `langkah[]` — slide materi (`tipe: 'teks' | 'warna' | 'campur'`).
- `kuis[]` — soal pilihan ganda (`benar` = indeks jawaban benar).
- `aktivitas` — aktivitas kreatif (saat ini tipe `mewarnai`).
- `lencana` — ikon & nama lencana yang didapat.

Kedelapan pertemuan sudah terisi lengkap:

1. **Dunia Warna** 🌈 — warna primer, mencampur warna, hangat/sejuk
2. **Dunia Bentuk** 🔷 — lingkaran/persegi/segitiga, menggabungkan bentuk
3. **Dunia Garis** ✏️ — garis lurus/lengkung/zigzag & perasaannya
4. **Dunia Pola** 🌸 — motif berulang (titik, garis, bunga, hati)
5. **Dunia Karakter** 🐶 — membuat tokoh dari bentuk + mewarnai karakter
6. **Dunia Latar** 🏰 — jauh/dekat, warna suasana + mewarnai kastil
7. **Dunia Cerita** 📖 — awal–tengah–akhir, bercerita lewat gambar
8. **Pameran Karya** 🎉 — mahakarya bebas, lulus jadi "Desainer Hebat"

Tipe slide yang tersedia: `teks`, `warna`, `campur`, `bentuk`, `garis`, `pola`,
dan `ilustrasi`. Tipe aktivitas: `mewarnai` (dengan `scene`: taman/karakter/kastil)
dan `menggambar` (kanvas bebas).
