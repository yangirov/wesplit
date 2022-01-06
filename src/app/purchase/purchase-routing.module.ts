import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';

const routes: Routes = [
  {
    path: 'new',
    component: PurchaseFormComponent,
    data: {
      scope: 'purchase.new',
    },
  },
  {
    path: ':purchaseId/edit',
    component: PurchaseFormComponent,
    data: {
      isEdit: true,
      scope: 'purchase.edit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
