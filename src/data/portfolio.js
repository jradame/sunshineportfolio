import traditionalImg from "../images/eye.png";
import neoTraditionalImg from "../images/japanese.png";
import blackworkImg from "../images/blackskull.png";

// Category cards shown on Home
export const CATEGORIES = [
  {
    slug: "traditional",
    title: "Traditional",
    desc: "Bold lines, classic motifs, strong color.",
    cover: traditionalImg,
    // palette used for placeholder thumbs (dark-mode friendly)
    palette: { a: "#8B1E2D", b: "#C9A227", text: "#F7F3EA" }, // oxblood + gold
  },
  {
    slug: "neo-traditional",
    title: "Neo-Traditional",
    desc: "Classic foundation with modern detail.",
    cover: neoTraditionalImg,
    palette: { a: "#1F3A5F", b: "#C9A227", text: "#F7F3EA" }, // navy + gold
  },
  {
    slug: "blackwork",
    title: "Blackwork",
    desc: "Dark, graphic, and high contrast.",
    cover: blackworkImg,
    palette: { a: "#111118", b: "#1F7A7A", text: "#F7F3EA" }, // ink + teal
  },
];

// ----------
// SVG placeholder generator (looks like “real images” but no assets needed)
// ----------
function svgDataUrl(svg) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
}

function makeThumbSvg({ title, subtitle, a, b, text }) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="1" stop-color="${b}"/>
      </linearGradient>

      <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 .08 0"/>
      </filter>

      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000" flood-opacity="0.45"/>
      </filter>
    </defs>

    <rect width="1200" height="900" rx="48" fill="url(#g)"/>
    <rect width="1200" height="900" rx="48" filter="url(#grain)" opacity="0.6"/>

    <!-- “flash sheet” border -->
    <rect x="44" y="44" width="1112" height="812" rx="36" fill="none" stroke="rgba(247,243,234,0.45)" stroke-width="6"/>

    <!-- inner label plate -->
    <g filter="url(#softShadow)">
      <rect x="86" y="610" width="1028" height="210" rx="28" fill="rgba(0,0,0,0.35)" stroke="rgba(247,243,234,0.20)" stroke-width="3"/>
    </g>

    <text x="120" y="690" font-family="Space Grotesque, Inter, system-ui" font-size="54" font-weight="800" fill="${text}" opacity="0.95">
      ${escapeXml(title)}
    </text>
    <text x="120" y="755" font-family="Space Grotesque, Inter, system-ui" font-size="34" font-weight="600" fill="rgba(247,243,234,0.85)">
      ${escapeXml(subtitle)}
    </text>

    <!-- corner mark -->
    <circle cx="1060" cy="165" r="62" fill="rgba(0,0,0,0.25)" stroke="rgba(247,243,234,0.28)" stroke-width="4"/>
    <text x="1060" y="180" text-anchor="middle" font-family="Space Grotesque, Inter, system-ui" font-size="34" font-weight="900" fill="rgba(247,243,234,0.9)">
      ✶
    </text>
  </svg>`;
  return svgDataUrl(svg);
}

function escapeXml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// 12 “real” thumbs per category
export function makePlaceholders(slug) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const palette = cat?.palette || { a: "#8B1E2D", b: "#C9A227", text: "#F7F3EA" };

  return Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const title = cat?.title || slug.replace("-", " ");
    const subtitle = `Flash tile • #${n}`;

    return {
      id: `${slug}-${n}`,
      title,
      subtitle,
      src: makeThumbSvg({
        title,
        subtitle,
        a: palette.a,
        b: palette.b,
        text: palette.text,
      }),
    };
  });
}
