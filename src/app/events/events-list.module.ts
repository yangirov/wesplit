import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListRoutingModule } from './events-list-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventsListComponent } from './events-list.component';
import { EventItemComponent } from './event-item/event-item.component';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseElementsModule } from '../base-elements/base-elements.module';

@NgModule({
  declarations: [EventsListComponent, EventItemComponent],
  imports: [
    CommonModule,
    EventsListRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BaseElementsModule,
  ],
})
export class EventsListModule {}
