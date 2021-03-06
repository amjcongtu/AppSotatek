import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SotatekService } from "src/service/app.service";
import { Toaster } from 'ngx-toast-notifications';
import * as moment from "moment";
import * as _ from "lodash";
import { Work } from 'src/model/Work';
import {Store} from '@ngrx/store';
import {TaskState} from '../store/reducer/task.reducer';
import { addTask } from '../store/action/task.action';
import { Router } from '@angular/router';
@Component({
  selector: 'task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  // declare variable
  public title = 'sotatek-test';
  public flagSetDefaultPiory: boolean = true;
  public editForm: FormGroup;
  public model: Work = new Work();
  public flagShowDetail: boolean = false;
  public flagCheckBox: boolean = false;
  public flagDisabledUpdate: boolean = false;
  public flagShowBulk: boolean = false;
  public search = {
    text: null
  };
  // declare dropdownlist
  public lstDeleteIds: any = [];
  public lstPiorty = [
    {
      id: 1,
      code: "LOW",
      name: "LOW",
    },
    {
      id: 2,
      code: "NORMAL",
      name: "NORMAL",
    },
    {
      id: 3,
      code: "HIGH",
      name: "HIGH",
    }
  ];
  // declare data
  public dataTask: Array<any> = [];
  public dataTaskOrigin: Array<any> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private el: ElementRef,
    private toaster: Toaster,
    private router: Router,
    private _sotatekService: SotatekService,
    private store: Store<TaskState>

  ) {
    //formGroup
    this.editForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      description: [""],
      date: [""],
      piority: [""],
      lstChecked: this._formBuilder.array([])
    });
  };
  ngOnInit(): void {
    this.defaultValue();
  };
  // add Task
  addTask = () : void => {
    if (!this.editForm.valid) {
      // focus field required
      for (const key of Object.keys(this.editForm.controls)) {
        if (this.editForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector(
            '[formcontrolname="' + key + '"]'
          );
          if (invalidControl) {
            if (invalidControl.querySelector("input")) {
              invalidControl.querySelector("input").focus();
            } else {
              invalidControl.focus();
            }
            break;
          }
        }
      }
      this.editForm.markAsUntouched();
      this.editForm.markAsPristine();
      return;
    } else {
      // fake id
      this.model.id = Math.floor(Math.random() * Math.floor(99999));
      this.model.title = this.model.name;
      this._sotatekService.model.next({
        data: this.model
      });
      // clear model begin add
      this.clearModel();
  
      // alert('Add success!')
      this.toaster.open({ text: 'Add success', duration: 4000, type: 'primary' });
      const taskObject: Work = {
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        piority: this.editForm.value.piority,
        date: moment(this.editForm.value.date).format("DD/MM/YYYY"),
      }
      this.store.dispatch(addTask({ task: taskObject }));
      // default value begin add
      this.editForm.markAsUntouched();
      this.editForm.markAsPristine();
      // untouch form begin add
      this.defaultValue();
      // this.router.navigate(["/list"]);
    }
  };
  //funcion default value
  defaultValue = () => {
    setTimeout(() => {
      this.model.date = moment().format('YYYY-MM-DD');
      this.model.piority = 'NORMAL';
      const control = this.el.nativeElement.querySelector(
        '[formcontrolname="name"]'
      );
      if (control) {
        if (control.querySelector("input")) {
          control.querySelector("input").focus();
        } else {
          control.focus();
        }
      }
    }, 200)
  };
  //funcion validate date change input
  checkDueDate = () => {
    let inValidDueDate: any;
    let dateNow = moment().format('DD/MM/YYYY');
    let dueDate = moment(this.model.date).format('DD/MM/YYYY')
    //check duedate
    if (moment(dueDate, 'DD/MM/YYYY').isBefore(moment(dateNow, 'DD/MM/YYYY'))) {
      if (!inValidDueDate) {
        inValidDueDate = {};
      }
      inValidDueDate['errDueDate'] = true;
      this.editForm.get('date')?.markAsTouched();
      this.editForm.get('date')?.setErrors(inValidDueDate);
    }
  };
  // funcion clear model
  clearModel() {
    this.model = new Work();
  }
}