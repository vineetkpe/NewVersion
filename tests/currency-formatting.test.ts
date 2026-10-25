import { describe, it, expect } from 'vitest';
import {
  minorToMajor,
  majorToMinor,
  formatCurrencyMinor,
} from '../src/lib/currency/format';

describe('Currency Conversion & Formatting', () => {
  describe('minorToMajor', () => {
    it('converts USD cents to dollars (exponent 2)', () => {
      expect(minorToMajor(299, 'USD')).toBe(2.99);
      expect(minorToMajor(100, 'USD')).toBe(1.0);
      expect(minorToMajor(0, 'USD')).toBe(0);
    });

    it('converts INR paise to rupees (exponent 2)', () => {
      expect(minorToMajor(19900, 'INR')).toBe(199.0);
      expect(minorToMajor(34950, 'INR')).toBe(349.5);
    });

    it('converts EUR cents to euros (exponent 2)', () => {
      expect(minorToMajor(279, 'EUR')).toBe(2.79);
      expect(minorToMajor(1000, 'EUR')).toBe(10.0);
    });

    it('throws on negative or invalid numbers', () => {
      expect(() => minorToMajor(-100, 'USD')).toThrow(TypeError);
      expect(() => minorToMajor(NaN, 'USD')).toThrow(TypeError);
    });
  });

  describe('majorToMinor', () => {
    it('converts dollars to cents safely', () => {
      expect(majorToMinor(2.99, 'USD')).toBe(299);
      expect(majorToMinor(199.0, 'INR')).toBe(19900);
      expect(majorToMinor(2.79, 'EUR')).toBe(279);
    });
  });

  describe('formatCurrencyMinor', () => {
    it('formats USD prices with $ sign and 2 decimals', () => {
      const formatted = formatCurrencyMinor(299, 'USD');
      expect(formatted).toMatch(/\$2\.99/);
    });

    it('formats INR prices with ₹ symbol and Indian numbering', () => {
      const formatted = formatCurrencyMinor(19900, 'INR');
      expect(formatted).toMatch(/(₹|INR)\s?199(\.00)?/);
    });

    it('formats EUR prices correctly', () => {
      const formatted = formatCurrencyMinor(279, 'EUR');
      expect(formatted).toMatch(/2,79\s?€|€\s?2\.79/);
    });

    it('safely handles non-finite or negative minor amounts without throwing', () => {
      expect(formatCurrencyMinor(-50, 'USD')).toBe('Price unavailable');
      expect(formatCurrencyMinor(NaN, 'USD')).toBe('Price unavailable');
      expect(formatCurrencyMinor(Infinity, 'USD')).toBe('Price unavailable');
    });

    it('falls back to default currency when an unsupported code is supplied', () => {
      // @ts-expect-error testing runtime fallback for invalid currency code
      const result = formatCurrencyMinor(499, 'INVALID');
      expect(result).toMatch(/\$4\.99/);
    });
  });
});
