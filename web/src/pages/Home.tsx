import { useState } from "react";
import { Header } from "../components/Header";
import "./Home.scss";
import { GameModal } from "../components/GameModal";

// TODO, add SVG with typing animation

export const Home = () => {
  const [modalActive, setModalActive] = useState(false);
  const [gameType, setGameType] = useState("");

  const changeModalActive = (gameType?: string) => {
    if (gameType) {
      setGameType(gameType);
    }

    setModalActive(!modalActive);
  };

  return (
    <div>
      <Header />
      <div className="content">
        <section className="description">
          <strong className="description-title">
            Desafie seus amigos e descubra quem digita mais rápido!
          </strong>
          <p className="description-content">
            Escolha entre a corrida rapida e a corrida regular. Os dois modos de
            jogo foram feitos especialmente para que a partida seja simples e
            direta ao ponto!
          </p>
          <div className="game-options">
            <button onClick={() => changeModalActive("fast")}>Rapido</button>
            <button onClick={() => changeModalActive("regular")}>Normal</button>
          </div>
        </section>
      </div>
      <GameModal
        gameType={gameType}
        active={modalActive}
        setActive={changeModalActive}
      />
    </div>
  );
};
