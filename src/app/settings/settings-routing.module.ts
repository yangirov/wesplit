import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsFormComponent } from './settings-form/settings-form.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsFormComponent,
    data: {
      scope: 'settings',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
