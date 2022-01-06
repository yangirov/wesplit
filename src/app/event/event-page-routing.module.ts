import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventLoginComponent } from './event-login/event-login.component';

const routes: Routes = [
  {
    path: 'new',
    component: EventFormComponent,
    data: {
      scope: 'event.new',
    },
  },
  {
    path: ':id/edit',
    component: EventFormComponent,
    data: {
      isEdit: true,
      scope: 'event.edit',
    },
  },
  {
    path: ':id',
    component: EventInfoComponent,
    data: {
      scope: 'event',
    },
  },
  {
    path: ':id/login',
    component: EventLoginComponent,
    data: {
      scope: 'event.invite',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
