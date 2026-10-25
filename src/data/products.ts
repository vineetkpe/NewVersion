import type { Product } from '../lib/pricing/types';

/**
 * HostAmble Central Product and Pricing Catalog
 *
 * THIS FILE IS THE SINGLE TYPED SOURCE OF TRUTH FOR ALL PRODUCT INFORMATION AND PRICES.
 *
 * Pricing Rules:
 * 1. All amounts are stored as non-negative integer minor currency units:
 *    - USD: cents (e.g. 299 = $2.99)
 *    - INR: paise (e.g. 19900 = ₹199.00)
 *    - EUR: cents (e.g. 279 = €2.79)
 * 2. Prices are configured independently for each currency. We do NOT perform automated currency conversion.
 * 3. Never assume all billing periods are supported. Only periods listed in supportedBillingPeriods and present in prices are valid.
 * 4. Missing prices return an explicit unavailable status, never zero.
 */
export const PRODUCTS: readonly Product[] = [
  // Core Homepage Featured Tier 1: Personal
  {
    id: 'personal',
    name: 'Personal',
    category: 'shared',
    tagline: 'For personal sites and blogs',
    description:
      'Engineered for low-traffic personal sites, portfolios, and blogs with fast NVMe storage and free SSL.',
    active: true,
    displayOrder: 1,
    isFeatured: false,
    badge: 'Starter Choice',
    supportedBillingPeriods: ['monthly', 'quarterly', 'semiannual', 'annual'],
    prices: {
      USD: {
        monthly: 299, // $2.99
        quarterly: 849, // $8.49
        semiannual: 1599, // $15.99
        annual: 2388, // $23.88 / yr ($1.99/mo)
      },
      INR: {
        monthly: 19900, // ₹199.00
        quarterly: 54900, // ₹549.00
        semiannual: 99900, // ₹999.00
        annual: 70800, // ₹708.00 / yr (₹59.00/mo)
      },
      EUR: {
        monthly: 279, // €2.79
        quarterly: 789, // €7.89
        semiannual: 1479, // €14.79
        annual: 2148, // €21.48 / yr (€1.79/mo)
      },
    },
    features: [
      '1 Website',
      '10 GB NVMe Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      'Free Domain (1st Year)',
    ],
    specifications: {
      'Storage Type': 'Enterprise NVMe',
      Bandwidth: 'Unmetered',
      'Datacenter Regions': 'US East, EU Central, IN West',
      'Control Panel': 'HostAmble Minimal Console',
    },
  },

  // Core Homepage Featured Tier 2: Starter
  {
    id: 'starter',
    name: 'Starter',
    category: 'shared',
    tagline: 'For fast-growing projects & SMBs',
    description:
      'Enhanced NVMe storage, custom business emails, and automated backups for growing commercial websites.',
    active: true,
    displayOrder: 2,
    isFeatured: false,
    badge: 'Popular for Growth',
    supportedBillingPeriods: ['monthly', 'quarterly', 'semiannual', 'annual'],
    prices: {
      USD: {
        monthly: 499, // $4.99
        quarterly: 1399, // $13.99
        semiannual: 2599, // $25.99
        annual: 4188, // $41.88 / yr ($3.49/mo)
      },
      INR: {
        monthly: 34900, // ₹349.00
        quarterly: 94900, // ₹949.00
        semiannual: 174900, // ₹1,749.00
        annual: 118800, // ₹1,188.00 / yr (₹99.00/mo)
      },
      EUR: {
        monthly: 459, // €4.59
        quarterly: 1299, // €12.99
        semiannual: 2399, // €23.99
        annual: 3828, // €38.28 / yr (€3.19/mo)
      },
    },
    features: [
      '5 Websites',
      '25 GB NVMe Storage',
      '100 GB Bandwidth',
      '2 Business Email Accounts',
      'Automated Backups',
    ],
    specifications: {
      'Storage Type': 'Enterprise NVMe',
      Bandwidth: '100 GB High Speed',
      Emails: '2 Accounts Included',
      Backups: 'Weekly Automated',
    },
  },

  // Core Homepage Featured Tier 3: Pro Web (Recommended)
  {
    id: 'pro-web',
    name: 'Pro Web',
    category: 'wordpress',
    tagline: 'For established businesses & agencies',
    description:
      'High-throughput hosting with Redis object caching, staging environment, and daily backups with 30-day retention.',
    active: true,
    displayOrder: 3,
    isFeatured: true,
    badge: 'RECOMMENDED',
    supportedBillingPeriods: ['monthly', 'quarterly', 'semiannual', 'annual'],
    prices: {
      USD: {
        monthly: 799, // $7.99
        quarterly: 2199, // $21.99
        semiannual: 3999, // $39.99
        annual: 5988, // $59.88 / yr ($4.99/mo)
      },
      INR: {
        monthly: 49900, // ₹499.00
        quarterly: 139900, // ₹1,399.00
        semiannual: 259900, // ₹2,599.00
        annual: 178800, // ₹1,788.00 / yr (₹149.00/mo)
      },
      EUR: {
        monthly: 749, // €7.49
        quarterly: 2049, // €20.49
        semiannual: 3699, // €36.99
        annual: 5508, // €55.08 / yr (€4.59/mo)
      },
    },
    features: [
      '100 Websites',
      '100 GB NVMe Storage',
      'Unmetered Bandwidth',
      'Unlimited Business Emails',
      'Daily Backups (30-day retention)',
      'Staging Environment',
      'Priority 24/7 Support',
    ],
    specifications: {
      PHP: 'PHP 8.2 / 8.3 OPcache',
      Caching: 'Redis Object Cache Built-in',
      Backups: 'Daily Offsite Snapshots',
      Staging: '1-Click Staging & Sync',
    },
  },

  // Core Homepage Featured Tier 4: Business
  {
    id: 'business',
    name: 'Business',
    category: 'cloud',
    tagline: 'High-traffic ecommerce and platforms',
    description:
      'Dedicated compute allocations, isolated vCPUs, dedicated IPv4, and Redis caching for demanding web platforms.',
    active: true,
    displayOrder: 4,
    isFeatured: false,
    badge: 'Maximum Power',
    supportedBillingPeriods: ['monthly', 'quarterly', 'semiannual', 'annual'],
    prices: {
      USD: {
        monthly: 1499, // $14.99
        quarterly: 4199, // $41.99
        semiannual: 7799, // $77.99
        annual: 11988, // $119.88 / yr ($9.99/mo)
      },
      INR: {
        monthly: 89900, // ₹899.00
        quarterly: 249900, // ₹2,499.00
        semiannual: 469900, // ₹4,699.00
        annual: 334800, // ₹3,348.00 / yr (₹279.00/mo)
      },
      EUR: {
        monthly: 1399, // €13.99
        quarterly: 3899, // €38.99
        semiannual: 7199, // €71.99
        annual: 10788, // €107.88 / yr (€8.99/mo)
      },
    },
    features: [
      'Unlimited Websites',
      '200 GB NVMe Storage',
      'Unmetered Bandwidth',
      'Dedicated IP Address',
      'Redis Object Caching',
      'Premium SSL & DDoS Shield',
    ],
    specifications: {
      'CPU / RAM': 'Dedicated 2 vCPU / 4 GB RAM',
      IPv4: '1 Dedicated Static IPv4',
      Security: 'Enterprise DDoS Shield',
      SLA: '99.99% Guaranteed SLA',
    },
  },

  // Specialized Plans for Dedicated Hosting Categories
  {
    id: 'shared-basic',
    name: 'Shared Basic',
    category: 'shared',
    tagline: 'Reliable, cost-effective hosting for personal websites and portfolios.',
    description:
      'Engineered for low-traffic personal sites, blogs, and landing pages with fast NVMe storage and free SSL.',
    active: true,
    displayOrder: 5,
    isFeatured: false,
    badge: 'Popular for Beginners',
    supportedBillingPeriods: ['monthly', 'annual'],
    prices: {
      USD: {
        monthly: 299,
        annual: 2988,
      },
      INR: {
        monthly: 19900,
        annual: 179880,
      },
      EUR: {
        monthly: 279,
        annual: 2748,
      },
    },
    features: [
      '1 Website Hosted',
      '10 GB High-Speed NVMe Storage',
      'Unmetered Bandwidth',
      'Free Let’s Encrypt SSL Certificate',
      'Automated Weekly Backups',
      'Standard 99.9% Uptime Guarantee',
    ],
  },
  {
    id: 'wordpress-starter',
    name: 'WordPress Starter',
    category: 'wordpress',
    tagline: 'Optimized stack tuned specifically for WordPress speed and security.',
    description:
      'Pre-configured PHP runtime, server-level caching, and automatic core updates for modern WordPress sites.',
    active: true,
    displayOrder: 6,
    isFeatured: true,
    badge: 'Most Recommended',
    supportedBillingPeriods: ['monthly', 'annual'],
    prices: {
      USD: {
        monthly: 499,
        annual: 4788,
      },
      INR: {
        monthly: 34900,
        annual: 358800,
      },
      EUR: {
        monthly: 459,
        annual: 4390,
      },
    },
    features: [
      '3 WordPress Websites',
      '25 GB NVMe Storage',
      'Built-in Redis Object Caching',
      'Automated Daily Backups with 1-Click Restore',
      'WordPress Staging Environment',
      'DDoS Protection & Web Application Firewall',
    ],
  },
  {
    id: 'cloud-starter',
    name: 'Cloud Compute Starter',
    category: 'cloud',
    tagline: 'Dedicated compute slices with isolated vCPU and guaranteed RAM.',
    description:
      'Ideal for fast-growing web applications, microservices, and agencies requiring predictable performance.',
    active: true,
    displayOrder: 7,
    isFeatured: false,
    badge: 'Enterprise Performance',
    supportedBillingPeriods: ['monthly', 'quarterly', 'annual'],
    prices: {
      USD: {
        monthly: 1299,
        quarterly: 3499,
        annual: 11988,
      },
      INR: {
        monthly: 99900,
        quarterly: 269900,
        annual: 958800,
      },
      EUR: {
        monthly: 1199,
        quarterly: 3199,
        annual: 10988,
      },
    },
    features: [
      '2 Dedicated vCPUs',
      '4 GB ECC DDR5 RAM',
      '80 GB NVMe Storage Pool',
      '2 TB Outbound Transfer (Free Inbound)',
      '1 Dedicated IPv4 + /64 IPv6 Block',
      '99.99% Hardware SLA',
    ],
  },
  {
    id: 'reseller-starter',
    name: 'Reseller Starter',
    category: 'reseller',
    tagline:
      'White-label hosting infrastructure designed for freelance developers and boutique agencies.',
    description:
      'Manage multiple client accounts under your own brand with isolated cPanel/dashboard quotas.',
    active: true,
    displayOrder: 8,
    isFeatured: false,
    supportedBillingPeriods: ['monthly', 'annual'],
    prices: {
      USD: {
        monthly: 2499,
        annual: 23988,
      },
      INR: {
        monthly: 189900,
        annual: 1918800,
      },
      EUR: {
        monthly: 2299,
        annual: 21988,
      },
    },
    features: [
      'Up to 25 Client Accounts',
      '100 GB NVMe Disk Space',
      '100% White-Label Nameservers',
      'Automated Account Provisioning',
      'Client Bandwidth & Disk Quota Management',
      'Priority Architect Support Channel',
    ],
  },
] as const;

/**
 * Fast lookup map by Product ID
 */
export const PRODUCTS_BY_ID: Readonly<Record<string, Product>> = Object.freeze(
  PRODUCTS.reduce<Record<string, Product>>((acc, prod) => {
    acc[prod.id] = prod;
    return acc;
  }, {})
);

export function getProductById(id: string): Product | undefined {
  return PRODUCTS_BY_ID[id];
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category && p.active).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}
