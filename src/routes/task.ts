import express from "express";
import { taskController } from "../controllers/task";

const { putTask, deleteTask, moveTask, changeDoneTask, getTodayTasks, getTodayExpiredTasks } = taskController;
const router = express.Router();

router.get('/today', getTodayTasks);
router.get('/expired', getTodayExpiredTasks);

router.put("/", putTask);
router.delete("/:id", deleteTask);
router.post("/move", moveTask);
router.post("/done/", changeDoneTask);

export default router;
