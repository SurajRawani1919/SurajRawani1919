const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "projects.json"), "utf8"));

const LANG_COLORS = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#E34C26",
  Markdown: "#083FA1",
  JavaScript: "#F1E05A",
  C: "#555555",
  "C++": "#F34B7D",
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function donut(cx, cy, r, languages) {
  const total = languages.reduce((a, [, p]) => a + p, 0) || 1;
  const stroke = 10;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  let arcs = "";
  for (const [lang, pct] of languages) {
    const len = (pct / total) * circ;
    const color = LANG_COLORS[lang] || "#94A3B8";
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${len} ${circ - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += len;
  }
  const top = languages[0] || ["Code", 0];
  arcs += `<circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="#0B1220"/>`;
  arcs += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="14" font-weight="700" fill="#F8FAFC">${top[1]}%</text>`;
  arcs += `<text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="9" fill="#94A3B8">${escapeXml(top[0].slice(0, 10))}</text>`;
  return arcs;
}

function tags(x, y, list) {
  let out = "";
  let tx = x;
  for (const t of list.slice(0, 4)) {
    const w = Math.max(52, t.length * 7.2 + 18);
    out += `<rect x="${tx}" y="${y}" width="${w}" height="22" rx="11" fill="#1E1B4B" stroke="#4C1D95"/>`;
    out += `<text x="${tx + w / 2}" y="${y + 15}" text-anchor="middle" font-size="11" fill="#C4B5FD">${escapeXml(t)}</text>`;
    tx += w + 8;
  }
  return out;
}

function langList(x, y, languages) {
  return languages
    .slice(0, 4)
    .map(([lang, pct], i) => {
      const color = LANG_COLORS[lang] || "#94A3B8";
      const yy = y + i * 18;
      return (
        `<circle cx="${x}" cy="${yy - 3}" r="4" fill="${color}"/>` +
        `<text x="${x + 12}" y="${yy}" font-size="12" fill="#94A3B8">${escapeXml(lang)} ${pct}%</text>`
      );
    })
    .join("");
}

function card(p, x, y, w, h) {
  const title = p.name.endsWith("_") ? p.name : p.name + "_";
  const donutX = x + w - 78;
  const donutY = y + h / 2 + 8;
  return `
  <a href="https://github.com/${escapeXml(p.repo)}" target="_blank">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#0B1220" stroke="#1E293B"/>
    <text x="${x + 22}" y="${y + 28}" font-size="11" fill="#64748B">${escapeXml(p.repo)}</text>
    <text x="${x + 22}" y="${y + 58}" font-size="24" font-weight="700" fill="#F8FAFC">${escapeXml(title)}</text>
    <rect x="${x + w - 70}" y="${y + 18}" width="48" height="48" rx="12" fill="${p.color}" opacity="0.18" stroke="${p.color}"/>
    <text x="${x + w - 46}" y="${y + 48}" text-anchor="middle" font-size="14" font-weight="700" fill="${p.color}">${escapeXml(p.initial)}</text>
    <text x="${x + 22}" y="${y + 86}" font-size="13" fill="#94A3B8">${escapeXml(p.description)}</text>
    ${tags(x + 22, y + 104, p.tags)}
    <text x="${x + 22}" y="${y + h - 22}" font-size="12" fill="#64748B">★ ${p.stars}   updated ${escapeXml(p.updated)}</text>
    ${langList(x + w - 210, y + 118, p.languages)}
    ${donut(donutX, donutY, 34, p.languages)}
  </a>`;
}

const cols = 2;
const rows = Math.ceil(projects.length / cols);
const cardW = 560;
const cardH = 200;
const gapX = 24;
const gapY = 24;
const pad = 28;
const headerH = 56;
const width = pad * 2 + cols * cardW + (cols - 1) * gapX;
const height = pad + headerH + rows * cardH + (rows - 1) * gapY + pad;

let cards = "";
projects.forEach((p, i) => {
  const c = i % cols;
  const r = Math.floor(i / cols);
  const x = pad + c * (cardW + gapX);
  const y = pad + headerH + r * (cardH + gapY);
  cards += card(p, x, y, cardW, cardH);
});

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace" role="img" aria-label="PROJECTS.LIST">
  <rect width="${width}" height="${height}" fill="#070B14"/>
  <text x="${pad}" y="${pad + 18}" font-size="14" letter-spacing="2" fill="#22D3EE">PROJECTS.LIST</text>
  <text x="${pad + 160}" y="${pad + 18}" font-size="13" fill="#64748B">./projects.sh --all</text>
  ${cards}
</svg>
`;

fs.writeFileSync(path.join(root, "projects.svg"), svg);
console.log("Wrote projects.svg", width, "x", height);
