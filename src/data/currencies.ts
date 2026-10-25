import type { CurrencyCode, CurrencyMap } from '../lib/currency/types';

/**
 * HostAmble Central Currency Configuration
 *
 * All currencies supported by the platform are defined here with their
 * standard ISO-4217 code, symbol, minor-unit exponent, and default locale.
 *
 * Crucial Rule:
 * We store all monetary values as integer minor currency units:
 *   - USD: cents (1 USD = 100 cents, exponent = 2)
 *   - INR: paise (1 INR = 100 paise, exponent = 2)
 *   - EUR: cents (1 EUR = 100 cents, exponent = 2)
 */
export const SUPPORTED_CURRENCIES: CurrencyMap = {
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    exponent: 2,
    subUnitName: 'paise',
    defaultLocale: 'en-IN',
    displaySymbolFirst: true,
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    exponent: 2,
    subUnitName: 'cent',
    defaultLocale: 'en-US',
    displaySymbolFirst: true,
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    exponent: 2,
    subUnitName: 'cent',
    defaultLocale: 'de-DE',
    displaySymbolFirst: false,
  },
} as const;

export const SUPPORTED_CURRENCY_CODES: readonly CurrencyCode[] = [
  'INR',
  'USD',
  'EUR',
] as const;

/**
 * Default fallback currency when no valid stored preference exists.
 */
export const DEFAULT_CURRENCY: CurrencyCode = 'USD';

/**
 * Country-to-currency hint mapping for future edge / geo-header usage.
 * No external geolocation APIs are called; this is a pure lookup map ready for deployment headers.
 */
export const COUNTRY_TO_CURRENCY_MAP: Readonly<Record<string, CurrencyCode>> = {
  IN: 'INR',
  US: 'USD',
  CA: 'USD',
  GB: 'USD',
  AU: 'USD',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  IE: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
};

/**
 * Type guard to check if a string is a supported CurrencyCode
 */
export function isSupportedCurrency(code: unknown): code is CurrencyCode {
  if (typeof code !== 'string') return false;
  return SUPPORTED_CURRENCY_CODES.includes(code as CurrencyCode);
}
