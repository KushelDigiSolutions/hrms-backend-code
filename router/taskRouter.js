import { Router } from "express";

import isAuthenticated from "../middleware/auth.js";
import {
  deleteTask,
  getTasks,
  postTask,
  updateTask,
} from "../controller/TaskController.js";

const router = Router();

router.post("/postTask", isAuthenticated, postTask);

router.put("/updateTask/:id", isAuthenticated, updateTask);

router.get("/getTasks", isAuthenticated, getTasks);

router.delete("/deleteTask/:id", isAuthenticated, deleteTask);

export default router;
