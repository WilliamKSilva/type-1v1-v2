import { Pool } from "pg";

export const setupTables = async (pool: Pool) => {
  const client = await pool.connect();

  const gameTableCreationQuery =
    "CREATE TABLE games (uuid UUID PRIMARY KEY, name VARCHAR(100), player_one VARCHAR(50), player_two VARCHAR(50), created_at TIMESTAMP, updated_at TIMESTAMP)";

  const gameTableExistsQuery =
    "SELECT 1 FROM information_schema.tables WHERE table_name = 'games'";

  const gameTable = await client.query(gameTableExistsQuery);

  if (!gameTable) {
    await client.query(gameTableCreationQuery);
  }
};
