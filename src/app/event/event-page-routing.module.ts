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
      title: 'Новое событие',
    },
  },
  {
    path: ':id/edit',
    component: EventFormComponent,
    data: {
      isEdit: true,
      title: 'Редактирование события',
    },
  },
  {
    path: ':id',
    component: EventInfoComponent,
  },
  {
    path: ':id/login',
    component: EventLoginComponent,
    data: {
      title: 'Приглашение',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
