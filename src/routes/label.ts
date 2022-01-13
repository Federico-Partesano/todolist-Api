import express from "express";
import { labelController } from "../controllers/label";
import {} from "../controllers/task";

const { putLabel, getLabels, getLabelsById } = labelController;
const router = express.Router();

router.get("/", getLabels);
router.get("/:name", getLabelsById);
router.put("/", putLabel);

export default router;
