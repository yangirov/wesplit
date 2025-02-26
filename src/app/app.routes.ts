import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './base-elements/not-found-page/not-found-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.routes').then(m => m.landingRoutes),
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.routes').then(m => m.eventsRoutes),
  },
  {
    path: 'events',
    loadChildren: () => import('./event/event.routes').then(m => m.eventRoutes),
  },
  {
    path: 'events/:id/purchases',
    loadChildren: () => import('./purchase/purchase.routes').then(m => m.purchaseRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes').then(m => m.loginRoutes),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then(m => m.settingsRoutes),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.routes').then(m => m.feedbackRoutes),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
