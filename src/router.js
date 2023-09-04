import { Router } from "express";
const router = Router();
import {
  getAll,
  createTask,
  deleteTask,
  updateTask,
} from "./controllers/taskController";
import { validadeBody } from "./middlewares/tasksMiddlewares";

// router.get("/tasks", getAll);
// router.post("/tasks", validadeBody, createTask);
// router.delete("/tasks/:id", deleteTask);
// router.put("/tasks/:id", updateTask);

export default router;
