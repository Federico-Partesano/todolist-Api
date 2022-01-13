import axios from "axios";
import { Request, Response } from "express";
import { Connection } from "mysql2";
import db from "../connection/db";
import { ResponseMovies } from "../module/responseMovie";
import { invalidType } from "../utils/invalidReq";
import { body, validationResult } from "express-validator";
import { arrayUniqueSection, formattedSections } from "../utils/funtions";
import { Section } from "../module/responseSection";
import { WorkSpace } from "../module/responseWorkSpace";
export const workSpaceController = {
  getWorkspaces: async (_: Request, res: Response) => {
    const [rows, fields] = await (
      await db()
    ).query("SELECT * FROM `workspace`");
    res.json(rows);
  },

  getWorkspaceById: async ({ params: { id } }: Request, res: Response) => {
    const [rows, fields] = await (
      await db()
    ).execute<WorkSpace[]>("SELECT * FROM `workspace` WHERE workspace.name=?", [
      id,
    ]);

    const [rowsSections, fieldsSections] = await (
      await db()
    ).execute<Section[]>(
      "SELECT * FROM section LEFT JOIN task ON section.id=task.section_id WHERE section.workspace_name=? ",
      [id]
    );

    const nameSections = arrayUniqueSection(rowsSections);

    const finalArr = formattedSections(nameSections, rowsSections);

    res.json({ ...rows[0], sections: finalArr });
  },

  putWorkSpace: async (req: Request, res: Response) => {
    const { name, type }: { name: string; type: "list" | "board" } = req.body;
    console.log(name, type);
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
      ).execute("INSERT INTO section (S_name, workspace_name) VALUES (?,?);", [
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
      await (
        await db()
      ).execute("DELETE FROM workspace WHERE name=? AND type=?;", [name, type]);
      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },
};
