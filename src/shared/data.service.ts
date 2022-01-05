import { Injectable } from '@angular/core';
import {
  Event,
  EventDto,
  EventAction,
  Purchase,
  RePayedDebt,
} from '../models/Event';
import { getLocalEvents, setLocalEvents } from './local-storage.service';
import { Feedback } from '../models/Feedback';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  docData,
  collectionData,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { map, mergeMap, take } from 'rxjs/operators';
import { forkJoin, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getCurrentUser(eventId: string) {
    return getLocalEvents().find((x) => x.id === eventId)?.organizer || '';
  }

  setEventUser(eventId: string, member: string) {
    setLocalEvents(eventId, member);
  }

  getEvents(): Observable<EventDto> {
    const localEvents = getLocalEvents();
    return from(localEvents).pipe(mergeMap((x) => this.getEventById(x.id)));
  }

  getEventById(eventId: string): Observable<EventDto> {
    const ref = doc(this.firestore, `events/${eventId}`);

    return forkJoin({
      event: (docData(ref, { idField: 'id' }) as Observable<Event>).pipe(
        take(1)
      ),
      purchases: this.getPurchases(eventId).pipe(
        map((items) => items.sort((a, b) => b.date - a.date)),
        take(1)
      ),
      actions: this.getActions(eventId).pipe(
        map((items) => items.sort((a, b) => a.date - b.date)),
        take(1)
      ),
      rePayedDebts: this.getRePayedDebts(eventId).pipe(take(1)),
    }).pipe(
      map((x) => ({
        ...x.event,
        purchases: x.purchases,
        actions: x.actions,
        rePayedDebts: x.rePayedDebts,
      }))
    );
  }

  addEvent(event: Event) {
    const ref = collection(this.firestore, 'events');
    return addDoc(ref, event);
  }

  updateEvent(event: Event) {
    const ref = doc(this.firestore, `events/${event.id}`);
    return updateDoc(ref, event);
  }

  getPurchases(eventId: string) {
    const ref = collection(this.firestore, `events/${eventId}/purchases`);
    return collectionData(ref, { idField: 'id' }) as Observable<Purchase[]>;
  }

  addPurchase(eventId: string, purchase: Purchase) {
    const ref = collection(this.firestore, `events/${eventId}/purchases`);
    return addDoc(ref, purchase);
  }

  updatePurchase(eventId: string, purchaseId: string, purchase: Purchase) {
    const ref = doc(
      this.firestore,
      `events/${eventId}/purchases/${purchaseId}`
    );
    return updateDoc(ref, purchase);
  }

  deletePurchase(eventId: string, purchaseId: string) {
    const purchaseRef = doc(
      this.firestore,
      `events/${eventId}/purchases/${purchaseId}`
    );
    return deleteDoc(purchaseRef);
  }

  getActions(eventId: string) {
    const ref = collection(this.firestore, `events/${eventId}/actions`);
    return collectionData(ref, { idField: 'id' }) as Observable<EventAction[]>;
  }

  addEventAction(eventId: string, eventAction: EventAction) {
    const ref = collection(this.firestore, `events/${eventId}/actions`);
    return addDoc(ref, eventAction);
  }

  getRePayedDebts(eventId: string) {
    const ref = collection(this.firestore, `events/${eventId}/rePayedDebts`);
    return collectionData(ref, { idField: 'id' }) as Observable<RePayedDebt[]>;
  }

  async updateRePayedDebt(eventId: string, rePayedDebt: RePayedDebt) {
    const ref = collection(this.firestore, `events/${eventId}/rePayedDebts`);
    const findDebtQuery = query(ref, where('name', '==', rePayedDebt.name));
    const rePayedDebtExists = await getDocs(findDebtQuery);

    if (rePayedDebtExists.empty) {
      return addDoc(ref, rePayedDebt);
    }

    return rePayedDebtExists.forEach((debt) => {
      const oldDebtId = debt.id;
      const oldDebt = debt.data() as RePayedDebt;

      if (oldDebt.sum && rePayedDebt.sum) {
        rePayedDebt.sum += oldDebt.sum;
      }

      const debtRef = doc(
        this.firestore,
        `events/${eventId}/rePayedDebts/${oldDebtId}`
      );

      return updateDoc(debtRef, rePayedDebt);
    });
  }

  async addFeedback(feedback: Feedback) {
    const feedbackCollection = collection(this.firestore, 'feedbacks');
    return await addDoc(feedbackCollection, feedback);
  }
}
