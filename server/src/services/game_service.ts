import { NewGameData } from "../controllers/game_controller";
import { Game } from "../models/game_model";
import { v4 as uuidv4 } from "uuid";
import { GameRepository } from "../repositories/game_repository";

export interface IGameService {
  newGame: (gameData: NewGameData) => Promise<Game | null>;
}

export class GameService implements IGameService {
  constructor(private gameRepository: GameRepository) {}

  public async newGame(gameData: NewGameData): Promise<Game | null> {
    const uuid = uuidv4();

    const game = {
      uuid,
      ...gameData,
    };

    const createdGame = this.gameRepository.newGame(game);

    return createdGame;
  }
}
