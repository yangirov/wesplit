export function formatSum(sum: number) {
  return new Intl.NumberFormat('ru-RU').format(sum);
}

export function formatStatus(sum: number) {
  return sum !== 0 ? `${sum > 0 ? 'вам должны' : 'вы должны'}` : null;
}

export function formatDebtType(sum: number) {
  return sum > 0 ? 'positive' : sum < 0 ? 'negative' : !sum ? 'neutral' : '';
}
