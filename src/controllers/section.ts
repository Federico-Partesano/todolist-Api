import axios from "axios";
import { Request, Response } from "express";
import { Connection, RowDataPacket } from "mysql2";
import db from "../connection/db";
import { ResponseMovies } from "../module/responseMovie";
import { invalidType } from "../utils/invalidReq";
import { body, validationResult } from "express-validator";
import { Console } from "console";
import { Section } from "../module/responseSection";
import { stringify } from "querystring";
import { arrayUniqueSection, formattedSections } from "../utils/funtions";
export const sectionController = {
  getSections: async (_: Request, res: Response) => {
    const [rows, fields] = await (
      await db()
    ).query<Section[]>(
      "SELECT * FROM section LEFT JOIN task ON section.id=task.section_id WHERE task.done=0"
    );
    const nameSections = arrayUniqueSection(rows);

    const finalArr = formattedSections(nameSections, rows);

    res.json(finalArr);
  },

  getSectionsById: async ({ params: { id } }: Request, res: Response) => {
    if (!id) {
      return res.json({ error: "insert valid id" });
    }
    const [rows, fields] = await (
      await db()
    ).execute("SELECT * FROM section WHERE section.id = ?", [id]);
    console.log(id);
    res.json(rows);
  },

  putSection: async ({ body: { nameSection, workspaceName } }: Request, res: Response) => {
    if (!nameSection || !workspaceName) {
      return res.json({ error: "insert valid credentials" });
    }
    try{
    const [rows, fields] = await (
      await db()
    ).execute("INSERT INTO section (S_name, workspace_name) VALUES (?,?);", [nameSection, workspaceName]);

    
    res.json({message: 'success'});
    } catch(e){
      res.json({message: e})
    }

  },

  deleteSection: async (
    {
      params: { id },
    }: Request<{ id: number }>,
    res: Response
  ) => {
    try {
      await (
        await db()
      ).execute("DELETE FROM section WHERE id=?", [id]);
      res.json({ message: "success" });
    } catch (e) {
      res.json({ message: e });
    }
  },


};
