import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
];
