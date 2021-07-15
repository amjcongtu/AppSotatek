import { Routes } from '@angular/router';

export const TaskRoutes: Routes = [
  {
    path: 'add',
    loadChildren: './task-add/task-ad.module#TaskModule'
  },
];
