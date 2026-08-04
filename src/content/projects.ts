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
    slug: "markado",
    title: "Markado",
    tagline: "Service scheduling platform with real calendar and payments",
    plainEnglish:
      "A booking website where a professional shares one link, clients pick a free time slot, and the meeting plus the payment are handled automatically.",
    year: "2025",
    status: "Live",
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
    live: "https://app.markado.co",
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
    featured: true,
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
    tagline: "Satellite vegetation analysis for precision agriculture",
    plainEnglish:
      "Draw a shape around a farm on a map and instantly see how healthy the plants are, using free satellite imagery instead of expensive equipment.",
    year: "2024",
    status: "Case study",
    category: "Data",
    featured: true,
    accent: "#FDBA74",
    role: "Full stack developer",
    timeline: "4 months",
    team: "Solo",
    stack: [
      "Python",
      "FastAPI",
      "Google Earth Engine",
      "Next.js",
      "React Leaflet",
      "TypeScript",
    ],
    tags: ["Geospatial", "Satellite Data", "FastAPI", "Maps"],
    github: "https://github.com/BenitoPedro13",
    live: null,
    quickFacts: [
      { label: "Data source", value: "Sentinel-2 satellites" },
      { label: "Metric", value: "NDVI vegetation index" },
      { label: "Compute", value: "Google Earth Engine" },
      { label: "Goal", value: "Accessible precision agriculture" },
    ],
    problem:
      "Precision agriculture tools are priced for industrial farms. A smaller producer who wants to know which part of their field is struggling has to either walk it or buy drone surveys and specialist software. Meanwhile the European Space Agency publishes free imagery of the entire planet every few days, and almost nobody outside research uses it.",
    approach:
      "Flora puts that public satellite data behind a map interface. You draw your area of interest, the backend asks Google Earth Engine for the relevant Sentinel-2 imagery, computes NDVI over that geometry, and returns a coloured layer you can read at a glance — green is thriving, red is stressed.",
    outcome:
      "A working path from free public satellite data to an actionable field health map, with no GIS expertise required from the user.",
    sections: [
      {
        title: "What NDVI actually measures",
        body: "Healthy plants absorb visible red light for photosynthesis and strongly reflect near-infrared light. NDVI compares those two bands: high values mean dense, healthy vegetation, low values mean bare soil or stressed plants. Satellites capture both bands, so a single formula turns raw imagery into a plant health map that a farmer can interpret without training.",
      },
      {
        title: "Why the heavy lifting happens in orbit-scale infrastructure",
        body: "A single Sentinel-2 scene is enormous, and you often need several to find one without cloud cover. Downloading and processing that locally is impractical. Google Earth Engine runs the computation on Google's infrastructure next to the data, so Flora sends a geometry and a date range and receives back only the finished result.",
      },
      {
        title: "Python where it belongs",
        body: "The backend is FastAPI, chosen because the geospatial and scientific ecosystem lives in Python and Earth Engine's client library is Python-first. FastAPI's async model handles the long-running Earth Engine calls without blocking, and its automatic OpenAPI schema kept the TypeScript frontend honest.",
      },
      {
        title: "A map, not a dashboard",
        body: "The interface is React Leaflet. You pan, zoom, and draw directly on satellite basemaps. Analysis results overlay in place rather than living in a separate chart, because the question 'which part of my field is struggling' is inherently spatial.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Research the data",
        body: "I started in the Earth Engine playground, validating that Sentinel-2 revisit rates and cloud masking were good enough to be useful before writing any application code.",
      },
      {
        phase: "02",
        title: "Prove the pipeline",
        body: "A single endpoint that took a hard-coded polygon and returned an NDVI value. Once that worked, everything else was interface.",
      },
      {
        phase: "03",
        title: "Design for non-experts",
        body: "No projection pickers, no band selectors, no date syntax. Draw a shape, pick a period, read the colours.",
      },
      {
        phase: "04",
        title: "Add true-colour context",
        body: "NDVI alone is abstract. Pairing it with an RGB view of the same area lets people connect the analysis to what they recognise as their land.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        label: "Next.js + React Leaflet",
        detail: "Interactive map with area-of-interest drawing and layer toggling between NDVI and true colour.",
      },
      {
        layer: "API",
        label: "FastAPI (Python)",
        detail: "Async endpoints that validate geometry, orchestrate Earth Engine calls, and return tile URLs and statistics.",
      },
      {
        layer: "Compute",
        label: "Google Earth Engine",
        detail: "Planetary-scale processing of Sentinel-2 imagery, including cloud masking and NDVI computation.",
      },
      {
        layer: "Data",
        label: "Sentinel-2 (ESA)",
        detail: "Free multispectral satellite imagery with roughly five-day revisit and 10m resolution.",
      },
    ],
    features: [
      {
        title: "Draw-to-analyse",
        body: "Define any area of interest directly on the map and get analysis for exactly that geometry.",
      },
      {
        title: "NDVI heat layers",
        body: "Vegetation health rendered as a colour gradient over the real terrain.",
      },
      {
        title: "True-colour comparison",
        body: "Toggle between the analysis layer and the RGB satellite view for orientation.",
      },
      {
        title: "Date range selection",
        body: "Compare periods to see how a field changed across a growing season.",
      },
    ],
    challenges: [
      {
        title: "Clouds",
        body: "Most satellite passes over a tropical region are partly cloudy. Cloud masking and compositing across multiple passes were required before results were trustworthy.",
      },
      {
        title: "Latency",
        body: "Earth Engine requests can take seconds. The UI streams progress and renders tiles as they arrive rather than blocking on a full result.",
      },
      {
        title: "Making GIS invisible",
        body: "Coordinate systems, band math, and collection filtering all had to be hidden behind defaults that are correct for the common case.",
      },
    ],
    learnings: [
      "Public datasets are an underused foundation for genuinely useful products.",
      "Pushing computation to where the data lives beats moving the data, by orders of magnitude.",
      "Domain research before code is not procrastination when the domain is unfamiliar.",
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
    live: null,
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

export const featuredProjects = projects.filter((p) => p.featured);

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
