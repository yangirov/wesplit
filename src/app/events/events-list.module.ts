import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListRoutingModule } from './events-list-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { EventsListComponent } from './events-list.component';
import { EventItemComponent } from './event-item/event-item.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

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
