export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done"
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}