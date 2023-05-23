import express from "express";
import { setupDB } from "./database/setup";

// HTTP Server
const app = express();
app.listen(3001);

// DB
const client = setupDB();

(async () => {
  try {
    await client.connect();

    console.log("Postgres connected!");
  } catch (error) {
    console.error(error);
  }
})();

app.get("/health", (request, response) => {
  response
    .json({
      message: "Ta la!",
    })
    .send(200);
});
