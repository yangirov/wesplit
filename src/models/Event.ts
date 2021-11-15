export interface LocalEvent {
  id: string;
  organizer: string;
}

export interface Event {
  id: string;
  date: number;
  name: string;
  organizer: string;
  members: string[];
  purchases: Purchase[];
  rePayedDebts: RePayedDebt[];
  actions?: EventAction[];
}

export interface Purchase {
  title: string;
  payer: string;
  sum: number;
  members: string[];
}

export interface RePayedDebt {
  name: string;
  sum?: number;
}

export interface MemberDebt {
  from: string;
  to: string;
  sum?: number;
}

export interface MemberBalance {
  name: string;
  sum: number;
}

export interface EventMember {
  name: string;
}

export interface PurchaseMember {
  name: string;
  selected: boolean;
}

export interface EventAction {
  type: ActionTypes;
  date: number;
  currentUser?: string;
  eventMembersCount?: number;
  memberName?: string;
  sum?: number;
  debtSum?: number;
  purchaseName?: string;
  payerName?: string;
  purchaseMembersCount?: number;
  eventName?: string;
  manager?: string;
}

export enum ActionTypes {
  CreateEvent,
  ChangeEventName,
  ChangeEventDate,
  AddMemberToEvent,
  AddMembersToEvent,
  RemoveMemberFromEvent,
  AddPurchase,
  DeletePurchase,
  AddMembersToPurchase,
  AddMemberToPurchase,
  RemoveMemberFromPurchase,
  GiveBackPartially,
  GiveBack,
}
