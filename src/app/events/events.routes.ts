import { Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const eventsRoutes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    canActivate: [AuthGuard],
    data: {
      scope: 'events-list',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];
