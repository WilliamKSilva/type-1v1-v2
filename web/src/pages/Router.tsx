import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Home/Home";
import GameRoom from "./GameRoom/GameRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game-room/:gameUuid",
    element: <GameRoom />,
  },
]);
