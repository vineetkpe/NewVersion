import type { CurrencyCode } from '../currency/types';
import { formatCurrencyMinor } from '../currency/format';
import {
  BILLING_PERIOD_SUFFIXES,
  type BillingPeriod,
  type PriceLookupResult,
  type Product,
} from './types';

/**
 * Centrally looks up the exact configured price for a product, currency, and billing period.
 *
 * Enforces strict pricing rules:
 * 1. Missing prices NEVER default to zero; they return an explicit unavailable state.
 * 2. Unconfigured billing periods are NEVER automatically calculated from monthly or other periods.
 * 3. Inactive products return isAvailable: false.
 * 4. Promotions only apply if explicitly configured and currently valid within their date window.
 */
export function lookupProductPrice(
  product: Product,
  currency: CurrencyCode,
  period: BillingPeriod,
  options?: { asOfDate?: Date }
): PriceLookupResult {
  const periodSuffix = BILLING_PERIOD_SUFFIXES[period] ?? '';

  // 1. Inactive check
  if (!product.active) {
    return {
      isAvailable: false,
      currency,
      billingPeriod: period,
      reason: 'product_inactive',
      formatted: 'Unavailable',
      periodSuffix,
    };
  }

  // 2. Billing period supported check
  if (!product.supportedBillingPeriods.includes(period)) {
    return {
      isAvailable: false,
      currency,
      billingPeriod: period,
      reason: 'period_unsupported',
      formatted: 'Unavailable',
      periodSuffix,
    };
  }

  // 3. Regular price lookup
  const currencyPrices = product.prices[currency];
  const regularMinor = currencyPrices ? currencyPrices[period] : undefined;

  if (
    regularMinor === undefined ||
    regularMinor === null ||
    !Number.isFinite(regularMinor)
  ) {
    return {
      isAvailable: false,
      currency,
      billingPeriod: period,
      reason: 'price_unconfigured',
      formatted: 'Price unavailable',
      periodSuffix,
    };
  }

  // 4. Check for active promotion
  const asOf = options?.asOfDate ?? new Date();
  if (product.promotions && product.promotions.length > 0) {
    for (const promo of product.promotions) {
      const start = new Date(promo.validFrom);
      const end = new Date(promo.validUntil);
      if (asOf >= start && asOf <= end) {
        const promoCurrencyPrices = promo.prices[currency];
        const promoMinor = promoCurrencyPrices ? promoCurrencyPrices[period] : undefined;

        if (
          promoMinor !== undefined &&
          promoMinor !== null &&
          Number.isFinite(promoMinor) &&
          promoMinor < regularMinor
        ) {
          return {
            isAvailable: true,
            amountMinor: promoMinor,
            currency,
            billingPeriod: period,
            formatted: formatCurrencyMinor(promoMinor, currency),
            periodSuffix,
            isPromotional: true,
            regularAmountMinor: regularMinor,
            formattedRegular: formatCurrencyMinor(regularMinor, currency),
            promotionLabel: promo.label,
          };
        }
      }
    }
  }

  // 5. Regular price return
  return {
    isAvailable: true,
    amountMinor: regularMinor,
    currency,
    billingPeriod: period,
    formatted: formatCurrencyMinor(regularMinor, currency),
    periodSuffix,
    isPromotional: false,
  };
}
