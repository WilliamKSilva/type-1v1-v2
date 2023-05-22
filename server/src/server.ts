import express from "express";

const app = express();

app.listen(3001);

app.get("/health", (request, response) => {
  response
    .json({
      message: "Ta la!",
    })
    .send(200);
});
