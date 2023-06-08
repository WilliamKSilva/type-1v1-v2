import "./GameRoom.scss";

export default function GameRoom() {
  return (
    <div className="content">
      <div className="player">
        <strong className="name">William</strong>
        <div className="text-container">
          <p className="text">teste</p>
        </div>
        <input placeholder="Digite aqui..." />
      </div>
      <div className="player">
        <strong className="name">Teste</strong>
        <div className="text-container">
          <p className="text">teste</p>
        </div>
        <input placeholder="Digite aqui..." />
      </div>
    </div>
  );
}
