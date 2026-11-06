// Builds every static SVG used by README.md into ./assets.
// Run: node scripts/build-assets.mjs
import { T, SANS, MONO, esc, tw, wrap, icon, card, chip, chipRow, write, rng, BRAND_DEFS } from './lib.mjs';
import { profile, highlights, stackRings, experience, projects, artifacts, pipeline, education, sections } from './profile.data.mjs';

/* ---------------- Hero ---------------- */
function hero() {
  const W = 1200, H = 460, R = rng(11);
  let stars = '';
  for (let i = 0; i < 48; i++) {
    const x = (R() * W).toFixed(1), y = (R() * H).toFixed(1), r = (R() * 1.2 + 0.4).toFixed(2);
    stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" class="tw" style="animation-delay:${(R() * 4).toFixed(2)}s;animation-duration:${(2 + R() * 3).toFixed(2)}s"/>`;
  }

  // Terminal lines, typed one after another with an animated clip.
  const TX = 712, TY = 120, LH = 30, CW = 9;
  const lines = [
    { p: 'whoami' },
    { o: 'mohammad usama · frontend & web app dev', c: T.sub },
    { p: 'cat stack.txt' },
    { o: 'react  next.js  react-native  typescript', c: '#93C5FD' },
    { p: 'uptime --career' },
    { o: '3+ years · 2 companies · 8+ projects', c: T.sub },
    { p: 'npm run build -- --scalable' },
    { o: '✓ compiled successfully · ready to ship', c: T.green },
    { p: '', cursor: true },
  ];
  let t = 0.6, clips = '', term = '';
  lines.forEach((l, i) => {
    const y = TY + i * LH;
    const text = l.p !== undefined ? `~ $ ${l.p}` : l.o;
    const w = text.length * CW + 4;
    const dur = l.p !== undefined ? Math.max(0.05, l.p.length * 0.05) : 0.2;
    clips += `<clipPath id="c${i}"><rect x="${TX - 2}" y="${y - 20}" height="28" width="0"><animate attributeName="width" from="0" to="${w}" begin="${t.toFixed(2)}s" dur="${dur.toFixed(2)}s" fill="freeze"/></rect></clipPath>`;
    const body = l.p !== undefined
      ? `<tspan fill="${T.cyan}">~</tspan><tspan fill="${T.violet}"> $ </tspan><tspan fill="${T.text}">${esc(l.p)}</tspan>`
      : `<tspan fill="${l.c}">${esc(l.o)}</tspan>`;
    term += `<text x="${TX}" y="${y}" class="mono" font-size="15" xml:space="preserve" clip-path="url(#c${i})">${body}</text>`;
    if (l.cursor) {
      term += `<g opacity="0"><animate attributeName="opacity" to="1" begin="${t.toFixed(2)}s" dur=".01s" fill="freeze"/>
        <rect x="${TX + 4 * CW + 2}" y="${y - 15}" width="9" height="19" fill="${T.cyan}"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.5;.5;1" dur="1s" repeatCount="indefinite"/></rect></g>`;
    }
    t += dur + (l.p !== undefined ? 0.35 : 0.25);
  });

  const statusW = tw(profile.status, 14) + 50;
  const techColors = ['#61DAFB', '#FFFFFF', '#38BDF8', '#3178C6'];
  let cx = 64, techChips = '';
  profile.heroStack.forEach((s, i) => { const [svg, w] = chip(cx, 356, s, { color: techColors[i], dot: true, size: 14, h: 32 }); techChips += svg; cx += w + 10; });

  const meta = [['pin', profile.location], ['briefcase', profile.company], ['clock', profile.experience]];
  let mx = 64, metaSvg = '';
  for (const [ic, label] of meta) {
    metaSvg += icon(ic, mx, 411, 17, T.muted) + `<text x="${mx + 25}" y="${425}" font-size="14" fill="${T.sub}">${esc(label)}</text>`;
    mx += 25 + tw(label, 14) + 26;
  }

  const body = `
  <g filter="url(#aur)" opacity=".9">
    <ellipse class="a1" cx="230" cy="90" rx="280" ry="150" fill="#7C3AED" opacity=".42"/>
    <ellipse class="a2" cx="760" cy="380" rx="300" ry="140" fill="#2563EB" opacity=".32"/>
    <ellipse class="a3" cx="1080" cy="80" rx="220" ry="140" fill="#0891B2" opacity=".34"/>
  </g>
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#fadeMask)"/>
  ${stars}

  <g>
    <rect x="64" y="56" width="${statusW}" height="32" rx="16" fill="${T.green}" fill-opacity=".09" stroke="${T.green}" stroke-opacity=".35"/>
    <circle cx="84" cy="72" r="4" fill="${T.green}"/>
    <circle cx="84" cy="72" r="4" fill="none" stroke="${T.green}" stroke-width="2"><animate attributeName="r" values="4;12" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2s" repeatCount="indefinite"/></circle>
    <text x="98" y="77" font-size="14" fill="#A7F3D0">${esc(profile.status)}</text>
  </g>
  <text x="64" y="142" class="mono" font-size="15" letter-spacing="4" fill="${T.muted}">HELLO, I'M</text>
  <text x="62" y="214" font-size="66" font-weight="800" letter-spacing="-1.5" fill="url(#nameG)">${esc(profile.name)}</text>
  <text x="64" y="262" font-size="28" font-weight="600" fill="url(#brand)">${esc(profile.role)}</text>
  ${profile.pitch.map((l, i) => `<text x="64" y="${306 + i * 26}" font-size="18" fill="${T.sub}">${esc(l)}</text>`).join('')}
  ${techChips}
  ${metaSvg}

  <g class="term">
    <rect x="700" y="64" width="430" height="330" rx="20" fill="#7C3AED" opacity=".35" filter="url(#aur)"/>
    <rect x="690" y="52" width="450" height="356" rx="16" fill="#0A1022" fill-opacity=".9" stroke="#2A3766"/>
    <path d="M690 92h450" stroke="#1F2B52"/>
    <circle cx="714" cy="72" r="6" fill="#FF5F57"/><circle cx="734" cy="72" r="6" fill="#FEBC2E"/><circle cx="754" cy="72" r="6" fill="#28C840"/>
    <text x="915" y="77" class="mono" font-size="13" fill="${T.muted}" text-anchor="middle">usama@karachi: ~/profile</text>
    ${term}
  </g>`;

  const defs = `
    <linearGradient id="nameG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#E0E7FF"/><stop offset="1" stop-color="#C4B5FD"/></linearGradient>
    <filter id="aur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" stroke="#fff" stroke-opacity=".05"/></pattern>
    <radialGradient id="fade" cx=".5" cy=".45" r=".65"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="fadeMask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
    ${clips}`;
  const style = `
    .tw{animation:tw 3s ease-in-out infinite}@keyframes tw{0%,100%{opacity:.12}50%{opacity:.85}}
    .a1{animation:d1 16s ease-in-out infinite}.a2{animation:d2 19s ease-in-out infinite}.a3{animation:d3 13s ease-in-out infinite}
    @keyframes d1{50%{transform:translate(160px,70px)}}@keyframes d2{50%{transform:translate(-180px,-60px)}}@keyframes d3{50%{transform:translate(-120px,90px)}}
    .term{animation:float 7s ease-in-out infinite}@keyframes float{50%{transform:translateY(-8px)}}`;
  write('hero.svg', card(W, H, body, { r: 26, glow: false, defs, style, title: `${profile.name} — ${profile.role}` }));
}

