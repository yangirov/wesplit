import { Event, MemberDebt, MemberBalance } from '../models/Event';

function getIndex(acc: Array<{ name: string }>, name: string) {
  const index = acc.findIndex((x) => x.name === name);
  return index !== -1 ? index : acc.length;
}

export function getEventBalance(event: Event): MemberBalance[] {
  const balance: MemberBalance[] = [];

  event?.purchases?.forEach((purchase) => {
    purchase.members.forEach((memberName) => {
      const memberIndex = getIndex(balance, memberName);
      const debt = memberName === purchase.payer && purchase.sum;

      if (!balance[memberIndex]) {
        balance[memberIndex] = { name: memberName, sum: 0 };
      }

      balance[memberIndex].sum +=
        Number(debt) - purchase.sum / purchase.members.length;
    });

    const payerIndex = getIndex(balance, purchase.payer);
    if (!purchase.members.includes(purchase.payer)) {
      balance[payerIndex].sum += purchase.sum;
    }
  });

  let positiveSum = 0;
  let negativeSum = 0;

  balance.forEach((member, memberIndex) => {
    if (!balance[memberIndex]) {
      balance[memberIndex] = { name: member.name, sum: 0 };
    }

    const rePayedMemberIndex = getIndex(event.rePayedDebts, member.name);
    balance[memberIndex].sum +=
      (event.rePayedDebts.length &&
        event.rePayedDebts[rePayedMemberIndex]?.sum) ||
      0;

    if (balance[memberIndex]?.sum % 1 !== 0) {
      const pointPosition = balance[memberIndex].sum
        .toString()
        .split('')
        .indexOf('.');

      balance[memberIndex].sum = parseFloat(
        balance[memberIndex].sum
          .toString()
          .split('')
          .slice(0, pointPosition)
          .join('')
      );
    }

    if (balance[memberIndex].sum < 0) {
      negativeSum += balance[memberIndex].sum;
    } else {
      positiveSum += balance[memberIndex].sum;
    }
  });

  let sumDiff = positiveSum + negativeSum;

  balance.forEach((member, memberIndex) => {
    if (balance[memberIndex].sum < 0 && sumDiff > 0) {
      balance[memberIndex].sum -= 1;
      sumDiff--;
    }
  });

  return balance;
}

export function getEventsMembersDebts(
  balance: MemberBalance[],
  event: Event
): MemberDebt[] {
  return event?.members?.reduce((acc, lender) => {
    const lenderIndex = getIndex(balance, lender);

    if (!balance[lenderIndex]) {
      balance[lenderIndex] = { name: lender, sum: 0 };
    }

    if (balance[lenderIndex].sum > 0) {
      event?.members?.forEach((payer) => {
        const payerIndex = getIndex(balance, payer);

        if (!balance[payerIndex]) {
          balance[payerIndex] = { name: payer, sum: 0 };
        }

        if (balance[payerIndex].sum < 0) {
          const debt =
            (balance[lenderIndex].sum + balance[payerIndex].sum >= 0 &&
              balance[payerIndex].sum) ||
            balance[payerIndex].sum -
              (balance[lenderIndex].sum + balance[payerIndex].sum);

          if (debt) {
            acc.push({
              from: payer,
              to: lender,
              sum: debt,
            });
          }

          balance[payerIndex].sum -= debt;
          balance[lenderIndex].sum += debt;
        }
      });
    }

    return acc;
  }, Array<MemberDebt>());
}
