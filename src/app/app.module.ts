import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MomentPipe } from '../shared/moment.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventPageModule } from './event-page/event-page.module';
import { FeedbackModule } from './feedback/feedback.module';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent, MomentPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EventPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FeedbackModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
