import { Router } from "express";
import { getAllTasks, getTask, addTask, modifyTask, removeTask } from "../controllers";

export const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", addTask);
taskRouter.put("/:id", modifyTask);
taskRouter.delete("/:id", removeTask);
