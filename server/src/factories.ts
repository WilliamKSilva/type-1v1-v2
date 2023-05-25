import { PoolClient } from "pg";
import { GameController } from "./controllers/game_controller";
import { GameRepository } from "./repositories/game_repository";
import { GameService } from "./services/game_service";
import { Server } from "socket.io";
import { GameWebSocketService } from "./services/game_websocket_service";

export const NewGameFactory = (pool: PoolClient): GameController => {
  const gameRepository = new GameRepository(pool);
  const gameService = new GameService(gameRepository);
  const gameController = new GameController(gameService);

  return gameController;
};

export const NewGameWebSocketFactory = (io: Server): GameWebSocketService => {
  const gameWebSocketService = new GameWebSocketService(io);

  return gameWebSocketService;
};
