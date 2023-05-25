export class Game {
  uuid: string = "";
  name: string = "";
  player_one: string | null;
  player_two: string | null;
  created_at: Date = new Date();
  updated_at: Date = new Date();

  constructor(
    uuid: string,
    name: string,
    player_one: string | null,
    player_two: string | null,
    created_at: Date,
    updated_at: Date
  ) {
    this.uuid = uuid;
    this.name = name;
    this.player_one = player_one;
    this.player_two = player_two;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export type GameStateData = {
  gameUuid: string;
  textState: string;
};
