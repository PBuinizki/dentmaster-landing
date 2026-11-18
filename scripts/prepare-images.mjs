/**
 * Генерирует арт-плейсхолдеры для сайта в WebP.
 * Запуск: npm run prepare:images
 *
 * Изображения намеренно абстрактные: это авторская графика, а не стоковые
 * фото. Их легко заменить реальными фотографиями клиники через CMS —
 * структура полей в data/clinic.ts уже готова.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/images');

const FOREST = '#1a3d36';
const FOREST_DEEP = '#0d2420';
const MINT = '#a8d5ba';
const IVORY = '#faf9f7';
const SAND = '#e7e1d8';
const SAND_DEEP = '#d1c4b2';
const INK = '#0f172a';

const grain = `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.08"/></feComponentTransfer>
  </filter>
`;

/** Капсула-арка: узнаваемый приём всей визуальной системы. */
function arch(cx, top, width, bottom, fill, opacity = 1) {
  const r = width / 2;
  return `<path d="M ${cx - r} ${bottom} L ${cx - r} ${top + r} A ${r} ${r} 0 0 1 ${cx + r} ${top + r} L ${cx + r} ${bottom} Z" fill="${fill}" opacity="${opacity}"/>`;
}

function toothPath(cx, cy, scale = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale}) translate(-560 -530)">
    <path d="M480 330 C540 280 640 280 700 330 C760 380 770 470 745 540 C730 580 720 620 716 670 C710 740 690 800 655 800 C620 800 620 740 610 690 C600 640 585 610 560 610 C535 610 520 640 510 690 C500 740 500 800 465 800 C430 800 410 740 404 670 C400 620 390 580 375 540 C350 470 360 380 420 330 C440 315 460 320 480 330 Z"
      fill="none" stroke="${IVORY}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M495 360 C545 320 625 320 675 360 C720 400 728 470 708 525 C695 562 686 600 682 650 C677 705 664 758 645 770"
      fill="none" stroke="${IVORY}" stroke-width="1.4" opacity="0.5" stroke-linecap="round"/>
  </g>`;
}

const heroArt = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#224b43"/>
      <stop offset="0.55" stop-color="${FOREST}"/>
      <stop offset="1" stop-color="${FOREST_DEEP}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.18" r="0.8">
      <stop offset="0" stop-color="${MINT}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${MINT}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" stop-color="${IVORY}" stop-opacity="0"/>
      <stop offset="1" stop-color="${FOREST_DEEP}" stop-opacity="0.85"/>
    </linearGradient>
    ${grain}
  </defs>
  <rect width="1200" height="1500" fill="url(#bg)"/>
  <rect width="1200" height="1500" fill="url(#glow)"/>
  <g opacity="0.16" stroke="${MINT}" fill="none">
    <circle cx="600" cy="620" r="420" stroke-width="1"/>
    <circle cx="600" cy="620" r="510" stroke-width="1"/>
    <circle cx="600" cy="620" r="600" stroke-width="1"/>
  </g>
  ${arch(600, 150, 820, 1500, IVORY, 0.035)}
  <g opacity="0.35" stroke="${IVORY}" stroke-width=".7">
    <line x1="90" y1="0" x2="90" y2="1500" opacity="0.18"/>
    <line x1="1110" y1="0" x2="1110" y2="1500" opacity="0.18"/>
  </g>
  ${toothPath(600, 650, 1.05)}
  <g fill="${MINT}" opacity="0.55">
    <circle cx="930" cy="1080" r="4"/>
    <circle cx="960" cy="1080" r="4" opacity=".6"/>
    <circle cx="990" cy="1080" r="4" opacity=".3"/>
  </g>
  <text x="120" y="1360" fill="${IVORY}" opacity="0.42" font-family="Arial, sans-serif" font-size="19" letter-spacing="7">DENTMASTER / OREL</text>
  <text x="120" y="118" fill="${IVORY}" opacity="0.42" font-family="Arial, sans-serif" font-size="19" letter-spacing="7">EST. 2008</text>
  <rect width="1200" height="1500" fill="url(#fade)"/>
  <rect width="1200" height="1500" filter="url(#grain)" opacity="0.5"/>
</svg>`;

