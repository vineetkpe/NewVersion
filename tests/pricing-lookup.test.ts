import { describe, it, expect } from 'vitest';
import { lookupProductPrice } from '../src/lib/pricing/lookup';
import type { Product } from '../src/lib/pricing/types';

describe('Pricing Lookup Engine', () => {
  const sampleProduct: Product = {
    id: 'test-compute',
    name: 'Test Compute Slice',
    category: 'cloud',
    tagline: 'High performance test node',
    description: 'Isolated test environment',
    active: true,
    displayOrder: 1,
    isFeatured: false,
    supportedBillingPeriods: ['monthly', 'annual'],
    prices: {
      USD: {
        monthly: 999, // $9.99
        annual: 9990, // $99.90
      },
      INR: {
        monthly: 79900, // ₹799.00
      },
      EUR: {
        monthly: 899,
        annual: 8990,
      },
    },
    features: ['1 vCPU', '2 GB RAM'],
  };

  it('looks up configured prices accurately in USD', () => {
    const resMonthly = lookupProductPrice(sampleProduct, 'USD', 'monthly');
    expect(resMonthly.isAvailable).toBe(true);
    if (resMonthly.isAvailable) {
      expect(resMonthly.amountMinor).toBe(999);
      expect(resMonthly.formatted).toMatch(/\$9\.99/);
      expect(resMonthly.periodSuffix).toBe('/mo');
      expect(resMonthly.isPromotional).toBe(false);
    }

    const resAnnual = lookupProductPrice(sampleProduct, 'USD', 'annual');
    expect(resAnnual.isAvailable).toBe(true);
    if (resAnnual.isAvailable) {
      expect(resAnnual.amountMinor).toBe(9990);
      expect(resAnnual.formatted).toMatch(/\$99\.90/);
      expect(resAnnual.periodSuffix).toBe('/yr');
    }
  });

  it('never silently substitutes missing prices with zero', () => {
    // INR has monthly configured, but annual is missing
    const res = lookupProductPrice(sampleProduct, 'INR', 'annual');
    expect(res.isAvailable).toBe(false);
    if (!res.isAvailable) {
      expect(res.reason).toBe('price_unconfigured');
      expect(res.formatted).toBe('Price unavailable');
      // @ts-expect-error amountMinor should not exist on unavailable result
      expect(res.amountMinor).toBeUndefined();
    }
  });

  it('does not calculate annual pricing automatically from monthly', () => {
    // If annual price is missing, it must not multiply monthly by 12
    const res = lookupProductPrice(sampleProduct, 'INR', 'annual');
    expect(res.isAvailable).toBe(false);
  });

  it('rejects unsupported billing periods cleanly', () => {
    // sampleProduct only supports monthly and annual, not quarterly
    const res = lookupProductPrice(sampleProduct, 'USD', 'quarterly');
    expect(res.isAvailable).toBe(false);
    if (!res.isAvailable) {
      expect(res.reason).toBe('period_unsupported');
    }
  });

  it('rejects inactive products', () => {
    const inactiveProduct: Product = {
      ...sampleProduct,
      active: false,
    };
    const res = lookupProductPrice(inactiveProduct, 'USD', 'monthly');
    expect(res.isAvailable).toBe(false);
    if (!res.isAvailable) {
      expect(res.reason).toBe('product_inactive');
    }
  });

  it('honors explicitly configured promotions only during their active date window', () => {
    const promoProduct: Product = {
      ...sampleProduct,
      promotions: [
        {
          id: 'summer-special',
          label: 'Summer Special',
          validFrom: '2026-06-01T00:00:00Z',
          validUntil: '2026-08-31T23:59:59Z',
          prices: {
            USD: {
              monthly: 699, // $6.99 promo
            },
          },
        },
      ],
    };

    // Before promo
    const beforeRes = lookupProductPrice(promoProduct, 'USD', 'monthly', {
      asOfDate: new Date('2026-05-15T00:00:00Z'),
    });
    expect(beforeRes.isAvailable).toBe(true);
    if (beforeRes.isAvailable) {
      expect(beforeRes.isPromotional).toBe(false);
      expect(beforeRes.amountMinor).toBe(999);
    }

    // During promo
    const duringRes = lookupProductPrice(promoProduct, 'USD', 'monthly', {
      asOfDate: new Date('2026-07-04T12:00:00Z'),
    });
    expect(duringRes.isAvailable).toBe(true);
    if (duringRes.isAvailable) {
      expect(duringRes.isPromotional).toBe(true);
      expect(duringRes.amountMinor).toBe(699);
      expect(duringRes.regularAmountMinor).toBe(999);
      expect(duringRes.promotionLabel).toBe('Summer Special');
    }

    // After promo
    const afterRes = lookupProductPrice(promoProduct, 'USD', 'monthly', {
      asOfDate: new Date('2026-09-01T00:00:00Z'),
    });
    expect(afterRes.isAvailable).toBe(true);
    if (afterRes.isAvailable) {
      expect(afterRes.isPromotional).toBe(false);
      expect(afterRes.amountMinor).toBe(999);
    }
  });
});
