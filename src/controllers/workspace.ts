import axios from "axios";
import { Request, Response } from "express";
import { Connection } from "mysql2";
import db from "../connection/db";
import { ResponseMovies } from "../module/responseMovie";
import { invalidType } from "../utils/invalidReq";
import { body, validationResult } from "express-validator";
export const workSpaceController = {
  getWorkspaces: async (_: Request, res: Response) => {
    const [rows, fields] = await (
      await db()
    ).query("SELECT * FROM `workspace`");
    res.json(rows);
  },
  putWorkSpace: async (req: Request, res: Response) => {
    const { name, type }: { name: string; type: "list" | "board" } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (type !== "list" && type !== "board") {
      return res.json({ message: "Invalid type: insert list or board" });
    }
    try {
      const [rows, fields] = await (
        await db()
      ).execute("INSERT INTO workspace (name, type) VALUES (?,?);", [
        name,
        type,
      ]);

      const [rows2, fields2] = await (
        await db()
      ).execute("INSERT INTO section (name, workspace_name) VALUES (?,?);", [
        name,
        name,
      ]);

      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },

  deleteWorkSpace: async (
    {
      body: { name, type },
    }: Request<{}, {}, { name: string; type: "list" | "board" }>,
    res: Response
  ) => {
    try {
      const [rows, fields] = await (
        await db()
      ).execute("    DELETE FROM workspace WHERE name=? AND type=?;", [
        name,
        type,
      ]);
      res.json({ message: rows });
    } catch (e) {
      res.json({ message: e });
    }
  },
};
