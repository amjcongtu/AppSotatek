import { createFeatureSelector, createSelector } from "@ngrx/store";

const taskFeature = createFeatureSelector("task");
export const getAllTask = createSelector(taskFeature, (data: any) => {
    console.log(1212,data);
    return data
});
export const getTaskById = createSelector(taskFeature, (data: any, id: any) => {
    const item = data.task.find((ele: any) => ele.id == id);
    console.log('item',item);
    return item;
})  