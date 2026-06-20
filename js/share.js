// =========================================================
// Membagikan & mengunduh gambar karya.
// Di HP/tablet: Web Share API memunculkan pilihan WhatsApp dll.
// Di laptop (tanpa share file): otomatis jatuh ke "unduh".
// =========================================================

function dataURLkeBlob(dataURL) {
  const [meta, b64] = dataURL.split(',');
  const mime = (meta.match(/:(.*?);/) || [, 'image/png'])[1];
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new Blob([u8], { type: mime });
}

export function unduhGambar(dataURL, nama = 'karyaku.png') {
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = nama;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Apakah perangkat bisa membagikan berkas gambar (mis. ke WhatsApp)? */
export function bisaBagikanFile() {
  try {
    const f = new File([new Blob([''], { type: 'image/png' })], 'x.png', { type: 'image/png' });
    return !!(navigator.canShare && navigator.canShare({ files: [f] }));
  } catch { return false; }
}

/**
 * Bagikan gambar. @returns {'dibagikan'|'batal'|'diunduh'}
 */
export async function bagikanGambar(dataURL, nama = 'karyaku.png', judul = 'Karyaku 🎨', teks = '') {
  const file = new File([dataURLkeBlob(dataURL)], nama, { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: judul, text: teks });
      return 'dibagikan';
    } catch (e) {
      if (e && e.name === 'AbortError') return 'batal';
      // selain dibatalkan: jatuh ke unduh
    }
  }
  unduhGambar(dataURL, nama);
  return 'diunduh';
}
