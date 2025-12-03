import { useContext } from "react"
import { Mycontext } from "../../context/ContextGlobalUser"
import './CardsEvento.css'

function CardsTrilhaOn(props) {
    const { user, setUser, modalLogin, setModalLogin, setModalPerfil, modalPerfil } = useContext(Mycontext)

    const ContCardsTrilhas = props.ind % 2 === 0
    ? "Cont-CardsTrilhas1" : "Cont-CardsTrilhas2"

    const Loginbttn = props.ind % 2 === 0
    ? "Login-bttn1" : "Login-bttn2"

    return (
        <div className={ContCardsTrilhas}>
            <div className='CardsTrilhas'>
                <p>{props.id}</p>
                <p>{props.tri}</p>
                <p>Ponto de Partida: {props.ini}</p>
                <p>Ponto de Chegada: {props.fim}</p>
                <p>Dist.: {props.dis}</p>
                <p>Tempo: {props.tmp}</p>
                <p>Relevo: {props.rlv}</p>
                <p>Nível: {props.dif}</p>
            </div>

            {console.log(props.tri)}

            <div className={Loginbttn}>
                <button className='Bttn' onClick={user ? ()=> props.abrirModal() : ()=> {}}> <img className='Bttn-img' src="Icones/icon-bttnTrilhas.svg" alt="icone" /> </button>
            </div>

        </div>
    )
}

export default CardsTrilhaOn
