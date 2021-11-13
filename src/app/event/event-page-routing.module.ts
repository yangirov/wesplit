import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { EventInfoComponent } from './event-info/event-info.component';

const routes: Routes = [
  {
    path: 'new',
    component: EventFormComponent,
  },
  {
    path: ':id/edit',
    data: { isEdit: true },
    component: EventInfoComponent,
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
