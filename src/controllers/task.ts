import axios from "axios";
import { Request, Response } from "express";
import { Connection, ResultSetHeader } from "mysql2";
import db from "../connection/db";
import { Section } from "../module/responseSection";
export const taskController = {
  putTask: async (
    {
      body: { content, section_id, priority, description, date, labels },
    }: Request<{}, {}, Section>,
    res: Response
  ) => {
    try {
      const [{ insertId }] = await (
        await db()
      ).execute<ResultSetHeader>(
        "INSERT INTO task (content, section_id,date,priority, description,done) VALUES (?,?,?,?,?,?);",
        [content, section_id, date, priority, description, 0]
      );
      labels &&
        labels.forEach(async (element) => {
          await (
            await db()
          ).execute("INSERT INTO label (name,task_id) VALUES (?,?);", [
            element,
            insertId,
          ]);
        });

      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },

  deleteTask: async (
    { params: { id } }: Request<{ id: number }>,
    res: Response
  ) => {
    try {
      await (await db()).execute("DELETE FROM label WHERE task_id=?", [id]);

      const [rows, fields] = await (
        await db()
      ).execute("DELETE FROM task WHERE T_id=?", [id]);
      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },

  moveTask: async (
    { body: { section_id, T_id } }: Request<{}, {}, Section>,
    res: Response
  ) => {
    try {
      await (
        await db()
      ).execute<ResultSetHeader>(
        "UPDATE task SET   section_id =?  WHERE  T_id =?",
        [section_id, T_id]
      );

      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },

  changeDoneTask: async (
    { params: { id } }: Request<{ id: number }>,
    res: Response
  ) => {
    try {
      await (
        await db()
      ).execute<ResultSetHeader>("UPDATE task SET   done=1  WHERE  T_id =?", [
        id,
      ]);
      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },
};
