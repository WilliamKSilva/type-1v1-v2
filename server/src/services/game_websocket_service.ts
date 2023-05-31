import { Server } from "socket.io";
import { EnterGameData, GameStateData } from "../models/game_model";

export class GameWebSocketService {
  constructor(private io: Server) {}

  public async textStateShare(): Promise<void> {
    this.io.on("connection", (socket) => {
      socket.on("join_game", (data: EnterGameData) => {
        socket.join(data.gameUuid);
      });

      socket.on("state_game", (data: GameStateData) => {
        socket.to(data.gameUuid).emit("state", data);
      });
    });
  }
}
