import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { setupDB } from "./database/setup";
import { NewGameFactory } from "./factories";
import { setupTables } from "./database/tables";

// HTTP Server
const app = express();
app.listen(3001);

const jsonParser = bodyParser.json();

app.use(jsonParser);

// DB
const pool = setupDB();

(async () => {
  try {
    await pool.connect();

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
  const gameController = NewGameFactory();

  await gameController.newGame(request, response);
});
