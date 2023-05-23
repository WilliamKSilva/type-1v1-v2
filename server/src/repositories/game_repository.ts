import { Client, PoolClient } from "pg";
import { Game } from "../models/game_model";

export interface IGameRepository {
  newGame(game: Partial<Game>): Promise<Game | null>;
}

export class GameRepository implements IGameRepository {
  constructor(private dbClient: PoolClient) {}

  public async newGame({
    name,
    player_one,
    player_two,
    uuid,
  }: Partial<Game>): Promise<Game | null> {
    const insertQuery = `INSERT INTO games (uuid, name, player_one, player_two) VALUES ($1, $2, $3, $4)`;
    const data = [uuid, name, player_one, player_two];
    const createdGame = await this.dbClient.query(insertQuery, data);

    return null;
  }
}
