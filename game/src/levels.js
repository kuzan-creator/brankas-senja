// Sunset Vaults — the three rooms of Bank Senja. One job: data only.
// Each room is one heist: walls and cover, named loot, one or two guards,
// cameras, lasers, lamps, shadow pockets and the green EXIT door.
import { ROOM_W, ROOM_H } from './config.js';

export const ROOMS = [
  {
    id: 'aula',
    name: 'AULA BANK',
    sub: 'Ruang 1 dari 3 — malam, lampion menyala',
    floor: 'marble',
    spawn: { x: 70, y: 640 },
    exit: { x: 790, y: 648, w: 62, h: 60, label: 'EXIT' },
    // Solid cover: pillars, teller desks, the long counter, planters.
    blocks: [
      { x: 250, y: 130, w: 44, h: 44, kind: 'pillar' },
      { x: 560, y: 130, w: 44, h: 44, kind: 'pillar' },
      { x: 250, y: 430, w: 44, h: 44, kind: 'pillar' },
      { x: 560, y: 430, w: 44, h: 44, kind: 'pillar' },
      { x: 120, y: 250, w: 150, h: 46, kind: 'desk', label: 'MEJA TELLER' },
      { x: 600, y: 250, w: 150, h: 46, kind: 'desk', label: 'MEJA TELLER' },
      { x: 330, y: 300, w: 210, h: 34, kind: 'counter', label: 'KONTER' },
      { x: 90, y: 560, w: 60, h: 60, kind: 'planter' },
      { x: 720, y: 90, w: 60, h: 60, kind: 'planter' },
    ],
    lamps: [
      { x: 272, y: 152, r: 150 },
      { x: 582, y: 152, r: 150 },
      { x: 435, y: 560, r: 170 },
      { x: 760, y: 420, r: 130 },
    ],
    shadows: [
      { x: 200, y: 452, r: 62 },
      { x: 610, y: 452, r: 62 },
      { x: 120, y: 640, r: 70 },
    ],
    loot: [
      { x: 700, y: 110, name: 'BERLIAN SENJA', value: 500, kind: 'diamond' },
      { x: 195, y: 240, name: 'KOIN EMAS', value: 100, kind: 'coin' },
      { x: 675, y: 240, name: 'KOIN EMAS', value: 100, kind: 'coin' },
    ],
    guards: [
      {
        name: 'BUDI', role: 'Penjaga Aula', x: 435, y: 360,
        patrol: [[300, 360], [580, 360], [580, 180], [300, 180]],
        range: 265, fov: 1.22, speed: 62,
      },
    ],
    cameras: [
      { x: 850, y: 20, angle: Math.PI * 0.75, sweep: 0.9, speed: 0.45, range: 300 },
    ],
    lasers: [],
    ironDoor: null,
  },
  {
    id: 'brankas',
    name: 'RUANG BRANKAS',
    sub: 'Ruang 2 dari 3 — laser dan pintu besi',
    floor: 'steel',
    spawn: { x: 70, y: 640 },
    exit: { x: 60, y: 60, w: 62, h: 60, label: 'EXIT' },
    blocks: [
      { x: 380, y: 60, w: 120, h: 30, kind: 'vaultdoor', label: 'PINTU BESI' },
      { x: 300, y: 240, w: 40, h: 40, kind: 'pillar' },
      { x: 540, y: 240, w: 40, h: 40, kind: 'pillar' },
      { x: 300, y: 470, w: 40, h: 40, kind: 'pillar' },
      { x: 540, y: 470, w: 40, h: 40, kind: 'pillar' },
      { x: 120, y: 330, w: 120, h: 40, kind: 'crate', label: 'PETI ARSIP' },
      { x: 640, y: 330, w: 120, h: 40, kind: 'crate', label: 'PETI ARSIP' },
      { x: 380, y: 560, w: 120, h: 40, kind: 'desk', label: 'MEJA CATATAN' },
    ],
    lamps: [
      { x: 440, y: 130, r: 160 },
      { x: 200, y: 520, r: 140 },
      { x: 680, y: 520, r: 140 },
    ],
    shadows: [
      { x: 180, y: 350, r: 60 },
      { x: 700, y: 350, r: 60 },
      { x: 120, y: 640, r: 70 },
    ],
    loot: [
      { x: 440, y: 130, name: 'MAHKOTA LEDGER', value: 800, kind: 'crown' },
      { x: 700, y: 620, name: 'KITAB EMAS BANK', value: 400, kind: 'book' },
      { x: 180, y: 620, name: 'KOIN EMAS', value: 100, kind: 'coin' },
    ],
    guards: [
      {
        name: 'SARI', role: 'Penjaga Brankas', x: 440, y: 400,
        patrol: [[440, 300], [440, 520], [200, 520], [680, 520], [680, 300]],
        range: 250, fov: 1.22, speed: 66,
      },
    ],
    cameras: [
      { x: 20, y: 360, angle: 0, sweep: 1.0, speed: 0.5, range: 300 },
      { x: 852, y: 360, angle: Math.PI, sweep: 1.0, speed: 0.4, range: 300 },
    ],
    // The laser corridor guards the vault alcove at the top.
    lasers: [
      { x1: 330, y1: 200, x2: 550, y2: 200 },
      { x1: 330, y1: 230, x2: 550, y2: 230 },
      { x1: 330, y1: 170, x2: 330, y2: 230 },
      { x1: 550, y1: 170, x2: 550, y2: 230 },
    ],
    ironDoor: { x: 380, y: 30, w: 120, h: 34 },
  },
  {
    id: 'atap',
    name: 'ATAP & PELARIAN',
    sub: 'Ruang 3 dari 3 — langit malam, lampu sorot',
    floor: 'roof',
    spawn: { x: 70, y: 640 },
    exit: { x: 790, y: 60, w: 62, h: 60, label: 'PELARIAN' },
    blocks: [
      { x: 300, y: 150, w: 90, h: 70, kind: 'vent', label: 'VENTILASI' },
      { x: 520, y: 150, w: 90, h: 70, kind: 'vent', label: 'VENTILASI' },
      { x: 200, y: 380, w: 70, h: 70, kind: 'vent', label: 'VENTILASI' },
      { x: 620, y: 380, w: 70, h: 70, kind: 'vent', label: 'VENTILASI' },
      { x: 380, y: 480, w: 120, h: 46, kind: 'crate', label: 'PETI ALAT' },
      { x: 120, y: 150, w: 60, h: 60, kind: 'planter' },
      { x: 700, y: 560, w: 60, h: 60, kind: 'planter' },
    ],
    lamps: [
      { x: 345, y: 185, r: 120 },
      { x: 565, y: 185, r: 120 },
      { x: 440, y: 500, r: 150 },
    ],
    shadows: [
      { x: 235, y: 415, r: 62 },
      { x: 655, y: 415, r: 62 },
      { x: 120, y: 640, r: 70 },
    ],
    loot: [
      { x: 440, y: 90, name: 'KUNCI MASTER SENJA', value: 1000, kind: 'key' },
      { x: 760, y: 640, name: 'KOIN EMAS', value: 100, kind: 'coin' },
    ],
    guards: [
      {
        name: 'K-9', role: 'Anjing Penjaga', x: 440, y: 330, dog: true,
        patrol: [[250, 330], [640, 330], [640, 560], [250, 560]],
        range: 210, fov: 1.35, speed: 96,
      },
      {
        name: 'AGUS', role: 'Penjaga Atap', x: 700, y: 250,
        patrol: [[700, 200], [700, 480]],
        range: 250, fov: 1.22, speed: 60,
      },
    ],
    cameras: [
      { x: 436, y: 20, angle: Math.PI * 0.5, sweep: 1.2, speed: 0.55, range: 320 },
    ],
    lasers: [],
    ironDoor: null,
  },
];

export function roomSize() {
  return { w: ROOM_W, h: ROOM_H };
}
