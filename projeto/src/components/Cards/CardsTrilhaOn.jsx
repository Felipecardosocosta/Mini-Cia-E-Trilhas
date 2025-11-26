import { useContext } from "react"
import { Mycontext } from "../../context/ContextGlobalUser"

function CardsTrilhaOn(props) {
    const { user, setUser, modalLogin, setModalLogin, setModalPerfil, modalPerfil } = useContext(Mycontext)

    return (
        <div className='Cont-CardsTrilhasOff'>
            <div className='CardsTrilhasOff'>
                <p>{props.id}</p>
                <p>{props.tri}</p>
                <p>Ponto de Partida: {props.ini}</p>
                <p>Ponto de Chegada: {props.fim}</p>
                <p>Dist.: {props.dis}</p>
                <p>Tempo: {props.tmp}</p>
                <p>Relevo: {props.rlv}</p>
                <p>Nível: {props.dif}</p>
            </div>

            <div className='Login-bttn'>
                <button className='Bttn' onClick={!user ? () => {} : () => {}}> <img className='Bttn-img' src="Icones/icon-bttnTrilhas.svg" alt="icone" /> </button>
            </div>

        </div>
    )
}

export default CardsTrilhaOn
