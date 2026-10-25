# HostAmble — Frontend Architecture Specification

## 1. Architectural Philosophy & Independence

HostAmble is architected as an **independent, high-performance static web application** built with [Astro](https://astro.build), [TypeScript](https://www.typescriptlang.org), and [Tailwind CSS](https://tailwindcss.com).

### Strict Zero-Backend Security Boundary

The frontend operates with complete autonomy:

- **No external billing or hosting-control APIs:** Zero server-to-server endpoints, webhooks, or scheduled background data imports.
- **No database connections or secrets:** No client-side database drivers, private tokens, or administrative credentials exist in this codebase.
- **No payment or order processing:** The site renders static configurations and navigates to explicit, authorized destinations only.
- **No hidden telemetry or analytics:** Zero unauthorized tracking scripts or third-party pixel beacons.

All product records, pricing matrices, and currency configurations are bundled at build time from typed, version-controlled sources.

---

## 2. Technology Stack & Rationale

| Layer                    | Technology                                  | Rationale                                                                                                        |
| :----------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| **Framework**            | Astro 5 (Static Output)                     | Delivers 0kB runtime JavaScript by default, compiling UI into pure static HTML/CSS.                              |
| **Language**             | TypeScript (Strict Mode)                    | Prevents runtime pricing errors, guarantees schema integrity, and validates all catalog updates at compile time. |
| **Styling**              | Tailwind CSS + CSS Custom Properties        | Enforces the approved HostAmble design system tokens without arbitrary hex pollution.                            |
| **Testing**              | Vitest                                      | Fast, unit testing of pricing lookup logic, formatting calculations, and preference storage.                     |
| **Linting & Code Style** | ESLint + Prettier (`prettier-plugin-astro`) | Automated code quality and formatting consistency.                                                               |

---

## 3. Directory Structure

```text
c:\HOSTAMBLE2026/
├── public/                     # Static assets (favicons, robots, fonts)
│   ├── icons/
│   └── robots.txt
├── src/
│   ├── components/             # Reusable, accessible UI components
│   │   ├── layout/             # Shell, Header, Footer, Container
│   │   ├── navigation/         # Desktop Navbar, Mobile Drawer
│   │   ├── pricing/            # PriceDisplay, CurrencySelector, BillingPeriodSelector, PlanCard
│   │   └── ui/                 # Button, Badge, Alert, Accordion
│   ├── layouts/
│   │   └── BaseLayout.astro    # Global SEO, metadata, skiplinks, and token styles
│   ├── pages/                  # Static routes (index.astro, 404.astro)
│   ├── data/                   # Single typed source of truth
│   │   ├── currencies.ts       # Supported currencies, symbols, locales, exponents
│   │   ├── products.ts         # Complete product and pricing catalog
│   │   └── site.ts             # Navigation structure and company metadata
│   ├── lib/
│   │   ├── currency/           # Intl formatting, unit conversion, storage preferences
│   │   └── pricing/            # Central lookup engine and validation suite
│   ├── styles/
│   │   └── global.css          # Design tokens, typography hierarchy, and accessibility rules
│   └── types/
│       └── index.ts            # Centralized TypeScript declarations
├── tests/                      # Automated test suites
├── docs/                       # Operational, pricing, and deployment guides
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration mapped to design tokens
├── tsconfig.json               # TypeScript strict configuration with path aliases
└── vitest.config.ts            # Unit test configuration
```

---

## 4. Central Pricing & Multi-Currency Engine

### Minor Currency Units

Floating-point monetary operations can cause rounding drift. HostAmble enforces integer **minor currency units** for all stored values:

- **USD:** Stored in cents (e.g. `$2.99` is stored as `299`, exponent = 2).
- **INR:** Stored in paise (e.g. `₹199.00` is stored as `19900`, exponent = 2).
- **EUR:** Stored in cents (e.g. `€2.79` is stored as `279`, exponent = 2).

### Pricing Rules

1. **Zero Price Duplication:** Prices are declared strictly once in `src/data/products.ts`.
2. **Independent Regional Pricing:** Each currency (INR, USD, EUR) has its own explicitly set value. Automated currency conversions from exchange rates are forbidden.
3. **Missing Price Safety:** If a currency or billing period is not configured, the engine returns `{ isAvailable: false, reason: 'price_unconfigured' }`. It **never** defaults to zero.
4. **No Automated Period Extrapolation:** Annual prices are never multiplied or divided from monthly rates automatically; every supported period must be explicitly configured.

### Client-Side Reactivity

- Astro compiles static HTML embedding the pre-calculated price matrix via data attributes.
- On the client, a ~1.2kB script synchronizes the selected currency preference from `localStorage`.
- When the visitor selects a new currency in `CurrencySelector`, a `hostamble:currency-change` DOM event dispatches and updates all visible prices immediately without a page reload.

---

## 5. Accessibility (WCAG 2.2 AA)

- **Semantic Landmarks:** `<header>`, `<nav>`, `<main id="main-content">`, `<footer role="contentinfo">`.
- **Keyboard Navigation:** Universal `:focus-visible` styling with `2px solid var(--color-primary)` and `3px offset`.
- **ARIA Disclosure:** The mobile navigation drawer traps focus and manages `aria-expanded` and `aria-hidden` attributes.
- **Motion Reduction:** Media query `@media (prefers-reduced-motion: reduce)` removes animations for sensitive visitors.
