import { Client, Pool } from "pg";

export function setupDB() {
  const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "dev",
  });

  return pool;
}
