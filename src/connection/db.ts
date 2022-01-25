import mysql, { Pool } from "mysql2/promise";

let globalPool: Pool | undefined = undefined;


const db = async (): Promise<Pool> => {
  if(globalPool) { return globalPool}
   globalPool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "trello",
    port: 8889,
    multipleStatements: true,
  });
  return globalPool;
}

export default db;
