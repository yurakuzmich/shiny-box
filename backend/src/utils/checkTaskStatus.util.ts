import { TaskStatus } from "../interface/task.interface";

export const checkTaskStatus = (status: TaskStatus) => {
    return Object.values(TaskStatus).includes(status);
}