/* ---------------- Section headers ---------------- */
function sectionHeader(s, i) {
  const W = 1200, H = 100;
  const n = String(i + 1).padStart(2, '0');
  const lx = Math.round(66 + tw(s.title, 34) * 1.08 + 28);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img">
<title>${esc(s.title)}</title>
<defs>
  <linearGradient id="deep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7C3AED"/><stop offset=".55" stop-color="#2A78D6"/><stop offset="1" stop-color="#0E9FB8"/></linearGradient>
  <linearGradient id="comet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2A78D6" stop-opacity="0"/><stop offset=".8" stop-color="#22D3EE"/><stop offset="1" stop-color="#fff"/></linearGradient>
  <linearGradient id="rule" x1="${lx}" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8B949E" stop-opacity=".5"/><stop offset="1" stop-color="#8B949E" stop-opacity="0"/></linearGradient>
  <clipPath id="lane"><rect x="${lx}" y="64" width="${W - lx}" height="8"/></clipPath>
</defs>
<style>text{font-family:${SANS}}.mono{font-family:${MONO}}</style>
<circle cx="24" cy="60" r="22" fill="#7C3AED" fill-opacity=".08" stroke="url(#deep)" stroke-width="1.5"/>
<text x="24" y="65.5" text-anchor="middle" class="mono" font-size="15" font-weight="700" fill="url(#deep)">${n}</text>
<text x="66" y="44" class="mono" font-size="13" letter-spacing="2.5" fill="#8B949E">// ${esc(s.kicker.toUpperCase())} — ${esc(s.note)}</text>
<text x="65" y="82" font-size="34" font-weight="700" letter-spacing="-.5" fill="url(#deep)">${esc(s.title)}</text>
<path d="M${lx} 68.5H${W - 4}" stroke="url(#rule)" stroke-width="1.5"/>
<g clip-path="url(#lane)"><rect y="67" width="160" height="3" rx="1.5" fill="url(#comet)"><animate attributeName="x" from="${lx - 160}" to="${W}" dur="4s" begin="${(i * 0.37).toFixed(2)}s" repeatCount="indefinite"/></rect></g>
</svg>`;
  write(`section-${s.id}.svg`, svg);
}

/* ---------------- Highlights strip ---------------- */
function highlightsStrip() {
  const W = 1200, H = 186, gap = 20, tileW = (W - 64 - gap * 3) / 4;
  const colors = [T.violet, T.cyan, T.amber, T.pink];
  const body = highlights.map((h, i) => {
    const x = 32 + i * (tileW + gap), y = 26, c = colors[i];
    return `<g class="rise" style="animation-delay:${(0.15 + i * 0.12).toFixed(2)}s">
      <rect x="${x}" y="${y}" width="${tileW}" height="134" rx="18" fill="${T.panel}" fill-opacity=".75" stroke="${T.stroke}"/>
      <rect x="${x + 20}" y="${y + 20}" width="44" height="44" rx="12" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-opacity=".4"/>
      ${icon(h.icon, x + 31, y + 31, 22, c)}
      <text x="${x + 78}" y="${y + 39}" font-size="15" font-weight="600" fill="${T.text}">${esc(h.label)}</text>
      <text x="${x + 78}" y="${y + 58}" class="mono" font-size="11.5" fill="${T.muted}">${esc(h.note)}</text>
      <text x="${x + 18}" y="${y + 116}" font-size="46" font-weight="800" letter-spacing="-1" fill="url(#brand)">${esc(h.value)}</text>
      <path d="M${x + 20 + tw(h.value, 46) * 1.1 + 14} ${y + 104}h${tileW - 60 - tw(h.value, 46) * 1.1}" stroke="${c}" stroke-opacity=".25" stroke-dasharray="2 5"/>
    </g>`;
  }).join('');
  const style = '.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}@keyframes rise{from{opacity:0;transform:translateY(14px)}}';
  write('highlights.svg', card(W, H, body, { style, title: 'Highlights' }));
}

/* ---------------- About: editor window with live preview ---------------- */
function about() {
  const W = 1200, H = 548;
  const K = { kw: '#C792EA', type: '#22D3EE', prop: '#93C5FD', str: '#A5E3A0', pun: '#8A94B8', com: '#5C6890', id: '#F1F5FF' };
  const prop = (k, v) => [['  ' + k, K.prop], [': ', K.pun], [v, K.str], [',', K.pun]];
  const arr = (k, items) => [['  ' + k, K.prop], [': [', K.pun], ...items.flatMap((v, i) => [[`"${v}"`, K.str], [i < items.length - 1 ? ', ' : '', K.pun]]), ['],', K.pun]];
  const code = [
    [['// about.ts — the short version', K.com]],
    [],
    [['const ', K.kw], ['usama', K.id], [': ', K.pun], ['Developer', K.type], [' = {', K.pun]],
    prop('name', `"${profile.name}"`),
    prop('role', '"Web & Mobile App Developer"'),
    prop('experience', `"${profile.experience}"`),
    prop('basedIn', `"${profile.location}"`),
    prop('currently', `"${profile.company}"`),
    arr('stack', profile.heroStack),
    arr('domains', ['ERP', 'POS', 'DMS', 'Inventory']),
    prop('education', '"BS Computer Science, FUUK"'),
    prop('superpower', '"complex logic → clean UI"'),
    [['};', K.pun]],
    [],
    [['export default ', K.kw], ['usama', K.id], [';', K.pun]],
  ];
  const Y0 = 96, LH = 28, ACTIVE = 11;
  const codeSvg = code.map((toks, i) => {
    const y = Y0 + i * LH;
    const num = `<text x="100" y="${y}" text-anchor="end" class="mono" font-size="14" fill="${i === ACTIVE ? T.sub : '#3B4670'}">${i + 1}</text>`;
    const txt = toks.length ? `<text x="124" y="${y}" class="mono" font-size="16" xml:space="preserve">${toks.map(([s, c]) => `<tspan fill="${c}">${esc(s)}</tspan>`).join('')}</text>` : '';
    return num + txt;
  }).join('');
  const activeLen = code[ACTIVE].reduce((n, [s]) => n + s.length, 0);

  const tabs = [['about.ts', '#3178C6', true], ['stack.json', T.amber, false], ['career.md', T.teal, false]];
  let tx = 56, tabSvg = '';
  for (const [name, c, active] of tabs) {
    const w = tw(name, 13, true) + 50;
    tabSvg += `<g>${active ? `<rect x="${tx}" y="0" width="${w}" height="44" fill="#0A1022"/><rect x="${tx}" y="0" width="${w}" height="2" fill="url(#brand)"/>` : ''}
      <rect x="${tx + 16}" y="17" width="10" height="10" rx="2.5" fill="${c}"/>
      <text x="${tx + 34}" y="27" class="mono" font-size="13" fill="${active ? T.text : T.muted}">${name}</text></g>`;
    tx += w;
  }

  const rows = [['pin', profile.location], ['briefcase', profile.company], ['clock', `${profile.experience} experience`], ['cap', 'BS Computer Science']];
  const [pChips] = chipRow(866, 448, ['React', 'Next.js', 'RN', 'TS'], 1150, { size: 12, h: 24, color: T.sky });

  const body = `
  <rect x="0" y="0" width="${W}" height="44" fill="#080D1C"/>
  ${tabSvg}
  <text x="${W - 20}" y="27" text-anchor="end" class="mono" font-size="12" fill="${T.muted}">${profile.login} / profile</text>
  <rect x="0" y="44" width="56" height="${H - 74}" fill="#080D1C"/>
  <rect x="56" y="44" width="${W - 56}" height="${H - 74}" fill="#0A1022" fill-opacity=".72"/>
  <rect x="0" y="62" width="2" height="36" fill="url(#brandV)"/>
  ${['files', 'search', 'git', 'grid'].map((n, i) => icon(n, 16, 68 + i * 52, 24, i === 0 ? T.text : '#3B4670')).join('')}
  ${icon('user', 16, H - 76, 24, '#3B4670')}
  <rect x="56" y="${Y0 + ACTIVE * LH - 20}" width="756" height="28" fill="#fff" fill-opacity=".035"/>
  ${codeSvg}
  <rect x="${124 + activeLen * 9.6 + 1}" y="${Y0 + ACTIVE * LH - 16}" width="2" height="21" fill="${T.cyan}"><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.5;.5;1" dur="1.1s" repeatCount="indefinite"/></rect>

  <path d="M812 44V${H - 30}" stroke="${T.stroke}"/>
  <rect x="832" y="64" width="340" height="430" rx="18" fill="${T.panel}" stroke="${T.stroke}"/>
  <circle cx="856" cy="88" r="4" fill="${T.green}"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="868" y="92" class="mono" font-size="11" letter-spacing="2" fill="${T.muted}">LIVE PREVIEW</text>
  <circle cx="1002" cy="172" r="58" stroke="url(#brand)" stroke-width="1.5" stroke-dasharray="5 9" class="spin"/>
  <circle cx="1002" cy="172" r="46" fill="url(#brand)"/>
  <text x="1002" y="183" text-anchor="middle" font-size="32" font-weight="800" fill="#0B1124">MU</text>
  <text x="1002" y="258" text-anchor="middle" font-size="22" font-weight="700" fill="${T.text}">${esc(profile.name)}</text>
  <text x="1002" y="283" text-anchor="middle" font-size="14" fill="${T.sub}">Web &amp; Mobile App Developer</text>
  <path d="M862 304H1142" stroke="${T.stroke}"/>
  ${rows.map(([ic, label], i) => icon(ic, 866, 322 + i * 30, 17, T.violet) + `<text x="894" y="${336 + i * 30}" font-size="14" fill="${T.sub}">${esc(label)}</text>`).join('')}
  ${pChips}

  <rect x="0" y="${H - 30}" width="${W}" height="30" fill="url(#status)"/>
  ${icon('git', 14, H - 23, 15, '#fff')}
  <text x="36" y="${H - 10}" class="mono" font-size="12" fill="#fff">main</text>
  <text x="90" y="${H - 10}" class="mono" font-size="12" fill="#fff">✓ 0 problems</text>
  <text x="${W - 16}" y="${H - 10}" text-anchor="end" class="mono" font-size="12" fill="#fff" xml:space="preserve">Ln ${ACTIVE + 1}, Col ${activeLen + 1}    Spaces: 2    UTF-8    TypeScript React</text>`;
  const defs = `<linearGradient id="status" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2A78D6"/><stop offset="1" stop-color="#7C3AED"/></linearGradient>`;
  const style = '.spin{transform-origin:1002px 172px;animation:spin 24s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}';
  write('about.svg', card(W, H, body, { r: 18, glow: false, defs, style, title: 'About Mohammad Usama' }));
}

