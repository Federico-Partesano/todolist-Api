import express from "express";
import cors from "cors";
import db from "./connection/db";
import axios from "axios";
import { ResponseMovies } from "./module/responseMovie";
import movies from "./routes/movies";
import socketio, { Socket } from "socket.io";
import http from "http";
const app = express();
app.set("port", process.env.PORT || 3001);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new socketio.Server(server);

app.use("/movies", movies);

app.get("/ciao", (_, res) => {
  console.log("ciao");

  res.json({ message: "ciao" });
});

io.on("connection", function (socket: socketio.Socket) {
  console.log("a user connected");
});

// app.get("/", async (req, res) => {
//   const conn = await db();
//   const rows = await conn.query("SELECT * FROM text");
//   res.json(rows[0]);
// });

app.listen(3001, () => console.log("Server is running"));
export default app;
