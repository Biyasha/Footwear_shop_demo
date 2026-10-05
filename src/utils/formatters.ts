import { Currency } from '../types';
import { CURRENCY_CONFIGS } from '../data/products';

export function formatPrice(amountInUSD: number, currency: Currency = 'USD'): string {
  const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.USD;
  const converted = Math.round(amountInUSD * config.rate);
  return `${config.symbol}${converted}`;
}

export function convertSize(usSize: number, targetUnit: 'US' | 'EU' | 'UK'): string {
  if (targetUnit === 'US') {
    return usSize % 1 === 0 ? usSize.toFixed(0) : usSize.toFixed(1);
  }
  if (targetUnit === 'UK') {
    const uk = usSize - 0.5;
    return uk % 1 === 0 ? uk.toFixed(0) : uk.toFixed(1);
  }
  // EU approximate mapping
  const euMapping: Record<number, string> = {
    7.0: '40',
    7.5: '40.5',
    8.0: '41',
    8.5: '42',
    9.0: '42.5',
    9.5: '43',
    10.0: '44',
    10.5: '44.5',
    11.0: '45',
    11.5: '45.5',
    12.0: '46',
    13.0: '47.5',
  };
  return euMapping[usSize] || `${Math.round(usSize + 33)}`;
}
