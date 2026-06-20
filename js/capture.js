// =========================================================
// Mengubah karya anak menjadi gambar PNG (data URL):
// - kanvas menggambar  -> langsung toDataURL
// - gambar mewarnai SVG -> dirender ke kanvas dulu
// =========================================================

function tangkapKanvas(canvas) {
  return canvas.toDataURL('image/png');
}

function tangkapSVG(svgEl) {
  return new Promise((resolve, reject) => {
    const vb = (svgEl.getAttribute('viewBox') || '0 0 400 320').split(/\s+/).map(Number);
    const w = vb[2] || 400;
    const h = vb[3] || 320;

    const clone = svgEl.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const xml = new XMLSerializer().serializeToString(clone);
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);

    const img = new Image();
    img.onload = () => {
      const skala = 2; // tajam saat dibagikan
      const c = document.createElement('canvas');
      c.width = w * skala;
      c.height = h * skala;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      try { resolve(c.toDataURL('image/png')); }
      catch (e) { reject(e); }
    };
    img.onerror = () => reject(new Error('gagal memuat svg'));
    img.src = url;
  });
}

/** Cari elemen gambar di dalam wadah lalu kembalikan PNG data URL. */
export async function tangkapGambar(wadah) {
  const canvas = wadah.querySelector('canvas');
  if (canvas) return tangkapKanvas(canvas);
  const svg = wadah.querySelector('svg');
  if (svg) return await tangkapSVG(svg);
  throw new Error('tidak ada gambar untuk ditangkap');
}
