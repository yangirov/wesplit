import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsPageRoutingModule } from './events-page-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatInputModule } from '@angular/material/input';
import { EventsListComponent } from './events-list/events-list.component';
import { MatButtonModule } from '@angular/material/button';
import { EventsPageComponent } from './events-page.component';
import { EventsListItemComponent } from './events-list-item/events-list-item.component';

@NgModule({
  declarations: [FeedbackComponent, EventsPageComponent, EventsListComponent, EventsListItemComponent],
  imports: [
    CommonModule,
    EventsPageRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EventsPageModule {}
