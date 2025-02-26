import { Routes } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { EventAuthGuard } from '../../utils/EventAuthGuard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const purchaseRoutes: Routes = [
  {
    path: 'new',
    component: PurchaseFormComponent,
    canActivate: [EventAuthGuard],
    data: {
      scope: 'purchase.new',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: ':purchaseId/edit',
    component: PurchaseFormComponent,
    canActivate: [EventAuthGuard],
    data: {
      isEdit: true,
      scope: 'purchase.edit',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];
