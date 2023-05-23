import { GameController } from "./controllers/game_controller";
import { GameRepository } from "./repositories/game_repository";
import { GameService } from "./services/game_service";

export const NewGameFactory = (): GameController => {
  const gameRepository = new GameRepository();
  const gameService = new GameService(gameRepository);
  const gameController = new GameController(gameService);

  return gameController;
};
