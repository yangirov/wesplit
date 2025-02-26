import { Routes } from '@angular/router';
import { SettingsFormComponent } from './settings-form/settings-form.component';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsFormComponent,
    data: {
      scope: 'settings',
    },
  },
];
