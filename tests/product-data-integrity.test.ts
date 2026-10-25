import { describe, it, expect } from 'vitest';
import { PRODUCTS, PRODUCTS_BY_ID } from '../src/data/products';
import { validateProductCatalog } from '../src/lib/pricing/validation';
import { SUPPORTED_CURRENCY_CODES } from '../src/data/currencies';

describe('Product Data Integrity & Catalog Validation', () => {
  it('passes all catalog validation checks without errors', () => {
    const issues = validateProductCatalog(PRODUCTS);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('guarantees unique, stable product IDs', () => {
    const ids = PRODUCTS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('contains expected core product identifiers', () => {
    expect(PRODUCTS_BY_ID['shared-basic']).toBeDefined();
    expect(PRODUCTS_BY_ID['wordpress-starter']).toBeDefined();
    expect(PRODUCTS_BY_ID['cloud-starter']).toBeDefined();
    expect(PRODUCTS_BY_ID['reseller-starter']).toBeDefined();
  });

  it('stores all price values as non-negative integer minor currency units', () => {
    for (const product of PRODUCTS) {
      for (const cur of SUPPORTED_CURRENCY_CODES) {
        const periodPrices = product.prices[cur];
        if (periodPrices) {
          for (const [period, amount] of Object.entries(periodPrices)) {
            if (amount !== undefined) {
              expect(
                Number.isInteger(amount),
                `Product ${product.id} price for ${cur} ${period} must be an integer, got: ${amount}`
              ).toBe(true);
              expect(
                amount,
                `Product ${product.id} price for ${cur} ${period} must be >= 0`
              ).toBeGreaterThanOrEqual(0);
            }
          }
        }
      }
    }
  });

  it('ensures every active product has at least one supported billing period', () => {
    for (const product of PRODUCTS) {
      if (product.active) {
        expect(product.supportedBillingPeriods.length).toBeGreaterThan(0);
      }
    }
  });
});