/* ---------------- Stack orbit ---------------- */
function stackOrbit() {
  const W = 1200, H = 500, cx = 600, cy = 250;
  const radii = [[210, 82], [365, 138], [520, 196]];
  let rings = '', pills = '';
  stackRings.forEach((ring, ri) => {
    const [rx, ry] = radii[ri];
    const path = `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
    rings += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke="${ring.color}" stroke-opacity=".28" stroke-dasharray="2 7"/>`;
    ring.items.forEach((label, i) => {
      const w = Math.round(tw(label, 13) + 34);
      const begin = -(ring.dur * i / ring.items.length).toFixed(2);
      pills += `<g>
        <animateMotion dur="${ring.dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>
        <animate attributeName="opacity" values="1;1;.38;1" keyTimes="0;.5;.75;1" dur="${ring.dur}s" begin="${begin}s" repeatCount="indefinite"/>
        <rect x="${-w / 2}" y="-15" width="${w}" height="30" rx="15" fill="${T.panel}" stroke="${ring.color}" stroke-opacity=".6"/>
        <circle cx="${-w / 2 + 13}" cy="0" r="3.5" fill="${ring.color}"/>
        <text x="${-w / 2 + 23}" y="4.5" font-size="13" fill="${T.text}">${esc(label)}</text>
      </g>`;
    });
  });
  let lx = 32, legend = '';
  stackRings.forEach((r) => {
    legend += `<circle cx="${lx + 5}" cy="${H - 31}" r="4" fill="${r.color}"/><text x="${lx + 16}" y="${H - 27}" class="mono" font-size="12" fill="${T.muted}">${esc(r.name)}</text>`;
    lx += tw(r.name, 12, true) + 40;
  });
  const atom = [0, 60, 120].map((a) => `<ellipse cx="${cx}" cy="${cy}" rx="36" ry="13.5" stroke="#61DAFB" stroke-width="2.2" transform="rotate(${a} ${cx} ${cy})"/>`).join('');
  const body = `
  <text x="32" y="44" class="mono" font-size="13" fill="${T.muted}">// stack.orbit()</text>
  <text x="${W - 32}" y="44" text-anchor="end" class="mono" font-size="13" fill="${T.muted}">react at the core</text>
  ${rings}
  <circle cx="${cx}" cy="${cy}" r="96" fill="url(#halo)"/>
  <circle cx="${cx}" cy="${cy}" r="56" fill="${T.panel}" stroke="url(#brand)" stroke-width="1.5"/>
  <g class="atom">${atom}<circle cx="${cx}" cy="${cy}" r="5" fill="#61DAFB"/></g>
  ${pills}
  ${legend}`;
  const defs = `<radialGradient id="halo"><stop offset="0" stop-color="#61DAFB" stop-opacity=".28"/><stop offset="1" stop-color="#61DAFB" stop-opacity="0"/></radialGradient>`;
  const style = `.atom{transform-origin:${cx}px ${cy}px;animation:spin 16s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`;
  write('stack-orbit.svg', card(W, H, body, { defs, style, title: 'Tech stack orbit' }));
}

