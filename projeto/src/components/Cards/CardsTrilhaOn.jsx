import { useContext } from "react"
import { Mycontext } from "../../context/ContextGlobalUser"
import './Cards.css'

function CardsTrilhaOn(props) {
    const { user, setUser, modalLogin, setModalLogin, setModalPerfil, modalPerfil } = useContext(Mycontext)

    const ContCardsTrilhas = props.ind % 2 === 0 ? "Cont-CardsTrilhasE" : "Cont-CardsTrilhasD"
    const CardsTrilhaImg = props.ind % 2 === 0 ? "CardsTrilha-ImgD" : "CardsTrilha-ImgE"
    const CardsTrilhasInf = props.ind % 2 === 0 ? "CardsTrilhas-InfD" : "CardsTrilhas-InfE"
    const CardsTrilhasBttn = props.ind % 2 === 0 ? "CardsTrilhas-BttnD" : "CardsTrilhas-BttnE"

    return (
        <div className='Cont-cardsTrilhas'>
            {console.log(props.tri)}

            <div className={ContCardsTrilhas}>
                <div className={CardsTrilhaImg} style={{backgroundImage:"url(./Imgs/banco/lagoinhaDoLeste.jpg)"}}>
                    <p></p>
                </div>

                <div className={CardsTrilhasInf}>
                    <p>{props.id}</p>
                    <h2>{props.tri}</h2>
                    <br></br>
                    <p>Ponto de Partida: {props.ini}</p>
                    <p>Ponto de Chegada: {props.fim}</p>
                    <p>Dist.: {props.dis}Km // Tempo: {props.tmp}</p>
                    <p>Nível: {props.dif} // Relevo: {props.rlv}</p>

                </div>

                <div className={CardsTrilhasBttn}>
                    <button className='Bttn' onClick={user ? () => props.abrirModal() : () => { }}>
                        <div className="Bttn-icon"> <img className='Icon' src="Icones/icon-bttnTrilhas.svg" alt="icone" /></div>
                        <div className="Bttn-txt"><h1>Marcar Trilha</h1></div>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CardsTrilhaOn
