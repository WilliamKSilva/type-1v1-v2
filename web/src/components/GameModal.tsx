import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import './GameModal.scss'

type ModalProps = {
    active: boolean;
    setActive: () => void;
    gameTitle: string;
}

export const GameModal = ({ active, setActive, gameTitle }: ModalProps) => {
    const gameTypeText = gameTitle === 'fast' ? 'Jogo Rapido' : 'Jogo Regular'

    return active ? (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <button className="close-button" onClick={() => setActive()}>
                        <AiOutlineClose color="white" size={25} />
                    </button>
                </div>
                <div className="modal-content">
                    <h3>{gameTypeText}</h3>
                    <div className="option">
                        <button>Entrar em um jogo</button>
                        <button className="button-important">Criar um novo jogo</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}