/* ---------------- Experience timeline ---------------- */
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
function fmtMonth(s) { const [y, m] = s.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; }
function duration(start, end) {
  const [y1, m1] = start.split('-').map(Number);
  const now = new Date();
  const [y2, m2] = end ? end.split('-').map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const total = (y2 - y1) * 12 + (m2 - m1) + 1;
  const y = Math.floor(total / 12), m = total % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
}
function experienceTimeline() {
  const W = 1200, CH = 186, GAP = 24, PAD = 32;
  const H = PAD * 2 + experience.length * CH + (experience.length - 1) * GAP;
  let body = `<rect x="55" y="${PAD + 40}" width="2" height="${H - 2 * PAD - CH}" fill="url(#brandV)" opacity=".7"/>`;
  experience.forEach((e, i) => {
    const y = PAD + i * (CH + GAP), cur = !e.end, c = cur ? T.green : T.violet;
    const dates = `${fmtMonth(e.start)} — ${e.end ? fmtMonth(e.end) : 'PRESENT'}`;
    const pw = tw(dates, 13, true) + 32 + (cur ? 16 : 0), px = W - 56 - pw;
    body += `
    ${cur ? `<circle cx="56" cy="${y + 40}" r="9" fill="none" stroke="${c}" stroke-width="2"><animate attributeName="r" values="9;20" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="2.2s" repeatCount="indefinite"/></circle>` : ''}
    <circle cx="56" cy="${y + 40}" r="9" fill="${T.bg1}" stroke="${c}" stroke-width="3"/>
    ${cur ? `<circle cx="56" cy="${y + 40}" r="3.5" fill="${c}"/>` : ''}
    <rect x="96" y="${y}" width="${W - 96 - 32}" height="${CH}" rx="18" fill="${T.panel}" fill-opacity=".8" stroke="${c}" stroke-opacity="${cur ? 0.4 : 0.22}"/>
    <text x="124" y="${y + 48}" font-size="24" font-weight="700" fill="${T.text}">${esc(e.role)}</text>
    <text x="124" y="${y + 76}" font-size="16" font-weight="600" fill="url(#brand)">${esc(e.company)}</text>
    <rect x="${px}" y="${y + 24}" width="${pw}" height="30" rx="15" fill="${c}" fill-opacity=".1" stroke="${c}" stroke-opacity=".4"/>
    ${cur ? `<circle cx="${px + 17}" cy="${y + 39}" r="4" fill="${c}"/>` : ''}
    <text x="${px + 16 + (cur ? 16 : 0)}" y="${y + 43.5}" class="mono" font-size="13" fill="${T.text}">${dates}</text>
    <text x="${W - 56}" y="${y + 76}" text-anchor="end" font-size="13" fill="${T.muted}">${esc(duration(e.start, e.end))} · ${esc(e.location)}</text>
    <path d="M124 ${y + 98}H${W - 56}" stroke="${T.stroke}"/>
    ${e.highlights.map((h, j) => {
      const hx = j % 2 ? 640 : 124, hy = y + 132 + Math.floor(j / 2) * 32;
      return `<circle cx="${hx + 9}" cy="${hy - 5}" r="10" fill="${c}" fill-opacity=".12"/>${icon('check', hx + 2, hy - 12, 14, c, 2.6)}<text x="${hx + 28}" y="${hy}" font-size="15" fill="${T.sub}">${esc(h)}</text>`;
    }).join('')}`;
  });
  write('experience.svg', card(W, H, body, { title: 'Professional experience' }));
}

