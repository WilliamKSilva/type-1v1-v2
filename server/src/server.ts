import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { setupDB } from "./database/setup";
import { NewGameFactory } from "./factories";
import { PoolClient } from "pg";

// HTTP Server
const app = express();
app.listen(3001);

const jsonParser = bodyParser.json();

app.use(jsonParser);

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
