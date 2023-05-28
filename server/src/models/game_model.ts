export enum GameType {
  regular = 'Regular',
  fast = 'Fast'
}

export class Game {
  uuid: string = "";
  name: string = "";
  type: GameType = GameType.regular;
  created_at: Date = new Date();
  updated_at: Date = new Date();

  constructor(
    uuid: string,
    name: string,
    type: GameType,
    created_at: Date,
    updated_at: Date
  ) {
    this.uuid = uuid;
    this.name = name;
    this.type = type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export type GameStateData = {
  gameUuid: string;
  textState: string;
};