/* ---------------- Project cards ---------------- */
function projectCard(p) {
  const W = 600, H = 340;
  const kw = tw(p.kind, 11, true) + 24;
  const desc = wrap(p.desc, 16, 536).slice(0, 3);
  const descEnd = 140 + (desc.length - 1) * 24;
  const [mods] = chipRow(32, descEnd + 26, p.modules, 568, { size: 12, h: 26, color: p.hue, gap: 7 });
  const [stack] = chipRow(32, 292, p.stack, 420, { size: 12, h: 26, color: '#94A3B8', mono: true, gap: 7 });
  const repoLine = p.repo
    ? `${icon('repo', 106, 78, 14, T.muted)}<text x="126" y="90" class="mono" font-size="13" fill="${T.muted}">usamaDev326/${esc(p.repo)}</text>`
    : `${icon('lock', 106, 78, 14, T.muted)}<text x="126" y="90" class="mono" font-size="13" fill="${T.muted}">client work · private</text>`;
  const cta = p.repo
    ? `<text x="${W - 32}" y="310" text-anchor="end" class="mono" font-size="13" fill="${p.hue}">view repo →</text>`
    : `<text x="${W - 32}" y="310" text-anchor="end" class="mono" font-size="13" fill="${T.muted}">in production</text>`;
  const body = `
  <circle cx="${W - 60}" cy="0" r="170" fill="${p.hue}" opacity=".16" filter="url(#blur)"/>
  <rect width="${W}" height="4" fill="url(#accent)"/>
  <rect x="32" y="34" width="56" height="56" rx="16" fill="${p.hue}" fill-opacity=".12" stroke="${p.hue}" stroke-opacity=".45"/>
  ${icon(p.icon, 46, 48, 28, p.hue)}
  <text x="106" y="64" font-size="22" font-weight="700" fill="${T.text}">${esc(p.title)}</text>
  ${repoLine}
  <rect x="${W - 32 - kw}" y="34" width="${kw}" height="24" rx="12" fill="${p.hue}" fill-opacity=".1" stroke="${p.hue}" stroke-opacity=".35"/>
  <text x="${W - 32 - kw / 2}" y="50" text-anchor="middle" class="mono" font-size="11" letter-spacing="1" fill="${p.hue}">${esc(p.kind)}</text>
  ${desc.map((l, i) => `<text x="32" y="${140 + i * 24}" font-size="16" fill="${T.sub}">${esc(l)}</text>`).join('')}
  ${mods}
  <path d="M32 276H${W - 32}" stroke="${T.stroke}"/>
  ${stack}
  ${cta}`;
  const defs = `<linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${p.hue}"/><stop offset="1" stop-color="${p.hue}" stop-opacity="0"/></linearGradient>`;
  write(`projects/${p.slug}.svg`, card(W, H, body, { r: 20, glow: false, defs, title: p.title }));
}

