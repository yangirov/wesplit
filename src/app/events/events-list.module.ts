import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListRoutingModule } from './events-list-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { EventsListComponent } from './events-list.component';
import { EventItemComponent } from './event-item/event-item.component';
import { MatListModule as MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [EventsListComponent, EventItemComponent],
  imports: [
    CommonModule,
    EventsListRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BaseElementsModule,
    TranslocoModule,
  ],
})
export class EventsListModule {}
