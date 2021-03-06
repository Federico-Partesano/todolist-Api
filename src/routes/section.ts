import express from "express";
import { moviesController } from "../controllers/movies";
import { workSpaceController } from "../controllers/workspace";
import { body, validationResult } from "express-validator";
import { validateType } from "../utils/invalidReq";
import { sectionController } from "../controllers/section";

const { getSections, getSectionsById, putSection, deleteSection } = sectionController;
const router = express.Router();

router.get("/", getSections);
router.get("/:id", getSectionsById);
router.put('/', putSection);
router.delete('/:id', deleteSection );

export default router;
