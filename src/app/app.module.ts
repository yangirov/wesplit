import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgcCookieConsentConfig } from 'ngx-cookieconsent/service';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain,
  },
  palette: {
    popup: {
      background: 'var(--dark-grey)',
    },
    button: {
      background: '#3f51b5',
    },
  },
  theme: 'classic',
  type: 'opt-out',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    HttpClientModule,
    TranslocoRootModule,
    AuthModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
