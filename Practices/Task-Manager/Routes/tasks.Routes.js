import express from 'express';
import { createTask, deleteTask, getAllTask, getByTitle, getTaskById, updateTask, getPostsPaginationandFiltering } from '../Controllers/Task.Controller.js';

const router = express.Router();

// router.get("/tasks",getAllTask);

// router.get("/tasks/:title",getByTitle);

router.get("/tasks/:id",getTaskById);

router.put("/tasks/:id",updateTask);

router.delete("/tasks/:id",deleteTask);

router.get("/tasks",getPostsPaginationandFiltering);

router.post("/tasks",createTask);

export const TasksRouter = router;