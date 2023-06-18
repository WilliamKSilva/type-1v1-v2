import { AiOutlineClose } from "react-icons/ai";
import "./GameModal.scss";
import { useState } from "react";
import { GameType } from "../utils/enums/GameType";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

type ModalProps = {
  active: boolean;
  setActive: () => void;
  gameType: string;
};

enum GameOption {
  enter = "enter",
  create = "create",
  notSelected = "",
}

type GameData = {
  name: string;
  playerName?: string;
};

export const GameModal = ({ active, setActive, gameType }: ModalProps) => {
  const navigate = useNavigate();

  const [gameData, setGameData] = useState<GameData>({
    name: "",
    playerName: "",
  });
  const [option, setOption] = useState<GameOption>(GameOption.notSelected);
  const [loading, setLoading] = useState<boolean>(false);
  const gameTitle = gameType === "fast" ? "Jogo Rapido" : "Jogo Regular";

  const closeModal = () => {
    setOption(GameOption.notSelected);
    setActive();
  };

  const renderOptions = () => {
    if (option === GameOption.enter) {
      return (
        <div className="modal-content">
          <h3>{gameTitle}</h3>
          <div className="option">
            <input placeholder="GameID" />
            <button className="button-important">Entrar</button>
            <button onClick={() => setOption(GameOption.notSelected)}>
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    if (option === GameOption.create) {
      return (
        <div className="modal-content">
          <h3>{gameTitle}</h3>
          <div className="option">
            <input
              onChange={(event) =>
                setGameData({
                  name: event.target.value,
                  playerName: gameData.playerName,
                })
              }
              placeholder="Nome do jogo"
            />
            {gameType === GameType.fast ? (
              <input
                onChange={(event) =>
                  setGameData({
                    name: gameData.name,
                    playerName: event.target.value,
                  })
                }
                placeholder="Seu nome"
              />
            ) : null}
            <button className="button-important" onClick={() => createGame()}>
              Criar
            </button>
            <button
              onClick={() => setOption(GameOption.notSelected)}
              className="button-important"
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="modal-content">
        <h3>{gameTitle}</h3>
        <div className="option">
          <button onClick={() => setOption(GameOption.enter)}>
            Entrar em um jogo
          </button>
          <button
            onClick={() => setOption(GameOption.create)}
            className="button-important"
          >
            Criar um novo jogo
          </button>
        </div>
      </div>
    );
  };

  const createGame = async () => {
    if (gameType === GameType.fast) {
      const gamePayload = {
        name: gameData.name,
        player_one_name: gameData.playerName,
        type: gameType,
      };

      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_TYPE_1V1_API_URL}/games`,
          {
            method: "post",
            body: JSON.stringify(gamePayload),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const createdGame = await response.json();

        setLoading(false);
        navigate(`/game-room/${createdGame.data.uuid}`, {
          state: { playerName: gamePayload.player_one_name },
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return active ? (
    <>
      <div className="modal-container">
        <div className="modal">
          <div className="modal-header">
            <button className="close-button" onClick={() => closeModal()}>
              <AiOutlineClose color="white" size={25} />
            </button>
          </div>
          {renderOptions()}
        </div>
      </div>
      <Loading active={loading} />
    </>
  ) : null;
};
