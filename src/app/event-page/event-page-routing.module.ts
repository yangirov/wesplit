import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewEventComponent,
  },
  {
    path: ':id',
    component: EditEventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
