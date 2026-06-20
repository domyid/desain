// =========================================================
// Gambar mewarnai. Tiap bagian ber-atribut data-region supaya
// bisa diwarnai dengan diketuk. Warna awal abu-abu muda
// (seperti buku mewarnai). Tersedia beberapa adegan.
// =========================================================

const garis = '#9aa3b2';
const dasar = '#f1f3f7';

/** Pilih adegan mewarnai sesuai nama. */
export function sceneMewarnai(nama = 'taman') {
  if (nama === 'karakter') return sceneKarakter();
  if (nama === 'kastil') return sceneKastil();
  return sceneTaman();
}

function sceneTaman() {
  return `
<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" aria-label="Gambar mewarnai taman awan">
  <!-- langit -->
  <rect data-region="langit" x="0" y="0" width="400" height="320" rx="18" fill="${dasar}" stroke="${garis}" stroke-width="2"/>

  <!-- matahari -->
  <g stroke="${garis}" stroke-width="2">
    <circle data-region="matahari" cx="60" cy="56" r="30" fill="#ffffff"/>
    ${Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 60 + Math.cos(a) * 36, y1 = 56 + Math.sin(a) * 36;
      const x2 = 60 + Math.cos(a) * 48, y2 = 56 + Math.sin(a) * 48;
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-linecap="round"/>`;
    }).join('')}
  </g>

  <!-- rumput / bukit -->
  <path data-region="rumput" d="M0 250 Q120 215 220 250 T400 245 V320 H0 Z" fill="#ffffff" stroke="${garis}" stroke-width="2"/>

  <!-- bunga -->
  <g stroke="${garis}" stroke-width="2">
    <line x1="320" y1="300" x2="320" y2="250" stroke-linecap="round"/>
    ${Array.from({ length: 5 }).map((_, i) => {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const cx = 320 + Math.cos(a) * 18, cy = 244 + Math.sin(a) * 18;
      return `<circle data-region="kelopak${i}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="12" fill="#ffffff"/>`;
    }).join('')}
    <circle data-region="tengahBunga" cx="320" cy="244" r="10" fill="#ffffff"/>
  </g>

  <!-- maskot Awan (badan awan + kuping) -->
  <g stroke="${garis}" stroke-width="2.5">
    <path data-region="kupingKiri" d="M150 200 C128 206 122 240 138 254 C150 264 166 252 162 230 C160 218 158 208 158 204 Z" fill="#ffffff"/>
    <path data-region="kupingKanan" d="M238 200 C260 206 266 240 250 254 C238 264 222 252 226 230 C228 218 230 208 230 204 Z" fill="#ffffff"/>
    <g data-region="badan" fill="#ffffff">
      <circle cx="194" cy="200" r="40"/>
      <circle cx="162" cy="206" r="22"/>
      <circle cx="226" cy="206" r="22"/>
      <circle cx="194" cy="174" r="26"/>
    </g>
  </g>
  <!-- wajah (tidak diwarnai, biar tetap lucu) -->
  <g fill="#4a4a6a">
    <circle cx="180" cy="196" r="5"/>
    <circle cx="208" cy="196" r="5"/>
    <ellipse cx="194" cy="206" rx="4" ry="2.6" fill="#9bd0ef"/>
  </g>
  <path d="M184 212 Q194 220 204 212" fill="none" stroke="#4a4a6a" stroke-width="3" stroke-linecap="round"/>
  <circle cx="174" cy="208" r="6" fill="#ffd0e2"/>
  <circle cx="214" cy="208" r="6" fill="#ffd0e2"/>
</svg>`;
}

// ---- Adegan: karakter burung hantu ----
function sceneKarakter() {
  return `
<svg viewBox="0 0 360 320" xmlns="http://www.w3.org/2000/svg" aria-label="Mewarnai karakter burung hantu">
  <rect data-region="latar" x="0" y="0" width="360" height="320" rx="18" fill="${dasar}" stroke="${garis}" stroke-width="2"/>
  <g stroke="${garis}" stroke-width="2.5">
    <path data-region="sayapKiri" d="M120 150 C90 160 90 220 116 236 C128 220 126 180 130 160 Z" fill="#ffffff"/>
    <path data-region="sayapKanan" d="M240 150 C270 160 270 220 244 236 C232 220 234 180 230 160 Z" fill="#ffffff"/>
    <ellipse data-region="badan" cx="180" cy="180" rx="78" ry="86" fill="#ffffff"/>
    <ellipse data-region="perut" cx="180" cy="196" rx="48" ry="58" fill="#ffffff"/>
    <circle data-region="mataKiri" cx="152" cy="150" r="30" fill="#ffffff"/>
    <circle data-region="mataKanan" cx="208" cy="150" r="30" fill="#ffffff"/>
    <polygon data-region="paruh" points="180,166 168,182 192,182" fill="#ffffff"/>
    <path data-region="jambul" d="M150 96 Q180 64 210 96" fill="#ffffff"/>
    <line x1="160" y1="262" x2="160" y2="286" stroke-linecap="round"/>
    <line x1="200" y1="262" x2="200" y2="286" stroke-linecap="round"/>
  </g>
  <circle cx="152" cy="152" r="11" fill="#4a4a6a"/>
  <circle cx="208" cy="152" r="11" fill="#4a4a6a"/>
  <circle cx="148" cy="148" r="3.5" fill="#fff"/>
  <circle cx="204" cy="148" r="3.5" fill="#fff"/>
</svg>`;
}

// ---- Adegan: kastil (latar) ----
function sceneKastil() {
  return `
<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" aria-label="Mewarnai kastil">
  <rect data-region="langit" x="0" y="0" width="400" height="320" rx="18" fill="${dasar}" stroke="${garis}" stroke-width="2"/>
  <circle data-region="bulan" cx="320" cy="60" r="26" fill="#ffffff" stroke="${garis}" stroke-width="2"/>
  <g stroke="${garis}" stroke-width="2.5" fill="#ffffff">
    <rect data-region="rumput" x="0" y="250" width="400" height="70" rx="0"/>
    <rect data-region="menaraKiri" x="70" y="120" width="60" height="140"/>
    <rect data-region="menaraKanan" x="270" y="120" width="60" height="140"/>
    <rect data-region="tengah" x="150" y="90" width="100" height="170"/>
    <polygon data-region="atapKiri" points="64,120 100,80 136,120"/>
    <polygon data-region="atapKanan" points="264,120 300,80 336,120"/>
    <polygon data-region="atapTengah" points="144,90 200,40 256,90"/>
    <path data-region="pintu" d="M180 260 V150 a20 20 0 0 1 40 0 V260 Z"/>
    <rect data-region="jendelaKiri" x="88" y="150" width="24" height="34" rx="12"/>
    <rect data-region="jendelaKanan" x="288" y="150" width="24" height="34" rx="12"/>
  </g>
</svg>`;
}
