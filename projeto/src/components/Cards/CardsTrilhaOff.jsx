
import { useContext } from 'react'
import './CardsEvento.css'
import { Mycontext } from '../../context/ContextGlobalUser'

function CardsTrilhaOff(props) {

    const {user,setUser, modalLogin, setModalLogin, setModalPerfil,modalPerfil} = useContext(Mycontext)

    return (
        <div className='Cont-CardsTrilhasOff'>
            <div className='CardsTrilhasOff'>
                <p>{props.nome}</p>
                <p>Dist.: {props.dis}</p>
                <p>Tempo: {props.tmp}</p>
                <p>Dificuldade: {props.dif}</p>

            </div>

            <div className='Login-bttn'>
                <button className='Bttn' onClick={!user ?()=> setModalLogin(true) : ()=>{}}> <img className='Bttn-img' src="Icones/icon-bttnTrilhas.svg" alt="icone" /> </button>
            </div>

        </div>
    )
}

export default CardsTrilhaOff