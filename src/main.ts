import { importProvidersFrom } from '@angular/core';
import { AuthModule } from '@angular/fire/auth';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app/app.component';
import { appInitializerProviders, firebaseProviders, localizationProviders } from './providers';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, MatSnackBarModule, AuthModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    ...localizationProviders,
    ...firebaseProviders,
    ...appInitializerProviders,
  ],
}).catch(err => console.error(err));
