export class Game {
  uuid: string = "";
  name: string = "";
  player_one: string = "";
  player_two: string = "";
  created_at: Date = new Date();
  updated_at: Date = new Date();

  constructor(
    uuid: string,
    name: string,
    player_one: string,
    player_two: string
  ) {
    this.uuid = uuid;
    this.name = name;
    this.player_one = player_one;
    this.player_two = player_two;
  }
}
