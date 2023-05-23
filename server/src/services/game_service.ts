import { Game } from "../models/game_model";
import { v4 as uuidv4 } from "uuid";

export interface IGameService {
  newGame: ({ name, player_one, player_two }: Game) => Promise<Game | null>;
}

export class GameService implements IGameService {
  constructor() {}

  public async newGame({
    name,
    player_one,
    player_two,
  }: Game): Promise<Game | null> {
    const uuid = uuidv4();
  }
}
