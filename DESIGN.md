# DESIGN.md — Pesantren Al-Imam Al-Islami (PPDB)

Design system hasil Fase 1 restyle UI. Berlaku untuk seluruh perubahan lapisan
presentasi (className/Tailwind, CSS, layout, komponen visual, animasi) di repo ini.

**Keputusan yang disetujui pemilik project (2026-10-29):**
- Peran referensi: **Kombinasi** — zcode.z.ai (struktur: navbar glass, announcement
  pill, hairline), tilas.vercel.app (nuansa: hangat, editorial, flat border-driven),
  ngodingpakeai.com/pricing (pola halaman paket/biaya).
- Kedalaman: **flat + hairline** (default; bisa ditinjau ulang).
- Efek dekoratif lama (glow-blob, glow-ring, gradient-text, hover-lift besar,
  glass berat): **dihapus semua**. Glass hanya tersisa di navbar saat scroll.

**ATURAN MUTLAK:** warna brand, konten/teks/data/gambar/link, metadata SEO, logika
bisnis, routing, API, database, autentikasi, state, dan validasi form TIDAK
berubah. Mode terang/gelap tidak ditambah/dikurangi. Tidak ada dependency baru.

---

## 1. Identitas brand — TERKUNCI (dipakai apa adanya)

| Token | Nilai | Keterangan |
|---|---|---|
| `--primary` | `#E11D74` | Rose Pink Al-Imam (khusus putri) |
| `--secondary` | `#0977E6` | Biru khas Ulul Albaab |
| `--bg` | `#fafaf9` | Latar utama |
| `--text-main` | `#1a1a1a` | Teks utama |
| Font sans | Plus Jakarta Sans | via `next/font`, tidak diganti |
| Font Arab | Amiri | tidak diganti |

Sumber nilai: `src/app/globals.css` (`:root`) dan `src/config/branding.ts`
(`primaryColor`/`secondaryColor`, dapat dioverride env `NEXT_PUBLIC_*`).

## 2. Prinsip visual

1. **Tenang dan berwibawa** — tanpa neon/glow, tanpa animasi ramai.
2. **Kedalaman dari border & layering, bukan bayangan** — kartu flat, border 1px,
   shadow sangat halus.
3. **Satu aksen per bagian** — rose pink sebagai aksen utama, biru hanya untuk
   tautan/sekunder; jangan keduanya bersamaan pada satu elemen.
4. **Hirarki dari ukuran & weight, bukan warna** — H3 ke bawah warna tinta.
5. **Pill untuk aksi & info.**

## 3. Design tokens

### Radius
`sm` 8 (input/badge kecil) · `md` 10 (tombol kecil, nav, tabel) · `lg` 12
(**kartu standar**) · `xl` 16 (panel/bento/hero) · `2xl` 20 (modal) · `full`
(tombol, badge, pill). Kartu turun dari 20–32px → **12–16px**; tombol tetap pill.

### Shadow (netral)
`xs` `0 1px 2px rgba(0,0,0,.05)` (rest) · `sm` `0 1px 3px rgba(0,0,0,.06), 0 1px
2px rgba(0,0,0,.04)` (hover) · `md` `0 4px 12px -2px rgba(0,0,0,.08)`
(dropdown) · `lg` `0 12px 28px -6px rgba(0,0,0,.12)` (modal) · hairline `inset 0
0.5px 0 rgba(255,255,255,.12)` untuk tombol/panel gelap. Colored glow
(`--shadow-maroon*` dsb.) tidak dipakai lagi pada elemen baru.

### Border
Terang: `1px solid ink-200`/`surface-200`; hover kartu: `primary-200` (rose).
Section gelap: `rgba(255,255,255,.1)`.

### Tipografi (font tidak berubah)
H1 800/−0.03em ink-950 (maks 1 frasa aksen warna solid) · H2 700/−0.025em ·
H3 700 ink-900 (bukan primary) · H4–H6 600 ink-800 · body 400–450/1.7 ink-600 ·
small ink-500 · label kecil 600–700, tracking **0.04–0.06em** (turun dari
0.1–0.15em/800). `text-gradient-*` → warna solid brand.

