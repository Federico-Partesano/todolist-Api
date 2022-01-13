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

// app.get("/", async (req, res) => {
//   const conn = await db();
//   const rows = await conn.query("SELECT * FROM text");
//   res.json(rows[0]);
// });

interface Circle {
  radius: number; //property
  (x: number, y: number): void; //function declaration
  display(b: boolean): void; //method
  sum(x: number, y: number): number;
  [state: string]: any; //indexer
  [index: number]: any;
}

let c = function (x: number, y: number) {
  console.log(`center position: (${x}, ${y})`);
};
let circle: Circle = c as Circle; //type assertion on right side

circle.display = function (d: boolean) {
  console.log("circle displayed: " + d);
};
circle.sum = function (x: number, y: number) {
  return x + y;
};

circle["state"] = "ciao";
circle["prova"] = "pr";
circle.radius = 10;

console.log(circle);

app.listen(3001, () => console.log("Server is running"));
export default app;
