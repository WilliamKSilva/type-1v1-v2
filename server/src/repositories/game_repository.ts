import { Game } from "../models/game_model";

export interface IGameRepository {
  newGame(game: Game): Promise<Game | null>;
}

export class GameRepository implements IGameRepository {
  public async newGame(game: Game): Promise<Game | null> {
    return null;
  }
}
