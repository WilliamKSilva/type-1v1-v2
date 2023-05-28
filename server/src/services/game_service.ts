import { NewGameData, UpdateGameData } from "../controllers/game_controller";
import { Game, GameType } from "../models/game_model";
import { v4 as uuidv4 } from "uuid";
import { GameRepository } from "../repositories/game_repository";
import { GameFast } from "../models/game_fast_model";
import { GameRegular } from "../models/game_regular_model";

export interface IGameService {
  newGame: (gameData: NewGameData) => Promise<Game | null>;
}

export class GameService implements IGameService {
  constructor(private gameRepository: GameRepository) { }

  public async newGame(gameData: NewGameData): Promise<Game | null> {
    const uuid = uuidv4();

    const game = {
      uuid,
      ...gameData,
    };

    const createdGame = await this.gameRepository.newGame(game);

    if (gameData.type === GameType.fast) {
      await this.newGameFast(gameData.player_one_name, createdGame?.uuid)
      return createdGame;
    }

    await this.newGameRegular(gameData.player_one_uuid, createdGame?.uuid)
    return createdGame;
  }

  public async newGameFast(player_name: string | undefined, game_uuid: string | undefined): Promise<GameFast | null> {
    const gameFastUuid = uuidv4();

    const gameFast = await this.gameRepository.newGameFast({
      uuid: gameFastUuid,
      player_one_name: player_name,
      game_uuid: game_uuid,
    })

    return gameFast;
  }

  public async newGameRegular(player_one_uuid: string | undefined, game_uuid: string | undefined): Promise<GameRegular | null> {
    const gameRegularUuid = uuidv4();

    const gameRegular = await this.gameRepository.newGameRegular({
      uuid: gameRegularUuid,
      player_one_uuid: player_one_uuid,
      game_uuid: game_uuid,
    })

    return gameRegular;
  }

  public async updateGame(data: UpdateGameData): Promise<GameFast | GameRegular | null> {
    const game = await this.gameRepository.findGameById(data.game_id);

    if (game?.type === GameType.fast) {
      const updatedGame = await this.gameRepository.updateGameFast({ player_two_name: data.player_two_name, game_uuid: data.game_id })
      return updatedGame;
    }

    const updatedGame = await this.gameRepository.updateGameRegular({ player_two_uuid: data.player_two_uuid, game_uuid: data.game_id });
    return updatedGame;
  }

  // Criar logica para as metricas relacionadas aos jogos
}
