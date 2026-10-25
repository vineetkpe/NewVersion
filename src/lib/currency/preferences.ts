import { DEFAULT_CURRENCY, isSupportedCurrency } from '../../data/currencies';
import type { CurrencyCode, CurrencyPreference } from './types';

export const CURRENCY_STORAGE_KEY = 'hostamble_preferred_currency';
export const CURRENCY_CHANGE_EVENT = 'hostamble:currency-change';

/**
 * Reads and validates the user's currency preference from localStorage.
 * If running on server or storage is unavailable or value is invalid, returns the configured default currency.
 */
export function getSavedCurrencyPreference(): CurrencyPreference {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { currency: DEFAULT_CURRENCY, source: 'default' };
  }

  try {
    const raw = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (raw && isSupportedCurrency(raw)) {
      return { currency: raw, source: 'stored' };
    }
  } catch {
    // LocalStorage might be disabled or restricted by user privacy settings
  }

  return { currency: DEFAULT_CURRENCY, source: 'default' };
}

/**
 * Safely persists the selected currency to localStorage and dispatches a DOM event.
 * Rejects invalid currencies and returns false on failure.
 */
export function setSavedCurrencyPreference(currency: CurrencyCode): boolean {
  if (!isSupportedCurrency(currency)) {
    console.warn(`[HostAmble] Attempted to set unsupported currency: ${currency}`);
    return false;
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch {
      // LocalStorage might be full or private browsing active
    }

    // Broadcast change to all listening UI components on the page
    try {
      const event = new CustomEvent(CURRENCY_CHANGE_EVENT, {
        detail: { currency },
        bubbles: true,
      });
      window.dispatchEvent(event);
    } catch {
      // CustomEvent fallback for legacy environments
    }
  }

  return true;
}
