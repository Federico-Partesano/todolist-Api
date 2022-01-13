import { RowDataPacket } from "mysql2";
import { Section } from "./responseSection";

export interface WorkSpace extends RowDataPacket {
  name: string;
  type: string;
}
