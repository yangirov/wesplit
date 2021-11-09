import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsPageRoutingModule } from './events-page-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventsPageComponent } from './events-page.component';
import { EventsListItemComponent } from './events-list-item/events-list-item.component';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmptyItemsModule } from '../empty-items/empty-items.module';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [
    FeedbackComponent,
    EventsPageComponent,
    EventsListItemComponent,
  ],
  imports: [
    CommonModule,
    EventsPageRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    EmptyItemsModule,
    SpinnerModule,
  ],
})
export class EventsPageModule {}
