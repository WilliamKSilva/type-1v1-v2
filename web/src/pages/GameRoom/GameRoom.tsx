import { Socket, io } from "socket.io-client";
import "./GameRoom.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type PlayerStateData = {
  name?: string;
  textState: string;
};

export default function GameRoom() {
  const { gameUuid, playerName } = useParams();

  const [player, setPlayer] = useState<PlayerStateData>({
    name: playerName,
    textState: "",
  });
  const [playerOpponent, setPlayerOpponent] = useState<PlayerStateData>({
    name: "",
    textState: "",
  });

  // socket.on("player_opponent_state", (data: PlayerStateData) => {
  //   setPlayerOpponent({
  //     name: data.name,
  //     textState: data.textState,
  //   });
  // });

  let socketConnected = false;

  let socket: Socket | null = null;

  if (!socketConnected) {
    socket = io("http://localhost:3001", {
      query: {
        gameUuid,
      },
    });
  }

  socket?.on("connect", () => {
    socketConnected = true;
  });

  socket?.emit("player_state", {
    player: player?.name,
    textState: player?.textState,
  });

  return (
    <div className="content">
      <div className="player">
        <strong className="name">{player?.name}</strong>
        <div className="text-container">
          <p className="text">{player?.textState}</p>
        </div>
        <input placeholder="Digite aqui..." />
      </div>
      {playerOpponent ? (
        <div className="player">
          <strong className="name">{playerOpponent.name}</strong>
          <div className="text-container">
            <p className="text">{playerOpponent.textState}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
