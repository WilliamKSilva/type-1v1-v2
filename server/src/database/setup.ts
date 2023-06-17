import { Pool } from "pg";

export function setupDB() {
  const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "dev",
  });

  migrate(pool);

  return pool;
}

const migrate = async (pool: Pool) => {
  try {
    // TODO concatenate to make this readeble!
    await pool.query('CREATE TABLE IF NOT EXISTS games (uuid VARCHAR(100) PRIMARY KEY, name VARCHAR(80) NOT NULL, type VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now());');
    await pool.query('CREATE TABLE IF NOT EXISTS users (uuid VARCHAR(100) PRIMARY KEY, name VARCHAR(80) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now());');
    await pool.query('CREATE TABLE IF NOT EXISTS games_fast (uuid VARCHAR(100) PRIMARY KEY, player_one_name VARCHAR(100), player_two_name VARCHAR(100), game_uuid VARCHAR(255) REFERENCES games(uuid) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now());');
    await pool.query('CREATE TABLE IF NOT EXISTS games_regular (uuid VARCHAR(100) PRIMARY KEY, player_one_uuid VARCHAR(100) REFERENCES users(uuid), player_two_uuid VARCHAR(100) REFERENCES users(uuid), game_uuid VARCHAR(255) REFERENCES games(uuid) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT now(), updated_at TIMESTAMP DEFAULT now());');
  } catch(error) {
    console.log(error);
  }
}