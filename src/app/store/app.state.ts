import { TaskState } from "../task/store/state/task.state";
import { SharedReducer } from "./Shared/shared.reducer";
import { SHARE_STATE_NAME } from "./Shared/shared.selector";
import { ShareState } from "./Shared/shared.state";

export interface AppState {
    [SHARE_STATE_NAME]: ShareState
}
export const AppReducer = {
    [SHARE_STATE_NAME]: SharedReducer
}