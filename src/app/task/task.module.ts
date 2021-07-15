import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './add/task-add.component';
import { TaskEditComponent } from './edit/task-edit.component';
import { TaskListComponent } from './list/task-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TaskReducer } from './store/reducer/task.reducer';

const routes: Routes = [
  
  {
    path: 'list',
    component: TaskListComponent
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent
  },
  {
    path: 'add',
    component: TaskAddComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature("task", TaskReducer),
  ],
  declarations: [TaskListComponent,TaskEditComponent,TaskAddComponent],
  providers: []
})
export class TaskModule { }
  