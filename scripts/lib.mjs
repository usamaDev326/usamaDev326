// Shared theme, icons and SVG helpers for the profile assets.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const T = {
  bg0: '#060914', bg1: '#0B1124', panel: '#0F1733', panel2: '#131D3F',
  stroke: '#1F2B52', text: '#EEF1FA', sub: '#A6AFCF', muted: '#6B7699',
  violet: '#8B5CF6', indigo: '#6366F1', blue: '#2A78D6', sky: '#38BDF8',
  cyan: '#22D3EE', teal: '#2DD4BF', green: '#34D399', pink: '#F472B6',
  amber: '#FBBF24', rose: '#FB7185', orange: '#FB923C',
};

export const SANS = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";
export const MONO = "'JetBrains Mono', 'Cascadia Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rough text width so chips and lines can be laid out without a browser.
export function tw(str, size, mono = false) {
  if (mono) return str.length * size * 0.6;
  let w = 0;
  for (const ch of str) {
    if ('il.,:;\'|!ʼ'.includes(ch)) w += 0.28;
    else if (ch === ' ') w += 0.3;
    else if ('mwMW'.includes(ch)) w += 0.82;
    else if (/[A-Z]/.test(ch)) w += 0.66;
    else if (/[0-9]/.test(ch)) w += 0.56;
    else w += 0.56;
  }
  return w * size;
}

export function wrap(text, size, maxWidth) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (tw(next, size) > maxWidth && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

// 24x24 stroke icons (lucide style, drawn inline so nothing external can break).
export const ICONS = {
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65M22 12.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  cap: '<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  gamepad: '<path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><rect x="2" y="6" width="20" height="12" rx="4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  pin: '<path d="M20 10c0 4.99-5.53 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.53 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="6" width="20" height="14" rx="2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  repo: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  files: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  git: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  star: '<path d="M11.52 2.3a.53.53 0 0 1 .96 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.12 2.12 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0L6.4 21.01a.53.53 0 0 1-.77-.56l.88-5.13a2.12 2.12 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .3-.9l5.16-.76a2.12 2.12 0 0 0 1.6-1.16z"/>',
};

export const icon = (name, x, y, size = 24, color = T.sub, width = 2) =>
  `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;

export const BRAND_DEFS = `
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A78BFA"/><stop offset=".5" stop-color="#60A5FA"/><stop offset="1" stop-color="#22D3EE"/></linearGradient>
  <linearGradient id="brandV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#22D3EE"/></linearGradient>`;

// A dark, self-contained card. It reads well on both GitHub light and dark themes.
export function card(w, h, body, { r = 22, glow = true, defs = '', style = '', title = '' } = {}) {
  const g = Math.min(240, h * 0.9);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img">
<title>${esc(title)}</title>
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.bg1}"/><stop offset="1" stop-color="${T.bg0}"/></linearGradient>
  <linearGradient id="border" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B5CF6" stop-opacity=".6"/><stop offset=".45" stop-color="#1F2B52" stop-opacity=".7"/><stop offset="1" stop-color="#22D3EE" stop-opacity=".5"/></linearGradient>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" fill-opacity=".055"/></pattern>
  <clipPath id="clip"><rect width="${w}" height="${h}" rx="${r}"/></clipPath>
  <filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="48"/></filter>
  ${BRAND_DEFS}
  ${defs}
</defs>
<style>text{font-family:${SANS}}.mono{font-family:${MONO}}${style}</style>
<g clip-path="url(#clip)">
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  ${glow ? `<circle cx="${w * 0.06}" cy="0" r="${g}" fill="#7C3AED" opacity=".26" filter="url(#blur)"/><circle cx="${w * 0.96}" cy="${h}" r="${g}" fill="#0891B2" opacity=".22" filter="url(#blur)"/>` : ''}
  ${body}
</g>
<rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="${r - 0.75}" stroke="url(#border)" stroke-width="1.5"/>
</svg>`;
}

// Small rounded label. Returns [svg, width].
export function chip(x, y, label, { color = T.sky, size = 13, h = 28, mono = false, dot = false } = {}) {
  const pad = 13;
  const w = Math.round(tw(label, size, mono) + pad * 2 + (dot ? 14 : 0));
  const svg = `<g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="${h / 2}" fill="${color}" fill-opacity=".1" stroke="${color}" stroke-opacity=".38"/>
    ${dot ? `<circle cx="${pad + 3}" cy="${h / 2}" r="3.5" fill="${color}"/>` : ''}
    <text x="${pad + (dot ? 14 : 0)}" y="${h / 2 + size * 0.36}" font-size="${size}" fill="${T.text}" fill-opacity=".92"${mono ? ' class="mono"' : ''}>${esc(label)}</text>
  </g>`;
  return [svg, w];
}

// Lays out chips left to right, wrapping at maxX. Returns [svg, bottomY].
export function chipRow(x, y, labels, maxX, opts = {}) {
  const gap = opts.gap ?? 8, h = opts.h ?? 28;
  let cx = x, cy = y, out = '';
  for (const label of labels) {
    const w = tw(label, opts.size ?? 13, opts.mono) + 26 + (opts.dot ? 14 : 0);
    if (cx + w > maxX && cx > x) { cx = x; cy += h + gap; }
    const [svg, cw] = chip(cx, cy, label, opts);
    out += svg;
    cx += cw + gap;
  }
  return [out, cy + h];
}

export function write(name, svg) {
  const p = join(ROOT, 'assets', name);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, svg.trim() + '\n');
  console.log('wrote assets/' + name);
}

// Deterministic pseudo-random so rebuilt assets don't churn in git.
export function rng(seed = 7) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
