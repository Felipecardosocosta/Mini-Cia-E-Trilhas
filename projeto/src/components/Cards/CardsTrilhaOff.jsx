import { useContext } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import './Cards.css'

function CardsTrilhaOff(props) {
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
                    <h1>{props.nome}</h1>
                    <br></br>
                    <p>Dist.: {props.dis}Km // Tempo: {props.tmp}</p>
                    <p>Dificuldade: {props.dif}</p>
                </div>

                <div className={CardsTrilhasBttn}>
                    <button className='Bttn' onClick={!user ? () => setModalLogin(true) : () => { }}>
                        <div className="Bttn-icon"> <img className='Icon' src="Icones/icon-bttnTrilhas.svg" alt="icone" /></div>
                        <div className="Bttn-txt"><h1> Mais Inf.</h1></div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardsTrilhaOff

