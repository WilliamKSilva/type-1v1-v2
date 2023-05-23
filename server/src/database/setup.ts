import { Client } from "pg";

export function setupDB() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "dev",
  });

  return client;
}
