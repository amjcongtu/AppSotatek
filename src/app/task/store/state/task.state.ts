import { Work } from "src/model/Work";

export interface TaskState {
    tasks: Work[]
}
export const initialStateTask: any = {
    tasks: [
        {
            id: 1,
            name: 'test',
            date:"12/06/2021",
            piority:"HIGH",
            description:"hi"
        },
        {
            id: 2,
            name: 'test',
            date:"12/12/2021",
            piority:"LOW",
            description:"hello"
        }
    ]
};