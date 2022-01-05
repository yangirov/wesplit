import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    data: {
      title: 'События',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsListRoutingModule {}
