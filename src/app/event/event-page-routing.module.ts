import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { EventInfoComponent } from './event-info/event-info.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewEventComponent,
  },
  {
    path: ':id',
    component: EventInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
