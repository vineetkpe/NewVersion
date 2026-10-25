export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly badge?: string;
  readonly isExternal?: boolean;
}

export interface NavSection {
  readonly title: string;
  readonly items: readonly NavItem[];
}

export const SITE_CONFIG = {
  name: 'HostAmble',
  tagline: 'High-Performance Web Infrastructure & Domain Services',
  description:
    'Independent web hosting, optimized WordPress infrastructure, high-throughput cloud compute, and domain services built for modern architects.',
  url: 'https://hostamble.com',
  defaultLocale: 'en-US',
  foundingYear: 2026,
  supportEmail: 'support@hostamble.com',
} as const;

export const PRIMARY_NAVIGATION: readonly NavItem[] = [
  { label: 'Shared Hosting', href: '/hosting/shared' },
  { label: 'WordPress', href: '/hosting/wordpress' },
  { label: 'Cloud Compute', href: '/cloud' },
  { label: 'Reseller', href: '/reseller' },
  { label: 'Domains', href: '/domains' },
  { label: 'Pricing', href: '/pricing' },
] as const;

export const FOOTER_SECTIONS: readonly NavSection[] = [
  {
    title: 'Hosting & Cloud',
    items: [
      { label: 'Shared NVMe Hosting', href: '/hosting/shared' },
      { label: 'WordPress Hosting', href: '/hosting/wordpress' },
      { label: 'Cloud Slices', href: '/cloud' },
      { label: 'Reseller Infrastructure', href: '/reseller' },
      { label: 'All Plans & Comparison', href: '/pricing' },
    ],
  },
  {
    title: 'Domains',
    items: [
      { label: 'Domain Search', href: '/domains/search' },
      { label: 'Register a Domain', href: '/domains/register' },
      { label: 'Transfer a Domain', href: '/domains/transfer' },
      { label: 'Domain Pricing Table', href: '/domains/pricing' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Network & Datacenters', href: '/network' },
      { label: 'Knowledgebase', href: '/support/knowledgebase' },
      { label: 'System Status', href: '/status' },
    ],
  },
  {
    title: 'Legal & Policies',
    items: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Refund & Cancellation', href: '/legal/refunds' },
      { label: 'Acceptable Use Policy', href: '/legal/aup' },
    ],
  },
] as const;
