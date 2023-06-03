import { Header } from "../components/Header"
import './Home.scss'


export const Home = () => {
    return (
        <div>
            <Header />
            <div className="content">
                <section className="description">
                    <strong className="description-title">
                        Desafie seus amigos e teste quem e o digitador mais rapido! 
                    </strong>
                    <p className="description-content">
                        Escolha entre a corrida rapida e a corrida regular.
                        Os dois modos de jogo foram feito especialmente para
                        que a corrida seja simples e direto ao ponto! ;D
                    </p>
                </section>
            </div>
        </div>
    )
}