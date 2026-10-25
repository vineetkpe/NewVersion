import {
  SUPPORTED_CURRENCIES,
  DEFAULT_CURRENCY,
  isSupportedCurrency,
} from '../../data/currencies';
import type { CurrencyCode } from './types';

/**
 * Converts integer minor currency units (cents, paise) into major units (dollars, rupees, euros).
 * E.g. minorToMajor(299, 'USD') => 2.99
 *      minorToMajor(19900, 'INR') => 199.00
 */
export function minorToMajor(amountMinor: number, currencyCode: CurrencyCode): number {
  if (!Number.isFinite(amountMinor) || amountMinor < 0) {
    throw new TypeError(
      `Invalid amountMinor: expected a non-negative finite number, received ${amountMinor}`
    );
  }

  const config = SUPPORTED_CURRENCIES[currencyCode];
  if (!config) {
    throw new Error(`Unsupported currency code: ${currencyCode}`);
  }

  const divisor = 10 ** config.exponent;
  return amountMinor / divisor;
}

/**
 * Converts major units to minor units safely without floating point inaccuracies.
 * E.g. majorToMinor(2.99, 'USD') => 299
 */
export function majorToMinor(amountMajor: number, currencyCode: CurrencyCode): number {
  if (!Number.isFinite(amountMajor) || amountMajor < 0) {
    throw new TypeError(
      `Invalid amountMajor: expected a non-negative finite number, received ${amountMajor}`
    );
  }

  const config = SUPPORTED_CURRENCIES[currencyCode];
  if (!config) {
    throw new Error(`Unsupported currency code: ${currencyCode}`);
  }

  const multiplier = 10 ** config.exponent;
  return Math.round(amountMajor * multiplier);
}

export interface FormatOptions {
  /** Override the default formatting locale */
  locale?: string;
  /** Whether to show decimal places when they are .00 */
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Formats a minor-unit integer price into a localized currency string using Intl.NumberFormat.
 * Respects ISO standards and currency exponent rules.
 *
 * Example:
 * formatPrice(299, 'USD') => "$2.99"
 * formatPrice(19900, 'INR') => "₹199.00"
 */
export function formatCurrencyMinor(
  amountMinor: number,
  currencyCode: CurrencyCode = DEFAULT_CURRENCY,
  options?: FormatOptions
): string {
  if (!Number.isFinite(amountMinor) || amountMinor < 0) {
    return 'Price unavailable';
  }

  const safeCurrency: CurrencyCode = isSupportedCurrency(currencyCode)
    ? currencyCode
    : DEFAULT_CURRENCY;
  const config = SUPPORTED_CURRENCIES[safeCurrency];
  const majorValue = minorToMajor(amountMinor, safeCurrency);
  const locale = options?.locale ?? config.defaultLocale;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: safeCurrency,
      minimumFractionDigits: options?.minimumFractionDigits ?? config.exponent,
      maximumFractionDigits: options?.maximumFractionDigits ?? config.exponent,
    });
    return formatter.format(majorValue);
  } catch {
    // Graceful fallback in environments with missing ICU data
    return `${config.symbol}${majorValue.toFixed(config.exponent)}`;
  }
}
