# HostAmble — Production Deployment & Security Specification

This document details the build requirements, static hosting environments, and recommended security headers for deploying HostAmble.

## 1. Zero-Backend Build Overview

HostAmble compiles to a 100% static distribution in the `dist/` folder:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Runtime:** Node.js 18.x, 20.x, 22.x, or 24.x
- **Environment Variables:** **None required.** HostAmble contains zero private API keys or database connection strings.

---

## 2. Recommended Deployment Targets

### A. Cloudflare Pages

- **Framework Preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20 or 22 (set via `NODE_VERSION=20` if necessary)

### B. Vercel

- **Framework Preset:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`

### C. AWS S3 + CloudFront

1. Build locally or in CI: `npm run build`
2. Sync the `dist/` directory to an Amazon S3 bucket configured for static website hosting.
3. Serve via Amazon CloudFront with an SSL/TLS certificate.

---

## 3. Recommended Production Security Headers

Configure your web server (or `_headers` / Cloudflare Transform Rules) to enforce the following security headers:

```http
# Strict Transport Security (HSTS)
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Clickjacking Protection
X-Frame-Options: DENY

# Referrer Policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions Policy
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

# Content Security Policy (CSP)
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';
```

---

## 4. Cache Control Guidelines

- **HTML files (`*.html`):**
  `Cache-Control: public, max-age=0, must-revalidate`
  Ensures visitors receive updated pricing and product catalog changes immediately upon deployment.
- **Hashed Assets (`_astro/*`):**
  `Cache-Control: public, max-age=31536000, immutable`
  Astro generates content-hashed filenames for CSS and bundled client scripts, allowing aggressive caching.
