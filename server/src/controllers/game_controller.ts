import { Request, Response } from "express";
import { IGameService } from "../services/game_service";

export type NewGameData = {
  name: string;
  player_one: string | null;
  player_two: string | null;
};

export class GameController {
  constructor(private gameService: IGameService) {}

  public async newGame(request: Request, response: Response) {
    try {
      console.log(request.body);
      const payload = request.body as NewGameData;

      const game = await this.gameService.newGame(payload);

      response
        .status(200)
        .json({
          data: game,
        })
        .send();
    } catch (error) {
      response
        .status(400)
        .json({
          message: "Internal Server Error",
        })
        .send();
    }
  }
}
