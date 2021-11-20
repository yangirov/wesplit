import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PurchaseFormComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseElementsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
})
export class PurchaseModule {}
