import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPageRoutingModule } from './event-page-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DebtItemComponent } from './edit-event/debt-tab/debt-item/debt-item.component';
import { DebtTabComponent } from './edit-event/debt-tab/debt-tab.component';
import { EventCheckComponent } from './edit-event/debt-tab/event-check/event-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShareEventComponent } from './edit-event/share-event/share-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { EmptyItemsModule } from '../empty-items/empty-items.module';

@NgModule({
  declarations: [
    NewEventComponent,
    EditEventComponent,
    DebtItemComponent,
    DebtTabComponent,
    EventCheckComponent,
    ShareEventComponent,
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
