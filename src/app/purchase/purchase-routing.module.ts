import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';

const routes: Routes = [
  {
    path: 'new',
    component: PurchaseFormComponent,
  },
  {
    path: ':purchaseId/edit',
    data: { isEdit: true },
    component: PurchaseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
