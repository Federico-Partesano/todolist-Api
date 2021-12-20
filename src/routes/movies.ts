import express from "express";
import { moviesController } from "../controllers/movies";
const { searchMovie } = moviesController;
const router = express.Router();

router.get("/", searchMovie);

export default router;
