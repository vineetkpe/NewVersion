export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface CurrencyConfig {
  readonly code: CurrencyCode;
  readonly name: string;
  readonly symbol: string;
  /**
   * The number of decimal digits after the decimal separator.
   * E.g., 2 for USD/INR/EUR (cents/paise), 0 for JPY.
   * Used to calculate major unit = minor unit / (10 ^ exponent).
   */
  readonly exponent: number;
  readonly subUnitName: string;
  readonly defaultLocale: string;
  /**
   * Optional formatting flags
   */
  readonly displaySymbolFirst?: boolean;
}

export type CurrencyMap = Record<CurrencyCode, CurrencyConfig>;

export interface CurrencyPreference {
  currency: CurrencyCode;
  source: 'stored' | 'default';
}
