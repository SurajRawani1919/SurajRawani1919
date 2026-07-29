const fs = require("fs");
const path = "C:/Users/rawan/OneDrive/Desktop/SurajRawani1919";
const photo = fs.readFileSync(`${path}/assets/profile.jpg`).toString("base64");
const photoUri = `data:image/jpeg;base64,${photo}`;

function make(theme) {
  const dark = theme === "dark";
  const c = {
    pageBg: dark ? "#070B14" : "#F8FAFC",
    cardBg: dark ? "#0B1220" : "#FFFFFF",
    headerBg: dark ? "#111827" : "#F1F5F9",
    border: dark ? "#1E293B" : "#E2E8F0",
    muted: dark ? "#64748B" : "#94A3B8",
    soft: dark ? "#475569" : "#94A3B8",
    title: dark ? "#22D3EE" : "#0891B2",
    text: dark ? "#E2E8F0" : "#0F172A",
    textStrong: dark ? "#F8FAFC" : "#0F172A",
    email: dark ? "#38BDF8" : "#1D4ED8",
    live: "#EF4444",
    panelBg: dark ? "#0F172A" : "#F8FAFC",
    panelBorder: dark ? "#334155" : "#CBD5E1",
    overlay: dark ? "rgba(11,18,32,0.82)" : "rgba(255,255,255,0.88)",
    footer: dark ? "#64748B" : "#64748B",
    dots: dark ? "rgba(248,250,252,0.18)" : "rgba(15,23,42,0.25)",
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
  ];

  function row(y, label, value) {
    const dots = ".".repeat(Math.max(3, 52 - label.length - String(value).length));
    return (
      `<text x="460" y="${y}" font-size="13" xml:space="preserve">` +
      `<tspan fill="${c.title}">${label} </tspan>` +
      `<tspan fill="${c.dots}">${dots}</tspan>` +
      `<tspan fill="${c.text}" font-weight="600"> ${value}</tspan></text>`
    );
  }

  let y = 155;
  let body = "";
  for (const [l, v] of rows) {
    body += row(y, l, v) + "\n";
    y += 22;
  }
  body += `<text x="460" y="${y}" font-size="12" fill="${c.soft}">- Contact ---------------------------------------------------------------------</text>\n`;
  y += 24;
  for (const [l, v] of contacts) {
    body += row(y, l, v) + "\n";
    y += 20;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1180" height="610" viewBox="0 0 1180 610" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace" role="img" aria-label="Suraj Kumar Rawani - profile.sh --live">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22D3EE"/>
      <stop offset="50%" stop-color="#A78BFA"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
    <clipPath id="photoClip"><rect x="48" y="88" width="360" height="460" rx="16"/></clipPath>
    <filter id="txtGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1180" height="610" fill="${c.pageBg}"/>
  <rect x="16" y="16" width="1148" height="578" rx="16" fill="${c.cardBg}" stroke="${c.border}" stroke-width="1.5"/>
  <rect x="16" y="16" width="1148" height="36" rx="16" fill="${c.headerBg}"/>
  <rect x="16" y="34" width="1148" height="18" fill="${c.headerBg}"/>
  <circle cx="42" cy="34" r="6" fill="#EF4444"/>
  <circle cx="64" cy="34" r="6" fill="#F59E0B"/>
  <circle cx="86" cy="34" r="6" fill="#10B981"/>
  <text x="590" y="39" text-anchor="middle" font-size="12" fill="${c.muted}">rawanisuraj1919@gmail.com - % ./profile.sh --live</text>
  <text x="48" y="74" font-size="10" letter-spacing="3" fill="${c.soft}">VISUAL.MAP</text>
  <rect x="48" y="88" width="360" height="460" rx="16" fill="${c.panelBg}" stroke="${c.panelBorder}"/>
  <g clip-path="url(#photoClip)">
    <image xlink:href="${photoUri}" x="48" y="88" width="360" height="460" preserveAspectRatio="xMidYMid slice"/>
    <rect x="48" y="470" width="360" height="78" fill="${c.overlay}"/>
    <text x="228" y="502" text-anchor="middle" font-size="18" font-weight="700" fill="${c.textStrong}">Suraj Kumar Rawani</text>
    <text x="228" y="526" text-anchor="middle" font-size="12" fill="${c.title}">AI/ML Engineer</text>
  </g>
  <text x="460" y="74" font-size="13" letter-spacing="2" fill="${c.title}" filter="url(#txtGlow)">SYSTEM.INFO</text>
  <text x="575" y="74" font-size="12" font-weight="700" fill="${c.live}"><tspan>&#9679;</tspan> LIVE<animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/></text>
  <text x="460" y="108" font-size="14" font-weight="700" fill="${c.email}">rawanisuraj1919@gmail.com</text>
  <rect x="460" y="120" width="660" height="2" fill="url(#accent)" opacity="0.55"/>
${body}
  <text x="590" y="575" text-anchor="middle" font-size="11" fill="${c.footer}">&#9679; More about me &amp; projects below in README &#9679;</text>
</svg>
`;
}

fs.writeFileSync(`${path}/dark.svg`, make("dark"));
fs.writeFileSync(`${path}/light.svg`, make("light"));
console.log("wrote", fs.statSync(`${path}/dark.svg`).size, fs.statSync(`${path}/light.svg`).size);
