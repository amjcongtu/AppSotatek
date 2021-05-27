import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import * as moment from "moment";
import * as _ from "lodash";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    private toaster: Toaster
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
  addItem = () => {
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
      this.dataTask.push(this.model);
      // sort data descending dueDate
      this.dataTask = _.orderBy(this.dataTask, ['date'], ['desc']);
      this.dataTaskOrigin = _.clone(this.dataTask)
      // clear model begin add
      this.clearModel();
      // default value begin add
      this.defaultValue();
      // untouch form begin add
      this.editForm.markAsUntouched();
      this.editForm.markAsPristine();
      // alert('Add success!')
      this.toaster.open({ text: 'Add success', duration: 4000, type: 'primary' });
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
  // funcion search
  searchListEnter = (e: any, text: any) => {
    setTimeout(() => {
      if (e.keyCode === 13) {
        if (!text) {
          this.dataTask = this.dataTaskOrigin;
        } else {
          this.dataTask = _.filter(this.dataTaskOrigin, (item:any) => {
            return text.toLowerCase().indexOf(item.name.toLowerCase()) > -1
          });
        }
      }
    }, 200)
  }
  // funcion view detail
  showDetail = (id: any) => {
    let index = _.findIndex(this.dataTask,  (item:any) => {
      return item.id === id;
    });
    if (index > -1) {
      this.dataTask[index].show = true;
    }
  }
  // funcion remove
  removeTask = (id: any) => {
    let index = _.findIndex(this.dataTask,  (item:any) => {
      return item.id === id;
    })
    this.dataTask.splice(index, 1);
  }
  // checkbox
  changeCheckBox(e: any) {
    const lstChecked: FormArray = this.editForm.get('lstChecked') as FormArray;
    // checked
    if (e.target.checked) {
      lstChecked.push(new FormControl(e.target.value));
    } else {
      // unchecked
      let i: number = 0;
      lstChecked.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          lstChecked.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.lstDeleteIds = lstChecked && lstChecked.value ? lstChecked.value : null;
    this.flagShowBulk = this.lstDeleteIds && this.lstDeleteIds.length > 0 ? true : false;
  };
  // remove item begin checked
  removeItem() {
    for (let i = 0; i < this.lstDeleteIds.length; i++) {
      let index = _.findIndex(this.dataTask,  (ele:any) => {
        return ele.id == this.lstDeleteIds[i]
      });
      if (index > -1) {
        this.dataTask.splice(index, 1);
      }
    }
  };
  // update data
  updateData = (data: any, id: any) => {
    let dateNow = moment().format('DD/MM/YYYY');
    let dueDate = moment(data.date).format('DD/MM/YYYY')
    let index = _.findIndex(this.dataTask, (item:any) => {
      return item.id === id
    });
    if (index > -1) {
      if (!this.dataTask[index].name) {
        this.toaster.open({ text: 'Task has required!', duration: 2000, type: 'danger' });
        return;
      }
      else if (moment(dueDate, 'DD/MM/YYYY').isBefore(moment(dateNow, 'DD/MM/YYYY'))) {
        this.toaster.open({ text: 'Due date greater than or equal to current date in position!', duration: 2000, type: 'warning' });
        return;
      }
      else {
        this.dataTask[index].name = data.name;
        this.dataTask[index].title = data.name;
        this.dataTask[index].description = data.description;
        this.dataTask[index].date = data.date;
        this.dataTask[index].piority = data.piority;
        this.toaster.open({ text: 'Update success', duration: 2000, type: 'success' });
      }
    }
  }
}
export class Work {
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  date?: any;
  piority?: any
};