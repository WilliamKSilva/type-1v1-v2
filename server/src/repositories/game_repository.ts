import { Client, PoolClient } from "pg";
import { Game, GameType } from "../models/game_model";
import { GameFast } from "../models/game_fast_model";
import { GameRegular } from "../models/game_regular_model";

export interface IGameRepository {
  newGame(game: Partial<Game>): Promise<Game | null>;
}

export class GameRepository implements IGameRepository {
  constructor(private dbClient: PoolClient) { }

  public async newGame({
    name,
    uuid,
    type,
  }: Partial<Game>): Promise<Game | null> {
    const insertQuery = `INSERT INTO games (uuid, name, type) VALUES ($1, $2, $3)`;
    const data = [uuid, name, type];
    await this.dbClient.query(insertQuery, data);
    const selectQuery = `SELECT * FROM games WHERE uuid = $1`;

    const createdGame = (
      await this.dbClient.query(selectQuery, [uuid])
    ).rows.at(0);

    const game = new Game(
      createdGame.uuid,
      createdGame.name,
      createdGame.type,
      createdGame.created_at,
      createdGame.updated_At
    );

    return game;
  }

  // Sim, eu poderia separar isso em um repositorio especifico mas eu
  // acho que pelo tamanho do projeto nao faz muito sentido :P
  public async newGameFast({
    uuid,
    player_one_name,
    game_uuid
  }: Partial<GameFast>): Promise<GameFast | null> {
    const insertQuery = `INSERT INTO game_fast (uuid, player_one_name, game_id) VALUES ($1, $2, $3)`;
    const data = [uuid, player_one_name, game_uuid];
    await this.dbClient.query(insertQuery, data);
    const selectQuery = `SELECT * FROM game_fast WHERE uuid = $1`;

    const createdGameFast = (
      await this.dbClient.query(selectQuery, [uuid])
    ).rows.at(0);

    const gameFast = new GameFast(
      createdGameFast.uuid,
      createdGameFast.player_one_name,
      null,
      createdGameFast.game_uuid,
      createdGameFast.created_at,
      createdGameFast.updated_At
    );

    return gameFast;
  }

  public async newGameRegular({
    uuid,
    player_one_uuid,
    game_uuid
  }: Partial<GameRegular>): Promise<GameRegular | null> {
    const insertQuery = `INSERT INTO game_regular (uuid, player_one_uuid, game_id) VALUES ($1, $2, $3)`;
    const data = [uuid, player_one_uuid, game_uuid];
    await this.dbClient.query(insertQuery, data);
    const selectQuery = `SELECT * FROM game_regular WHERE uuid = $1`;

    const createdGameRegular = (
      await this.dbClient.query(selectQuery, [uuid])
    ).rows.at(0);

    const gameRegular = new GameRegular(
      createdGameRegular.uuid,
      createdGameRegular.player_one_uuid,
      null,
      createdGameRegular.game_uuid,
      createdGameRegular.created_at,
      createdGameRegular.updated_At
    );

    return gameRegular;
  }
}