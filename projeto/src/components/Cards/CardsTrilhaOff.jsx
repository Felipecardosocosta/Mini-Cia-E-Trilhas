import { useContext } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'

function CardsTrilhaOff(props) {
    const {user,setUser, modalLogin, setModalLogin, setModalPerfil,modalPerfil} = useContext(Mycontext)

    const inverter = {
    flexDirection: "row"
    }
    if (props.ind %2!==0) {
        inverter.flexDirection = "row-reverse"
        console.log(props.ind)
        
    }

    return (
        <div className='Cont-CardsTrilhas'style={inverter}>
            <div className='CardsTrilhas'>
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