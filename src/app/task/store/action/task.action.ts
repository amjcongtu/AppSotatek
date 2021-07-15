import { createAction,props } from "@ngrx/store";
import { Work } from "src/model/Work";
export const addTask = createAction("addTask", props<{ task: Work }>());
export const updateTask = createAction("updateTask", props<{ task: Work }>());
export const deleteTask = createAction("deleteTask", props<{ id?: any }>());
