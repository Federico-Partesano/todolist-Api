import express from "express";
import cors from "cors";
import db from "./connection/db";
import axios from "axios";
import { ResponseMovies } from "./module/responseMovie";
import movies from "./routes/movies";
import workspace from "./routes/workspace";
import section from "./routes/section";
import socketio, { Socket } from "socket.io";
import http from "http";

const app = express();

app.use(cors());
app.options("*", cors() as any);

app.set("port", process.env.PORT || 3001);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/movies", movies);
app.use("/workspace", workspace);
app.use("/section", section);

// app.get("/", async (req, res) => {
//   const conn = await db();
//   const rows = await conn.query("SELECT * FROM text");
//   res.json(rows[0]);
// });

app.listen(3001, () => console.log("Server is running"));
export default app;
