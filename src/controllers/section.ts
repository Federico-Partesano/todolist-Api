import axios from "axios";
import { Request, Response } from "express";
import { Connection } from "mysql2";
import db from "../connection/db";
import { ResponseMovies } from "../module/responseMovie";
import { invalidType } from "../utils/invalidReq";
import { body, validationResult } from "express-validator";
import { Console } from "console";
export const sectionController = {
  getSections: async (_: Request, res: Response) => {
    const [rows, fields] = await (await db()).query("SELECT * FROM `section`");

    res.json(rows);
  },

  getSectionsByWorkSpace: async ({ query: { id } }: Request, res: Response) => {
    if (!id) {
      return res.json({ error: "insert valid id" });
    }
    const [rows, fields] = await (
      await db()
    ).execute("SELECT * FROM section WHERE section.workspace_name = ?", [id]);
    console.log(id);
    res.json(rows);
  },
};
