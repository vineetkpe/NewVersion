# HostAmble — Pricing Management & Operational Guide

This document is the definitive guide for managing products, pricing, billing cycles, and promotions across the HostAmble platform.

All pricing configuration is centralized in:
`src/data/products.ts`

**Changing a price or feature here updates every page, card, summary, and comparison table across the website upon the next deployment.** You never need to edit multiple pages to update a price.

---

## 1. Storage Format & Minor Units

All monetary values are stored strictly as **non-negative integer minor currency units**:

- **USD ($):** Stored in cents (e.g. `$4.99` &rarr; `499`).
- **INR (₹):** Stored in paise (e.g. `₹299.00` &rarr; `29900`).
- **EUR (€):** Stored in cents (e.g. `€4.59` &rarr; `459`).

Do **not** store floating point numbers (such as `4.99`).

---

## 2. Core Operations

### A. How to Change an Existing Product Price

1. Open `src/data/products.ts`.
2. Locate the product by its stable `id` (e.g. `shared-basic`).
3. Locate the `prices` block for the target currency and billing period.
4. Modify the integer minor unit value:
   ```ts
   prices: {
     USD: {
       monthly: 349, // Updated from $2.99 to $3.49
       annual: 3488, // Updated annual price ($34.88)
     },
     INR: {
       monthly: 24900, // Updated from ₹199 to ₹249
       annual: 249000,
     },
     EUR: {
       monthly: 329, // Updated from €2.79 to €3.29
       annual: 3290,
     },
   }
   ```
5. Save the file. Run `npm test` and `npm run build` to verify.

---

### B. How to Add a New Product

1. Open `src/data/products.ts`.
2. Add a new object to the `PRODUCTS` array adhering to the `Product` interface:
   ```ts
   {
     id: 'cloud-pro',
     name: 'Cloud Pro 4X',
     category: 'cloud',
     tagline: 'High-memory cloud slices for demanding databases.',
     description: 'Dedicated high-frequency AMD EPYC cores with 16 GB ECC RAM.',
     active: true,
     displayOrder: 5,
     isFeatured: false,
     badge: 'Power User',
     supportedBillingPeriods: ['monthly', 'quarterly', 'annual'],
     prices: {
       USD: {
         monthly: 4999, // $49.99
         quarterly: 13499,
         annual: 47988,
       },
       INR: {
         monthly: 399900, // ₹3,999.00
         quarterly: 1079900,
         annual: 3838800,
       },
       EUR: {
         monthly: 4599, // €45.99
         quarterly: 12499,
         annual: 44150,
       },
     },
     features: [
       '4 Dedicated vCPUs',
       '16 GB DDR5 RAM',
       '200 GB NVMe Storage',
       '10 Gbps Uplink',
     ],
   }
   ```
3. Ensure the `id` is kebab-case, unique, and permanent.

---

### C. How to Configure Different Currencies

HostAmble does not use automated foreign exchange conversions. You must set prices deliberately for each market:

- If a price is omitted for a currency, that currency will display an explicit `Price unavailable` status on the frontend.
- Never enter zero (`0`) for an unpriced product.

---

### D. How to Add or Remove a Billing Period

1. Update `supportedBillingPeriods`:
   ```ts
   supportedBillingPeriods: ['monthly', 'annual'];
   ```
2. In the `prices` block, add or remove the corresponding period keys.
3. If a period is listed in `supportedBillingPeriods` but has no price configured for a given currency, that period will safely render as unavailable.

---

### E. How to Update Plan Features

Edit the `features` array of strings:

```ts
features: [
  '1 Website Hosted',
  '15 GB High-Speed NVMe Storage', // Updated quota
  'Unmetered Bandwidth',
  'Free Let’s Encrypt SSL Certificate',
];
```

---

### F. How to Mark a Product Unavailable

Set `active: false`:

```ts
active: false,
```

When `active: false`:

- The lookup engine marks `isAvailable: false`.
- Any component displaying the plan will render a disabled state or omit it from active listings.

---

### G. How to Configure an Explicit Promotion

Add a `promotions` array to the product configuration:

```ts
promotions: [
  {
    id: 'intro-2026',
    label: 'Introductory Offer',
    validFrom: '2026-01-01T00:00:00Z',
    validUntil: '2026-12-31T23:59:59Z',
    prices: {
      USD: {
        monthly: 199, // $1.99 promotional rate
      },
      INR: {
        monthly: 14900, // ₹149.00 promotional rate
      },
      EUR: {
        monthly: 189, // €1.89 promotional rate
      },
    },
  },
];
```

**Promotional Rules:**

- Promotions are only displayed during the active UTC window between `validFrom` and `validUntil`.
- Never create fake promotions or manufactured discounts.
- If the current date is outside this window, the standard price is shown automatically.

---

## 3. Validation & Quality Verification

Before committing and deploying any pricing changes, run the validation suite:

```bash
# 1. Run unit tests to check ID uniqueness, positive integers, and pricing rules
npm test

# 2. Check TypeScript types
npm run typecheck

# 3. Verify production compilation
npm run build
```

---

## 4. Build and Deployment

Once tests pass:

```bash
git add src/data/products.ts
git commit -m "feat(pricing): update product catalog rates"
git push origin main
```

Your continuous deployment provider (Cloudflare Pages, Vercel, Netlify, or GitHub Actions) will build the static HTML and deploy the updated prices across all pages in under 30 seconds.
