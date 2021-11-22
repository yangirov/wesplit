import { DebtTypes } from '../models/Event';

export function formatSum(sum: number) {
  return new Intl.NumberFormat('ru-RU').format(sum);
}

export function formatStatus(sum: number) {
  return sum !== 0 ? `${sum > 0 ? 'вам должны' : 'вы должны'}` : null;
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
