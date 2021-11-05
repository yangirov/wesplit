export interface LocalEvents {
  [name: string]: string;
}

export interface Events {
  [events: string]: Event;
}

export interface Event {
  id?: string;
  purchases: Purchases;
  participants: string[];
  rePayedDebts: RePayedDebts;
}

export interface Purchases {
  [purchase: string]: Purchase;
}

export interface Purchase {
  id: string;
  name: string;
  payer: string;
  amount: number;
  participants: string[];
}

export interface RePayedDebts {
  [rePayedDebt: string]: number;
}

export interface ParticipantDebt {
  from: string;
  to: string;
  debt?: number;
  sum?: number;
}

export interface ParticipantsBalance {
  [participant: string]: number;
}

export interface EventAction {}
