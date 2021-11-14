import { Injectable } from '@angular/core';
import { ActionTypes, EventAction, Event } from '../models/Event';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class EventActionService {
  constructor(private dataService: DataService) {}

  async createEventAction(eventId: string, action: EventAction) {
    await this.dataService.addEventAction(eventId, action);
  }

  changeEventName(
    currentUser: string,
    eventName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      eventName,
      date,
      type: ActionTypes.ChangeEventName,
    };
  }

  changeEventDate(currentUser: string, date: number): EventAction {
    return {
      currentUser,
      date,
      type: ActionTypes.ChangeEventDate,
    };
  }

  addMemberToEvent(
    currentUser: string,
    memberName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      memberName,
      date,
      type: ActionTypes.AddMemberToEvent,
    };
  }

  removeMemberFromEvent(
    currentUser: string,
    memberName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      memberName,
      date,
      type: ActionTypes.RemoveMemberFromEvent,
    };
  }

  addPurchase(
    currentUser: string,
    purchaseName: string,
    sum: number,
    date: number
  ): EventAction {
    return {
      currentUser,
      purchaseName,
      sum,
      date,
      type: ActionTypes.AddPurchase,
    };
  }

  deletePurchase(
    currentUser: string,
    purchaseName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      purchaseName,
      date,
      type: ActionTypes.DeletePurchase,
    };
  }

  addMemberToPurchase(
    currentUser: string,
    payerName: string,
    purchaseName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      payerName,
      purchaseName,
      date,
      type: ActionTypes.AddMemberToPurchase,
    };
  }

  addMembersToPurchase(
    currentUser: string,
    purchaseMembersCount: number,
    purchaseName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      purchaseMembersCount,
      purchaseName,
      date,
      type: ActionTypes.AddMembersToPurchase,
    };
  }

  removeMemberFromPurchase(
    currentUser: string,
    payerName: string,
    purchaseName: string,
    date: number
  ): EventAction {
    return {
      currentUser,
      payerName,
      purchaseName,
      date,
      type: ActionTypes.RemoveMemberFromPurchase,
    };
  }

  giveBackPartially(
    currentUser: string,
    payerName: string,
    debtSum: number,
    date: number
  ): EventAction {
    return {
      currentUser,
      payerName,
      debtSum,
      date,
      type: ActionTypes.GiveBackPartially,
    };
  }

  giveBack(
    currentUser: string,
    payerName: string,
    debtSum: number,
    date: number
  ): EventAction {
    return {
      currentUser,
      payerName,
      debtSum,
      date,
      type: ActionTypes.GiveBack,
    };
  }
}
