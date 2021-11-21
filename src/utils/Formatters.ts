import { DebtTypes } from '../models/Event';

export function formatSum(sum: number) {
  return sum
    .toString()
    .split('')
    .reverse()
    .map((char, index) => {
      let result = char;
      if (index !== 0 && index % 3 === 0) {
        result += ' ';
      }
      return result;
    })
    .reverse()
    .join('');
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
