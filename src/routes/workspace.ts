import express from "express";
import { moviesController } from "../controllers/movies";
import { workSpaceController } from "../controllers/workspace";
import { body, validationResult } from "express-validator";
import { validateType } from "../utils/invalidReq";

const { getWorkspaces, putWorkSpace, deleteWorkSpace, getWorkspaceById } =
  workSpaceController;
const router = express.Router();

router.get("/", getWorkspaces);
router.put("/", validateType(), putWorkSpace);
router.delete("/", validateType(), deleteWorkSpace);
router.get("/:id", getWorkspaceById);

export default router;
