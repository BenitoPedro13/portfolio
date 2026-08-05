// Imports the real resolver under whatever env the parent set, prints the result.
// Node 24 strips TypeScript types natively, so this exercises the actual module
// rather than a reimplementation of it.
const { siteUrl, siteHost, absoluteUrl } = await import(
  new URL("../src/lib/site-url.ts", import.meta.url).href
);

let urlParses = true;
try {
  new URL(siteUrl);
} catch {
  urlParses = false;
}

process.stdout.write(
  JSON.stringify({
    siteUrl,
    siteHost,
    absoluteRoot: absoluteUrl("/"),
    absoluteProject: absoluteUrl("/projects/markado"),
    urlParses,
  })
);
