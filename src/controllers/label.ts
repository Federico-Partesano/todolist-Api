import axios from "axios";
import { Request, Response } from "express";
import { Connection } from "mysql2";
import db from "../connection/db";
import { Label } from "../module/responseAllLabels";
import { Section } from "../module/responseSection";
export const labelController = {
  getLabels: async (_: Request, res: Response) => {
    try {
      const [rows, fields] = await (
        await db()
      ).query<Label[]>("SELECT name FROM `label` GROUP BY name");
      res.json(rows);
    } catch (e) {
      res.json({ message: e });
    }
  },

  getLabelsById: async ({ params: { name } }: Request, res: Response) => {
    if (!name) {
      return res.json({ error: "insert valid name" });
    }
    const [rows, fields] = await (
      await db()
    ).execute(
      "SELECT * FROM task inner join label on task.T_id= label.task_id where label.name like ?",
      [name]
    );
    console.log(name);
    res.json(rows);
  },

  putLabel: async (
    {
      body: { content, section_id, priority, description, date },
    }: Request<{}, {}, Section>,
    res: Response
  ) => {
    try {
      const [rows, fields] = await (
        await db()
      ).execute(
        "INSERT INTO task (content, section_id,date,priority, description,done) VALUES (?,?,?,?,?,?);",
        [content, section_id, date, priority, description, 0]
      );

      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },
};
