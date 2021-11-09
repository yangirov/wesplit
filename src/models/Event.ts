export interface LocalEvent {
  id: string;
  organizer: string;
}

export interface Event {
  id: string;
  date: string;
  name: string;
  organizer: string;
  members: string[];
  purchases: Purchase[];
  rePayedDebts: RePayedDebt[];
}

export interface Purchase {
  id: string;
  name: string;
  payer: string;
  amount: number;
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

export interface EventAction {}
