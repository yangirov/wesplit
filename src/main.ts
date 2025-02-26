import { importProvidersFrom } from '@angular/core';
import { AuthModule } from '@angular/fire/auth';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app/app.component';
import { appInitializerProviders, firebaseProviders, localizationProviders } from './providers';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, MatSnackBarModule, AuthModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(appRoutes),
    ...localizationProviders,
    ...firebaseProviders,
    ...appInitializerProviders,
  ],
}).catch(err => console.error(err));
