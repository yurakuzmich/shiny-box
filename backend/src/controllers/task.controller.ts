import { Request, Response } from 'express';
import { Task, TaskStatus } from '../interface';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../models';
import { ApiAnswer } from '../token/ApiAnswer';
import { handleApiError } from '../utils';
import { AppError } from '../token/AppError';

export const getAllTasks = (req: Request, res: Response) => {
    try {
        const filter = req.query.status as TaskStatus | undefined;
        const tasks = getTasks(filter);
        const apiAnswer = new ApiAnswer(true, "Tasks fetched successfully", tasks);
        res.status(200).json(apiAnswer);
    } catch (error) {
        handleApiError(error, "Error fetching tasks", 500);
    }
};

export const getTask = (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = getTaskById(taskId);
        if (!task) {
            throw new AppError("Task not found", 404, { id: taskId });
        }
        const apiAnswer = new ApiAnswer(true, "Task fetched successfully", task);
        res.status(200).json(apiAnswer);
    } catch (error) {
        handleApiError(error, "Error fetching task", 500);
    }
};

export const addTask = (req: Request, res: Response) => {
    try {
        const newTask: Task = req.body;
        const task = createTask(newTask);
        const apiAnswer = new ApiAnswer(true, "Task created successfully", task);
        res.status(201).json(apiAnswer);
    } catch (error) {
        handleApiError(error, "Error creating task", 500);
    }
};

export const modifyTask = (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const taskData: Task = req.body;
        const updatedTask = updateTask(taskId, taskData);
        
        if (!updatedTask) {
            throw new AppError("Task not found", 404, { id: taskId });
        }

        const apiAnswer = new ApiAnswer(true, "Task updated successfully", updatedTask);
        
        res.status(200).json(apiAnswer);
    } catch (error) {
        handleApiError(error, "Error updating task", 500);
    }
};

export const removeTask = (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const deletedTask = deleteTask(taskId);
        
        if (!deletedTask) {
            throw new AppError("Task not found", 404, { id: taskId });
        }

        const apiAnswer = new ApiAnswer(true, "Task deleted successfully", deletedTask);
        
        res.status(200).json(apiAnswer);
    } catch (error) {
        handleApiError(error, "Error deleting task", 500);
    }
};
