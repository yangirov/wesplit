import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPageRoutingModule } from './event-page-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';


@NgModule({
  declarations: [
    NewEventComponent,
    EditEventComponent
  ],
  imports: [
    CommonModule,
    EventPageRoutingModule
  ]
})
export class EventPageModule { }
