import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    data: {
      scope: 'events-list',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsListRoutingModule {}
