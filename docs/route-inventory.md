# HostAmble — Route Inventory & Implementation Status

This document catalogs all planned routes for HostAmble, tracking their status as individual Google Stitch designs are reviewed and implemented.

## 1. Core Hosting Routes

| Route                | Title                           | Template File           | Status                   | Notes                                                      |
| :------------------- | :------------------------------ | :---------------------- | :----------------------- | :--------------------------------------------------------- |
| `/`                  | Homepage                        | `src/pages/index.astro` | **Foundation Live**      | Foundational overview, live multi-currency pricing preview |
| `/hosting/shared`    | Shared NVMe Hosting             | Planned                 | _Awaiting Stitch Design_ | Displays `shared-basic` and tiered shared hosting options  |
| `/hosting/wordpress` | Managed WordPress Hosting       | Planned                 | _Awaiting Stitch Design_ | Features WP CLI, Redis caching, staging features           |
| `/cloud`             | Cloud Compute Slices            | Planned                 | _Awaiting Stitch Design_ | Features `cloud-starter`, CPU/RAM configurable matrices    |
| `/reseller`          | Reseller Hosting Infrastructure | Planned                 | _Awaiting Stitch Design_ | White-label client quota management features               |

---

## 2. Domain Services

| Route               | Title                   | Template File | Status                   | Notes                                                         |
| :------------------ | :---------------------- | :------------ | :----------------------- | :------------------------------------------------------------ |
| `/domains`          | Domains Overview        | Planned       | _Awaiting Stitch Design_ | Central landing for registration, transfer, and TLD lookup    |
| `/domains/search`   | Domain Search & Checker | Planned       | _Awaiting Stitch Design_ | Client-side input validation; no fake availability generation |
| `/domains/register` | Register New Domain     | Planned       | _Awaiting Stitch Design_ | Configuration matrix for TLD registrations                    |
| `/domains/transfer` | Domain Transfer         | Planned       | _Awaiting Stitch Design_ | Auth code and lock verification guidelines                    |
| `/domains/pricing`  | TLD Pricing Table       | Planned       | _Awaiting Stitch Design_ | Central pricing matrix for .com, .in, .io, .net, etc.         |

---

## 3. Pricing & Plan Comparisons

| Route              | Title                          | Template File | Status                   | Notes                                                      |
| :----------------- | :----------------------------- | :------------ | :----------------------- | :--------------------------------------------------------- |
| `/pricing`         | Hosting Plans & Pricing        | Planned       | _Awaiting Stitch Design_ | Complete multi-tier pricing with dynamic currency selector |
| `/pricing/compare` | Full Feature Comparison Matrix | Planned       | _Awaiting Stitch Design_ | Detailed side-by-side hardware and SLA comparison table    |

---

## 4. Company & Network

| Route         | Title                      | Template File | Status                   | Notes                                            |
| :------------ | :------------------------- | :------------ | :----------------------- | :----------------------------------------------- |
| `/about`      | About HostAmble            | Planned       | _Awaiting Stitch Design_ | Engineering ethos, architecture, team background |
| `/contact`    | Contact Us                 | Planned       | _Awaiting Stitch Design_ | Secure validated static contact inquiry form     |
| `/network`    | Datacenter & Network Map   | Planned       | _Awaiting Stitch Design_ | Global points of presence, latency test IPs      |
| `/affiliates` | Affiliate Program          | Planned       | _Awaiting Stitch Design_ | Commission structure and referral program terms  |
| `/faq`        | Frequently Asked Questions | Planned       | _Awaiting Stitch Design_ | Accordion-driven technical answers               |

---

## 5. Support & Knowledgebase

| Route                    | Title                    | Template File | Status                   | Notes                                            |
| :----------------------- | :----------------------- | :------------ | :----------------------- | :----------------------------------------------- |
| `/support`               | Support Center Home      | Planned       | _Awaiting Stitch Design_ | Documentation index, ticket routing instructions |
| `/support/knowledgebase` | Knowledgebase            | Planned       | _Awaiting Stitch Design_ | Categorized setup and configuration guides       |
| `/announcements`         | System Announcements     | Planned       | _Awaiting Stitch Design_ | Product changelogs and platform upgrades         |
| `/status`                | Network & Cluster Status | Planned       | _Awaiting Stitch Design_ | Service health indicators (static reporting)     |

---

## 6. Legal & Governance

| Route            | Title                        | Template File | Status                   | Notes                                       |
| :--------------- | :--------------------------- | :------------ | :----------------------- | :------------------------------------------ |
| `/legal/terms`   | Terms of Service             | Planned       | _Awaiting Stitch Design_ | Master service agreement                    |
| `/legal/privacy` | Privacy Policy               | Planned       | _Awaiting Stitch Design_ | Zero visitor tracking and privacy statement |
| `/legal/refunds` | Refund & Cancellation Policy | Planned       | _Awaiting Stitch Design_ | Clear cancellation terms                    |
| `/legal/aup`     | Acceptable Use Policy        | Planned       | _Awaiting Stitch Design_ | Prohibited content, resource abuse rules    |

---

## 7. System & Error Pages

| Route          | Title                 | Template File         | Status          | Notes                                           |
| :------------- | :-------------------- | :-------------------- | :-------------- | :---------------------------------------------- |
| `/404`         | 404 Page Not Found    | `src/pages/404.astro` | **Implemented** | Clean architectural layout with safe navigation |
| `/maintenance` | Scheduled Maintenance | Planned               | _Standby_       | Offline notice layout                           |
