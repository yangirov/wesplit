import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPageRoutingModule } from './event-page-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DebtItemComponent } from './event-info/debts-tab/debt-item/debt-item.component';
import { DebtsTabComponent } from './event-info/debts-tab/debts-tab.component';
import { EventCheckComponent } from './event-info/debts-tab/event-check/event-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShareEventComponent } from './event-info/share-event/share-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { EmptyItemsModule } from '../empty-items/empty-items.module';
import { ActionsTabComponent } from './event-info/actions-tab/actions-tab.component';
import { ActionItemComponent } from './event-info/actions-tab/action-item/action-item.component';
import { ActionTypeComponent } from './event-info/actions-tab/action-type/action-type.component';
import { PurchasesTabComponent } from './event-info/purchases-tab/purchases-tab.component';
import { PurchaseItemComponent } from './event-info/purchases-tab/purchase-item/purchase-item.component';

@NgModule({
  declarations: [
    NewEventComponent,
    EventInfoComponent,
    DebtItemComponent,
    DebtsTabComponent,
    EventCheckComponent,
    ShareEventComponent,
    ActionsTabComponent,
    ActionItemComponent,
    ActionTypeComponent,
    PurchasesTabComponent,
    PurchaseItemComponent,
  ],
  imports: [
    CommonModule,
    EventPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    ClipboardModule,
    MatButtonModule,
    EmptyItemsModule,
  ],
})
export class EventPageModule {}
