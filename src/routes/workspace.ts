import express from "express";
import { moviesController } from "../controllers/movies";
import { workSpaceController } from "../controllers/workspace";
import { body, validationResult } from "express-validator";
import { validateType } from "../utils/invalidReq";

const { getWorkspaces, putWorkSpace, deleteWorkSpace } = workSpaceController;
const router = express.Router();

router.get("/", getWorkspaces);
router.put("/", validateType(), putWorkSpace);
router.delete("/", validateType(), deleteWorkSpace);

export default router;
