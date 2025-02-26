import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './base-elements/not-found-page/not-found-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events-list.module').then(m => m.EventsListModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./event/event-page.module').then(m => m.EventPageModule),
  },
  {
    path: 'events/:id/purchases',
    loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then(m => m.settingsRoutes),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
