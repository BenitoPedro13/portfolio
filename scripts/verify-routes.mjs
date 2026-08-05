const BASE = "http://localhost:3111";

const checks = [
  {
    path: "/",
    must: [
      "Benito Pedro Xavier",
      "Full Stack Developer",
      "Mainnet Design",
      "Juicy Space",
      "Trivod",
      "markado",
      "Rio de Janeiro",
    ],
  },
  {
    path: "/projects",
    must: ["markado", "video-converter", "flora", "sua-mesa-fit", "bee-dash"],
  },
  {
    path: "/projects/markado",
    must: ["In plain English", "markado", "Next"],
  },
  {
    path: "/projects/video-converter",
    must: ["In plain English"],
  },
  {
    path: "/projects/flora",
    must: ["In plain English"],
  },
  {
    path: "/projects/sua-mesa-fit",
    must: ["In plain English"],
  },
  {
    path: "/projects/bee-dash",
    must: ["In plain English"],
  },
  {
    path: "/projects/insta2figma",
    must: ["In plain English"],
  },
  {
    path: "/projects/network-monitor",
    must: ["In plain English"],
  },
  {
    path: "/about",
    must: ["IFRJ", "Portuguese", "English", "Mainnet Design"],
  },
  {
    path: "/contact",
    must: ["benitopedro21@outlook.com", "Rio de Janeiro"],
  },
  { path: "/sitemap.xml", must: ["benitopedro.dev/projects/markado"] },
  { path: "/robots.txt", must: ["Sitemap"] },
  { path: "/Resume_Benito_Pedro_Xavier_2026_EN.pdf", must: [], binary: true },
];

const decode = (s) =>
  s
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'");

let failures = 0;

for (const check of checks) {
  const url = BASE + check.path;
  let res;
  try {
    res = await fetch(url);
  } catch (error) {
    console.log(`FAIL ${check.path} — fetch error: ${error.message}`);
    failures++;
    continue;
  }

  if (!res.ok) {
    console.log(`FAIL ${check.path} — HTTP ${res.status}`);
    failures++;
    continue;
  }

  if (check.binary) {
    const buf = await res.arrayBuffer();
    console.log(`ok   ${check.path} — ${(buf.byteLength / 1024).toFixed(0)} KB`);
    continue;
  }

  const html = decode(await res.text());
  const missing = check.must.filter((needle) => !html.includes(needle));

  // catch Next.js error overlays / crashed segments
  const errored =
    html.includes("Unhandled Runtime Error") ||
    html.includes("__next_error__") ||
    html.includes("Application error:");

  if (missing.length || errored) {
    console.log(
      `FAIL ${check.path}${missing.length ? ` — missing: ${missing.join(", ")}` : ""}${errored ? " — runtime error in page" : ""}`
    );
    failures++;
  } else {
    console.log(`ok   ${check.path} — ${(html.length / 1024).toFixed(0)} KB, ${check.must.length} assertions`);
  }
}

// 404 should actually 404
const notFound = await fetch(BASE + "/this-route-does-not-exist");
if (notFound.status === 404) {
  console.log("ok   /404 handling — returns 404");
} else {
  console.log(`FAIL /404 handling — got ${notFound.status}`);
  failures++;
}

console.log(failures === 0 ? "\nALL ROUTES PASS" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
