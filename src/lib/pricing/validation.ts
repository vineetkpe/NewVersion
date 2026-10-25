import { SUPPORTED_CURRENCY_CODES } from '../../data/currencies';
import { BILLING_PERIODS, type Product } from './types';

export interface ValidationIssue {
  readonly productId: string;
  readonly severity: 'error' | 'warning';
  readonly message: string;
}

/**
 * Validates a list of products to guarantee data integrity across the entire application:
 * 1. Product IDs are unique and non-empty.
 * 2. Supported billing periods are valid enum members.
 * 3. All configured prices are non-negative integer minor currency units.
 * 4. Active products have at least one configured price.
 * 5. Promotions have valid date ranges and positive promotional prices.
 */
export function validateProductCatalog(products: readonly Product[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const product of products) {
    // 1. ID Check
    if (!product.id || product.id.trim() === '') {
      issues.push({
        productId: product.id ?? 'unknown',
        severity: 'error',
        message: 'Product has an empty or invalid ID.',
      });
      continue;
    }

    if (seenIds.has(product.id)) {
      issues.push({
        productId: product.id,
        severity: 'error',
        message: `Duplicate product ID detected: "${product.id}". Product IDs must be globally unique.`,
      });
    }
    seenIds.add(product.id);

    // 2. Billing periods check
    if (
      !product.supportedBillingPeriods ||
      product.supportedBillingPeriods.length === 0
    ) {
      issues.push({
        productId: product.id,
        severity: 'error',
        message: `Product "${product.id}" must declare at least one supported billing period.`,
      });
    }

    for (const period of product.supportedBillingPeriods) {
      if (!BILLING_PERIODS.includes(period)) {
        issues.push({
          productId: product.id,
          severity: 'error',
          message: `Product "${product.id}" contains invalid billing period "${period}".`,
        });
      }
    }

    // 3. Price validation
    let hasAnyPrice = false;
    for (const currency of SUPPORTED_CURRENCY_CODES) {
      const periodPrices = product.prices[currency];
      if (periodPrices) {
        for (const [period, amount] of Object.entries(periodPrices)) {
          if (amount !== undefined && amount !== null) {
            hasAnyPrice = true;
            if (!Number.isInteger(amount) || amount < 0) {
              issues.push({
                productId: product.id,
                severity: 'error',
                message: `Product "${product.id}" has invalid price amount "${amount}" for currency ${currency} and period ${period}. Must be a non-negative integer minor unit.`,
              });
            }
          }
        }
      }
    }

    if (product.active && !hasAnyPrice) {
      issues.push({
        productId: product.id,
        severity: 'error',
        message: `Active product "${product.id}" has no configured prices in any currency.`,
      });
    }

    // 4. Promotions check
    if (product.promotions) {
      for (const promo of product.promotions) {
        const start = new Date(promo.validFrom);
        const end = new Date(promo.validUntil);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
          issues.push({
            productId: product.id,
            severity: 'error',
            message: `Promotion "${promo.id}" on product "${product.id}" has invalid date strings.`,
          });
        } else if (start > end) {
          issues.push({
            productId: product.id,
            severity: 'error',
            message: `Promotion "${promo.id}" on product "${product.id}" has validFrom after validUntil.`,
          });
        }
      }
    }
  }

  return issues;
}
