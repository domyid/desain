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
- **Kuis & bintang** ⭐ — soal penalaran/penerapan (4 pilihan) dengan penjelasan "kenapa"
  setelah menjawab; jawaban benar memunculkan konfeti & suara ceria.
- **Aktivitas kreatif** — mewarnai gambar langsung di layar.
- **Lencana 🏅** dikumpulkan tiap pertemuan, kemajuan tersimpan di perangkat (localStorage).
- **Galeri Karyaku 🖼️** — setiap hasil menggambar/mewarnai otomatis tersimpan jadi gambar.
- **Bagikan & Unduh 📤** — kirim karya ke WhatsApp dll (Web Share API di HP/tablet) atau unduh PNG.
- **Sertifikat 🏆** ber-nama anak setelah menamatkan semua pertemuan — bisa diunduh/dibagikan.
- **Narasi suara 🔊** — tombol "Bacakan" membacakan materi (text-to-speech bahasa Indonesia).
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
  main.js             Router (#/ , #/peta , #/pelajaran/<id> , #/galeri , #/sertifikat)
  data.js             Kurikulum 8 pertemuan  <- isi materi di sini
  storage.js          Simpan kemajuan & nama (localStorage)
  galeri.js           Simpan/daftar karya anak (localStorage)
  capture.js          Tangkap kanvas/SVG jadi gambar PNG
  share.js            Bagikan (Web Share API) & unduh gambar
  sertifikat.js       Buat sertifikat kelulusan (kanvas -> PNG)
  tts.js              Narasi suara (Web Speech API, id-ID)
  sound.js            Efek suara (Web Audio, tanpa file)
  mascot.js           Maskot Awan (SVG original)
  ui.js               Fungsi bantu (buat elemen, konfeti, toast)
  views/
    home.js           Beranda (sapaan nama + pintasan galeri/sertifikat)
    map.js            Peta pertemuan
    lesson.js         Alur pelajaran (belajar->kuis->aktivitas->simpan->lencana)
    coloring.js       Gambar mewarnai (adegan: taman/karakter/kastil)
    draw.js           Kanvas menggambar bebas
    shapes.js         Bentuk & ilustrasi (rumah/karakter/pemandangan/cerita)
    decor.js          Contoh garis & pola
    galeri.js         Tampilan Galeri Karyaku
    sertifikat.js     Tampilan sertifikat
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
