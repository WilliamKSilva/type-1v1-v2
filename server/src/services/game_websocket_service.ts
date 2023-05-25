import { Server } from "socket.io";
import { GameStateData } from "../models/game_model";

export class GameWebSocketService {
  constructor(private io: Server) {}

  public async textStateShare(): Promise<void> {
    this.io.on("connection", (socket) => {
      socket.on("message", (data: GameStateData) => {
        socket.to(data.gameUuid).emit("state", data);
      });
    });
  }
}
