import express from "express";
import { taskController } from "../controllers/task";

const { putTask, deleteTask, moveTask, changeDoneTask } = taskController;
const router = express.Router();

router.put("/", putTask);
router.delete("/:id", deleteTask);
router.post("/move", moveTask);
router.post("/done/:id", changeDoneTask);

export default router;
