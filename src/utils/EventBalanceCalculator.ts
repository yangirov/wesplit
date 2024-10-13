import { EventDto, MemberBalance, MemberDebt } from '../models/Event';

export function getEventBalance(currentEvent: EventDto): MemberBalance[] {
  const balanceMap = new Map<string, number>();

  // Process purchases
  currentEvent.purchases?.forEach(purchase => {
    const members = purchase.members || [];
    const purchaseSum = Number(purchase.sum);
    const share = purchaseSum / members.length;

    members.forEach(member => {
      const memberBalance = balanceMap.get(member) || 0;
      const delta = (member === purchase.payer ? purchaseSum : 0) - share;
      balanceMap.set(member, memberBalance + delta);
    });

    if (!members.includes(purchase.payer)) {
      // If the payer is not among the members, they cover the entire sum
      const payerBalance = balanceMap.get(purchase.payer) || 0;
      balanceMap.set(purchase.payer, payerBalance + purchaseSum);
    }
  });

  // Process rePayedDebts
  currentEvent.rePayedDebts?.forEach(rePayedDebt => {
    const memberBalance = balanceMap.get(rePayedDebt.name) || 0;
    balanceMap.set(rePayedDebt.name, memberBalance + (rePayedDebt.sum || 0));
  });

  // Prepare balance array and compute total positive and negative sums
  const balanceArray: MemberBalance[] = [];
  let totalPositive = 0;
  let totalNegative = 0;

  balanceMap.forEach((sum, name) => {
    // Truncate decimals towards zero
    const truncatedSum = sum < 0 ? Math.ceil(sum) : Math.floor(sum);
    balanceMap.set(name, truncatedSum);
    balanceArray.push({ name, sum: truncatedSum });

    if (truncatedSum < 0) {
      totalNegative += truncatedSum;
    } else {
      totalPositive += truncatedSum;
    }
  });

  // Adjust balances to make total sum zero
  let sumDiff = totalPositive + totalNegative;

  if (sumDiff !== 0) {
    for (const member of balanceArray) {
      if (sumDiff <= 0) break;
      if (member.sum < 0) {
        member.sum -= 1;
        sumDiff -= 1;
      }
    }
  }

  return balanceArray;
}

export function getEventsMembersDebts(
  membersBalance: MemberBalance[],
  event: EventDto
): MemberDebt[] {
  const balanceMap = new Map<string, number>();
  membersBalance.forEach(({ name, sum }) => {
    balanceMap.set(name, sum);
  });

  const debts: MemberDebt[] = [];

  for (const lender of event.members) {
    let lenderBalance = balanceMap.get(lender) || 0;
    if (lenderBalance <= 0) continue;

    for (const payer of event.members) {
      if (lenderBalance <= 0) break;
      if (lender === payer) continue;

      let payerBalance = balanceMap.get(payer) || 0;
      if (payerBalance >= 0) continue;

      const debtAmount = Math.min(lenderBalance, -payerBalance);

      if (debtAmount > 0) {
        debts.push({
          from: payer,
          to: lender,
          sum: -debtAmount,
        });

        // Update balances
        lenderBalance -= debtAmount;
        balanceMap.set(lender, lenderBalance);

        payerBalance += debtAmount;
        balanceMap.set(payer, payerBalance);
      }
    }
  }

  return debts;
}
