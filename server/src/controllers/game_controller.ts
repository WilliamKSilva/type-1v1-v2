import { Request, Response } from "express";
import { IGameService } from "../services/game_service";
import { GameType } from "../models/game_model";

export type NewGameData = {
  name: string;
  type: GameType;
  player_one_uuid: string | undefined;
  player_one_name: string | undefined;
};

export class GameController {
  constructor(private gameService: IGameService) { }

  public async newGame(request: Request, response: Response) {
    try {
      const payload = request.body as NewGameData;

      const game = await this.gameService.newGame(payload);

      response
        .status(200)
        .json({
          data: game,
        })
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
}
