import { Server } from "socket.io";

export class GameWebSocketService {
  constructor(private io: Server) {}

  public async textStateShare(): Promise<void> {
    this.io.on("connection", (socket) => {
      socket.join(socket.data.gameUuid);

      let gameState = {};

      socket.on("message", (...args) => {
        console.log(...args);
      });

      socket.to(socket.data.gameUuid).emit("state", gameState);
    });
  }
}
