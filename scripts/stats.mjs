// Fetches live GitHub data and writes assets/generated/{stats,languages}.svg.
// Run: node scripts/stats.mjs   (GITHUB_TOKEN is optional, it only raises the rate limit)
import { T, esc, tw, icon, card, write } from './lib.mjs';
import { profile } from './profile.data.mjs';

const LOGIN = process.env.PROFILE_LOGIN || profile.login;
const EXCLUDE_LANGS = ['Jupyter Notebook'];
const LANG_COLORS = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', HTML: '#E34C26', CSS: '#8F6BD1', SCSS: '#C6538C',
  Python: '#3572A5', 'C#': '#4FB06A', Java: '#B07219', Shell: '#89E051', Vue: '#41B883', Dart: '#00B4AB',
};
const headers = { 'User-Agent': `${LOGIN}-profile-stats`, Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(url, json = true) {
  const res = await fetch(url, { headers: json ? headers : { 'User-Agent': headers['User-Agent'] } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return json ? res.json() : res.text();
}

/* ---------------- Data ---------------- */
async function contributions() {
  const html = await get(`https://github.com/users/${LOGIN}/contributions`, false);
  const counts = new Map();
  for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = m[2].match(/^(\d[\d,]*) contributions?/);
    counts.set(m[1], n ? Number(n[1].replace(/,/g, '')) : 0);
  }
  const days = [];
  for (const m of html.matchAll(/<td[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g)) {
    const id = m[0].match(/\bid="([^"]+)"/)?.[1];
    days.push({ date: m[1], count: counts.get(id) ?? 0 });
  }
  if (days.length < 300) throw new Error(`Only parsed ${days.length} contribution days; GitHub markup may have changed.`);
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

async function repos() {
  const list = await get(`https://api.github.com/users/${LOGIN}/repos?per_page=100&type=owner`);
  const own = list.filter((r) => !r.fork);
  const bytes = {};
  for (const r of own) {
    const langs = await get(`https://api.github.com/repos/${LOGIN}/${r.name}/languages`);
    for (const [k, v] of Object.entries(langs)) if (!EXCLUDE_LANGS.includes(k)) bytes[k] = (bytes[k] || 0) + v;
  }
  return { count: own.length, bytes };
}

function summarise(days) {
  const total = days.reduce((n, d) => n + d.count, 0);
  const active = days.filter((d) => d.count > 0).length;
  const best = days.reduce((b, d) => (d.count > b.count ? d : b), days[0]);
  let longest = 0, run = 0;
  for (const d of days) { run = d.count ? run + 1 : 0; longest = Math.max(longest, run); }
  let i = days.length - 1, current = 0;
  if (days[i].count === 0) i--; // today may simply not have happened yet
  for (; i >= 0 && days[i].count > 0; i--) current++;
  const weeks = [];
  const start = Date.parse(days[0].date);
  for (const d of days) {
    const w = Math.floor((Date.parse(d.date) - start) / 864e5 / 7);
    (weeks[w] ||= { date: d.date, count: 0 }).count += d.count;
  }
  const weekday = Array(7).fill(0);
  for (const d of days) weekday[new Date(d.date + 'T00:00:00Z').getUTCDay()] += d.count;
  return { total, active, best, longest, current, weeks, weekday, span: days.length, from: days[0].date, to: days.at(-1).date };
}

/* ---------------- Rendering ---------------- */
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${MON[m - 1]} ${d}, ${y}`; };
const today = new Date().toISOString().slice(0, 10);

function statsSvg(s, repoCount) {
  const W = 1200, H = 420;
  const tiles = [
    ['flame', T.orange, 'Current streak', s.current, s.current === 1 ? 'day' : 'days'],
    ['trophy', T.amber, 'Longest streak', s.longest, s.longest === 1 ? 'day' : 'days'],
    ['activity', T.violet, 'Contributions', s.total.toLocaleString('en-US'), 'last 12 mo'],
    ['calendar', T.cyan, 'Active days', s.active, `of ${s.span}`],
    ['star', T.pink, 'Best day', s.best.count, s.best.count ? fmt(s.best.date) : '—'],
    ['repo', T.green, 'Public repos', repoCount, 'not forks'],
  ];
  const tilesSvg = tiles.map(([ic, c, label, value, unit], i) => {
    const x = 32 + (i % 2) * 252, y = 28 + Math.floor(i / 2) * 124;
    const vw = tw(String(value), 38) * 1.08;
    return `<g class="rise" style="animation-delay:${(i * 0.08).toFixed(2)}s">
      <rect x="${x}" y="${y}" width="236" height="108" rx="16" fill="${T.panel}" fill-opacity=".8" stroke="${T.stroke}"/>
      <rect x="${x + 16}" y="${y + 16}" width="30" height="30" rx="9" fill="${c}" fill-opacity=".14"/>
      ${icon(ic, x + 22, y + 22, 18, c)}
      <text x="${x + 56}" y="${y + 36}" font-size="13" fill="${T.sub}">${esc(label)}</text>
      <text x="${x + 18}" y="${y + 88}" font-size="38" font-weight="800" letter-spacing="-1" fill="url(#brand)">${esc(value)}</text>
      <text x="${x + 24 + vw}" y="${y + 87}" class="mono" font-size="12" fill="${T.muted}">${esc(unit)}</text>
    </g>`;
  }).join('');

  const px = 552, cx0 = 580, cx1 = 1140, base = 292, maxH = 170;
  const max = Math.max(1, ...s.weeks.map((w) => w.count));
  const bw = (cx1 - cx0) / s.weeks.length;
  let bars = '', months = '', lastMonth = -1;
  s.weeks.forEach((w, i) => {
    const h = w.count ? Math.max(6, (w.count / max) * maxH) : 3;
    const x = cx0 + i * bw;
    bars += `<rect class="bar" style="animation-delay:${(i * 0.014).toFixed(3)}s" x="${(x + bw * 0.16).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(bw * 0.68).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${w.count ? 'url(#barG)' : T.stroke}"/>`;
    const m = Number(w.date.slice(5, 7)) - 1;
    if (m !== lastMonth && i < s.weeks.length - 2) { if (lastMonth !== -1 || i === 0) months += `<text x="${x.toFixed(1)}" y="${base + 22}" class="mono" font-size="11" fill="${T.muted}">${MON[m]}</text>`; lastMonth = m; }
  });
  const gridLines = [0.5, 1].map((f) => `<path d="M${cx0} ${base - maxH * f}H${cx1}" stroke="${T.stroke}" stroke-dasharray="3 5"/><text x="${cx1 + 6}" y="${base - maxH * f + 4}" class="mono" font-size="10" fill="${T.muted}">${Math.round(max * f)}</text>`).join('');

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const order = [1, 2, 3, 4, 5, 6, 0];
  const wmax = Math.max(1, ...s.weekday);
  const top = s.weekday.indexOf(Math.max(...s.weekday));
  const weekday = order.map((d, i) => {
    const x = 664 + i * 68, o = 0.12 + 0.75 * (s.weekday[d] / wmax);
    return `<rect x="${x}" y="340" width="58" height="26" rx="8" fill="${T.cyan}" fill-opacity="${o.toFixed(2)}" stroke="${d === top && s.weekday[d] ? T.cyan : T.stroke}"/>
      <text x="${x + 29}" y="357.5" text-anchor="middle" class="mono" font-size="11" fill="${T.text}">${DAYS[d]}</text>`;
  }).join('');

  const body = `
  ${tilesSvg}
  <rect x="${px}" y="28" width="616" height="356" rx="16" fill="${T.panel}" fill-opacity=".8" stroke="${T.stroke}"/>
  <text x="${cx0}" y="62" font-size="16" font-weight="600" fill="${T.text}">Contribution activity</text>
  <text x="${cx0}" y="82" class="mono" font-size="11.5" fill="${T.muted}">weekly · ${fmt(s.from)} → ${fmt(s.to)}</text>
  <text x="${cx1 + 4}" y="66" text-anchor="end" font-size="26" font-weight="800" fill="url(#brand)">${s.total.toLocaleString('en-US')}</text>
  <text x="${cx1 + 4}" y="84" text-anchor="end" class="mono" font-size="11" fill="${T.muted}">contributions</text>
  ${gridLines}
  <path d="M${cx0} ${base + 0.5}H${cx1}" stroke="${T.muted}" stroke-opacity=".5"/>
  ${bars}
  ${months}
  <text x="${cx0}" y="358" class="mono" font-size="11" fill="${T.muted}">by weekday</text>
  ${weekday}
  <text x="${W - 32}" y="406" text-anchor="end" class="mono" font-size="10.5" fill="${T.muted}">updated ${fmt(today)} · generated by a GitHub workflow</text>`;
  const defs = `<linearGradient id="barG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#22D3EE"/></linearGradient>`;
  const style = `.bar{transform-box:fill-box;transform-origin:50% 100%;animation:grow .9s cubic-bezier(.2,.8,.2,1) both}@keyframes grow{from{transform:scaleY(0)}}
    .rise{animation:rise .8s cubic-bezier(.2,.8,.2,1) both}@keyframes rise{from{opacity:0;transform:translateY(10px)}}`;
  return card(W, H, body, { defs, style, title: `${LOGIN} GitHub activity` });
}

function languagesSvg(bytes, repoCount) {
  const W = 1200, H = 240;
  const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1;
  let langs = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  if (langs.length > 6) langs = [...langs.slice(0, 5), ['Other', langs.slice(5).reduce((n, [, v]) => n + v, 0)]];
  const color = (n) => LANG_COLORS[n] || (n === 'Other' ? T.muted : T.sky);
  let x = 32, seg = '';
  const BW = W - 64;
  langs.forEach(([name, v]) => {
    const w = (v / total) * BW;
    seg += `<rect x="${x.toFixed(1)}" y="96" width="${Math.max(w, 2).toFixed(1)}" height="14" fill="${color(name)}"/>`;
    x += w;
  });
  const legend = langs.map(([name, v], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const lx = 32 + col * 386, ly = 150 + row * 46, pct = (v / total) * 100;
    return `<circle cx="${lx + 7}" cy="${ly - 5}" r="6" fill="${color(name)}"/>
      <text x="${lx + 22}" y="${ly}" font-size="15" fill="${T.text}">${esc(name)}</text>
      <text x="${lx + 360}" y="${ly}" text-anchor="end" class="mono" font-size="13" fill="${T.sub}">${pct.toFixed(1)}%</text>
      <rect x="${lx + 22}" y="${ly + 10}" width="338" height="3" rx="1.5" fill="${T.stroke}"/>
      <rect x="${lx + 22}" y="${ly + 10}" width="${(338 * pct / 100).toFixed(1)}" height="3" rx="1.5" fill="${color(name)}" class="fill"/>`;
  }).join('');
  const body = `
  <text x="32" y="52" font-size="16" font-weight="600" fill="${T.text}">Languages</text>
  <text x="32" y="72" class="mono" font-size="11.5" fill="${T.muted}">by bytes of code across public repos</text>
  <text x="${W - 32}" y="58" text-anchor="end" class="mono" font-size="12" fill="${T.muted}">${repoCount} repos analysed</text>
  <g clip-path="url(#barClip)"><g class="grow">${seg}</g></g>
  ${legend}`;
  const defs = `<clipPath id="barClip"><rect x="32" y="96" width="${BW}" height="14" rx="7"/></clipPath>`;
  const style = `.grow{transform-origin:32px 0;animation:grow 1.2s cubic-bezier(.2,.8,.2,1) both}.fill{transform-box:fill-box;transform-origin:0 0;animation:grow 1.2s .2s cubic-bezier(.2,.8,.2,1) both}@keyframes grow{from{transform:scaleX(0)}}`;
  return card(W, H, body, { defs, style, title: `${LOGIN} top languages` });
}

const [days, repo] = await Promise.all([contributions(), repos()]);
const s = summarise(days);
write('generated/stats.svg', statsSvg(s, repo.count));
write('generated/languages.svg', languagesSvg(repo.bytes, repo.count));
console.log(`total ${s.total}, active ${s.active}, streak ${s.current}/${s.longest}, repos ${repo.count}`);
