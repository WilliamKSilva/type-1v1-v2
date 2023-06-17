import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import bodyParser from "body-parser";
import { setupDB } from "./database/setup";
import {
  NewGameFactory,
  NewGameWebSocketFactory,
  NewUserFactory,
} from "./factories";
import { PoolClient } from "pg";
import { Server } from "socket.io";

// HTTP Server
const app = express();

const jsonParser = bodyParser.json();

app.use(cors({allowedHeaders: '*', origin: '*'}));
app.use(jsonParser);

// Websocket
// Tentar implementar interfaces para os metodos do socket.io
// ServerToClientEvents, ClientToServerEvents, etc
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(3001);

// DB
const pool = setupDB();

let poolClient: PoolClient;

(async () => {
  try {
    poolClient = await pool.connect();

    console.log("Postgres connected!");
  } catch (error) {
    console.error(error);
  }
})();

// WebSocket current game state handler
const gameWebSocketService = NewGameWebSocketFactory(io);
gameWebSocketService.textStateShare();

app.get("/health", async (request: Request, response: Response) => {
  response
    .json({
      message: "Ta la!",
    })
    .send(200);
});

app.post("/games", async (request: Request, response: Response) => {
  const gameController = NewGameFactory(poolClient);

  await gameController.newGame(request, response);
});

app.post("/users", async (request: Request, response: Response) => {
  const userController = NewUserFactory(poolClient);

  userController.newUser(request, response);
});
