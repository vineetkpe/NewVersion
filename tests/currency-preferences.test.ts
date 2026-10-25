import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getSavedCurrencyPreference,
  setSavedCurrencyPreference,
  CURRENCY_STORAGE_KEY,
} from '../src/lib/currency/preferences';
import { DEFAULT_CURRENCY, isSupportedCurrency } from '../src/data/currencies';

describe('Currency Preference Management', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};

    // Mock window & localStorage
    const storageMock = {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
    };

    vi.stubGlobal('localStorage', storageMock);
    vi.stubGlobal('window', {
      localStorage: storageMock,
      dispatchEvent: vi.fn(),
    });
  });

  it('validates supported currencies using isSupportedCurrency', () => {
    expect(isSupportedCurrency('INR')).toBe(true);
    expect(isSupportedCurrency('USD')).toBe(true);
    expect(isSupportedCurrency('EUR')).toBe(true);
    expect(isSupportedCurrency('GBP')).toBe(false);
    expect(isSupportedCurrency('')).toBe(false);
    expect(isSupportedCurrency(null)).toBe(false);
  });

  it('returns default currency when no preference is saved', () => {
    const pref = getSavedCurrencyPreference();
    expect(pref.currency).toBe(DEFAULT_CURRENCY);
    expect(pref.source).toBe('default');
  });

  it('safely stores and retrieves a valid currency preference', () => {
    const saved = setSavedCurrencyPreference('EUR');
    expect(saved).toBe(true);
    expect(mockStorage[CURRENCY_STORAGE_KEY]).toBe('EUR');

    const pref = getSavedCurrencyPreference();
    expect(pref.currency).toBe('EUR');
    expect(pref.source).toBe('stored');
  });

  it('rejects invalid currency strings and falls back to default', () => {
    // Manually pollute storage with an unsupported currency code
    mockStorage[CURRENCY_STORAGE_KEY] = 'BITCOIN';

    const pref = getSavedCurrencyPreference();
    expect(pref.currency).toBe(DEFAULT_CURRENCY);
    expect(pref.source).toBe('default');
  });

  it('rejects saving invalid currency', () => {
    // @ts-expect-error testing invalid argument at runtime
    const saved = setSavedCurrencyPreference('XYZ');
    expect(saved).toBe(false);
    expect(mockStorage[CURRENCY_STORAGE_KEY]).toBeUndefined();
  });

  it('handles localStorage exceptions gracefully without crashing', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => {
        throw new Error('Access denied (SecurityError)');
      }),
      setItem: vi.fn(() => {
        throw new Error('QuotaExceeded');
      }),
    });

    const pref = getSavedCurrencyPreference();
    expect(pref.currency).toBe(DEFAULT_CURRENCY);
    expect(pref.source).toBe('default');

    // Should not throw
    expect(() => setSavedCurrencyPreference('INR')).not.toThrow();
  });
});
