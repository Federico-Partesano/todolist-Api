import { RowDataPacket } from "mysql2";

export interface Section extends RowDataPacket {
  id: number;
  S_name: string;
  workspace_name: string;
  content: string;
  T_id?: number;
  section_id?: number;
  date?: Date;
  priority?: number;
  done?: number;
  description?: string;
  labels?: string[];
}
