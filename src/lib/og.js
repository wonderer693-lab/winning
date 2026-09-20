// Generates the social share image (og:image) as a PNG, no dependencies.
//
// Draws the brand mark — a white check on the emerald background — at
// 1200x630 using distance-based anti-aliasing. Kept deliberately simple:
// one bold shape that reads at thumbnail size.

import { deflateSync } from 'node:zlib';

const W = 1200;
const H = 630;
const BG = [13, 122, 95]; // #0d7a5f
const FG = [255, 255, 255];

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, 'ascii'), data])), 8 + data.length);
  return out;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((px - x1) * dx + (py - y1) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

export function renderOgImage() {
  const pts = [
    [430, 340],
    [555, 462],
    [790, 205],
  ];
  const stroke = 34; // half stroke width
  const feather = 1.5;

  const raw = Buffer.alloc(H * (W * 3 + 1));
  let o = 0;
  for (let y = 0; y < H; y++) {
    raw[o++] = 0; // PNG filter: none
    for (let x = 0; x < W; x++) {
      const d = Math.min(
        distToSegment(x, y, pts[0][0], pts[0][1], pts[1][0], pts[1][1]),
        distToSegment(x, y, pts[1][0], pts[1][1], pts[2][0], pts[2][1])
      );
      const a = Math.max(0, Math.min(1, (stroke - d) / feather));
      raw[o++] = Math.round(BG[0] + (FG[0] - BG[0]) * a);
      raw[o++] = Math.round(BG[1] + (FG[1] - BG[1]) * a);
      raw[o++] = Math.round(BG[2] + (FG[2] - BG[2]) * a);
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
