import { Request, Response } from "express";
import { IGameService } from "../services/game_service";
import { GameType } from "../models/game_model";

export type NewGameData = {
  name: string;
  type: GameType;
  player_one_uuid: string | undefined;
  player_one_name: string | undefined;
};

export type UpdateGameData = {
  player_two_uuid: string | undefined;
  player_two_name: string | undefined;
  game_uid: string;
};

export class GameController {
  constructor(private gameService: IGameService) {}

  public async newGame(request: Request, response: Response) {
    try {
      const payload = request.body as NewGameData;

      const game = await this.gameService.newGame(payload);

      response
        .json({
          data: game,
        })
        .status(200)
        .send();
    } catch (error) {
      console.log(error);
      response
        .status(400)
        .json({
          message: "Internal Server Error",
        })
        .send();
    }
  }

  public async updateGame(request: Request, response: Response) {
    try {
      const gameId = request.params.id;
      const payload = request.body as UpdateGameData;

      const data = {
        gameId,
        ...payload,
      };

      const game = await this.gameService.updateGame(data);

      response
        .status(200)
        .json({
          data: game,
        })
        .send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Internal Server Error",
        })
        .send();
    }
  }
}
