import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SotatekService } from "src/service/app.service";
import { Toaster } from 'ngx-toast-notifications';
import * as moment from "moment";
import * as _ from "lodash";
import { Work } from 'src/model/Work';
import { Data } from '../const';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getAllTask, getTaskById } from '../store/selector/task.selector';
import { Observable } from 'rxjs';
import { deleteTask } from '../store/action/task.action';
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  // declare variable
  public title = 'List';
  public data : Array<Work> = [];
  task!: Observable<Array<any>>;
  constructor(private store: Store,
    private router: Router) { 
    }
  ngOnInit(): void {
    this.task = this.store.select(getAllTask);
  };
  getById(data: any) {
    this.router.navigate([`/edit/${data.id}`]);
  }
  delete(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
};