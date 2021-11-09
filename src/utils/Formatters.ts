export default function sumFormat(sum: number) {
  return new Intl.NumberFormat('ru-RU').format(sum);
}

export function formatStatus(sum: number) {
  if (sum === 0) return null;
  return `${sum > 0 ? 'вам должны' : 'вы должны'}`;
}
