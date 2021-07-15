import { Routes } from '@angular/router';
export const AppRoutes: Routes = [
  {
    path: 'task',
    children: [{
        path: '',
        loadChildren: './task/task.module#TaskModule'
    }],
},
];
export class AppRoutingModule { }
