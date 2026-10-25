import type { CurrencyCode } from '../currency/types';

export type BillingPeriod = 'monthly' | 'quarterly' | 'semiannual' | 'annual';

export const BILLING_PERIODS: readonly BillingPeriod[] = [
  'monthly',
  'quarterly',
  'semiannual',
  'annual',
] as const;

export const BILLING_PERIOD_LABELS: Record<BillingPeriod, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  semiannual: 'Semi-Annual',
  annual: 'Annual',
};

export const BILLING_PERIOD_SUFFIXES: Record<BillingPeriod, string> = {
  monthly: '/mo',
  quarterly: '/quarter',
  semiannual: '/6 mo',
  annual: '/yr',
};

export type ProductCategory =
  'shared' | 'wordpress' | 'cloud' | 'reseller' | 'vps' | 'dedicated';

export interface Promotion {
  readonly id: string;
  readonly label: string;
  /** ISO-8601 date string for start of validity e.g. "2026-01-01T00:00:00Z" */
  readonly validFrom: string;
  /** ISO-8601 date string for end of validity e.g. "2026-12-31T23:59:59Z" */
  readonly validUntil: string;
  /** Minor-unit promotional prices for specific currency & billing period */
  readonly prices: Partial<Record<CurrencyCode, Partial<Record<BillingPeriod, number>>>>;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly tagline: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly active: boolean;
  readonly displayOrder: number;
  readonly isFeatured: boolean;
  readonly badge?: string;
  readonly supportedBillingPeriods: readonly BillingPeriod[];
  /**
   * Central Pricing Store
   * Values are stored strictly as integer MINOR currency units (cents, paise).
   * E.g. $4.99/mo is stored as 499. ₹299/mo is stored as 29900.
   */
  readonly prices: Partial<Record<CurrencyCode, Partial<Record<BillingPeriod, number>>>>;
  readonly promotions?: readonly Promotion[];
  readonly specifications?: Readonly<Record<string, string>>;
}

export type PriceLookupResult =
  | {
      readonly isAvailable: true;
      readonly amountMinor: number;
      readonly currency: CurrencyCode;
      readonly billingPeriod: BillingPeriod;
      readonly formatted: string;
      readonly periodSuffix: string;
      readonly isPromotional: boolean;
      readonly regularAmountMinor?: number;
      readonly formattedRegular?: string;
      readonly promotionLabel?: string;
    }
  | {
      readonly isAvailable: false;
      readonly currency: CurrencyCode;
      readonly billingPeriod: BillingPeriod;
      readonly reason: 'product_inactive' | 'period_unsupported' | 'price_unconfigured';
      readonly formatted: string;
      readonly periodSuffix: string;
    };
