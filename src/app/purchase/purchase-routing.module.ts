import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { EventAuthGuard } from '../../utils/EventAuthGuard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
