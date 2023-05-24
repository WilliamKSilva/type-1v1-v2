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
    await this.dbClient.query(insertQuery, data);
    const selectQuery = `SELECT * FROM games WHERE uuid = $1`;

    const createdGame = (
      await this.dbClient.query(selectQuery, [uuid])
    ).rows.at(0);

    const game = new Game(
      createdGame.uuid,
      createdGame.name,
      createdGame.player_one,
      createdGame.player_two,
      createdGame.created_at,
      createdGame.updated_At
    );

    return game;
  }
}
