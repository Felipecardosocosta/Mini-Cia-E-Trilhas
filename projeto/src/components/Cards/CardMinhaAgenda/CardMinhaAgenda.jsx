import React from 'react'
import './cardMinhaAgenda.css'
import { useContext } from 'react'
import { Mycontext } from '../../../context/ContextGlobalUser'
import deixaParticiparEvento from '../../../server/alterarDados/deixaParticiparEvento'

function CardMinhaAgenda({nomeButton, id, abrir, data, status, button = false }) {


    const { setAlerta } = useContext(Mycontext)

    function iniciarEdicao(idEvento) {
        id(idEvento)
        abrir(true)
    }


    






    return (
        data.map((conteudo, indx) => {





            return (<div key={conteudo.id_evento} onClick={() => iniciarEdicao(conteudo.id_evento)} className='card-minhaAgenda' style={{ backgroundImage: 'url("../Imgs/banco/lagoinhaDoLeste.jpg")' }}>
                <div className="data-card-minhaAgenda">
                    <p>{conteudo.data.split('-', 3)[2].split("T", 2)[0]}</p>
                    <div className='barra-data-minhaAgenda'></div>
                    <p>{conteudo.data.split('-', 3)[1]}</p>
                </div>

                <div className="conteudo-card-minhaAgenda" >

                    <div className='status-card-minhaAgenda' >

                        <div className='conteudo-status-card-minhaAgenda'>
                            {status}

                        </div>

                    </div>

                    <div className='informcao-card-minhaAgenda'>

                        <h1>{conteudo.nomeTrilha}</h1>

                        <h3>Saída as {conteudo.horário} h </h3>

                        <h3>{conteudo.vagasDisp} vagas disponíveis</h3>

                    </div>

                    {button && <div className='buttons-cards-minhaAgenda'>

                        <button className='botao-editar-cards-MAG'>{nomeButton}</button>
                        <button className='botao-deletar-cards-MAG'  >Cancelar Inscrição</button>

                    </div>
                    }
                </div>

            </div>)
        })
    )
}

export default CardMinhaAgenda
