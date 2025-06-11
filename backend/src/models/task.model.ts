import { Task, TaskStatus } from "../interface";
import * as fs from 'fs';
import * as path from 'path';
import crypto from 'crypto';
import { AppError } from '../token/AppError';
import { checkTaskDueDate, checkTaskStatus } from "../utils";

const tasksFilePath = path.join(__dirname, '../data/tasks.json');

const readTasks = (): Task[] => {
    try {
        if (!fs.existsSync(tasksFilePath)) {
            fs.writeFileSync(tasksFilePath, '[]', 'utf8');
            return [];
        }
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('Error reading tasks file:', error);
        throw new AppError('Error reading tasks file', 500, { error });
    }
};

const writeTasks = (tasks: Task[]): void => {
    try {
        const cleanedTasks = tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate
        }));
        fs.writeFileSync(tasksFilePath, JSON.stringify(cleanedTasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks file:', error);
        throw new AppError('Error writing tasks file', 500, { error });
    }
};

export const getTasks = (filter?: TaskStatus): Task[] => {
    const tasks = readTasks();
    if (filter) {
        return tasks.filter(task => task.status === filter);
    }
    return tasks;
};

export const getTaskById = (id: string): Task | null => {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return null;
    }
    return task;
};

export const createTask = (task: Task): Task => {
    const tasks = readTasks();
    const status = checkTaskStatus(task.status) ? task.status : TaskStatus.ToDo;
    const dueDate = checkTaskDueDate(task.dueDate) ? task.dueDate : new Date().toISOString();
    const newTask = { ...task, status, dueDate, id: crypto.randomUUID() };
    tasks.push(newTask);
    writeTasks(tasks);
    return newTask;
};

export const updateTask = (id: string, taskData: Task): Task | null=> {
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
        return null;
    }

    const status = taskData.status && checkTaskStatus(taskData.status) ? taskData.status : tasks[index].status;
    const dueDate = taskData.dueDate && checkTaskDueDate(taskData.dueDate) ? taskData.dueDate : tasks[index].dueDate;
    
    tasks[index] = { ...tasks[index], ...taskData, status, dueDate };
    writeTasks(tasks);
    return tasks[index];
};

export const deleteTask = (id: string): Task | null => {
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
        return null;
    }
    
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    writeTasks(tasks);
    return deletedTask;
};