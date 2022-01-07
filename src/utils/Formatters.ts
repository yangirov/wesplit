import { DebtTypes } from '../models/Event';

export function formatSum(lang: string, sum: number) {
  return new Intl.NumberFormat(convertLang(lang)).format(sum);
}

export function formatDebtType(sum: number): DebtTypes {
  return sum > 0
    ? DebtTypes.Positive
    : sum < 0
    ? DebtTypes.Negative
    : !sum
    ? DebtTypes.Neutral
    : DebtTypes.Other;
}

export function convertLang(lang: string) {
  switch (lang) {
    case 'ru':
      return 'ru-RU';
    case 'en':
      return 'en-GB';
      break;
    default:
      return 'ru-RU';
  }
}
