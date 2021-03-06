import {Action, createReducer, on} from '@ngrx/store';
import * as TaskAction from '../action/task.action'
import { Work } from 'src/model/Work';
import {initialStateTask} from "../state/task.state"
export const customerFeatureKey = 'customer';
export interface TaskState {
  task: Work[];
}
const _taskReducer = createReducer(
    initialStateTask,
  on(TaskAction.addTask, (state: any, data: any) => {
    return {
        task: [...state.tasks, data.task]
    }
}),
on(TaskAction.updateTask, (state: any, data: any) => {
    const post = state.tasks.map((ele: any) => {
        return ele.id == data.value.id ? data.value : ele;
    })
    return {
        ...state,
        tasks: post
    }
}),
on(TaskAction.deleteTask, (state: any, data: any) => {
    const tasks = state.tasks.filter((ele: any) => {
        return ele.id !== data.id
    })
    return {
        ...state,
        tasks: tasks
    }
})
)
export function TaskReducer(state: any, action: any) {
  return _taskReducer(state, action);
};