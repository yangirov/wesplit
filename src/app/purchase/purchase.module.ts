import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';

@NgModule({
  declarations: [PurchaseFormComponent],
  imports: [CommonModule, PurchaseRoutingModule],
})
export class PurchaseModule {}
