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

export function formatDebtType(sum: number) {
  return sum > 0 ? 'positive' : sum < 0 ? 'negative' : !sum ? 'neutral' : '';
}