function artifactsCard() {
  const W = 1200, H = 300, a = artifacts, hue = T.pink;
  const desc = wrap(a.desc, 17, 640);
  const gameColors = [T.pink, T.amber, T.orange, T.violet, T.sky, T.teal];
  let gx = 40, gy = 172 + (desc.length - 1) * 26, games = '';
  a.games.forEach((g, i) => {
    const w = tw(g, 13) + 38;
    if (gx + w > 880) { gx = 40; gy += 38; }
    games += chip(gx, gy, g, { color: gameColors[i % gameColors.length], dot: true })[0];
    gx += w + 8;
  });
  const body = `
  <circle cx="980" cy="60" r="220" fill="#DB2777" opacity=".2" filter="url(#blur)"/>
  <circle cx="1120" cy="300" r="180" fill="#F59E0B" opacity=".14" filter="url(#blur)"/>
  <rect x="40" y="36" width="56" height="56" rx="16" fill="${hue}" fill-opacity=".12" stroke="${hue}" stroke-opacity=".45"/>
  ${icon('gamepad', 54, 50, 28, hue)}
  <text x="114" y="66" font-size="26" font-weight="700" fill="${T.text}">${esc(a.title)}</text>
  ${icon('repo', 114, 78, 14, T.muted)}<text x="134" y="90" class="mono" font-size="13" fill="${T.muted}">usamaDev326/${a.repo}</text>
  <g><rect x="${114 + tw(a.title, 26) * 1.06 + 16}" y="44" width="${tw('SHIPS DAILY', 11, true) + 11 + 40}" height="26" rx="13" fill="${T.green}" fill-opacity=".1" stroke="${T.green}" stroke-opacity=".4"/>
     <circle cx="${114 + tw(a.title, 26) * 1.06 + 32}" cy="57" r="3.5" fill="${T.green}"><animate attributeName="opacity" values="1;.25;1" dur="1.6s" repeatCount="indefinite"/></circle>
     <text x="${114 + tw(a.title, 26) * 1.06 + 42}" y="61.5" class="mono" font-size="11" letter-spacing="1" fill="${T.green}">SHIPS DAILY</text></g>
  ${desc.map((l, i) => `<text x="40" y="${136 + i * 26}" font-size="17" fill="${T.sub}">${esc(l)}</text>`).join('')}
  ${games}
  <text x="40" y="${H - 28}" class="mono" font-size="13" fill="${hue}">play them → github.com/usamaDev326/${a.repo}</text>

  <path d="M1000 205C1040 250 1060 270 1150 300" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" fill="none"/>
  <g class="kite">
    <path d="M1000 60L1046 128L1000 205L954 128Z" fill="url(#kite)"/>
    <path d="M1000 60V205M954 128H1046" stroke="#0B1124" stroke-opacity=".45" stroke-width="2"/>
    <path d="M1000 205c-8 14 8 22 0 36s8 22 0 34" stroke="${T.amber}" stroke-width="2.5" fill="none" class="tail"/>
    <path d="M994 228l6 6 6-6M994 256l6 6 6-6" stroke="${T.pink}" stroke-width="2.5" fill="none"/>
  </g>
  ${[[880, 70], [1120, 110], [900, 220], [1150, 50], [840, 150]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#fff" class="tw" style="animation-delay:${i * 0.6}s"/>`).join('')}`;
  const defs = `<linearGradient id="kite" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F472B6"/><stop offset=".5" stop-color="#FB923C"/><stop offset="1" stop-color="#FBBF24"/></linearGradient>`;
  const style = `.kite{transform-origin:1000px 205px;animation:sway 5s ease-in-out infinite}@keyframes sway{0%,100%{transform:rotate(-7deg) translate(0,0)}50%{transform:rotate(6deg) translate(10px,-10px)}}
    .tw{animation:tw 3s ease-in-out infinite}@keyframes tw{0%,100%{opacity:.15}50%{opacity:.9}}`;
  write('projects/artifacts.svg', card(W, H, body, { r: 20, glow: false, defs, style, title: a.title }));
}

