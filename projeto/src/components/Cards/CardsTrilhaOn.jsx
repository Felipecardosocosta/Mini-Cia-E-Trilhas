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
                <div className={CardsTrilhaImg}>
                    <p>Espaço reservado para a foto</p>
                </div>

                <div className={CardsTrilhasInf}>
                    <p>{props.id}</p>
                    <h1>{props.tri}</h1>
                    <br></br>
                    <p>Ponto de Partida: {props.ini}</p>
                    <p>Ponto de Chegada: {props.fim}</p>
                    <p>Dist.: {props.dis}</p>
                    <p>Tempo: {props.tmp}</p>
                    <p>Relevo: {props.rlv}</p>
                    <p>Nível: {props.dif}</p>
                </div>                

                <div className={CardsTrilhasBttn}>
                    <button className='Bttn' onClick={user ? () => props.abrirModal() : () => { }}> <img className='Bttn-img' src="Icones/icon-bttnTrilhas.svg" alt="icone" /> </button>
                </div>
            </div>
        </div>

    )
}

export default CardsTrilhaOn