const aboutArt = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1400" viewBox="0 0 1200 1400">
  <defs>
    <linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2ede6"/>
      <stop offset="1" stop-color="${SAND}"/>
    </linearGradient>
    <linearGradient id="sage" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dfeade"/>
      <stop offset="1" stop-color="#c6d9c9"/>
    </linearGradient>
    <radialGradient id="mist" cx="0.25" cy="0.2" r="0.7">
      <stop offset="0" stop-color="${MINT}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${MINT}" stop-opacity="0"/>
    </radialGradient>
    ${grain}
  </defs>
  <rect width="1200" height="1400" fill="url(#sand)"/>
  <rect width="1200" height="1400" fill="url(#mist)"/>
  ${arch(560, 150, 800, 1400, 'url(#sage)')}
  ${arch(560, 330, 560, 1400, IVORY, 0.82)}
  <g stroke="${FOREST}" fill="none">
    <circle cx="600" cy="640" r="330" stroke-width="1" opacity="0.35"/>
    <circle cx="600" cy="640" r="410" stroke-width="0.8" opacity="0.22" stroke-dasharray="2 9"/>
    <circle cx="600" cy="640" r="215" stroke-width="0.8" opacity="0.2"/>
  </g>
  <g stroke="${FOREST}" fill="none" stroke-linecap="round" opacity="0.5">
    <path d="M150 1010 C330 960 430 960 560 1000" stroke-width="1.2"/>
    <path d="M150 1046 C330 996 440 996 580 1036" stroke-width="0.8" opacity=".6"/>
    <path d="M820 1130 L1050 1130" stroke-width="1" opacity=".4"/>
    <path d="M820 1160 L980 1160" stroke-width="1" opacity=".28"/>
  </g>
  <g fill="${FOREST}" opacity="0.3">
    <circle cx="920" cy="400" r="3.5"/>
    <circle cx="950" cy="400" r="3" opacity=".6"/>
    <circle cx="980" cy="400" r="2.5" opacity=".35"/>
  </g>
  <text x="100" y="1320" fill="${FOREST}" opacity="0.5" font-family="Arial, sans-serif" font-size="18" letter-spacing="6">PUSHKINA 24 / OREL</text>
  <rect width="1200" height="1400" filter="url(#grain)" opacity="0.55"/>
</svg>`;

const clinicArt = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f4f0e9"/>
      <stop offset="1" stop-color="${SAND}"/>
    </linearGradient>
    <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d9e7da"/>
      <stop offset="1" stop-color="#b9d2bf"/>
    </linearGradient>
    ${grain}
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <g opacity="1">
    ${arch(380, 90, 420, 900, 'url(#green)')}
    ${arch(760, 210, 300, 900, IVORY, 0.8)}
    ${arch(1240, 140, 520, 900, FOREST, 0.06)}
  </g>
  <g stroke="${FOREST}" fill="none" opacity="0.55">
    <path d="M80 700 C260 610 430 600 600 660" stroke-width="1.4"/>
    <path d="M60 740 C260 640 450 630 640 700" stroke-width="0.8" opacity=".6"/>
    <circle cx="1180" cy="330" r="150" stroke-width="1"/>
    <circle cx="1180" cy="330" r="190" stroke-width="0.7" stroke-dasharray="1 7"/>
  </g>
  <g fill="${FOREST}" opacity=".14">
    <rect x="1050" y="660" width="420" height="6" rx="3"/>
    <rect x="1080" y="700" width="360" height="6" rx="3" opacity=".7"/>
    <rect x="1110" y="740" width="300" height="6" rx="3" opacity=".45"/>
  </g>
  <text x="96" y="130" fill="${FOREST}" opacity="0.45" font-family="Arial, sans-serif" font-size="18" letter-spacing="6">QUIET DENTISTRY</text>
  <rect width="1600" height="900" filter="url(#grain)" opacity="0.5"/>
</svg>`;

