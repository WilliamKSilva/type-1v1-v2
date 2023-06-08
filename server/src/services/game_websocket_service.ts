import { Server } from "socket.io";
import { PlayerStateData } from "../models/game_model";

export class GameWebSocketService {
  constructor(private io: Server) {}

  private gameUuid: string = "";

  private gameState: PlayerStateData = {
    name: "",
    textState: "",
  };

  public async textStateShare(): Promise<void> {
    this.io.on("connection", (socket) => {
      const query = socket.handshake.query;

      const gameUuid = query.gameUuid as string;

      this.gameUuid = gameUuid;

      socket.join(this.gameUuid);

      socket.on("player_state", (data: PlayerStateData) => {
        this.gameState = data;

        socket.to(this.gameUuid).emit("player_opponent_state", this.gameState);
      });
    });
  }
}
