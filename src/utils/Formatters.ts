import { DebtTypes } from '../models/Event';

export function formatSum(currentLang: string, sum: number) {
  return new Intl.NumberFormat(convertLang(currentLang)).format(sum);
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

export function convertLang(currentLang: string) {
  switch (currentLang) {
    case 'ru':
      return 'ru-RU';
    case 'en':
      return 'en-GB';
      break;
    default:
      return 'ru-RU';
  }
}
