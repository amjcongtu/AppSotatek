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
        task: [...state.task, data.task]
    }
}),
on(TaskAction.updateTask, (state: any, data: any) => {
    const post = state.posts.map((ele: any) => {
        return ele.id == data.value.id ? data.value : ele;
    })
    return {
        ...state,
        posts: post
    }
}),
on(TaskAction.deleteTask, (state: any, data: any) => {
    const posts = state.posts.filter((ele: any) => {
        return ele.id !== data.id
    })
    return {
        ...state,
        posts: posts
    }
})
)
export function TaskReducer(state: any, action: any) {
  return _taskReducer(state, action);
};