### Spacing
Section `clamp(4rem, 8vw, 6.5rem)` · container `max-w-6xl px-4 sm:px-6 lg:px-8` ·
kartu `p-6`, panel `p-8`, grid `gap-4 sm:gap-6`.

### Motion
150/200/250ms, `cubic-bezier(0,0,0.2,1)`; hover kartu = border + shadow naik,
**tanpa translateY** (kartu-link boleh −1px). HAPUS: lift massal, rotate ikon,
shimmer, marquee, shine-hover. Scroll-reveal fade+12px sekali per section.
**WAJIB** `prefers-reduced-motion: reduce` mematikan semua animasi/transition.

## 4. Komponen dasar

- **Button**: primary = pill solid rose `#E11D74`, shadow-xs, hover satu shade
  lebih gelap, active `scale(.98)`; secondary = pill putih border `ink-200`,
  hover `bg-primary-50`; ghost = teks ink-600 hover `bg-surface-100`.
- **Card**: putih, border 1px, radius 12/16, `shadow-xs`; hover interaktif:
  border `primary-200` + `shadow-sm`.
- **Badge/SectionLabel**: pill, 600–700, tracking 0.04–0.06em, tint `*-100` +
  teks `*-700`.
- **Input**: border `ink-200`, radius 10; focus border primary + ring
  `0 0 0 3px rgba(225,29,116,.12)`.
- **Navbar** (zcode): sticky h-16, transparan → scroll: `bg-white/85`
  `backdrop-blur(12px)` + border-b hairline; link aktif ink-900 + garis bawah
  2px primary; CTA pill primary; mobile hamburger 200ms.
- **Announcement pill**: pill ber-border di atas H1 untuk info PPDB (gaya elemen
  yang sudah ada, tanpa menambah teks).
- **Footer**: border-t hairline, link `text-sm` ink-500 hover ink-800.
- **Halaman paket/biaya**: pola npai/pricing (header tengah, tier kartu border
  1px radius 16, unggulan = border 2px primary + badge pill + tint `primary-50`,
  harga besar weight 800 + coret, daftar centang, CTA full-width mobile).

## 5. Do & Don't

**Do**: whitespace lega; kontras AA; `:focus-visible` ring; `tabular-nums` untuk
angka; uji 375/768/1440.
**Don't**: gradient berlapis; glow/neon; lift besar; uppercase tracking lebar;
shadow berwarna; `cursor:pointer` global; `table{display:block}` global.

## 6. Mapping kelas lama → arah baru

| Kelas/efek lama | Arah baru |
|---|---|
| `.btn-primary-maroon`/gradient + colored shadow | sesuaikan ke primary solid rose (warna live repo ini) |
| `.app-card`/`.card-cream` hover −3/−4px | radius 12/16, border, hover border+shadow |
| `.glow-blob-*`, `.glow-ring-*`, `.shimmer`, `.shine-hover`, marquee | hapus dari halaman (bertahap) |
| `.glass`/`.glass-panel-*` | hanya navbar & overlay; blur 12px |
| `.section-label` 800/0.1em | 700/0.06em |
| `.text-gradient-*`/`.gradient-text-*` | warna solid brand |
| H3–H5 warna primary | ink-900/ink-800 |
| `.icon-box` rotate(3deg) | tanpa transform |
| `.hover-lift*` | deprecated |
| `* { cursor: pointer !important }` | hapus |

## 7. Dial project ini

Website publik pesantren: **VARIANCE sedang · MOTION rendah-sedang · DENSITY
sedang**. Nuansa rose dipertahankan lewat warna solid & tint lembut, bukan
glow — kesan tetap lembut dan anggun tanpa efek ramai.

## 8. Rencana eksekusi (Fase 2)

1. Branch `ui/restyle-alandalus-alimam` dari `main`; commit pertama: DESIGN.md +
   konsolidasi token `globals.css`.
2. Commit bertahap: layout global → komponen bersama → per halaman.
3. QA: lint/typecheck/build + screenshot 375/768/1440.
4. Laporan lalu berhenti menunggu persetujuan.
