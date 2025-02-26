import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    data: {
      scope: 'auth.login',
    },
  },
];
