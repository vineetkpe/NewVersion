# HostAmble — Design System & Visual Specification

This document defines the visual identity, tokens, component library, and aesthetic guidelines for HostAmble, derived from the official HostAmble Design System specification.

## 1. Visual Direction & Aesthetic Philosophy

HostAmble embodies **"Calm infrastructure. Serious performance."**

- **Physical Server Architecture:** The visual language operates through layered structural planes, low-saturation atmospheric hues, and disciplined geometric grids reminiscent of modern data center architecture and mid-century editorial publications.
- **Calm Layered Surfaces:** Alternating fields of soft lavender (`#EDE8F5`), atmospheric canvas (`#FCF8FF`), and pale blue (`#ABBDDA`) creating depth without intense drop shadows or neon dispersion.
- **Architectural Framing:** Crisp, hairline structural borders (`1px solid #E3E6F0`) mimicking precision rack mounts and technical blueprint layouts.
- **Controlled Typographic Friction:** Pairing the brutalist, engineered geometry of **Space Grotesk** with the utilitarian clarity of **Inter**.

---

## 2. Approved Brand Color Palette

### Primary & Secondary Chromatic Tokens

| Token                    | Hex Value | CSS Variable / Tailwind                     | Purpose                                         |
| :----------------------- | :-------- | :------------------------------------------ | :---------------------------------------------- |
| **Primary Structural**   | `#3D52A0` | `var(--color-primary)` / `bg-brand-primary` | Main brand identity, primary CTA, active states |
| **Primary Deep**         | `#233A87` | `var(--color-primary-dark)`                 | Structural anchor, dark accents                 |
| **Primary Hover**        | `#2C3E7B` | `var(--color-primary-hover)`                | Primary button hover state                      |
| **Secondary Supporting** | `#7091E6` | `var(--color-supporting)`                   | Kinetic layer, active border transitions, links |
| **Secondary Deep**       | `#385BAC` | `text-secondary`                            | Secondary emphasis                              |
| **Tertiary Atmospheric** | `#8697C4` | `var(--color-muted)`                        | Atmospheric structure, subtle linework          |
| **Pale Blue**            | `#ABBDDA` | `var(--color-pale)`                         | Interleaved structural units, telemetry accents |
| **Pale Lavender**        | `#EDE8F5` | `var(--color-lavender)`                     | Soft badge fills, hero atmospheric planes       |

### Surfaces & Neutrals

| Token                        | Hex Value | CSS Variable / Tailwind       | Purpose                                      |
| :--------------------------- | :-------- | :---------------------------- | :------------------------------------------- |
| **Surface Base Canvas**      | `#FCF8FF` | `var(--color-surface-base)`   | Base atmospheric light canvas                |
| **Surface Container Lowest** | `#FFFFFF` | `bg-white`                    | Primary content panels and cards             |
| **Surface Container Subtle** | `#F8F9FC` | `bg-[#F8F9FC]`                | Alternate section fills, input backdrops     |
| **Dark Navy Text**           | `#171B2D` | `var(--color-text-dark)`      | High-density primary reading text, headlines |
| **Secondary Metadata**       | `#5D6578` | `var(--color-text-secondary)` | Operational metadata, body copy              |
| **Border Subtle**            | `#E3E6F0` | `var(--color-border)`         | Crisp hairline structural borders            |
| **Border Hover**             | `#7091E6` | `hover:border-[#7091E6]`      | Interactive card border transitions          |

---

## 3. Typography System

| Role                   | Font Family    | Weights          | Tracking / Line Height                                                      |
| :--------------------- | :------------- | :--------------- | :-------------------------------------------------------------------------- |
| **Display Hero**       | Space Grotesk  | `600` (SemiBold) | `84px` (desktop) / `48px` (mobile), `-0.03em` tracking                      |
| **Headings (h1 - h4)** | Space Grotesk  | `500` / `600`    | Tight negative tracking (`-0.02em` to `-0.03em`), `1.1` - `1.2` line height |
| **Body (lg, md, sm)**  | Inter          | `400` / `500`    | `18px` / `16px` / `14px`, `1.6` line height for maximum legibility          |
| **Technical Labels**   | Space Grotesk  | `600`            | `11px` - `14px`, expanded tracking (`0.08em`), uppercase                    |
| **Code & DNS**         | JetBrains Mono | `400` / `500`    | Monospaced technical telemetry, IPs, and nameservers                        |

---

## 4. Geometric Discipline & Radii

| Token         | Value              | Applied To                                            |
| :------------ | :----------------- | :---------------------------------------------------- |
| **`sm`**      | `4px` (`0.25rem`)  | Micro indicators, technical pills                     |
| **`DEFAULT`** | `8px` (`0.5rem`)   | Base components, buttons, form inputs                 |
| **`md`**      | `12px` (`0.75rem`) | Small enclosures, tab toggles                         |
| **`lg`**      | `16px` (`1rem`)    | Cards, server blades, modular panels                  |
| **`xl`**      | `24px` (`1.5rem`)  | Domain search hero wrappers, major feature containers |
| **`full`**    | `9999px`           | Live status pips (e.g. "99.9% Uptime", "Operational") |
