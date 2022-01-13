import mysql from "mysql2/promise";

const db = async () =>
  await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "trello",
    port: 8889,
    multipleStatements: true,
    connectionLimit: 100,
  });

export default db;
