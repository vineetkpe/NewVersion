# HostAmble — Frontend Platform

> **Independent, high-performance web hosting and domain services website foundation.**

Built with **Astro 5**, **TypeScript (Strict Mode)**, and **Tailwind CSS**.

---

## 1. Architectural Independence & Security

HostAmble is built to be **100% independent and self-contained**:

- **Zero External Backend Connections:** No billing APIs, customer control panels, database drivers, webhooks, or scheduled background synchronizations.
- **Zero Secrets or Credentials:** No private tokens, API keys, or operational credentials exist in this frontend codebase.
- **Static Compilation:** Compiles to static HTML and CSS with minimal client-side JavaScript (~2.5 kB total).
- **Single Source of Truth:** All product records, pricing, and currency rules are centrally configured and strictly typed.

---

## 2. Requirements

- **Node.js:** `v18.17.0+` (tested and verified on Node `v24.x`)
- **Package Manager:** `npm` (v9+)

---

## 3. Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Execute automated test suite
npm test

# 4. Run TypeScript checks
npm run typecheck

# 5. Run ESLint checks
npm run lint

# 6. Verify production build
npm run build
```

---

## 4. Available Scripts

| Command                | Action                                                                       |
| :--------------------- | :--------------------------------------------------------------------------- |
| `npm run dev`          | Starts local dev server at `http://localhost:4321`                           |
| `npm run build`        | Runs TypeScript diagnostic checks and compiles static site to `dist/`        |
| `npm run preview`      | Starts local HTTP server previewing the `dist/` static output                |
| `npm test`             | Runs all Vitest unit tests (pricing, currency conversion, catalog integrity) |
| `npm run typecheck`    | Runs `astro check` across all `.astro` and `.ts` files                       |
| `npm run lint`         | Runs ESLint flat config with TypeScript and Astro rules                      |
| `npm run format`       | Formats all files with Prettier (`prettier-plugin-astro`)                    |
| `npm run format:check` | Verifies code conforms to Prettier formatting rules                          |

---

## 5. Centralized Pricing & Multi-Currency Engine

### Single Source of Truth

All frontend product offerings and pricing are defined in:
[`src/data/products.ts`](file:///c:/HOSTAMBLE2026/src/data/products.ts)

### Integer Minor Units

To eliminate floating-point arithmetic errors, all prices are stored in minor currency units:

- **USD ($):** cents (e.g. `299` = `$2.99`)
- **INR (₹):** paise (e.g. `19900` = `₹199.00`)
- **EUR (€):** cents (e.g. `279` = `€2.79`)

### Independent Currency Configuration

Currencies are independently priced and supported without third-party exchange rate APIs. If a price is omitted, it renders an explicit `Price unavailable` status and **never** defaults to zero.

For step-by-step instructions on updating prices, adding plans, or configuring promotions, refer to [`docs/pricing-management.md`](file:///c:/HOSTAMBLE2026/docs/pricing-management.md).

---

## 6. Project Structure

```text
hostamble/
├── public/                 # Favicon, robots.txt, static assets
├── src/
│   ├── components/         # Reusable accessible components
│   │   ├── layout/         # Header, Footer, Container
│   │   ├── navigation/     # Desktop Navbar, Mobile Drawer
│   │   ├── pricing/        # PriceDisplay, CurrencySelector, BillingPeriodSelector, PlanCard
│   │   └── ui/             # Button, Badge, Alert, Accordion
│   ├── layouts/
│   │   └── BaseLayout.astro # Master layout (SEO, metadata, skip-link)
│   ├── pages/
│   │   ├── index.astro     # Foundation verification page & live pricing demo
│   │   └── 404.astro       # Architectural error page
│   ├── data/
│   │   ├── currencies.ts   # Central currency configuration
│   │   ├── products.ts     # Single source of truth for products & prices
│   │   └── site.ts         # Navigation and metadata
│   ├── lib/
│   │   ├── currency/       # Intl formatting, unit conversion, storage preferences
│   │   └── pricing/        # Price lookup engine and catalog validation
│   ├── styles/
│   │   └── global.css      # HostAmble design tokens and typography hierarchy
│   └── types/
│       └── index.ts        # Re-exported domain types
├── tests/                  # 27 Vitest unit tests
├── docs/                   # Full technical and operational documentation
│   ├── architecture.md     # Architecture, independence, security model
│   ├── pricing-management.md # Price update and catalog management guide
│   ├── design-system.md    # Approved brand palette and visual guidelines
│   ├── route-inventory.md  # Planned routes and implementation status
│   └── deployment.md       # Static hosting instructions and security headers
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind tokens matching HostAmble palette
├── tsconfig.json           # Strict TypeScript configuration
└── vitest.config.ts        # Test runner setup
```

---

## 7. Documentation Index

- [Architecture Specification](file:///c:/HOSTAMBLE2026/docs/architecture.md)
- [Pricing Management Guide](file:///c:/HOSTAMBLE2026/docs/pricing-management.md)
- [Design System & Palette Specification](file:///c:/HOSTAMBLE2026/docs/design-system.md)
- [Route Inventory](file:///c:/HOSTAMBLE2026/docs/route-inventory.md)
- [Deployment & Security Headers](file:///c:/HOSTAMBLE2026/docs/deployment.md)
