import { createFeatureSelector, createSelector } from "@ngrx/store";

const taskFeature = createFeatureSelector("task");
export const getAllTask = createSelector(taskFeature, (data: any) => {
    return data.tasks;
});
export const getTaskById = createSelector(taskFeature, (data: any, id: any) => {
    const item = data.task.find((ele: any) => ele.id == id);
    return item;
})  