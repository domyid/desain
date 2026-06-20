// =========================================================
// Awan — maskot original: anak awan putih berkuping panjang.
// Terinspirasi gaya pastel, TAPI dibuat sendiri dari nol (SVG),
// jadi tidak memakai gambar berhak cipta milik siapa pun.
// =========================================================

/**
 * Mengembalikan string SVG maskot.
 * @param {('senang'|'semangat'|'bangga'|'mikir')} mood ekspresi wajah
 */
export function mascotSVG(mood = 'senang') {
  const mata = wajah(mood);
  return `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Awan si anak awan">
  <defs>
    <radialGradient id="pipi" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb6d5"/>
      <stop offset="100%" stop-color="#ffb6d5" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- kuping panjang kiri -->
  <path d="M58 78 C30 86 22 130 40 150 C54 165 74 150 70 120 C68 102 70 88 72 82 Z"
        fill="#ffffff" stroke="#cfe6f7" stroke-width="3"/>
  <path d="M52 120 C46 132 50 144 58 148 C64 140 62 128 60 120 Z" fill="#ffd7e8"/>

  <!-- kuping panjang kanan -->
  <path d="M142 78 C170 86 178 130 160 150 C146 165 126 150 130 120 C132 102 130 88 128 82 Z"
        fill="#ffffff" stroke="#cfe6f7" stroke-width="3"/>
  <path d="M148 120 C154 132 150 144 142 148 C136 140 138 128 140 120 Z" fill="#ffd7e8"/>

  <!-- kepala awan: lingkaran-lingkaran -->
  <g fill="#ffffff" stroke="#cfe6f7" stroke-width="3">
    <circle cx="100" cy="100" r="48"/>
    <circle cx="66" cy="104" r="26"/>
    <circle cx="134" cy="104" r="26"/>
    <circle cx="100" cy="70" r="30"/>
  </g>
  <!-- tutup garis dalam supaya mulus -->
  <circle cx="100" cy="98" r="44" fill="#ffffff"/>

  <!-- pipi merona -->
  <circle cx="68" cy="112" r="13" fill="url(#pipi)"/>
  <circle cx="132" cy="112" r="13" fill="url(#pipi)"/>

  <!-- wajah -->
  ${mata}

  <!-- pilinan ekor awan kecil di atas -->
  <path d="M118 50 C128 40 142 44 140 56 C139 64 130 64 130 58"
        fill="none" stroke="#cfe6f7" stroke-width="5" stroke-linecap="round"/>
</svg>`;
}

function wajah(mood) {
  const hidung = `<ellipse cx="100" cy="104" rx="5" ry="3.4" fill="#9bd0ef"/>`;
  switch (mood) {
    case 'semangat':
      return `
        <circle cx="84" cy="96" r="6.5" fill="#4a4a6a"/>
        <circle cx="116" cy="96" r="6.5" fill="#4a4a6a"/>
        <circle cx="82" cy="93" r="2.2" fill="#fff"/>
        <circle cx="114" cy="93" r="2.2" fill="#fff"/>
        ${hidung}
        <path d="M88 114 Q100 126 112 114" fill="none" stroke="#4a4a6a" stroke-width="3.5" stroke-linecap="round"/>`;
    case 'bangga':
      return `
        <path d="M78 98 Q84 90 90 98" fill="none" stroke="#4a4a6a" stroke-width="4" stroke-linecap="round"/>
        <path d="M110 98 Q116 90 122 98" fill="none" stroke="#4a4a6a" stroke-width="4" stroke-linecap="round"/>
        ${hidung}
        <path d="M86 112 Q100 124 114 112" fill="none" stroke="#4a4a6a" stroke-width="3.5" stroke-linecap="round"/>`;
    case 'mikir':
      return `
        <circle cx="84" cy="96" r="5.5" fill="#4a4a6a"/>
        <circle cx="116" cy="96" r="5.5" fill="#4a4a6a"/>
        ${hidung}
        <path d="M90 116 Q100 112 110 116" fill="none" stroke="#4a4a6a" stroke-width="3.5" stroke-linecap="round"/>`;
    default: // senang
      return `
        <circle cx="84" cy="96" r="6" fill="#4a4a6a"/>
        <circle cx="116" cy="96" r="6" fill="#4a4a6a"/>
        <circle cx="82.5" cy="93.5" r="2" fill="#fff"/>
        <circle cx="114.5" cy="93.5" r="2" fill="#fff"/>
        ${hidung}
        <path d="M90 113 Q100 121 110 113" fill="none" stroke="#4a4a6a" stroke-width="3.5" stroke-linecap="round"/>`;
  }
}

/** Sisipkan maskot ke elemen, plus kelas animasi opsional. */
export function renderMascot(el, mood = 'senang', extraClass = 'mascot--float') {
  el.classList.add('mascot');
  if (extraClass) el.classList.add(extraClass);
  el.innerHTML = mascotSVG(mood);
}
