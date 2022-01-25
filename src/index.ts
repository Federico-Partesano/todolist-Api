import express from "express";
import cors from "cors";
import db from "./connection/db";
import axios from "axios";
import { ResponseMovies } from "./module/responseMovie";
import movies from "./routes/movies";
import workspace from "./routes/workspace";
import section from "./routes/section";
import task from "./routes/task";
import label from "./routes/label";

const app = express();

app.use(cors());
app.options("*", cors() as any);

app.set("port", process.env.PORT || 3001);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/movies", movies);
app.use("/workspace", workspace);
app.use("/section", section);
app.use("/task", task);
app.use("/label", label);


app.listen(3001, () => console.log("Server is running"));
export default app;
