export type CaseSection = {
  title: string;
  body: string;
};

export type ProcessStep = {
  phase: string;
  title: string;
  body: string;
};

export type ArchitectureNode = {
  layer: string;
  label: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** One sentence a non-technical person immediately understands. */
  plainEnglish: string;
  year: string;
  status: "Live" | "In development" | "Case study" | "Open source";
  category: "Product" | "Platform" | "Infrastructure" | "E-commerce" | "Data";
  featured: boolean;
  accent: string;
  role: string;
  timeline: string;
  team: string;
  stack: string[];
  tags: string[];
  github: string | null;
  live: string | null;
  /** Card thumbnail, exported from the Figma design file. Falls back to the generated visual when absent. */
  image?: string;
  /** Detail-page screenshot gallery, exported from the Figma design file. */
  screenshots?: { src: string; alt: string }[];
  /** Short list surfaced on cards. */
  quickFacts: { label: string; value: string }[];
  problem: string;
  approach: string;
  outcome: string;
  /** Long-form narrative sections for the case study page. */
  sections: CaseSection[];
  process: ProcessStep[];
  architecture: ArchitectureNode[];
  features: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    slug: "fa-moveis",
    title: "F&A Móveis",
    tagline: "A furniture catalogue where every measurement is real, and every sale ends in WhatsApp",
    plainEnglish:
      "A furniture shop's whole online catalogue, with real prices and real centimetre measurements on every piece — no cart, just a WhatsApp message pre-filled with the exact product, sent straight to Fátima, the owner.",
    year: "2026",
    status: "Live",
    category: "Product",
    featured: false,
    accent: "#A87C7C",
    role: "Solo full stack developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Vercel"],
    tags: ["Local Business", "Catalogue", "No-CMS"],
    github: "https://github.com/BenitoPedro13/fa-moveis",
    live: "https://fa-moveis.vercel.app",
    image: "/projects/fa-moveis/home.png",
    screenshots: [
      { src: "/projects/fa-moveis/home.png", alt: "F&A Móveis homepage hero with the Roupeiro Mônaco Plus and its real 2,30 × 2,40 m dimension lines" },
      { src: "/projects/fa-moveis/produtos.png", alt: "F&A Móveis /produtos catalogue with category filters and real measurements on every card" },
      { src: "/projects/fa-moveis/produto.png", alt: "F&A Móveis product page showing L × A × P measurements and the WhatsApp CTA" },
    ],
    quickFacts: [
      { label: "Catalogue", value: "13 real products, 10 priced" },
      { label: "Conversion", value: "wa.me, no cart, no checkout" },
      { label: "Data", value: "Typed TS, no CMS, no database" },
      { label: "Measured", value: "Lighthouse 93 perf, 100 a11y" },
    ],
    problem:
      "Fátima has run a neighbourhood furniture business in Rio de Janeiro for years with no website — just a Facebook page that had gone dormant since February 2022. She resells factory furniture, delivers it, and assembles it, and every sale already happened over WhatsApp. This was a paid client project on a tight budget where the demo had to come before the money.",
    approach:
      "The site is deliberately backend-less: a typed TypeScript catalogue in content/, no CMS, no database, no monthly bill. Every measurement is stored as a number in centimetres and formatted at the edge — never hand-typed as a display string — and every wa.me link is built by one function reading her real phone number from a single content module. Nothing outside lib/catalog/source.*.ts is allowed to import a Shopify type, which keeps a later Shopify upsell a one-module swap instead of a rewrite. Where a price wasn't confirmed, the page says so — 'Consulte o preço' — instead of shipping a plausible number.",
    outcome:
      "Live at fa-moveis.vercel.app with 13 real products — the 27-item illustrative catalogue used to win the pitch was retired once real supplier stock replaced it. 10 of the 13 now carry a confirmed price; the other 3 show an honest 'Consulte o preço'. A production build measured Lighthouse 93 performance and 100 accessibility on /produtos, CLS 0, every product image under 32 KB against a 180 KB budget.",
    sections: [
      {
        title: "A demo that had to come before the money",
        body: "This was a paid client project on a tight budget, and a working site — built on her real brand, shown to her on her own phone — was what won the job in the first place. Real stock replaced the original illustrative catalogue only once it existed.",
      },
      {
        title: "Nothing outside the seam touches Shopify",
        body: "Every component is written against a domain Produto type. A later move to Shopify, or any other backend, only has to change the files behind lib/catalog/source.*.ts — nothing else in the app needs to know the difference.",
      },
      {
        title: "Honest pricing, not estimated pricing",
        body: "10 of 13 products carry a confirmed price, sourced from her own D'Doro line (3 pieces, priced via WhatsApp) and a second Novo Horizonte supplier (10 pieces, priced from a real supplier sheet, using the same freight-and-tax markup as an earlier sibling project). The remaining 3 say 'Consulte o preço' rather than a plausible guess.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Scaffold on her real brand",
        body: "Name, mark, the rose accent (#A87C7C), and a Didone serif were already hers, evidenced in her own Facebook video — the job was bringing an existing identity onto the web with better craft, never redesigning it from zero.",
      },
      {
        phase: "02",
        title: "A typed catalogue, no CMS",
        body: "content/produtos.ts, categorias.ts, ambientes.ts, and loja.ts became the single source of truth for every page and component.",
      },
      {
        phase: "03",
        title: "Real stock, real prices",
        body: "The 27-product illustrative catalogue was removed once real supplier stock replaced it — 3 D'Doro pieces from her own catalogue QR codes, 10 Novo Horizonte pieces priced from a supplier sheet.",
      },
      {
        phase: "04",
        title: "The real-device checklist",
        body: "A pass against the live deployment, not localhost, caught two defects invisible from a dev server: every WhatsApp message was shipping a literal localhost URL, and /produtos had no Open Graph card.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js App Router",
        detail: "Server-rendered catalogue, product, and home routes — zero client components in the shipped build.",
      },
      {
        layer: "Catalogue",
        label: "content/*.ts",
        detail: "Typed product, category, and store data — the only source any page or component is allowed to read.",
      },
      {
        layer: "Conversion",
        label: "lib/whatsapp.ts",
        detail: "The one wa.me builder used by every product CTA, reading the phone number from content/loja.ts.",
      },
      {
        layer: "Hosting",
        label: "Vercel",
        detail: "Fully static, no database, no auth — a production build fails on purpose if SITE_URL would resolve to localhost.",
      },
    ],
    features: [
      {
        title: "Real measurements, formatted at the edge",
        body: "Every dimension is stored as a number in centimetres and rendered as 'L × A × P' — never typed as a display string.",
      },
      {
        title: "Honest pricing",
        body: "10 of 13 products show a confirmed price; the other 3 say 'Consulte o preço' instead of a guess.",
      },
      {
        title: "One WhatsApp builder",
        body: "Every product page resolves through the same pre-filled wa.me link — no second place composes that URL.",
      },
      {
        title: "No cart, no checkout",
        body: "The whole product terminates in a conversation with the owner, matching how she already sells.",
      },
    ],
    challenges: [
      {
        title: "A localhost URL that shipped to production",
        body: "An unset SITE_URL fell back silently to localhost, so the deployed site's own WhatsApp messages carried a dead link — caught by a real-device pass against the live URL, not the dev server, and fixed by failing the build outright on that exact misconfiguration.",
      },
      {
        title: "Sourcing prices for stock that wasn't hers to guess",
        body: "Novo Horizonte's 10 pieces needed real supplier-sheet numbers and the same freight-plus-tax markup logic already used on a sibling project — 3 items still show 'Consulte o preço' because that number wasn't confirmed yet.",
      },
      {
        title: "Retiring the demo catalogue without losing the pitch",
        body: "The original 27-item illustrative catalogue existed to win the job before real stock was ready; removing it once 13 real products existed meant the site never quietly kept selling furniture that wasn't actually in stock.",
      },
    ],
    learnings: [
      "A working demo built on the client's real brand — even before real stock exists — is what actually wins a tight-budget pitch, more than a polished mockup.",
      "Failing a production build outright on a known misconfiguration (SITE_URL resolving to localhost) catches a class of bug a real-device checklist would otherwise keep re-discovering.",
      "An honest 'Consulte o preço' is a better default than a plausible price, especially on a site the owner shows to her own customers.",
    ],
  },
  {
    slug: "oishi",
    title: "Oishi Cozinha Japonesa",
    tagline: "A rodízio's real anti-waste discount, built as the whole site's thesis",
    plainEnglish:
      "A restaurant site built around one real, checkable discount: R$ 20 off per person if the whole table finishes what it orders. Every price tier shows both numbers together, never the discount alone.",
    year: "2026",
    status: "In development",
    category: "Product",
    featured: false,
    accent: "#C6151B",
    role: "Solo full stack developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Motion"],
    tags: ["Restaurant", "Local Business", "Motion"],
    github: "https://github.com/BenitoPedro13/oishi",
    live: "https://oishicozinha.vercel.app",
    image: "/projects/oishi/home.png",
    screenshots: [
      { src: "/projects/oishi/home.png", alt: "Oishi Cozinha Japonesa hero with the 味 kanji set inside the hinomaru disc" },
      { src: "/projects/oishi/cardapio.png", alt: "Rodízio Chisai showing both prices, R$ 74,90 and R$ 54,90, with the sem-desperdício condition" },
      { src: "/projects/oishi/rodizio-com-sashimi.png", alt: "Rodízio com sashimi's two tiers, each with both prices and all three conversion exits" },
      { src: "/projects/oishi/reserva.png", alt: "Oishi's reservation form, ending in a pre-filled WhatsApp message, with unconfirmed policy fields marked honestly" },
      { src: "/projects/oishi/contato.png", alt: "Oishi's contact page with the real address and phone, and an honestly flagged unconfirmed city detail" },
    ],
    quickFacts: [
      { label: "Thesis", value: "R$ 20 off/person, whole table finishes" },
      { label: "Photography", value: "44 photos graded by ffmpeg luminance" },
      { label: "Exits", value: "Delivery, reserva, WhatsApp — all wa.me" },
      { label: "Unconfirmed facts", value: "Rendered as '[a confirmar]', never guessed" },
    ],
    problem:
      "Oishi is a São Gonçalo rodízio restaurant with 17K Instagram followers and no website — its menu and four price tiers lived only inside JPEGs, reservations arrived by phone, and delivery ran through a third-party app. Its real differentiator — a genuine, checkable anti-waste discount — had nowhere on the internet to be said out loud.",
    approach:
      "The whole site is built around one sentence already true of the business: 'Coma tudo o que pedir. Pague menos por isso.' Every rodízio tier always shows both prices together with the condition spelled out, never the discounted number alone. Reference photography couldn't carry the site — 44 real photographs were graded by mean luminance with ffmpeg, and two-thirds measured too dark for a full-bleed hero — so the design is type-led and colour-led instead, built on the brand's own sampled hinomaru gradient. Every fact that wasn't confirmed renders as an honest '[a confirmar]' inline rather than a plausible guess.",
    outcome:
      "Live at oishicozinha.vercel.app across five routes — home, cardápio, two rodízio chapters, reserva, and contato — where every price tier renders both numbers and the real condition, the reservation form ends in a pre-filled WhatsApp message, and the still-open questions about hours and party limits stay visibly marked rather than silently answered.",
    sections: [
      {
        title: "The two-price component is the whole product",
        body: "Every rodízio tier renders through one component that always shows the full price struck through, the anti-waste price live, and the verbatim condition beneath it. The discount only applies if the whole table finishes its food, so showing the lower price alone would be a false price — the condition is structurally part of the component, never separable copy.",
      },
      {
        title: "Designing without a photo shoot",
        body: "44 reference photographs were graded by mean luminance with ffmpeg before any layout decision: 15 survive full-bleed, 20 work only in a framed panel, 9 are thumbnail-only, and none show the room or the team. Two-thirds measuring too dark for a photography-led design meant the entire visual system had to carry the brand through type and colour instead — the hinomaru's red is a real gradient sampled from the logo, measured at 3.17:1 contrast, which is why it's reserved for fills and display type rather than body copy.",
      },
      {
        title: "A register of every allowed fact",
        body: "A data-inventory document tracks every price, hour, and detail the site is allowed to state, each with its own source. A phone number that disagreed between WhatsApp deep links and printed flyers is contained to one builder function; an unconfirmed reservation policy or neighbourhood detail renders as a visible '[a confirmar]' instead of a plausible placeholder.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Measure before designing",
        body: "44 reference photographs were graded by mean luminance with ffmpeg before any layout decision.",
      },
      {
        phase: "02",
        title: "Sample the brand instead of choosing it",
        body: "The hinomaru's red is a real vertical gradient sampled from the logo itself, not a stock 'Japanese red'.",
      },
      {
        phase: "03",
        title: "Build the two-price component once",
        body: "Every rodízio tier renders through one component that always shows both prices and the verbatim condition.",
      },
      {
        phase: "04",
        title: "Register every allowed fact",
        body: "A data-inventory document tracks every price, hour, and detail the site is allowed to state, each with its source.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js App Router",
        detail: "Five static routes — home, cardápio, rodízio/[slug], reserva, contato — no server data, no database.",
      },
      {
        layer: "Motion",
        label: "GSAP + Lenis + Motion",
        detail: "Scroll-scrubbed cinema on the home route, smooth native scroll everywhere, component-level hover and reveal motion.",
      },
      {
        layer: "Content",
        label: "Typed TS, no CMS",
        detail: "Menu, prices, and facts live in src/content/, gated by a 'never invent a fact' rule enforced across the codebase.",
      },
      {
        layer: "Conversion",
        label: "lib/contato/whatsapp.ts",
        detail: "The one wa.me builder every CTA on the site resolves through — delivery and reservations both terminate here.",
      },
    ],
    features: [
      {
        title: "The two-price component",
        body: "Every tier always shows the full price, the anti-waste price, and the real condition together.",
      },
      {
        title: "Luminance-graded photography",
        body: "Every photo is shown at the size its own measured brightness actually supports.",
      },
      {
        title: "Honest unresolved facts",
        body: "An unconfirmed hour, phone digit, or reservation rule renders as a visible '[a confirmar]'.",
      },
      {
        title: "Three exits, one builder each",
        body: "Delivery, reservation, and WhatsApp all resolve through single-purpose link builders.",
      },
    ],
    challenges: [
      {
        title: "A phone number that disagreed with itself",
        body: "WhatsApp deep links and two social posts gave one number; two printed flyers gave another. The conflict is contained to one builder function so the site can ship around it without resolving it everywhere it's used.",
      },
      {
        title: "Designing without a photo shoot",
        body: "Two-thirds of the 44 reference photographs measured too dark or too inconsistent for a photography-led design, so the entire visual system had to carry the brand through type and colour instead of imagery.",
      },
      {
        title: "Keeping the discount honest, not just prominent",
        body: "The anti-waste price only applies if the whole table finishes its food — showing the lower number without that condition would be a false price.",
      },
    ],
    learnings: [
      "Measuring reference material — luminance, contrast, colour — before making a design decision catches constraints a glance would miss: two-thirds of the reference photos being too dark decided the whole visual direction.",
      "A discount is only honest if its condition is structurally part of the same component as the price — copy placed next to a number is one edit away from drifting apart from it.",
      "Registering every allowed fact in one document, with its source, is what makes 'never invent a fact' enforceable rather than aspirational.",
    ],
  },
  {
    slug: "trision",
    title: "Trísion Eyewear",
    tagline: "One catalogue, a showcase for every reseller — brand site and multi-tenant platform for a Brazilian eyewear label",
    plainEnglish:
      "A brand's entire web presence used to be a Linklist page and a one-screen Canva site. Now there's a real catalogue, and every independent optical shop that resells the brand gets its own storefront — sharing the same products, never a copy of the brand's own site.",
    year: "2026",
    status: "In development",
    category: "Product",
    featured: true,
    accent: "#CCA866",
    role: "Solo full stack developer",
    timeline: "Ongoing — Fase 0 of a phased build",
    team: "Solo",
    stack: ["Next.js", "TypeScript", "Tailwind CSS v4", "Zustand", "Vercel"],
    tags: ["Multi-tenant SaaS", "Brand Identity", "Design System", "E-commerce Adjacent"],
    github: "https://github.com/BenitoPedro13/trision",
    live: "https://trision.vercel.app",
    image: "/projects/trision/catalogo.png",
    screenshots: [
      { src: "/projects/trision/home.png", alt: "Trísion homepage: the thesis line and the starfield ground" },
      { src: "/projects/trision/catalogo.png", alt: "Trísion catalogue with format/material/colour filters and real numeração on every card" },
      { src: "/projects/trision/colecoes.png", alt: "Trísion collections index" },
      { src: "/projects/trision/produto.png", alt: "Trísion product page showing the honest 'sem foto' empty state instead of a stock photo" },
      { src: "/projects/trision/revendedores.png", alt: "Trísion reseller directory, filterable by state and city" },
      { src: "/projects/trision/loja.png", alt: "A reseller's own storefront at /loja/[rev] — the Fase 0 stand-in for a subdomain" },
    ],
    quickFacts: [
      { label: "Model", value: "One catalogue, many storefronts" },
      { label: "Every path ends in", value: "WhatsApp — no cart, no checkout" },
      { label: "A reseller controls", value: "Name, city, contact, one photo — never a colour or logo" },
      { label: "A number on the site", value: "A real mm measurement, or nothing at all" },
    ],
    problem:
      "The client — Amanda, who has run this eyewear label since 2002 — had no real web presence: a Linklist page and a one-screen Canva site. She sells exclusively through independent optical shops, and those resellers had nothing of their own to show a customer. The brand already existed — name, mark, a specific gold sampled from her own material, '24 years' as the one asset nobody else in the category has — the job was never inventing an identity, it was building the platform that could carry it without flattening every reseller into an identical sub-brand.",
    approach:
      "The product is built around one sentence that was already in the logo: a frame is a decision about what you look at. A reseller is an endorsement, not a sub-brand — enforced in the data model itself, not just in the copy: no colour field, no logo field, no font field, ever. Every path — brand site or reseller storefront — terminates in a single WhatsApp deep-link builder, because the brand's actual failure mode on a sibling project was shipping a `localhost` link to production after more than one place built that string. The catalogue and tenancy layers are built as typed seams (`lib/catalog/source.*.ts`, `lib/tenant/scope.ts`) against local mock data now, so the CMS arriving in the next phase is a new implementation of an existing interface, not a rewrite. And where a rule says a number must be a real measurement or a photo must be real, the honest failure state — no numeração, 'sem foto' — ships instead of a placeholder that would quietly lie to an optician.",
    outcome:
      "A working Fase 0: the homepage, `/colecoes`, `/catalogo`, `/oculos/[slug]`, and a path-routed storefront stand-in at `/loja/[rev]` all render end-to-end against typed mock data, dark-only, with the brand's own gold as the single accent. Every product photo gallery without a real shot renders the honest 'sem foto' state rather than an invented photograph — there is no real product photography yet, so there is no fake product photography either. A 16-slide pitch deck at `/apresentacao` exists specifically to extract the open questions (the apex domain, the pricing model, where a WhatsApp lead should route) that block the next phase, rather than letting the build silently assume answers to them.",
    sections: [
      {
        title: "A reseller is an endorsement, not a sub-brand",
        body: "The most common failure mode for a 'let resellers have their own page' feature is theming creep: a colour picker, a logo upload, and eighteen months later every storefront looks like a different company wearing the same product photos. Trísion's data model doesn't have those fields at all — a reseller controls its name, city, contact, one photograph, and which frames it carries. The brand's dark background, gold accent, and typography carry through untouched on every `/loja/[rev]` page, because the thing being sold is trust in the brand, not the shop.",
      },
      {
        title: "A number is a real measurement, or it isn't shown",
        body: "Eyewear has one piece of data an optician actually reads: the `52□18-145` printed inside the temple — eye size, bridge, temple length, all in millimetres. `Numeracao` renders that string from real `produtos.medidas` data, with the `□` drawn as inline SVG rather than substituted with a hyphen or a slash. A product with no measurements renders no numeração at all — never a placeholder value — because a wrong number shown to an optician is a worse failure than a blank field.",
      },
      {
        title: "A seam built for a CMS that doesn't exist yet",
        body: "Fase 0 deliberately has no database and no Payload CMS — that's Fase 1. But every read of the catalogue and every read of a reseller's scope already goes through one function each (`lib/catalog/source.ts`, `lib/tenant/scope.ts`) typed against the same domain shapes Payload will eventually implement. No component imports mock data directly. The bet is that swapping `source.local.ts` for `source.payload.ts` behind that seam is a normal phase of work instead of a rewrite — the same seam pattern that already paid for itself on an earlier sibling project.",
      },
      {
        title: "Honest empty states instead of invented photography",
        body: "There is no real Trísion product photography yet. Rather than fill the gap with stock eyewear photos that would read as this brand's actual catalogue, every gallery without a real shot renders a plain 'sem foto' panel. It's a worse-looking page today and a truthful one — the alternative is a client discovering, after showing the site to a customer, that half the 'photos' were never hers.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Scaffold and the pitch deck",
        body: "Next.js scaffolded with the design tokens sampled from the client's own material — including the specific gold, `#CCA866`, sampled from her existing lockup rather than a generic 'stock gold'. The first deliverable wasn't a page, it was a 16-slide presentation at `/apresentacao` built to extract the open questions (domain ownership, pricing model, WhatsApp routing) that block later phases, shown to the client on her phone.",
      },
      {
        phase: "02",
        title: "The brand components",
        body: "`Visor` (the four corner brackets that frame something real — never decoration on an empty area), `Numeracao` (the SVG-square mm string), `Marca`/`MarcaLockup` (the wordmark, drawn from one shared path source so the header, favicon, and Open Graph card can never drift from each other), and `Ceu` (the starfield canvas, static under reduced motion, off entirely without WebGL) — none of these come from a component library, because they are the brand.",
      },
      {
        phase: "03",
        title: "Catalogue and tenancy, against typed mock data",
        body: "The full frontend — home, `/colecoes`, `/catalogo` with URL-driven filters, `/oculos/[slug]`, and the `/loja/[rev]` storefront stand-in — built against `content/`'s typed example data, behind the `lib/catalog/` and `lib/tenant/` seams that Payload will later implement without the pages above them changing.",
      },
      {
        phase: "04",
        title: "Fase 1 — not started",
        body: "Payload CMS, Postgres, and Vercel Blob, mounted inside the same app once the client's apex domain and DNS access are confirmed (currently `[VERIFICAR]`) — the wildcard-subdomain storefront routing the whole multi-tenant model depends on can't ship without it.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js App Router",
        detail: "Brand routes and the Fase 0 `/loja/[rev]` storefront stand-in sharing one app, dark theme hardcoded, no light-mode toggle.",
      },
      {
        layer: "Catalogue seam",
        label: "lib/catalog/source.*.ts",
        detail: "One typed interface over local mock data now; a Payload implementation is a new file behind the same seam, not a rewrite.",
      },
      {
        layer: "Tenancy seam",
        label: "lib/tenant/scope.ts",
        detail: "The single place that reads reseller/showcase data — every tenant-scoped read goes through this one function.",
      },
      {
        layer: "Conversion",
        label: "lib/lead/link.ts",
        detail: "The one `wa.me` deep-link builder used by every CTA on the site — no second place composes a WhatsApp URL.",
      },
      {
        layer: "Content",
        label: "content/*.ts",
        detail: "Typed TypeScript modules standing in for the catalogue and reseller data Payload owns from Fase 1 onward — every entry marked `exemplo`.",
      },
    ],
    features: [
      {
        title: "Endorsement-only reseller storefronts",
        body: "A reseller gets a name, city, contact, and one photo — never a colour, logo, or font — enforced by the data model, not editorial discipline.",
      },
      {
        title: "Honest 'sem foto' empty states",
        body: "Every product gallery without a real photograph says so plainly instead of substituting a stock image that isn't actually this brand's product.",
      },
      {
        title: "Real numeração or none at all",
        body: "`52□18-145` renders only from real millimetre data, with the `□` as inline SVG — never a hyphen, slash, or invented value.",
      },
      {
        title: "One WhatsApp builder, everywhere",
        body: "Every CTA on every route — brand site or reseller storefront — resolves through the same `lib/lead/link.ts` function.",
      },
    ],
    challenges: [
      {
        title: "Building the CMS seam before the CMS",
        body: "Fase 0 has no database by design, but every future Payload collection already has a typed consumer waiting for it. Getting that boundary right without the real implementation to test it against is the highest-risk part of the phasing.",
      },
      {
        title: "Never inventing a fact about her business",
        body: "No price, measurement, city, or reseller name gets invented — unresolved facts are written inline as `[VERIFICAR: ...]` instead of a plausible placeholder, because a wrong figure shown to Amanda is worse than an honest gap.",
      },
      {
        title: "A brand asset that's still an approximation",
        body: "The wordmark is currently an approximate redraw pending the original vector file — every surface that renders it (header, favicon, Open Graph image) reads from one shared path source specifically so that when the real vector arrives, it updates everywhere at once.",
      },
    ],
    learnings: [
      "Enforcing a brand rule ('a reseller is an endorsement, not a sub-brand') in the data model, not just the design system, is what actually keeps it true after the tenth reseller signs up.",
      "An honest empty state — 'sem foto', no numeração — is a better default than a plausible-looking placeholder, especially on a site a client will show to her own customers.",
      "Building the pitch deck as its own real deliverable, not a stand-in for the product, was what actually got the phase-blocking business questions answered instead of silently assumed.",
    ],
  },
  {
    slug: "prumo",
    title: "Prumo",
    tagline: "MCMV pre-qualification and lead site for a Rio real-estate broker",
    plainEnglish:
      "A site that answers 'can I actually afford this?' before showing apartments — a six-question quiz gives a family an honest credit verdict in about a minute, before they ever compare units.",
    year: "2026",
    status: "Live",
    category: "Product",
    featured: true,
    accent: "#2e4a3c",
    role: "Solo full stack developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: [
      "Next.js",
      "TypeScript",
      "Payload CMS",
      "PostgreSQL",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel Blob",
    ],
    tags: ["Real Estate", "MCMV", "Lead Qualification", "Payload CMS"],
    github: "https://github.com/BenitoPedro13/prumo",
    live: "https://prumo-drab-three.vercel.app",
    image: "/projects/prumo/home.png",
    screenshots: [
      { src: "/projects/prumo/home.png", alt: "Prumo homepage stating the credit-before-apartment order" },
      { src: "/projects/prumo/empreendimentos.png", alt: "Prumo catálogo listing Cury launches by neighbourhood" },
      { src: "/projects/prumo/simulador.png", alt: "Prumo pre-qualification flow with the plumb-rail progress indicator" },
      { src: "/projects/prumo/proposta.png", alt: "Prumo shared proposal page, a personal letter with frozen commercial numbers" },
      { src: "/projects/prumo/sobre.png", alt: "Prumo about page introducing the broker" },
      { src: "/projects/prumo/contato.png", alt: "Prumo contact page with LGPD consent" },
    ],
    quickFacts: [
      { label: "Domain", value: "Minha Casa Minha Vida credit" },
      { label: "CMS", value: "Payload 3, publication-gated" },
      { label: "Data", value: "Neon Postgres + Vercel Blob" },
      { label: "Pre-qualification", value: "Zero persistence, six questions" },
    ],
    problem:
      "The broker doesn't own inventory, set prices, or control delivery — she resells the same Cury Construtora launches, from the same PDFs, as every other broker in Rio. The only real differentiation available is the buyer's experience. And in Minha Casa Minha Vida specifically, the anxiety was never 'which apartment' — it's 'do I actually qualify' — yet almost every listing site in the segment answers the apartment question first and leaves credit for a phone call.",
    approach:
      "Prumo puts the credit question first. A six-step pre-qualification flow gives an instant, honest verdict — one of five outcomes, not a binary yes/no — with zero bureau lookups and zero document uploads. Every policy-sensitive number behind it (MCMV income brackets, subsidy rates, the Rio locality ceiling) lives in a CMS global instead of in code, flagged as an illustrative suggestion until the broker confirms it against Caixa's current tables. The proposal she eventually sends a qualified lead freezes its own commercial numbers at the moment it's created and refuses outright to generate if the underlying price table has expired.",
    outcome:
      "A deployed product — Neon Postgres via Vercel, currently a private preview — where a visitor gets a real MCMV verdict without typing a CPF or uploading a document, and where a family reading a shared proposal always sees both the installment they'd pay today and the INCC-projected one at handover, because the data model makes it structurally impossible to show only one.",
    sections: [
      {
        title: "Credit before apartment",
        body: "The whole product is organized around answering 'eu consigo?' before 'qual apartamento?'. The pre-qualification flow's progress indicator is a plumb rail — a simulated rope, not a keyframed animation — because a pendulum's settle time depends on its own length, and the length is exactly what changes as the flow advances. It's the site's one interactive element, and it's a literal physical metaphor for the product's name and thesis rather than a decorative flourish.",
      },
      {
        title: "Numbers as flagged suggestions, not silent defaults",
        body: "MCMV income brackets, rates, and subsidy bands move by federal portaria — they shifted in March 2026, and the project's own seed data was already stale by the time it was checked. So Parametros stores them in the admin behind a `valores_sugeridos` checkbox rather than as literals in code: every page printing one of those numbers shows a visible 'estimativas ilustrativas' strip while the box is ticked. The flag is the actual publish gate — the broker replaces four fields and unticks one box, no redeploy, no code change.",
      },
      {
        title: "A proposal that can't drift from what was sent",
        body: "`/p/[token]` is a single-use letter to one lead, not a live view of pricing. Its `beforeValidate` hook copies the commercial numbers out of `CondicaoComercial` into the proposal document itself at creation time, so a later edit to the source table never silently changes a proposal already texted to a family — and the same hook refuses to save at all if any selected price table's validity date has passed. Not a warning; a hard block on the single most expensive mistake available in this product.",
      },
      {
        title: "Zero persistence where persistence isn't earned",
        body: "The six-question flow never calls a Server Action, fetch, or storage API — answers live in component state for the length of the visit and vanish on close. That's a deliberate LGPD line: `/contato` writes `Lead` and `Consentimento` through a Server Action because filling out a contact form is consent to be reached, but answering questions about your income and debts is not, so nothing about it is stored, logged, or transmitted anywhere.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Scaffold and legal identity",
        body: "Next.js + Tailwind v4 + shadcn scaffold with Payload CMS 3 embedded in the same app. The broker's CRECI signature component — name, license number, photo, strict proportion rules — was built before any page that would need it, since it's a legal requirement on every surface rather than a design nicety.",
      },
      {
        phase: "02",
        title: "Catálogo and the publication gate",
        body: "Empreendimento/Tipologia/CondicaoComercial collections with Payload's own validation blocking publish until registro and cartório fields are filled — an unfinished legal record can't reach a real visitor by construction, not by editorial discipline.",
      },
      {
        phase: "03",
        title: "The pre-qualification engine",
        body: "The MCMV enquadramento arithmetic, the plumb-rail rope simulation, and a five-outcome result screen that returns every blocker at once — someone with a credit restriction and a prior MCMV purchase hears both reasons the first time, instead of fixing one and coming back to a second no.",
      },
      {
        phase: "04",
        title: "The shared proposal",
        body: "`/p/[token]`, the freeze-at-creation hook, the expired-table hard gate, and a view-count that logs itself by writing through Payload's Local API during a plain page render — an unusual pattern for this codebase, kept deliberately contained to this one route.",
      },
      {
        phase: "05",
        title: "First deployment",
        body: "Neon Postgres via the Vercel Marketplace integration, with Vercel Blob standing in for the originally planned Cloudflare R2 (unreachable through Vercel's Marketplace CLI without a separate Cloudflare account) — both storage adapters stay wired in `payload.config.ts`, so moving to R2 later is an environment variable, not a rewrite.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js App Router",
        detail: "Public marketing, catálogo, pre-qualification, and proposal routes, sharing one app with the admin route group.",
      },
      {
        layer: "CMS / Admin",
        label: "Payload CMS 3, pt-BR",
        detail: "Publication-gated collections plus a `Parametros` global holding every MCMV number the market can move.",
      },
      {
        layer: "Data",
        label: "Neon Postgres",
        detail: "One managed database shared across local dev, Preview, and Production via the Vercel integration.",
      },
      {
        layer: "Media",
        label: "Vercel Blob",
        detail: "S3-compatible storage for renders and floor plans, with the R2 adapter kept wired for a later swap.",
      },
      {
        layer: "Messaging",
        label: "wa.me deep links",
        detail: "Pre-filled WhatsApp context instead of the WhatsApp Business API, which buys nothing at this volume.",
      },
    ],
    features: [
      {
        title: "Five-outcome pre-qualification",
        body: "Approved in-band, approved in a different faixa, above the faixas, outside the program, or 'not yet' — the last returning every blocker at once rather than one at a time.",
      },
      {
        title: "Plumb-rail progress",
        body: "A simulated rope whose settle time and lean are physically integrated from the flow's own state — both the progress indicator and the site's only interactive element.",
      },
      {
        title: "Frozen, hard-gated proposals",
        body: "Commercial numbers copied into the document at creation; generation blocked outright by an expired price table.",
      },
      {
        title: "Flagged, not hardcoded, policy numbers",
        body: "MCMV faixas, rates, and subsidy bands live in the admin behind a visible confirmation flag, never shipped as literals in code.",
      },
    ],
    challenges: [
      {
        title: "Housing policy that moves faster than a codebase",
        body: "MCMV brackets shifted by portaria mid-project, and the seed table was already stale by the time it was checked. The fix was structural — a confirmation flag plus an admin surface — not a one-time correction.",
      },
      {
        title: "An honest 'not yet'",
        body: "Designing a fifth outcome that reads as useful rather than as a rejection meant returning a list of every blocker, so a restriction and a prior MCMV purchase are both surfaced the first time.",
      },
      {
        title: "Motion with a real physical constraint",
        body: "A pendulum's period depends on its length, and the flow's length changes as questions are answered — so the plumb rail had to be an integrated simulation, not a keyframed clip that would visibly desync from its own state.",
      },
    ],
    learnings: [
      "A hard gate — an expired table blocking generation outright — beats a warning nobody reads, on the one number in the product where the mistake is expensive.",
      "Flagging an unconfirmed number as a suggestion, rather than leaving it empty, is what actually gets it corrected: the broker can see and fix it instead of it silently gating an entire surface.",
      "A regulatory boundary (what needs consent, what needs zero persistence) makes a better design constraint than a technical one — it decided the pre-qualification's entire data flow before any state-management code was written.",
    ],
  },
  {
    slug: "art-hur",
    title: "ART'hur",
    tagline: "Motion-led portfolio and living archive for a visual director",
    plainEnglish:
      "A portfolio site that behaves like a sequence of film scenes instead of a scrollable page — one project fills the screen at a time, and a single scroll notch cuts to the next one like an edit, not a swipe.",
    year: "2026",
    status: "In development",
    category: "Product",
    featured: true,
    accent: "#d83823",
    role: "Solo full stack developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: [
      "Next.js",
      "TypeScript",
      "Payload CMS",
      "PostgreSQL",
      "Tailwind CSS",
      "GSAP",
      "OGL (WebGL)",
      "Vercel Blob",
    ],
    tags: ["Portfolio", "Motion Design", "WebGL", "Payload CMS"],
    github: "https://github.com/BenitoPedro13/ART-hur",
    live: "https://art-hur.vercel.app",
    image: "/projects/art-hur/home.png",
    screenshots: [
      { src: "/projects/art-hur/home.png", alt: "ART'hur's centered archive stage with the dashed route and walker glyph" },
      { src: "/projects/art-hur/casa-264.png", alt: "ART'hur project case study header for Casa 264" },
      { src: "/projects/art-hur/index.png", alt: "ART'hur contact-sheet index of every project" },
      { src: "/projects/art-hur/about.png", alt: "ART'hur about page running the Living Tag at display scale" },
      { src: "/projects/art-hur/contact.png", alt: "ART'hur contact page with direct paths first" },
    ],
    quickFacts: [
      { label: "Direction", value: "Marked Frequencies" },
      { label: "Navigation", value: "One centered project stage" },
      { label: "CMS", value: "Payload 3 + Vercel Blob" },
      { label: "Motion", value: "WebGL morph + dashed route" },
    ],
    problem:
      "The starting point was a Next.js and Payload CMS foundation wearing a literal macOS desktop skin — wallpaper, dock, icons, window chrome. It behaved like software demoing itself, not like an archive of a director's actual work, and a generic template grid could never carry the specific rhythm of motion-forward, culturally fluent work.",
    approach:
      "The CMS, data model, and Next.js foundation stayed. Everything public-facing was rebuilt around a studied 'Marked Frequencies' direction, translated from two reference archives rather than copied from either: one fixed, centered project stage where image, atmosphere, title, and metadata morph in place, advanced by a single wheel notch or short touch gesture instead of an open carousel. A dashed white route and a hand-authored 15-frame walking glyph carry the sense of motion instead of a generic loader, and the app cuts between two surfaces — a dark 'room' for media routes and a light 'sheet' for reading — with no cross-fade between them.",
    outcome:
      "A live archive at art-hur.vercel.app carrying five real projects, each with production metadata instead of filler copy, where the desktop-simulation shell is gone from every public route, the CMS layer is untouched, and the opening sequence, walker, and morph transition all degrade to a complete, legible page under reduced motion or a failed WebGL context.",
    sections: [
      {
        title: "One stage, not a carousel",
        body: "The home is a single sticky, centered project stage rather than a horizontal track. A modest wheel notch or short touch-scroll gesture immediately selects the adjacent project and synchronizes the native document anchor to it — the visual transition then completes on its own authored easing rather than being scrubbed frame-by-frame off scroll distance, so the experience reads as a cut between scenes instead of a dragged carousel.",
      },
      {
        title: "A route and a walker instead of a spinner",
        body: "A single dashed Newsprint-white line exits both screen edges and breathes as one slow seesaw about a fixed center anchor. An original 15-frame '芸' glyph, capped at 82×82 CSS pixels, rides that anchor: it plays its gait only during the entrance and project transitions, flips when navigating backward, and holds a neutral frame while idle. Neither is decorative chrome borrowed from a template — both are bespoke marks tied to this one archive.",
      },
      {
        title: "Two surfaces, cut not faded",
        body: "The site declares exactly two surfaces and cuts between them with no cross-route fade: the 'room' (Vinyl Black) for media-led routes, the 'sheet' (Newsprint) for reading. Each interior route stamps `data-surface` on its root element and the global stylesheet paints the canvas to match, so overscroll never bleeds the wrong background color into view.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Strip the shell, keep the foundation",
        body: "Next.js App Router, Payload CMS, PostgreSQL, and Vercel Blob stayed exactly as inherited. Every literal macOS desktop simulation — wallpaper, lock screen, dock, icons, window chrome — was removed from the public experience before any new visual direction was authored on top.",
      },
      {
        phase: "02",
        title: "Build the one-stage navigation",
        body: "The centered project stage, the wheel/touch-to-anchor gesture sync, and a controlled WebGL morph transition adapted from React Bits' MorphSlider — running on its own easing instead of being tied directly to scroll position.",
      },
      {
        phase: "03",
        title: "Author the motion signature",
        body: "The continuously breathing dashed route, the hand-drawn 15-frame walking glyph, and a restrained WebGL ripple hover layer over the stable active image — suppressed during transitions, reduced motion, and touch-only use.",
      },
      {
        phase: "04",
        title: "Interior routes, opening, and SEO",
        body: "The work case study, contact-sheet index, about, and contact routes; the two-surface room/sheet system; a resilient CSS-only opening sequence; and per-route Open Graph images and JSON-LD generated from the same brand language.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js App Router",
        detail: "Public archive routes sharing one app with the Payload admin route group, plus localized routing.",
      },
      {
        layer: "CMS",
        label: "Payload CMS 3",
        detail: "Projects, media, and site settings, publication-gated the way the inherited foundation intended.",
      },
      {
        layer: "Data",
        label: "PostgreSQL + Vercel Blob",
        detail: "Relational content plus S3-compatible object storage for project imagery.",
      },
      {
        layer: "Motion",
        label: "OGL (WebGL) + GSAP / motion",
        detail: "The centered morph transition and ripple hover run on a controlled OGL renderer; DOM-level choreography runs on GSAP and motion.",
      },
    ],
    features: [
      {
        title: "One-stage project navigation",
        body: "A single wheel notch or short touch gesture selects the adjacent project and syncs the document anchor; the transition then completes on its own authored easing instead of being scrubbed by scroll distance.",
      },
      {
        title: "Dashed route and walker glyph",
        body: "A continuously breathing dashed line and a hand-authored 15-frame '芸' glyph carry direction and motion instead of a generic spinner or carousel arrow.",
      },
      {
        title: "Two-surface cut system",
        body: "Media routes render on a dark 'room' and reading routes on a light 'sheet', with the surface stamped on the route root so overscroll never reveals the wrong canvas color.",
      },
      {
        title: "Resilient opening sequence",
        body: "A full-screen CSS-only animation that fills backward from its final visible state, so a failed or skipped animation still renders a complete page rather than a blank one.",
      },
    ],
    challenges: [
      {
        title: "Decoupling gesture from animation",
        body: "The wheel/touch input had to commit to the adjacent project on one modest gesture rather than scrubbing shader progress directly off scroll distance, so the transition reads as an edit rather than a scroll-linked effect.",
      },
      {
        title: "Keeping data and shell separable",
        body: "The Payload CMS foundation and its data model had to survive completely intact while every public-facing macOS-simulation layer built on top of it was removed.",
      },
      {
        title: "An overlay that can't fail blank",
        body: "The full-screen opening sequence is CSS-only and fills backward from a complete final state, so a bug in the animation still renders the finished site instead of hiding it entirely.",
      },
    ],
    learnings: [
      "Studying two reference archives for confidence and pacing, then translating rather than cloning, produces a stronger identity than either source alone.",
      "An authored motion signature — one specific glyph, one specific line — reads as intentional in a way a generic spinner or carousel never does.",
      "Building the reduced-motion and WebGL-failure paths alongside the primary experience, not after it, is what keeps the hierarchy legible when the flashy parts are off.",
    ],
  },
  {
    slug: "plexus",
    title: "Plexus",
    tagline: "Extensible media processing engine with a non-destructive, WebGPU photo editor on top",
    plainEnglish:
      "A batch media pipeline system — like a personal Cloudinary — where the exact same 'recipe' you build by hand editing one photo runs unmodified across hundreds of files, with live progress and an editor that feels like Apple Photos.",
    year: "2026",
    status: "Live",
    category: "Platform",
    featured: true,
    accent: "#C2410C",
    role: "Solo architect and developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Go",
      "WebGPU",
      "NATS JetStream",
      "PostgreSQL",
      "MinIO",
    ],
    tags: ["Media Pipeline", "WebGPU", "Non-Destructive Editing", "Polyglot Monorepo"],
    github: "https://github.com/BenitoPedro13/plexus",
    live: "https://plexus.up.railway.app",
    image: "/projects/plexus/editor-with-image.png",
    screenshots: [
      { src: "/projects/plexus/home.png", alt: "Plexus home screen — drop a file or pick photo, video, or audio" },
      { src: "/projects/plexus/quick-actions.png", alt: "Plexus quick actions menu for photo, video, and audio" },
      { src: "/projects/plexus/photo-actions.png", alt: "Plexus quick actions for photo: edit, convert, compress" },
      { src: "/projects/plexus/video-actions.png", alt: "Plexus quick actions for video: shrink, convert, extract audio" },
      { src: "/projects/plexus/audio-actions.png", alt: "Plexus quick actions for audio: convert to MP3, WAV, or AAC" },
      { src: "/projects/plexus/editor-empty.png", alt: "Plexus non-destructive photo editor before an image is loaded" },
      { src: "/projects/plexus/editor-with-image.png", alt: "Plexus photo editor with an image loaded, WebGPU live preview" },
      { src: "/projects/plexus/jobs.png", alt: "Plexus jobs page showing processing and completed batch jobs" },
    ],
    quickFacts: [
      { label: "Architecture", value: "Go workers + NestJS orchestrator" },
      { label: "Live preview", value: "WebGPU, zero server round-trips" },
      { label: "Queue", value: "NATS JetStream — dispatch + progress" },
      { label: "Data model", value: "Editor recipe = pipeline definition" },
    ],
    problem:
      "My earlier video-converter project was a fixed pipeline: upload, one transformation, download. There was nothing in my portfolio that behaved like real media infrastructure — a general-purpose, extensible processing engine, closer to what a Cloudinary or a Zapier-for-media actually has to solve. And engineering-first tools like that usually expose their internals — queues, jobs, DAGs — directly in the UI, which makes them feel powerful but unapproachable to an actual end user dragging a slider.",
    approach:
      "Plexus is built around one idea: an edit made by hand on a single photo and a batch pipeline definition are the same data structure. Every editor control writes to a small ordered list of `{ processor, params }` steps — a recipe — instead of touching a pixel. That recipe previews live in the browser over WebGPU, and the identical recipe is what a Go worker executes, unmodified, whether it's one image or five hundred. NestJS owns the DAG resolution and job state machine, Go owns the CPU-bound ffmpeg/libvips work, and NATS JetStream is the one piece of infra behind both job dispatch and the real-time progress stream the frontend subscribes to.",
    outcome:
      "A working system on Railway where dropping a photo into the editor and dragging Light/Color/Sharpen sliders feels instant with no server round-trip, and clicking 'apply to batch' runs that exact recipe as a real DAG pipeline across a whole folder — with live per-step progress and no worker able to silently lose a job.",
    sections: [
      {
        title: "One data structure, two UIs",
        body: "The editor and the pipeline engine share a single Zod schema (`packages/recipe`) covering every processor: resize, convert, compress, crop, and the composite Light/Color/B&W/Sharpen controls. The editor's direct-manipulation sliders and the orchestrator's declarative pipeline DAGs both produce and consume the exact same recipe object — there is no 'convert my edit into a pipeline' translation step anywhere in the codebase, because none is needed.",
      },
      {
        title: "Why the preview never touches the server",
        body: "Dragging a slider has to feel instant, and a server round-trip per adjustment can't hit that latency. So the live preview renders entirely client-side: WebGPU compute/render pipelines apply the current recipe to the original image in the browser, with a WebGL2 fallback for browsers without WebGPU support. The Go backend only gets involved for the final full-resolution export and for batch runs — one execution engine backs both, and the drift between the browser's approximation and the Go ground-truth render is measured against a numeric bound per control, not eyeballed.",
      },
      {
        title: "Go where it's CPU-bound, TypeScript everywhere else",
        body: "The orchestrator (NestJS) handles auth, DAG resolution, and job state — I/O-bound coordination work where TypeScript's iteration speed wins. The worker pool is Go, because resizing, transcoding, and compressing media is CPU-bound and benefits from real per-worker memory and concurrency control that a Node process doesn't give you cheaply. Neither side blurs into the other: media processing logic doesn't creep into the orchestrator, and job/business logic doesn't creep into the workers.",
      },
      {
        title: "NATS JetStream as one piece of infra, two jobs",
        body: "Job dispatch and the real-time progress stream both run over NATS JetStream instead of two separate systems — a queue for work, a pub/sub layer for events. JetStream's persistence means a worker killed mid-job doesn't lose the job; another replica picks the message back up, which is the concrete, demonstrated version of 'no lost jobs' rather than an aspiration.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Core pipeline engine",
        body: "Orchestrator, one Go worker type, Postgres, and NATS — linear pipelines only, built-in resize/convert/compress/video/audio processors. No editor yet, just proving jobs could be dispatched, run, and tracked reliably.",
      },
      {
        phase: "02",
        title: "Editor MVP",
        body: "The non-destructive recipe model, the WebGPU/WebGL2 live preview renderer, and the curated composite sliders (Light, Color, B&W, Sharpen, Crop) with synchronous export — shippable as its own milestone, independent of the batch machinery.",
      },
      {
        phase: "03",
        title: "Real DAGs, realtime, and Apply to Batch",
        body: "Presigned MinIO upload, the shared `@plexus/recipe` package, an SSE progress stream off the same NATS events, and branching/parallel DAG resolution — the point where 'edit once, apply to 500 files' became a real button instead of an architectural claim.",
      },
      {
        phase: "04",
        title: "Plugin system — not started",
        body: "The gRPC plugin contract that lets a third party add a new processor in any language without touching the core. Deliberately phased last since it's additive to an already-working engine, not a dependency of it.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js + WebGPU/WebGL2 editor",
        detail: "Upload, dashboard, live progress, and the in-browser non-destructive preview renderer — no pixel ever leaves the browser during editing, only the recipe.",
      },
      {
        layer: "API",
        label: "NestJS orchestrator",
        detail: "Auth, pipeline DAG resolution, and the job state machine (queued → running → partial → complete/failed).",
      },
      {
        layer: "Async",
        label: "NATS JetStream",
        detail: "Persistent, replayable event log backing both job dispatch to workers and the SSE progress stream to the browser.",
      },
      {
        layer: "Workers",
        label: "Go worker pool",
        detail: "ffmpeg/libvips-backed built-in processors, horizontally scalable, executing the same recipe at full resolution for export and batch runs.",
      },
      {
        layer: "Storage",
        label: "PostgreSQL + MinIO",
        detail: "Drizzle-managed jobs/pipelines/recipes/plugin-registry schema in Postgres; presigned-URL upload/download through MinIO so the API never proxies large files.",
      },
    ],
    features: [
      {
        title: "Non-destructive recipe editing",
        body: "Every control — crop, light, color, sharpen — writes recipe parameters, never pixels. Undo/redo is just recipe history.",
      },
      {
        title: "Live WebGPU preview",
        body: "Slider drags render in-browser with no server round-trip, falling back to WebGL2 where WebGPU isn't available.",
      },
      {
        title: "Apply to Batch",
        body: "The recipe built by hand on one photo runs, unmodified, as a pipeline across an entire folder of files.",
      },
      {
        title: "Real-time job progress",
        body: "Per-step SSE progress driven off the same NATS event stream used for dispatch, not a separate polling loop.",
      },
    ],
    challenges: [
      {
        title: "Preview/export fidelity drift",
        body: "The browser's WebGPU approximation and the Go server's ground-truth render must agree closely enough that a user never sees a surprise on export. Drift per composite control is measured numerically against a bound and enforced by a test, not checked by eye.",
      },
      {
        title: "Crash-safe job dispatch",
        body: "A worker killed mid-job must not silently drop it. JetStream's persistence plus explicit ack/heartbeat handling means another replica picks the message back up instead of the job vanishing.",
      },
      {
        title: "Keeping the language boundary a contract",
        body: "With Go and TypeScript on either side of gRPC, NATS subjects, and a shared Postgres schema, it's easy for the boundary to dissolve into ad-hoc JSON shapes duplicated by hand. The recipe schema has exactly one canonical definition, and everything else imports or generates from it.",
      },
    ],
    learnings: [
      "Structural unification — making two features literally the same data structure — beats a translation layer between them every time.",
      "A live preview that lies to the user by even a little is worse than a slower, honest one; fidelity drift needs a measured bound, not a vibe check.",
      "A persistent, replayable event log doubling as both queue and pub/sub is one less piece of infrastructure to keep consistent.",
    ],
  },
  {
    slug: "markado",
    title: "Markado",
    tagline: "Service scheduling platform with real calendar and payments",
    plainEnglish:
      "A booking website where a professional shares one link, clients pick a free time slot, and the meeting plus the payment are handled automatically.",
    year: "2025",
    status: "Case study",
    category: "Product",
    featured: true,
    accent: "#F97316",
    role: "Solo full stack developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Docker",
      "GitHub Actions",
    ],
    tags: ["Scheduling", "Payments", "SaaS", "Google APIs"],
    github: "https://github.com/BenitoPedro13/markado",
    live: null,
    image: "/projects/markado/agendamentos.png",
    screenshots: [
      { src: "/projects/markado/agendamentos.png", alt: "Markado appointments dashboard" },
      { src: "/projects/markado/disponibilidade.png", alt: "Markado weekly availability editor" },
      { src: "/projects/markado/booking-page.png", alt: "Markado public booking page as seen by a client" },
      { src: "/projects/markado/servicos.png", alt: "Markado booking form question editor" },
    ],
    quickFacts: [
      { label: "Type", value: "SaaS product" },
      { label: "Integrations", value: "Google Calendar, Meet, Stripe" },
      { label: "Auth", value: "Multi-step" },
      { label: "Deploys", value: "CI/CD via GitHub Actions" },
    ],
    problem:
      "Booking a service still runs on message threads. Someone asks for a time, the provider checks their calendar, they go back and forth, and then payment happens somewhere else entirely. Every step is manual and every step can fail: double bookings, forgotten meetings, unpaid sessions.",
    approach:
      "I built a single scheduling surface that owns availability, the calendar event, and the money. The provider defines their working rules once. Everything downstream — the free slots a client sees, the Google Calendar entry, the Meet link, the Stripe charge — derives from that one source of truth.",
    outcome:
      "A booking link that turns a conversation into a confirmed, paid, calendar-synced appointment in about thirty seconds, with no manual step for the provider.",
    sections: [
      {
        title: "What it actually does",
        body: "A provider signs up, connects their Google account, and describes when they work: days, hours, buffer between sessions, how far in advance people can book. Markado turns those rules into a public page. A client opens it, sees only genuinely free time, picks a slot, pays, and receives a calendar invite with a video link. The provider never touches anything.",
      },
      {
        title: "Why availability is the hard part",
        body: "Showing free time sounds trivial until you account for timezones, existing events in an external calendar, buffers, minimum notice, and two people trying to book the same slot in the same second. Availability is computed on the server from working rules plus live Google Calendar data, and the final write is guarded so the second person to click gets a clear 'just taken' message instead of a silent double booking.",
      },
      {
        title: "Type safety end to end",
        body: "The whole app speaks one type system. tRPC means the frontend calls backend procedures as if they were local functions, with argument and return types checked at compile time. Prisma generates the database types. If I rename a column, the build fails in the UI file that used it. That eliminates an entire category of bugs that normally reach production.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Map the booking journey",
        body: "I wrote out every state a booking can be in — requested, confirmed, paid, rescheduled, cancelled, no-show — before writing code. That state list became the database schema.",
      },
      {
        phase: "02",
        title: "Model availability first",
        body: "Availability was built and tested as a pure function: given rules, existing events, and a timezone, return open slots. Isolating it meant I could test edge cases like DST transitions without spinning up a UI.",
      },
      {
        phase: "03",
        title: "Layer the integrations",
        body: "Google OAuth, then Calendar read, then Calendar write with Meet conferencing, then Stripe. Each integration shipped behind its own boundary so a failure in one doesn't take down the booking flow.",
      },
      {
        phase: "04",
        title: "Automate the pipeline",
        body: "GitHub Actions runs typecheck, lint, and tests on every push, then builds the Docker image. Deploys are a merge, not a ritual.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js App Router",
        detail: "Server components for the public booking page, client components for the interactive slot picker.",
      },
      {
        layer: "API",
        label: "tRPC procedures",
        detail: "End-to-end typed RPC layer — no hand-written fetch clients, no drifting API contracts.",
      },
      {
        layer: "Data",
        label: "PostgreSQL + Prisma",
        detail: "Relational schema for users, event types, availability rules, and bookings with migrations in version control.",
      },
      {
        layer: "Integrations",
        label: "Google Calendar / Meet · Stripe",
        detail: "OAuth 2.0 for calendar access, conferencing auto-created per booking, Stripe for checkout and webhooks.",
      },
      {
        layer: "Infra",
        label: "Docker + GitHub Actions",
        detail: "Reproducible container builds, automated checks, and continuous deployment.",
      },
    ],
    features: [
      {
        title: "Multi-step authentication",
        body: "Signup is split into deliberate stages so the account, the calendar connection, and the payment setup each get a clear, recoverable step.",
      },
      {
        title: "Live availability engine",
        body: "Slots are computed against real calendar data, timezones, and buffer rules — never a static list.",
      },
      {
        title: "Automatic video meetings",
        body: "Every confirmed booking creates a Google Calendar event with a Meet link attached for both parties.",
      },
      {
        title: "Payments at booking time",
        body: "Stripe checkout runs inside the booking flow, so a confirmed slot is a paid slot.",
      },
    ],
    challenges: [
      {
        title: "Timezones",
        body: "A provider in Rio and a client in Lisbon must see the same moment in their own local time. Everything is stored in UTC and converted only at the display edge, with the timezone captured explicitly at booking.",
      },
      {
        title: "Race conditions",
        body: "Two clients can request the same slot simultaneously. The booking write revalidates availability inside the transaction, so the loser gets a clean error rather than a corrupted calendar.",
      },
      {
        title: "External API failure",
        body: "Google and Stripe both go down occasionally. Failures are isolated per integration and surfaced honestly instead of leaving a booking in an unknown state.",
      },
    ],
    learnings: [
      "Modelling the state machine before the schema saved weeks of migration churn.",
      "Pure functions for business rules are worth the extra indirection — they are the only parts you can test cheaply.",
      "End-to-end type safety pays for itself the first time you rename something.",
    ],
  },
  {
    slug: "video-converter",
    title: "Video Converter",
    tagline: "Microservices video-to-audio pipeline with queues and Kubernetes",
    plainEnglish:
      "Upload a video, get the audio back as an MP3. The interesting part is that the work is split across independent services so heavy conversions never freeze the app.",
    year: "2024",
    status: "Open source",
    category: "Infrastructure",
    featured: false,
    accent: "#FB923C",
    role: "Solo architect and developer",
    timeline: "3 months",
    team: "Solo",
    stack: [
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "MongoDB GridFS",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
      "TypeScript",
    ],
    tags: ["Microservices", "Message Queues", "Kubernetes", "Monorepo"],
    github: "https://github.com/BenitoPedro13/video-converter",
    live: null,
    quickFacts: [
      { label: "Architecture", value: "Microservices" },
      { label: "Messaging", value: "RabbitMQ" },
      { label: "Storage", value: "MongoDB GridFS" },
      { label: "Orchestration", value: "Kubernetes" },
    ],
    problem:
      "Converting video is slow and CPU-hungry. If you do it inside the web request, one upload blocks the server, the user stares at a spinner, and a browser timeout loses the whole job. Scaling that naive design means scaling the entire application just to get more conversion capacity.",
    approach:
      "I split the system into small services that talk through a message queue instead of calling each other directly. The gateway accepts the upload and immediately returns. A message goes onto RabbitMQ. A dedicated converter service picks it up whenever it has capacity, does the work, and publishes a completion message that triggers a notification.",
    outcome:
      "Uploads return instantly, conversion capacity scales independently of the web tier, and a crashed worker means a retried message rather than a lost file.",
    sections: [
      {
        title: "Why microservices here",
        body: "Most apps do not need microservices. This one does, because the workload is genuinely lopsided: the API is cheap and constant, the conversion is expensive and bursty. Splitting them means you can run one API instance and ten converters during a spike, then scale back down. The queue is what makes that possible — it decouples 'work requested' from 'work performed'.",
      },
      {
        title: "The service map",
        body: "Four services: an API gateway that is the only public entry point, an auth service that owns identity and issues tokens, a converter service that consumes queue messages and runs the transcoding, and a notification service that tells the user when their file is ready. None of them call each other synchronously for the heavy path.",
      },
      {
        title: "Storing large files",
        body: "Video files exceed the practical row size of a normal database. MongoDB GridFS chunks large binaries across documents, so uploads and results are stored and streamed back without holding an entire file in memory. Relational data — users, jobs, statuses — stays in PostgreSQL where it belongs.",
      },
      {
        title: "One repo, many services",
        body: "It is a monorepo: shared types, shared lint config, one command to spin the whole system up with Docker Compose, and end-to-end tests that exercise a real upload through a real queue rather than mocking it.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Find the bottleneck",
        body: "I profiled a naive single-service version first. The conversion step dominated everything, which justified the split — I did not start with microservices as an assumption.",
      },
      {
        phase: "02",
        title: "Define message contracts",
        body: "Before splitting, I wrote the message payloads. Contracts on the wire are the real API in a queue-based system, so they got designed deliberately.",
      },
      {
        phase: "03",
        title: "Extract services one at a time",
        body: "Auth first, then conversion, then notifications. Each extraction kept the system running so I never had a big-bang rewrite to debug.",
      },
      {
        phase: "04",
        title: "Containerise and orchestrate",
        body: "Every service ships as a Docker image with health checks, then Kubernetes manifests define replicas, resources, and restart behaviour.",
      },
      {
        phase: "05",
        title: "Prove it end to end",
        body: "E2E tests upload a real file and assert the MP3 comes back, exercising the queue and both databases rather than stubs.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js frontend",
        detail: "Upload UI with job status polling and download of finished audio.",
      },
      {
        layer: "Edge",
        label: "API Gateway (NestJS)",
        detail: "Single public entry point. Validates requests, checks auth, publishes jobs, never blocks on conversion.",
      },
      {
        layer: "Identity",
        label: "Auth service",
        detail: "Owns users and tokens so no other service handles credentials.",
      },
      {
        layer: "Async",
        label: "RabbitMQ",
        detail: "Durable queues decouple request from processing and provide retries and backpressure for free.",
      },
      {
        layer: "Workers",
        label: "Converter + Notification services",
        detail: "Independently scalable consumers. Conversion runs off queue depth, notifications fire on completion events.",
      },
      {
        layer: "Storage",
        label: "PostgreSQL + MongoDB GridFS",
        detail: "Relational data for jobs and users, chunked binary storage for the media itself.",
      },
    ],
    features: [
      {
        title: "Non-blocking uploads",
        body: "The request returns as soon as the file is safely stored and the job is queued.",
      },
      {
        title: "Independent scaling",
        body: "Add converter replicas without touching the API tier.",
      },
      {
        title: "Automatic retries",
        body: "A worker crash re-queues the message instead of dropping the job.",
      },
      {
        title: "Completion notifications",
        body: "A dedicated service watches for finished jobs and notifies the user.",
      },
    ],
    challenges: [
      {
        title: "Message idempotency",
        body: "Queues guarantee at-least-once delivery, so a job can be delivered twice. Consumers check job state before working to make reprocessing harmless.",
      },
      {
        title: "Local developer experience",
        body: "Six moving parts is hostile to onboarding. Docker Compose brings the entire stack up with one command and seeded data.",
      },
      {
        title: "Observability across services",
        body: "A failure in a distributed system is hard to locate. Job IDs propagate through every message so a single upload can be traced across all services.",
      },
    ],
    learnings: [
      "Queues are worth it when workloads have different scaling shapes, and overkill when they don't.",
      "At-least-once delivery makes idempotency a requirement, not an optimisation.",
      "E2E tests against real infrastructure catch what unit tests structurally cannot.",
    ],
  },
  {
    slug: "flora",
    title: "Flora",
    tagline: "An operations console for regenerative farming, built on a real satellite pipeline",
    plainEnglish:
      "A farm dashboard where a scheduled worker — never the app itself — asks satellites for ten different plant-health readings a field, so a farmer opens a map and sees exactly which corner of which field is struggling, backed by real Sentinel-2 imagery instead of a demo.",
    year: "2026",
    status: "Case study",
    category: "Platform",
    featured: true,
    accent: "#2f6e46",
    role: "Solo full stack developer",
    timeline: "Ongoing",
    team: "Solo",
    stack: [
      "Next.js 16",
      "NestJS",
      "TypeScript",
      "PostgreSQL + PostGIS",
      "Drizzle ORM",
      "BullMQ + Redis",
      "Mapbox GL JS",
      "Sentinel Hub (CDSE)",
      "Open-Meteo",
    ],
    tags: ["Geospatial", "Multi-tenant SaaS", "Satellite Data", "NestJS", "PostGIS"],
    github: "https://github.com/BenitoPedro13/flora",
    live: null,
    image: "/projects/flora/stress-ndmi.png",
    screenshots: [
      { src: "/projects/flora/home.png", alt: "Flora home dashboard with Regeneration Score, planting productivity, and crops stocked" },
      { src: "/projects/flora/fields.png", alt: "Flora Fields screen with field cards and a Mapbox satellite basemap" },
      { src: "/projects/flora/stress-ndvi.png", alt: "Flora Crop Stress screen reading Contrasted NDVI over a real field boundary" },
      { src: "/projects/flora/stress-ndmi.png", alt: "The same field switched to NDMI, a different colour ramp for moisture instead of vigour" },
      { src: "/projects/flora/stress-reci.png", alt: "The same field switched to RECI, a red-edge chlorophyll index" },
      { src: "/projects/flora/tasks.png", alt: "Flora Tasks board with a real drag-and-drop Kanban" },
      { src: "/projects/flora/weather.png", alt: "Flora Weather screen with six instrument cards over Open-Meteo data" },
    ],
    quickFacts: [
      { label: "Satellite pipeline", value: "10 indices, one Sentinel-2 call" },
      { label: "Tenancy", value: "PostGIS RLS + repo filter, enforced twice" },
      { label: "Request path", value: "Zero calls to the satellite provider" },
      { label: "Scoring", value: "AAFC-sourced Regeneration Score, not invented" },
    ],
    problem:
      "A first version of this idea existed already, built on Google Earth Engine — but Earth Engine only ships Python and JavaScript bindings, and it's a research compute platform, not an imagery API, which made it slow and awkward to build a real product on top of. Beyond that starting point, the actual product problem: a smaller regenerative farm has no in-house GIS or remote-sensing expertise, but still needs to know which part of which field is stressed, this week, without walking every hectare.",
    approach:
      "The whole system is rebuilt around one invariant: no request ever calls the satellite provider. A NestJS worker polls Copernicus's Data Space Ecosystem on a schedule, decodes the returned imagery, computes ten spectral indices from a single Process API call, and writes pre-rendered PNGs to object storage plus rows to Postgres. The API — a separate NestJS service — only ever reads Postgres and Redis. That split is enforced by an actual test, not a comment. Every tenant table sits behind PostGIS row-level security *and* a repository-level filter, checked by a dedicated cross-tenant suite that asserts a 404 (not a 403) on another org's data. Contracts between the three services (web, API, worker) are Zod schemas in one shared package, imported by both TypeScript sides — never a hand-mirrored type.",
    outcome:
      "A working spine — register a field, watch a real stress zone appear from real Sentinel-2 data, act on it as a task — plus a home dashboard, a ten-index spectral switcher, and a weather screen reading a real Open-Meteo forecast. Several of the sharpest bugs never showed up in a code review or a unit test: they only appeared once a manual refresh ran against a real Copernicus account and a real field boundary, and got fixed the same way — by looking at what actually rendered.",
    sections: [
      {
        title: "A read path that never touches the satellite provider",
        body: "This is the one architectural rule the whole system is shaped around: Sentinel Hub is called from exactly one place, a scheduled BullMQ job in the worker, never from a request. The API reads only Postgres and Redis. A raster becomes a PNG in object storage — Cloudflare R2 in production, MinIO locally — referenced by its object key, never a signed URL, because a persisted signed URL just expires quietly in the database later. The rule is enforced by a test that asserts it, not by convention.",
      },
      {
        title: "Ten indices for the cost of two",
        body: "The pipeline started with one scheduled index (NDVI) and grew to ten — NDRE, EVI, MSAVI, RECI, MCARI, a PRI proxy, NDMI, NDWI, and VSDI alongside it, plus a true-colour render — by asking Sentinel Hub for all of them in a single Process API call instead of one call per index. Verified live against a real account: a refresh costs 4.667 Processing Units against a 4.0 baseline, a 17% increase for eight extra outputs, because output count turns out to be free and only the input bands matter. Two indices needed an honest product call rather than a formula: PRI has no real substitute on Sentinel-2 without a 531nm band, so it ships labelled 'PRI (proxy)' everywhere, never bare 'PRI'; a requested 'plain, fixed-domain NDVI' needs a client-side colour-mapped raster the pipeline doesn't build yet, so it's shown disabled with a tooltip explaining why, instead of a legend that quietly lies about what painted the pixels.",
      },
      {
        title: "Bugs a code review can't catch",
        body: "The Sentinel Hub client sent no `Accept` header on its Process API request. Copernicus silently returned a bare single TIFF instead of the requested two-file TAR, and `res.formData()` threw a parser error that read exactly like a token-endpoint failure — it took testing against the live account, not the mocked fixtures, to find the real cause. Separately, two indices without a division in their formula (VSDI, MSAVI2) evaluated to a finite, in-range number at pixels *outside* the field boundary, because the masking logic checked for a `0/0 = NaN`, which only NDVI-shaped ratios produce — so VSDI painted a field's whole bounding-box rectangle instead of clipping to its real, non-rectangular boundary. Caught from a live screenshot, fixed by switching the mask to the imagery's own SCL 'no data' class instead of a formula side-effect.",
      },
      {
        title: "Tenancy enforced twice, not once",
        body: "Every domain table — fields, crops, observations, stress zones, tasks — carries an `organization_id` filtered at the repository layer, and again by Postgres row-level security on the same table. A dedicated integration suite authenticates as one organization and asserts a 404, never a 403, on every other organization's resource, against real RLS, not a mock. The RLS catalog test is a named allowlist of exactly three `SECURITY DEFINER` functions the schema is allowed to have — anything else added later fails the build until it's explicitly reviewed and added to the list.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Foundations, schema, tenancy",
        body: "A pnpm/Turborepo monorepo, a Drizzle + PostGIS schema for ten domain tables with composite foreign keys, and identity with RLS enforced twice before any product screen existed. The design system's five PRO-tier Figma blocks were rebuilt as composites from free AlignUI components rather than paying for a seat.",
      },
      {
        phase: "02",
        title: "The spine: Fields → Crop Stress → Tasks",
        body: "Field CRUD and boundary drawing on a Mapbox map, then the satellite write path (a CDSE HTTP client, a decode-to-PNG raster pipeline, a BullMQ per-field scheduler), then the screen that reads it — raster overlay, stress-zone layer, colour-ramp legend — and finally a Kanban task board with a real @dnd-kit drag, verified against React 19 Strict Mode before any board code was written.",
      },
      {
        phase: "03",
        title: "Home dashboard and a sourced score",
        body: "Daily rollups, a weather snapshot table, and a Regeneration Score built from a real, cited formula — AAFC's agri-environmental performance index over soil cover days, Shannon evenness, and stress-free area share — instead of an invented composite metric.",
      },
      {
        phase: "04",
        title: "Ten spectral indices",
        body: "Widened the pipeline from one scheduled index to ten in a single Process API call, added a per-index colour-ramp registry and a vegetation-floor correction for indices that aren't NDVI-shaped, and built the on-demand true-colour render — which hit and got fixed by the identical SCL-masking bug for the identical reason.",
      },
      {
        phase: "05",
        title: "Weather",
        body: "An Open-Meteo hourly extension and six instrument cards — wind, UV, rain chance, sunrise/sunset, pressure, wind direction — each hand-verified against exported reference SVGs and real seeded data, down to fixing a dark-mode-only invisible-text bug from a static-versus-semantic colour token mismatch.",
      },
    ],
    architecture: [
      {
        layer: "Web",
        label: "Next.js 16 App Router",
        detail: "AlignUI shell, Mapbox map, shadcn/Recharts charts — reads only Postgres-backed API endpoints and Redis-cached data, never a satellite provider.",
      },
      {
        layer: "API",
        label: "NestJS",
        detail: "A separate service from the web app so it can share domain logic with the worker through packages/ instead of Next.js route handlers.",
      },
      {
        layer: "Worker",
        label: "NestJS standalone + BullMQ",
        detail: "The only service allowed to call Sentinel Hub or Open-Meteo — a scheduled per-field job, not a request handler.",
      },
      {
        layer: "Database",
        label: "PostgreSQL 16 + PostGIS 3.4",
        detail: "Drizzle ORM with a custom geography type; every tenant table behind RLS and a repository filter, both.",
      },
      {
        layer: "Object storage",
        label: "Cloudflare R2 (MinIO locally)",
        detail: "Pre-rendered raster PNGs stored by object key, never a persisted signed URL.",
      },
      {
        layer: "Contracts",
        label: "Zod, one shared package",
        detail: "The only shape crossing an app boundary — imported by both NestJS and Next.js, no codegen, no hand-mirrored types.",
      },
    ],
    features: [
      {
        title: "Ten-index spectral switcher",
        body: "NDVI, NDRE, EVI, MSAVI, RECI, MCARI, a labelled PRI proxy, NDMI, NDWI, and VSDI (shown as SMI), each with its own colour ramp — and an honest disabled state, with a tooltip, for the indices this pipeline can't actually produce yet.",
      },
      {
        title: "Real stress-zone detection",
        body: "A raster overlay clipped to the field's true polygon boundary via its imagery's own SCL 'no data' class, grouped detections with priority sorting, and a popover with real mutations against the task board.",
      },
      {
        title: "Kanban tasks board",
        body: "A three-column board with a real @dnd-kit drag, a server-computed midpoint for reordering, and a Water Used tile fed by the same `tasks.water_volume_m3` column the board writes.",
      },
      {
        title: "A sourced Regeneration Score",
        body: "Soil Cover Days, Shannon evenness, and stress-free area share, combined by AAFC's own published agri-environmental performance index — not a composite metric invented for the dashboard.",
      },
    ],
    challenges: [
      {
        title: "A missing Accept header that looked like an auth failure",
        body: "No `Accept: application/tar` on the Process API request meant Copernicus silently returned a single bare TIFF instead of the requested two-file archive, and undici's own parser error on `res.formData()` read exactly like a token problem. Only testing against the real, live account — not the recorded fixtures — surfaced the actual cause.",
      },
      {
        title: "A masking bug that only two of ten indices had",
        body: "Eight of the ten spectral indices are NDVI-shaped ratios, where a masked pixel's own math already produces `0/0 = NaN` outside the field boundary. VSDI and MSAVI2 have no division in their formulas, so that same masked pixel silently evaluated to a real, in-range number instead — painting a rectangle where a field polygon should have been. The fix switched masking to the imagery's own SCL 'no data' class instead of relying on a formula side-effect.",
      },
      {
        title: "A synthetic seed that never clipped to a real boundary",
        body: "The satellite seed script filled its field's entire bounding-box rectangle with valid pixels, since a synthetic raster has no reason to know about the field's real, often non-rectangular boundary the way a genuine CDSE response is clipped server-side. Found by looking at a rendered field, not by inspecting the script.",
      },
    ],
    learnings: [
      "An architectural invariant is only real once a test can fail it — 'no satellite calls on a request path' stayed true because a test asserts it, not because a comment says so.",
      "A missing header can produce an error message that points at the wrong layer entirely; the fix was verifying against the real live account instead of trusting where the stack trace pointed.",
      "A masking rule that works for nine formulas out of ten is still a bug, not a rounding error — the tenth one needs its own real signal (SCL), not an assumption borrowed from the other nine.",
    ],
  },
  {
    slug: "sua-mesa-fit",
    title: "Sua Mesa Fit",
    tagline: "Headless Shopify storefront on Hydrogen",
    plainEnglish:
      "An online food store where the shop management stays in Shopify but the entire customer-facing site is custom-built, so it looks unique and loads fast.",
    year: "2024",
    status: "Live",
    category: "E-commerce",
    featured: true,
    accent: "#FDBA74",
    role: "Frontend developer",
    timeline: "2 months",
    team: "Small team",
    stack: ["Remix", "Hydrogen", "Shopify", "TypeScript", "GraphQL"],
    tags: ["Headless Commerce", "Shopify", "Remix", "GraphQL"],
    github: "https://github.com/BenitoPedro13/sua-mesa-fit",
    live: null,
    image: "/projects/sua-mesa-fit/product-hero.png",
    screenshots: [
      { src: "/projects/sua-mesa-fit/product.png", alt: "Sua Mesa Fit product customization page" },
      { src: "/projects/sua-mesa-fit/about.png", alt: "Sua Mesa Fit about page with team and brand story" },
      { src: "/projects/sua-mesa-fit/blog.png", alt: "Sua Mesa Fit blog listing page" },
      { src: "/projects/sua-mesa-fit/parcerias.png", alt: "Sua Mesa Fit partner signup page" },
    ],
    quickFacts: [
      { label: "Model", value: "Headless commerce" },
      { label: "Framework", value: "Hydrogen (Remix)" },
      { label: "Data", value: "Storefront + Admin GraphQL" },
      { label: "Focus", value: "Search, cart, shipping" },
    ],
    problem:
      "Shopify themes are quick to launch and hard to differentiate. The client needed the operational side of Shopify — inventory, orders, payments, fulfilment — but a storefront that did not look like every other store, with control over performance and layout that a theme cannot give you.",
    approach:
      "Headless. Shopify keeps running the business logic and admin, while the storefront is a separate Hydrogen application that fetches data over GraphQL. That means total freedom in the UI layer with none of the risk of rebuilding checkout or payments.",
    outcome:
      "A fully custom storefront with server-rendered product pages, a fast search experience, and cart shipping calculation, backed by the Shopify infrastructure the client already ran their business on.",
    sections: [
      {
        title: "What 'headless' means in practice",
        body: "A traditional store couples the admin and the website: you install a theme and customise within its limits. Headless separates them. Shopify remains the source of truth for products, prices, inventory, and orders, exposed through APIs. The website becomes an independent application that reads from those APIs. You gain complete design and performance control, and you take on the responsibility of building the storefront yourself.",
      },
      {
        title: "Why Hydrogen and Remix",
        body: "Hydrogen is Shopify's own framework built on Remix. It ships with the Storefront API client, cart handling, and caching conventions already wired up. Remix's server-first data loading means product pages render on the server with real data, which matters for both perceived speed and SEO on a commerce site.",
      },
      {
        title: "Two APIs, two purposes",
        body: "The Storefront API serves the customer: products, collections, cart. The Admin API handles privileged operations that need server-side credentials. Keeping the boundary strict is a security requirement, not a stylistic choice — admin credentials never cross into the browser.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Audit the catalogue",
        body: "Product structure, variants, and collections came first. The data model dictates what the UI can express.",
      },
      {
        phase: "02",
        title: "Build the component system",
        body: "Product cards, variant selectors, cart line items, and search results as reusable pieces before assembling pages.",
      },
      {
        phase: "03",
        title: "Optimise the search path",
        body: "Search is where commerce conversions are won or lost. Query shape and result rendering were tuned specifically.",
      },
      {
        phase: "04",
        title: "Wire cart and shipping",
        body: "Cart state, line item updates, and shipping cost calculation integrated against the Storefront API with optimistic UI.",
      },
    ],
    architecture: [
      {
        layer: "Storefront",
        label: "Hydrogen / Remix",
        detail: "Server-rendered routes with nested data loaders and streaming.",
      },
      {
        layer: "Data",
        label: "Shopify Storefront API",
        detail: "GraphQL queries for products, collections, search, and cart mutations.",
      },
      {
        layer: "Privileged",
        label: "Shopify Admin API",
        detail: "Server-only operations that require elevated credentials.",
      },
      {
        layer: "Commerce",
        label: "Shopify checkout",
        detail: "Payments, taxes, and fulfilment stay on battle-tested Shopify infrastructure.",
      },
    ],
    features: [
      {
        title: "Custom component library",
        body: "Every storefront element built from scratch rather than inherited from a theme.",
      },
      {
        title: "Optimised product search",
        body: "Tuned GraphQL queries and result rendering for fast, relevant results.",
      },
      {
        title: "Cart with shipping calculation",
        body: "Live shipping cost feedback inside the cart before checkout.",
      },
      {
        title: "Server-rendered pages",
        body: "Product and collection pages render on the server for speed and SEO.",
      },
    ],
    challenges: [
      {
        title: "GraphQL over-fetching",
        body: "Naive queries pull far more than a page needs. Query shapes were trimmed per route to keep payloads small.",
      },
      {
        title: "Cart state consistency",
        body: "Cart lives on Shopify but must feel instant. Optimistic updates with server reconciliation bridged that gap.",
      },
      {
        title: "Variant complexity",
        body: "Products with multiple option dimensions need a selector that never lets a customer choose an unavailable combination.",
      },
    ],
    learnings: [
      "Headless is the right call when differentiation matters more than launch speed.",
      "Let the platform keep the parts that are dangerous to rebuild — checkout above all.",
      "GraphQL query design is a performance discipline, not just a data-fetching detail.",
    ],
  },
  {
    slug: "bee-dash",
    title: "Bee Dash",
    tagline: "Influencer marketing analytics dashboard",
    plainEnglish:
      "A dashboard for marketing teams that pulls numbers from social media accounts automatically and shows whether a campaign is actually working.",
    year: "2024",
    status: "In development",
    category: "Platform",
    featured: true,
    accent: "#F97316",
    role: "Full stack developer",
    timeline: "Ongoing",
    team: "Small team",
    stack: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "shadcn/ui",
      "pnpm workspaces",
    ],
    tags: ["Analytics", "Dashboards", "Monorepo", "Social APIs"],
    github: "https://github.com/BenitoPedro13/bee-dash-monorepo",
    live: "https://www.thatsbee.co",
    image: "/projects/bee-dash/home.png",
    screenshots: [
      { src: "/projects/bee-dash/home.png", alt: "Bee Dash home dashboard with campaign and creator stats" },
      { src: "/projects/bee-dash/campanhas.png", alt: "Bee Dash campaigns list view" },
      { src: "/projects/bee-dash/creators.png", alt: "Bee Dash creators grid and performance table" },
      { src: "/projects/bee-dash/login.png", alt: "Bee Dash login screen" },
      { src: "/projects/bee-dash/loading.png", alt: "Bee Dash loading screen" },
    ],
    quickFacts: [
      { label: "Structure", value: "pnpm monorepo" },
      { label: "Apps", value: "API + dashboard + admin" },
      { label: "Data", value: "Social media APIs" },
      { label: "UI", value: "shadcn/ui" },
    ],
    problem:
      "Influencer campaign reporting is usually a spreadsheet assembled by hand. Someone opens each creator's analytics, copies reach and engagement into cells, and by the time the report is ready the campaign has moved on. There is no reliable way to compare creators or spot a campaign underperforming while it is still running.",
    approach:
      "Bee Dash ingests social platform metrics through their APIs, normalises them into a single schema regardless of which platform they came from, and renders comparable visualisations. The system is a monorepo with three deployables — a NestJS API, the client-facing Next.js dashboard, and an internal admin panel — sharing one set of types.",
    outcome:
      "Campaign performance visible in near real time, with creators comparable on the same axes instead of platform-specific vanity metrics.",
    sections: [
      {
        title: "Normalising incompatible platforms",
        body: "Every social platform defines engagement differently and exposes different fields at different granularities. The core design work was a canonical metrics schema that each platform adapter maps into. Once data is normalised, every chart, comparison, and export downstream works identically regardless of source.",
      },
      {
        title: "Why a monorepo",
        body: "Three applications share the same domain model. In separate repositories, a change to a metric definition means coordinated releases and inevitable drift. With pnpm workspaces, shared types live in one package, and a breaking change fails the build immediately in every consumer rather than silently in production.",
      },
      {
        title: "Dashboards that answer questions",
        body: "The visualisations are built around specific decisions: is this creator worth renewing, is this campaign pacing correctly, which content format performs best. Charts exist to answer those, not to fill space.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Define the canonical metrics",
        body: "Agreeing what 'engagement' means across platforms before writing a single adapter.",
      },
      {
        phase: "02",
        title: "Build the ingestion layer",
        body: "Per-platform adapters handling auth, rate limits, and pagination, all producing the same normalised output.",
      },
      {
        phase: "03",
        title: "Ship the shared UI system",
        body: "shadcn/ui as the base so the client dashboard and internal admin stay visually and behaviourally consistent.",
      },
      {
        phase: "04",
        title: "Split the workspaces",
        body: "API, dashboard, and admin as separate apps with shared packages for types, config, and UI primitives.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js dashboard",
        detail: "Campaign views, creator comparison, and interactive data visualisations.",
      },
      {
        layer: "Internal",
        label: "Admin panel",
        detail: "Operational tooling for managing accounts, campaigns, and data sources.",
      },
      {
        layer: "API",
        label: "NestJS service",
        detail: "Modular backend with dependency injection, handling ingestion, aggregation, and access control.",
      },
      {
        layer: "Data",
        label: "PostgreSQL + Prisma",
        detail: "Normalised metric storage with typed queries and versioned migrations.",
      },
      {
        layer: "Repo",
        label: "pnpm workspaces",
        detail: "Shared types and UI packages consumed by every app in the monorepo.",
      },
    ],
    features: [
      {
        title: "Multi-platform ingestion",
        body: "Social APIs pulled on a schedule and normalised into one schema.",
      },
      {
        title: "Creator comparison",
        body: "Compare performance across creators on genuinely equivalent metrics.",
      },
      {
        title: "Interactive visualisations",
        body: "Filterable, drillable charts rather than static report images.",
      },
      {
        title: "Separate admin surface",
        body: "Operational tooling kept away from the client-facing product.",
      },
    ],
    challenges: [
      {
        title: "Rate limits",
        body: "Social APIs throttle aggressively. Ingestion is scheduled, batched, and backs off rather than retrying blindly.",
      },
      {
        title: "Schema drift",
        body: "Platforms change their APIs without much warning. Adapters isolate that churn so only one file changes when a platform does.",
      },
      {
        title: "Historical data",
        body: "Metrics are time series, and the schema had to support trend queries without degrading as volume grows.",
      },
    ],
    learnings: [
      "Normalisation at ingestion beats special-casing at every read site.",
      "Monorepos are about shared contracts far more than shared tooling.",
      "A chart that doesn't answer a stated question should be deleted.",
    ],
  },
  {
    slug: "insta2figma",
    title: "Insta2Figma",
    tagline: "Turn Instagram layouts into editable Figma designs",
    plainEnglish:
      "A tool that takes an Instagram post and recreates it as a proper Figma design file, so designers stop rebuilding references by hand.",
    year: "2023",
    status: "Open source",
    category: "Product",
    featured: false,
    accent: "#FB923C",
    role: "Solo developer",
    timeline: "6 weeks",
    team: "Solo",
    stack: ["TypeScript", "NestJS", "Figma API"],
    tags: ["Design Tooling", "APIs", "Automation"],
    github: "https://github.com/BenitoPedro13/insta2figma",
    live: null,
    image: "/projects/insta2figma/plugin-ui.png",
    screenshots: [
      { src: "/projects/insta2figma/plugin-ui.png", alt: "Insta2Figma Figma plugin panel importing an Instagram account's posts" },
    ],
    quickFacts: [
      { label: "Type", value: "Design automation" },
      { label: "Output", value: "Editable Figma layers" },
      { label: "Backend", value: "NestJS" },
      { label: "API", value: "Figma REST" },
    ],
    problem:
      "Social media designers collect references constantly and then rebuild them manually in Figma to remix. That is slow, repetitive work that produces nothing new — it is transcription, not design.",
    approach:
      "Extract structure from a post — layout regions, dominant colours, typography characteristics — and generate a corresponding Figma document through the Figma API, so the result arrives as editable layers rather than a flat image.",
    outcome:
      "A reference goes from screenshot to editable design file without the manual rebuild step.",
    sections: [
      {
        title: "Structure, not pixels",
        body: "Pasting an image into Figma gives you a picture you cannot edit. The value is entirely in reconstructing separable layers: background, image regions, text blocks, and colour styles that a designer can actually manipulate.",
      },
      {
        title: "Working with the Figma API",
        body: "The Figma REST API has real constraints around document creation and node structure. Much of the work was mapping an inferred layout tree onto valid Figma node hierarchies that open cleanly in the editor.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Understand the target format",
        body: "Reading Figma's node model closely before extracting anything, so extraction produced something expressible.",
      },
      {
        phase: "02",
        title: "Build extraction",
        body: "Layout region detection, dominant colour sampling, and typography inference.",
      },
      {
        phase: "03",
        title: "Generate documents",
        body: "Translate the extracted tree into Figma nodes and push through the API.",
      },
    ],
    architecture: [
      {
        layer: "API",
        label: "NestJS service",
        detail: "Handles extraction requests and orchestrates document generation.",
      },
      {
        layer: "Analysis",
        label: "Layout and colour extraction",
        detail: "Infers regions, palette, and text characteristics from source content.",
      },
      {
        layer: "Output",
        label: "Figma REST API",
        detail: "Creates node hierarchies that open as editable layers.",
      },
    ],
    features: [
      {
        title: "Layout extraction",
        body: "Identifies structural regions instead of flattening everything.",
      },
      {
        title: "Palette detection",
        body: "Pulls dominant colours into reusable Figma styles.",
      },
      {
        title: "Editable output",
        body: "Real layers, not an embedded screenshot.",
      },
    ],
    challenges: [
      {
        title: "Ambiguous structure",
        body: "Inferring layout from a rendered image is fundamentally lossy, so the output is a strong starting point rather than a perfect clone.",
      },
      {
        title: "API constraints",
        body: "Figma's document creation surface required careful mapping to produce valid, clean node trees.",
      },
    ],
    learnings: [
      "Automation that saves a designer thirty minutes a day beats a clever feature nobody uses.",
      "Design the output format first when the output format is rigid.",
    ],
  },
  {
    slug: "network-monitor",
    title: "Network Monitor",
    tagline: "Real-time network health dashboard",
    plainEnglish:
      "A live dashboard showing whether your internet connection is healthy right now — speed, delays, and dropped data — updating every second.",
    year: "2023",
    status: "Open source",
    category: "Infrastructure",
    featured: false,
    accent: "#EA580C",
    role: "Solo developer",
    timeline: "4 weeks",
    team: "Solo",
    stack: ["TypeScript", "Next.js", "WebSockets"],
    tags: ["Real-time", "WebSockets", "Monitoring"],
    github: "https://github.com/BenitoPedro13/network-monitor",
    live: null,
    quickFacts: [
      { label: "Transport", value: "WebSockets" },
      { label: "Metrics", value: "Latency, loss, bandwidth" },
      { label: "Update rate", value: "Sub-second" },
      { label: "UI", value: "Live charts" },
    ],
    problem:
      "Diagnosing an unstable connection with periodic speed tests tells you almost nothing. The failures that matter are brief spikes and momentary packet loss, which a test you run once an hour will always miss.",
    approach:
      "Continuous sampling pushed to the browser over a WebSocket, rendered as live time-series charts so intermittent problems become visible as they happen rather than as an average that hides them.",
    outcome:
      "Transient network problems become observable instead of anecdotal.",
    sections: [
      {
        title: "Why polling fails here",
        body: "HTTP polling forces a tradeoff: poll often and waste requests, or poll rarely and miss events. A persistent WebSocket connection lets the server push each sample the moment it exists, which is the only way sub-second resolution stays practical.",
      },
      {
        title: "Rendering a moving window",
        body: "Charts that update several times a second will destroy frame rate if handled naively. Data is kept in a bounded rolling buffer and rendering is decoupled from data arrival so the UI stays smooth.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Pick the metrics",
        body: "Latency, jitter, packet loss, and throughput — the four numbers that actually explain a bad connection.",
      },
      {
        phase: "02",
        title: "Build the streaming layer",
        body: "WebSocket server pushing samples with reconnection handling on the client.",
      },
      {
        phase: "03",
        title: "Make the charts survive",
        body: "Bounded buffers and render throttling so continuous updates don't melt the browser.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js dashboard",
        detail: "Live charts with a rolling time window and reconnection handling.",
      },
      {
        layer: "Transport",
        label: "WebSocket server",
        detail: "Pushes each measurement sample the instant it is captured.",
      },
      {
        layer: "Collection",
        label: "Sampling loop",
        detail: "Continuous latency, loss, and throughput measurement.",
      },
    ],
    features: [
      {
        title: "Sub-second updates",
        body: "Samples arrive as they are measured, not on a polling interval.",
      },
      {
        title: "Rolling time window",
        body: "Recent history stays visible so spikes have context.",
      },
      {
        title: "Automatic reconnection",
        body: "The client recovers cleanly when the connection itself drops.",
      },
    ],
    challenges: [
      {
        title: "Render performance",
        body: "High-frequency updates required decoupling data ingestion from chart rendering.",
      },
      {
        title: "Measuring honestly",
        body: "The monitoring itself consumes bandwidth, so sampling had to stay light enough not to distort what it measures.",
      },
    ],
    learnings: [
      "Resolution matters more than accuracy when diagnosing intermittent faults.",
      "Real-time UIs need backpressure at the render layer, not just the network layer.",
    ],
  },
];

export const featuredProjects = [
  ...projects.filter((p) => p.featured && p.slug === "art-hur"),
  ...projects.filter((p) => p.featured && p.slug !== "art-hur"),
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}