function doctorPortrait({ bg1, bg2, accent, skin, hair, hairStyle = 'short', tilt = 0 }) {
  const hairShapes = {
    short: `<path d="M300 470 C300 350 370 285 450 285 C535 285 605 355 605 480 C605 505 600 520 595 532 C590 480 575 440 545 415 C510 452 455 465 400 452 C370 445 350 455 340 490 L320 560 C310 545 300 510 300 470 Z" fill="${hair}"/>`,
    long: `<path d="M285 480 C285 350 365 275 455 275 C550 275 625 355 625 490 L648 905 C620 930 580 940 540 938 L528 640 C528 560 500 520 455 520 C410 520 382 560 382 640 L370 938 C320 936 282 925 262 900 Z" fill="${hair}"/>`,
    bun: `<circle cx="596" cy="352" r="58" fill="${hair}"/><path d="M300 470 C300 350 370 285 450 285 C535 285 605 355 605 480 C605 500 602 512 598 522 C590 470 570 435 540 412 C505 448 452 460 398 448 C368 441 348 452 340 488 L322 556 C310 540 300 508 300 470 Z" fill="${hair}"/>`,
  };

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <linearGradient id="coat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fdfcfa"/>
      <stop offset="1" stop-color="#e8e4dd"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.3" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    ${grain}
  </defs>
  <rect width="900" height="1200" fill="url(#bg)"/>
  <rect width="900" height="1200" fill="url(#halo)"/>

  <g transform="rotate(${tilt} 450 640)">
    ${arch(450, 170, 620, 1200, accent, 0.45)}
    <circle cx="450" cy="560" r="248" fill="${IVORY}" opacity="0.55"/>
    <circle cx="450" cy="560" r="300" fill="none" stroke="${FOREST}" stroke-width="0.9" opacity="0.16" stroke-dasharray="2 9"/>

    <path d="M196 1200 C206 1010 268 922 352 890 L410 866 C428 900 472 916 450 916 C472 916 516 900 534 866 L592 890 C676 922 738 1010 748 1200 Z" fill="url(#coat)"/>
    <path d="M196 1200 C206 1010 268 922 352 890 L410 866 L450 940 L490 866 L592 890 C676 922 738 1010 748 1200" fill="none" stroke="${FOREST}" stroke-width="1.1" opacity="0.16"/>
    <path d="M450 940 L392 1200 M450 940 L508 1200" stroke="${FOREST}" stroke-width="0.9" opacity="0.10"/>
    <path d="M352 890 L398 1010 M592 890 L546 1010" stroke="${FOREST}" stroke-width="0.9" opacity="0.10"/>

    <path d="M404 800 L404 890 C420 906 480 906 496 890 L496 800 Z" fill="${skin}" opacity="0.95"/>
    <path d="M404 800 L404 890 C420 906 480 906 496 890" fill="none" stroke="${FOREST}" stroke-width="0.9" opacity="0.12"/>

    <ellipse cx="450" cy="640" rx="150" ry="182" fill="${skin}"/>
    <path d="M300 610 C310 700 360 780 450 812 C540 780 590 700 600 610" fill="none" stroke="${FOREST}" stroke-width="0.9" opacity="0.10"/>

    ${hairShapes[hairStyle]}

    <g stroke="${FOREST}" stroke-width="3" stroke-linecap="round" opacity="0.55" fill="none">
      <path d="M388 596 C404 586 424 588 436 596"/>
      <path d="M464 596 C476 588 496 586 512 596"/>
      <path d="M430 664 C442 676 458 676 470 664"/>
      <path d="M420 726 C440 738 460 738 480 726"/>
    </g>
    <g fill="${FOREST}" opacity="0.55">
      <circle cx="411" cy="624" r="5.5"/>
      <circle cx="489" cy="624" r="5.5"/>
    </g>

    <rect x="556" y="1016" width="58" height="38" rx="6" fill="${IVORY}" opacity="0.9" stroke="${FOREST}" stroke-width="1" stroke-opacity="0.2"/>
    <path d="M566 1030 h38 M566 1040 h26" stroke="${FOREST}" stroke-width="2" stroke-opacity="0.3" stroke-linecap="round"/>
    <path d="M300 1080 h84" stroke="${FOREST}" stroke-width="1" stroke-opacity="0.18"/>
  </g>

  <g fill="${FOREST}" opacity="0.28">
    <circle cx="112" cy="1080" r="3.5"/>
    <circle cx="142" cy="1080" r="3" opacity=".6"/>
    <circle cx="172" cy="1080" r="2.5" opacity=".35"/>
  </g>
  <rect width="900" height="1200" filter="url(#grain)" opacity="0.45"/>
</svg>`;
}

const doctors = [
  doctorPortrait({
    bg1: '#f2ece3',
    bg2: '#e0d4c4',
    accent: '#f8f3ea',
    skin: '#e9cdb6',
    hair: '#3f3630',
    hairStyle: 'bun',
    tilt: -1.5,
  }),
  doctorPortrait({
    bg1: '#e6efe6',
    bg2: '#c9dbc9',
    accent: '#f4f9f3',
    skin: '#e6c6ae',
    hair: '#6b4a33',
    hairStyle: 'long',
    tilt: 1,
  }),
  doctorPortrait({
    bg1: '#e9edf0',
    bg2: '#cedae1',
    accent: '#f5f9fa',
    skin: '#e4c3a9',
    hair: '#2b2622',
    hairStyle: 'short',
    tilt: -0.8,
  }),
];

const targets = [
  ['hero-art.webp', heroArt, 1200, 1500],
  ['about-art.webp', aboutArt, 1200, 1400],
  ['clinic-art.webp', clinicArt, 1600, 900],
  ['doctor-1.webp', doctors[0], 900, 1200],
  ['doctor-2.webp', doctors[1], 900, 1200],
  ['doctor-3.webp', doctors[2], 900, 1200],
];

await mkdir(outDir, { recursive: true });

for (const [name, svg, width, height] of targets) {
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(outDir, name));
  console.log(`created public/images/${name}`);
}
