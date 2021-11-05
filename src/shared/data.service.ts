import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventAction, Events, Purchase } from '../models/Event';
import { Feedback } from '../models/Feedback';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
} from '@angular/fire/firestore';
import { getLocalEvents } from '../utils/LocalStorageEvents';
import { docData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  readEvents(): Events {
    const localEvents = getLocalEvents();
    const result: Events = {};

    Object.keys(localEvents).map(async (eventId) => {
      this.loadEvent(eventId).subscribe((event) => {
        result[eventId] = event;
      });
    });

    return result;
  }

  saveEvent(event: Event) {
    const ref = collection(this.firestore, 'events');
    return addDoc(ref, event);
  }

  updateEvent(event: Event) {
    const ref = doc(this.firestore, `events/${event.id}`);
    return updateDoc(ref, event);
  }

  loadEvent(eventId: string): Observable<Event> {
    const ref = doc(this.firestore, `events/${eventId}`);
    return docData(ref, { idField: 'id' }) as Observable<Event>;
  }

  addPurchase(eventId: string, data: Purchase) {
    const ref = collection(this.firestore, 'purchase');
    return addDoc(ref, data);
  }

  addEventAction(eventId: string, data: EventAction) {
    const ref = collection(this.firestore, `events/${eventId}/actions`);
    return addDoc(ref, data);
  }

  changePurchase(eventId: string, purchaseId: string, purchase: Purchase) {
    const ref = doc(
      this.firestore,
      `events/${eventId}/purchases/${purchaseId}`
    );
    return setDoc(ref, purchase);
  }

  repayDebt(eventId: string, sum: number, name: string) {
    const ref = doc(this.firestore, `events/${eventId}/repayedDebts/${name}`);
    return setDoc(ref, { sum });
  }

  deletePurchase(eventId: string, purchaseId: string) {
    const purchaseRef = doc(
      this.firestore,
      `events/${eventId}/purchases/${purchaseId}`
    );
    return deleteDoc(purchaseRef);
  }

  fetchUpdateParticipants(eventId: string, participantsList: number[]) {
    const ref = doc(this.firestore, `events/${eventId}/participants`);
    return setDoc(ref, participantsList);
  }

  saveFeedback(feedback: Feedback) {
    const feedbackCollection = collection(this.firestore, 'feedbacks');
    return addDoc(feedbackCollection, feedback);
  }
}
