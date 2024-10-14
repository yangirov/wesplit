import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TranslocoRootModule,
    AuthModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
