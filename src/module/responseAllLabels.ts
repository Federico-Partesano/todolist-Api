import { RowDataPacket } from "mysql2";

export interface Label extends RowDataPacket {
  name: string;
}
