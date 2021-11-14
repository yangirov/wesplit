import {
  ActionTypes,
  EventAction,
  Purchase,
  RePayedDebt,
} from '../../../../../models/Event';

export const purchases: Purchase[] = [
  {
    id: '3',
    title: 'Пиво',
    payer: 'Эмиль',
    sum: 1000,
    members: ['Эмиль', 'Диана', 'Глеб', 'Даша', 'Дима'],
  },
  {
    id: '3',
    title: 'Бургеры',
    payer: 'Диана',
    sum: 1000,
    members: ['Эмиль', 'Диана', 'Глеб', 'Даша', 'Дима'],
  },
  {
    id: '3',
    title: 'Аренда дома',
    payer: 'Глеб',
    sum: 5000,
    members: ['Эмиль', 'Диана', 'Глеб', 'Даша', 'Дима'],
  },
];

export const rePayedDebts: RePayedDebt[] = [
  { name: 'Эмиль', sum: 1000 },
  { name: 'Дима', sum: 500 },
  { name: 'Даша', sum: 750 },
  { name: 'Даша', sum: 750 },
];

export const actions: EventAction[] = [
  {
    type: ActionTypes.AddPurchase,
    currentUser: 'Эмиль',
    date: 1636389685329,
    purchaseName: 'Пиво',
    sum: 1000,
  },
  {
    type: ActionTypes.AddMembersToPurchase,
    currentUser: 'Эмиль',
    date: 1636389685330,
    purchaseName: 'Пиво',
    eventMembersCount: 4,
  },
  {
    type: ActionTypes.AddPurchase,
    currentUser: 'Диана',
    date: 1636389705277,
    purchaseName: 'Аренда боулинга',
    sum: 2000,
  },
  {
    type: ActionTypes.AddMembersToPurchase,
    currentUser: 'Эмиль',
    date: 1636389705278,
    purchaseName: 'Аренда боулинга',
    eventMembersCount: 4,
  },
  {
    type: ActionTypes.GiveBack,
    currentUser: 'Эмиль',
    date: 1636389738105,
    debtSum: 250,
    payerName: 'Даша',
  },
  {
    type: ActionTypes.GiveBack,
    currentUser: 'Даша',
    date: 1636399418983,
    debtSum: 500,
    payerName: 'Диана',
  },
];
