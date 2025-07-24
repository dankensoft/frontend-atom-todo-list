import { Routes } from '@angular/router';
import { TasksComponent } from '../pages/tasks/tasks/tasks.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TasksComponent,
    title: 'Dashboard',
  },
];
