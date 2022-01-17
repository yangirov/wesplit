import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventLoginComponent } from './event-login/event-login.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { QrCodeComponent } from './event-info/qr-code/qr-code.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'new',
    component: EventFormComponent,
    canActivate: [AuthGuard],
    data: {
      scope: 'event.new',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: ':id/edit',
    component: EventFormComponent,
    canActivate: [AuthGuard],
    data: {
      isEdit: true,
      scope: 'event.edit',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: ':id',
    component: EventInfoComponent,
    data: {
      scope: 'event',
    },
  },
  {
    path: ':id/login',
    component: EventLoginComponent,
    data: {
      scope: 'event.invite',
    },
  },
  {
    path: ':id/qr',
    component: QrCodeComponent,
    data: {
      scope: 'event.qrCode',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
