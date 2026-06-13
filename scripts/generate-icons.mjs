import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

// --- encodeur PNG minimal (RGBA, 8 bits) ---
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}
function encodePng(size, pixelFn) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // profondeur
  ihdr[9] = 6 // RGBA
  const raw = Buffer.alloc((size * 4 + 1) * size)
  let o = 0
  for (let y = 0; y < size; y++) {
    raw[o++] = 0 // filtre : aucun
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixelFn(x / size, y / size)
      raw[o++] = r; raw[o++] = g; raw[o++] = b; raw[o++] = a
    }
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}

// --- scène : dégradé rose corail + cœur blanc + petit éclat ---
const lerp = (a, b, t) => a + (b - a) * t
const mix = (c1, c2, t) => [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t)), 255]

const TOP = [216, 142, 150]   // rose argile clair
const BOT = [193, 110, 122]   // rose argile profond
const WHITE = [250, 246, 241, 255]  // crème
const SOFT = [240, 224, 214, 255]

function scene(nx, ny) {
  // fond : dégradé vertical
  const bg = mix(TOP, BOT, ny)

  // cœur centré, légèrement au-dessus du milieu
  const X = (nx - 0.5) * 2.5
  const Y = (0.46 - ny) * 2.5
  const h = Math.pow(X * X + Y * Y - 1, 3) - X * X * Y * Y * Y
  if (h < 0) return WHITE

  // petit éclat (sparkle) en haut à droite
  const sx = nx - 0.74, sy = ny - 0.24
  if (sx * sx + sy * sy < 0.045 * 0.045) return SOFT

  return bg
}

mkdirSync(new URL('../public/', import.meta.url), { recursive: true })
const out = (name, size) =>
  writeFileSync(new URL(`../public/${name}`, import.meta.url), encodePng(size, scene))

out('pwa-192x192.png', 192)
out('pwa-512x512.png', 512)
out('apple-touch-icon.png', 180)
console.log('Icônes générées : pwa-192x192, pwa-512x512, apple-touch-icon 💗')
