const fs = require("fs");
const path = "C:/Users/rawan/OneDrive/Desktop/SurajRawani1919";
const photo = fs.readFileSync(`${path}/assets/profile.jpg`).toString("base64");
const photoUri = `data:image/jpeg;base64,${photo}`;

function make(theme) {
  const dark = theme === "dark";
  const c = {
    page: dark ? "#070B14" : "#F8FAFC",
    win: dark ? "#0B1220" : "#FFFFFF",
    header: dark ? "#111827" : "#F1F5F9",
    border: dark ? "#334155" : "#CBD5E1",
    titleBarText: dark ? "#94A3B8" : "#475569",
    soft: dark ? "#64748B" : "#94A3B8",
    accent: dark ? "#22D3EE" : "#0891B2",
    accentStroke: dark ? "#22D3EE" : "#06B6D4",
    text: dark ? "#E2E8F0" : "#0F172A",
    textStrong: dark ? "#F8FAFC" : "#0F172A",
    emailBg: dark ? "#0C4A6E" : "#DBEAFE",
    emailFg: dark ? "#7DD3FC" : "#1D4ED8",
    live: dark ? "#F87171" : "#DC2626",
    dots: dark ? "rgba(148,163,184,0.55)" : "rgba(8,145,178,0.45)",
    photoBg: dark ? "#0F172A" : "#F8FAFC",
    footer: dark ? "#94A3B8" : "#475569",
    footerBg: dark ? "#0F172A" : "#E0F2FE",
    panelGradTop: dark ? "#0B1220" : "#FFFFFF",
    panelGradBot: dark ? "#070B14" : "#F8FAFC",
  };

  const rows = [
    ["Subject", "Suraj Kumar Rawani"],
    ["Role", "AI/ML Engineer"],
    ["Origin", "New Delhi, India"],
    ["Education", "MCA · Chandigarh University"],
    ["Status", "Building + Learning + Shipping"],
    ["ToolChain", "VS Code, Git, Docker, FastAPI"],
    ["Core.Lang", "Python, SQL"],
    ["Core.Frontend", "Streamlit, Power BI"],
    ["Core.Backend", "FastAPI, LangChain"],
    ["Core.Database", "SQL, FAISS, Pandas"],
    ["Core.Infra", "Docker, GitHub, Databricks"],
  ];

  const contacts = [
    ["Grid.Mail", "rawanisuraj1919@gmail.com"],
    ["Grid.Portfolio", "coming soon"],
    ["Grid.LinkedIn", "suraj-kumar-rawani-0483b7298"],
    ["Grid.GitHub", "@SurajRawani1919"],
    ["Grid.Instagram", "@suraj_singh1919"],
    ["Grid.WhatsApp", "+91 7061205601"],
  ];

  function dottedLine(label, value) {
    const left = `${label} `;
    const right = ` ${value}`;
    const dots = ".".repeat(Math.max(8, 72 - left.length - right.length));
    return (
      `<tspan fill="${c.accent}">${left}</tspan>` +
      `<tspan fill="${c.dots}">${dots}</tspan>` +
      `<tspan fill="${c.text}" font-weight="600">${right}</tspan>`
    );
  }

  let y = 148;
  let body = "";
  for (const [l, v] of rows) {
    body += `<text x="470" y="${y}" font-size="13" textLength="655" lengthAdjust="spacingAndGlyphs" xml:space="preserve">${dottedLine(l, v)}</text>\n`;
    y += 20;
  }
  body += `<text x="470" y="${y}" font-size="13" textLength="655" lengthAdjust="spacingAndGlyphs" xml:space="preserve"><tspan fill="${c.soft}">- Contact </tspan><tspan fill="${c.dots}">${"-".repeat(58)}</tspan></text>\n`;
  y += 20;
  for (const [l, v] of contacts) {
    body += `<text x="470" y="${y}" font-size="13" textLength="655" lengthAdjust="spacingAndGlyphs" xml:space="preserve">${dottedLine(l, v)}</text>\n`;
    y += 20;
  }

  // Corner brackets for photo frame
  const bx = 36, by = 84, bw = 400, bh = 492, bl = 28;
  const brackets = `
    <path d="M${bx} ${by + bl} V${by} H${bx + bl}" fill="none" stroke="${c.accentStroke}" stroke-width="2.5"/>
    <path d="M${bx + bw - bl} ${by} H${bx + bw} V${by + bl}" fill="none" stroke="${c.accentStroke}" stroke-width="2.5"/>
    <path d="M${bx} ${by + bh - bl} V${by + bh} H${bx + bl}" fill="none" stroke="${c.accentStroke}" stroke-width="2.5"/>
    <path d="M${bx + bw - bl} ${by + bh} H${bx + bw} V${by + bh - bl}" fill="none" stroke="${c.accentStroke}" stroke-width="2.5"/>
  `;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1180" height="610" viewBox="0 0 1180 610" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace" role="img" aria-label="Suraj Kumar Rawani - profile.sh --live">
  <defs>
    <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.panelGradTop}"/>
      <stop offset="100%" stop-color="${c.panelGradBot}"/>
    </linearGradient>
    <clipPath id="winClip"><rect x="2" y="2" width="1176" height="606" rx="18"/></clipPath>
    <clipPath id="photoClip"><rect x="44" y="92" width="384" height="476" rx="8"/></clipPath>
    <filter id="txtGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glow3"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <mask id="photoReveal" maskUnits="userSpaceOnUse" x="44" y="92" width="384" height="476">
      <rect x="44" y="92" width="384" height="476" fill="#000"/>
      ${Array.from({ length: 28 }, (_, i) => {
        const h = 476 / 28;
        const y = 92 + i * h;
        const start = (0.04 + i * 0.025).toFixed(3);
        const mid = (0.12 + i * 0.025).toFixed(3);
        return `<rect x="44" y="${y.toFixed(2)}" width="384" height="${(h + 0.8).toFixed(2)}" fill="#fff" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${start};${mid};0.62;0.78;1" dur="5.5s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .2 1;.4 0 .2 1;.4 0 .2 1;.4 0 .2 1;.4 0 .2 1"/>
      </rect>`;
      }).join("\n      ")}
    </mask>
  </defs>

  <!-- outer page -->
  <rect width="1180" height="610" fill="${c.page}"/>

  <!-- ONE terminal frame -->
  <rect x="2" y="2" width="1176" height="606" rx="18" fill="${c.win}" stroke="${c.border}" stroke-width="1.5"/>
  <g clip-path="url(#winClip)">
    <rect x="2" y="2" width="1176" height="606" fill="url(#panelGrad)"/>

    <!-- title bar -->
    <rect x="2" y="2" width="1176" height="46" fill="${c.header}"/>
    <line x1="2" y1="48" x2="1178" y2="48" stroke="rgba(148,163,184,0.25)"/>
    <circle cx="28" cy="25" r="6" fill="#EF4444"/>
    <circle cx="50" cy="25" r="6" fill="#F59E0B"/>
    <circle cx="72" cy="25" r="6" fill="#10B981"/>
    <text x="590" y="29" text-anchor="middle" font-size="12" fill="${c.titleBarText}">rawanisuraj1919@gmail.com - % ./profile.sh --live</text>

    <!-- LEFT: VISUAL.MAP -->
    <text x="38" y="74" font-size="10" letter-spacing="3" fill="${c.soft}">VISUAL.MAP</text>
    <rect x="36" y="84" width="400" height="492" rx="10" fill="none" stroke="${c.accentStroke}" stroke-width="2" opacity="0.45" filter="url(#glow3)"/>
    <rect x="36" y="84" width="400" height="492" rx="10" fill="${c.photoBg}" stroke="${c.accentStroke}" stroke-opacity="0.4"/>
    <!-- Photo reveal: strips fade in then out (goes and comes), like the reference -->
    <g clip-path="url(#photoClip)">
      <image xlink:href="${photoUri}" x="44" y="92" width="384" height="476" preserveAspectRatio="xMidYMid slice" mask="url(#photoReveal)"/>
    </g>
    ${brackets}

    <!-- RIGHT: SYSTEM.INFO -->
    <text x="470" y="74" font-size="13" letter-spacing="2" fill="${c.accent}" filter="url(#txtGlow)">SYSTEM.INFO</text>
    <text x="1125" y="74" text-anchor="end" font-size="12" fill="${c.live}" font-weight="700"><tspan>&#9679;</tspan> LIVE<animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/></text>

    <rect x="470" y="90" width="280" height="22" rx="4" fill="${c.emailBg}"/>
    <text x="479" y="106" font-size="14" font-weight="700" fill="${c.emailFg}">rawanisuraj1919@gmail.com</text>

${body}
    <rect x="470" y="560" width="655" height="24" rx="4" fill="${c.footerBg}"/>
    <text x="480" y="577" font-size="13" fill="${c.footer}">&#9654; More about me &amp; projects below in README &#9660;</text>
  </g>
</svg>
`;
}

fs.writeFileSync(`${path}/dark.svg`, make("dark"));
fs.writeFileSync(`${path}/light.svg`, make("light"));
console.log("wrote", fs.statSync(`${path}/dark.svg`).size, fs.statSync(`${path}/light.svg`).size);