/* ---------------- Pipeline: what I like building ---------------- */
function pipelineCard() {
  const W = 1200, H = 250, y = 124, x0 = 100, x1 = 1100, DUR = 7;
  const step = (x1 - x0) / (pipeline.length - 1);
  const cols = ['#A78BFA', '#8F98FB', '#7AA7FA', '#60A5FA', '#4FB8F5', '#3CC8EF', '#22D3EE'];
  const len = x1 - x0, dash = 160;
  const nodes = pipeline.map((p, i) => {
    const x = x0 + i * step, c = cols[i];
    const begin = ((i * step) / (len + dash) * DUR).toFixed(2);
    return `
    <circle cx="${x}" cy="${y}" r="30" fill="${c}" opacity="0"><animate attributeName="opacity" values="0;.4;0;0" keyTimes="0;.05;.2;1" dur="${DUR}s" begin="${begin}s" repeatCount="indefinite"/><animate attributeName="r" values="30;46;30;30" keyTimes="0;.05;.2;1" dur="${DUR}s" begin="${begin}s" repeatCount="indefinite"/></circle>
    <circle cx="${x}" cy="${y}" r="30" fill="${T.panel}" stroke="${c}" stroke-width="1.8"/>
    ${icon(p.icon, x - 12, y - 12, 24, c)}
    <text x="${x}" y="${y - 50}" text-anchor="middle" class="mono" font-size="12" fill="${T.muted}">${String(i + 1).padStart(2, '0')}</text>
    <text x="${x}" y="${y + 62}" text-anchor="middle" font-size="15" font-weight="600" fill="${T.text}">${esc(p.title[0])}</text>
    <text x="${x}" y="${y + 82}" text-anchor="middle" font-size="14" fill="${T.sub}">${esc(p.title[1])}</text>`;
  }).join('');
  const body = `
  <text x="32" y="38" class="mono" font-size="13" fill="${T.muted}">// requirement → production</text>
  <path d="M${x0} ${y}H${x1}" stroke="${T.stroke}" stroke-width="2"/>
  <path d="M${x0} ${y}H${x1}" stroke="url(#flow)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash} 3000">
    <animate attributeName="stroke-dashoffset" from="${dash}" to="${-len}" dur="${DUR}s" repeatCount="indefinite"/>
  </path>
  ${nodes}`;
  const defs = `<linearGradient id="flow" x1="${x0}" y1="0" x2="${x1}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#22D3EE"/></linearGradient>`;
  write('pipeline.svg', card(W, H, body, { defs, title: 'What I like building' }));
}

