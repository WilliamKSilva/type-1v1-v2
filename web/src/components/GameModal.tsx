import { AiOutlineClose } from "react-icons/ai";
import "./GameModal.scss";
import { useState } from "react";

type ModalProps = {
  active: boolean;
  setActive: () => void;
  gameTitle: string;
};

enum GameOption {
  enter = "enter",
  create = "create",
  notSelected = "",
}

export const GameModal = ({ active, setActive, gameTitle }: ModalProps) => {
  const [option, setOption] = useState<GameOption>(GameOption.notSelected);
  const gameTypeText = gameTitle === "fast" ? "Jogo Rapido" : "Jogo Regular";

  const closeModal = () => {
    setOption(GameOption.notSelected);
    setActive();
  };

  const renderOptions = () => {
    if (option === GameOption.enter) {
      return (
        <div className="modal-content">
          <h3>{gameTypeText}</h3>
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
          <h3>{gameTypeText}</h3>
          <div className="option">
            <input placeholder="Nome do jogo" />
            <input placeholder="Seu nome" />
            <button className="button-important">Criar</button>
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
        <h3>{gameTypeText}</h3>
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

  return active ? (
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
  ) : null;
};