/* ---------------- Education ---------------- */
function educationCard() {
  const W = 1200, H = 250, e = education;
  const yw = tw(e.years, 13, true) + 30;
  const body = `
  <rect x="32" y="28" width="552" height="194" rx="18" fill="${T.panel}" fill-opacity=".8" stroke="${T.stroke}"/>
  <rect x="58" y="54" width="60" height="60" rx="17" fill="${T.violet}" fill-opacity=".12" stroke="${T.violet}" stroke-opacity=".45"/>
  ${icon('cap', 72, 68, 32, T.violet)}
  <text x="140" y="80" font-size="24" font-weight="700" fill="${T.text}">${esc(e.degree)}</text>
  <text x="140" y="106" font-size="16" font-weight="600" fill="url(#brand)">${esc(e.school)}</text>
  ${icon('pin', 140, 122, 15, T.muted)}<text x="162" y="134" font-size="14" fill="${T.muted}">${esc(e.city)}, Pakistan</text>
  <rect x="140" y="156" width="${yw}" height="30" rx="15" fill="${T.violet}" fill-opacity=".1" stroke="${T.violet}" stroke-opacity=".4"/>
  <text x="155" y="175.5" class="mono" font-size="13" fill="${T.text}">${esc(e.years)}</text>

  <rect x="616" y="28" width="552" height="194" rx="18" fill="${T.panel}" fill-opacity=".8" stroke="${T.stroke}"/>
  ${icon('award', 642, 50, 18, T.amber)}
  <text x="668" y="64" class="mono" font-size="12" letter-spacing="2.5" fill="${T.muted}">CERTIFICATIONS</text>
  ${e.certs.map((c, i) => `<circle cx="653" cy="${108 + i * 38}" r="11" fill="${T.green}" fill-opacity=".14"/>${icon('check', 646, 101 + i * 38, 14, T.green, 2.6)}<text x="676" y="${113 + i * 38}" font-size="16" fill="${T.text}">${esc(c)}</text>`).join('')}`;
  write('education.svg', card(W, H, body, { title: 'Education and certifications' }));
}

/* ---------------- Footer ---------------- */
function footer() {
  const W = 1200, H = 220;
  const wave = (y, amp, period) => {
    let d = `M0 ${y}`;
    for (let x = 0; x < W * 2; x += period) d += `q${period / 4} ${-amp} ${period / 2} 0t${period / 2} 0`;
    return d + `V${H}H0Z`;
  };
  const body = `
  <g class="w1"><path d="${wave(168, 16, 300)}" fill="url(#wv1)"/></g>
  <g class="w2"><path d="${wave(182, 12, 400)}" fill="url(#wv2)"/></g>
  <g class="w3"><path d="${wave(196, 9, 240)}" fill="url(#wv3)"/></g>
  <text x="${W / 2}" y="78" text-anchor="middle" font-size="34" font-weight="800" letter-spacing="-.5" fill="url(#brand)">Thanks for visiting</text>
  <text x="${W / 2}" y="112" text-anchor="middle" font-size="17" fill="${T.sub}">Building useful software, one feature at a time.</text>
  <text x="${W / 2}" y="142" text-anchor="middle" class="mono" font-size="12" fill="${T.muted}">made with hand-built svg · node · a daily github workflow</text>`;
  const g = (id, a, b, o) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${a}" stop-opacity="${o}"/><stop offset="1" stop-color="${b}" stop-opacity="${o}"/></linearGradient>`;
  const defs = g('wv1', '#7C3AED', '#2A78D6', 0.35) + g('wv2', '#2A78D6', '#22D3EE', 0.35) + g('wv3', '#8B5CF6', '#22D3EE', 0.5);
  const style = `.w1{animation:wv 18s linear infinite}.w2{animation:wv 26s linear infinite reverse}.w3{animation:wv 14s linear infinite}
    @keyframes wv{from{transform:translateX(0)}to{transform:translateX(-${W}px)}}`;
  write('footer.svg', card(W, H, body, { defs, style, title: 'Thanks for visiting' }));
}

hero();
sections.forEach(sectionHeader);
highlightsStrip();
about();
stackOrbit();
experienceTimeline();
projects.forEach(projectCard);
artifactsCard();
pipelineCard();
educationCard();
footer();
