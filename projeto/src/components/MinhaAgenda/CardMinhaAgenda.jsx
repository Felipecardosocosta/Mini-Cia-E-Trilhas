import React from 'react'
import './cardMinhaAgenda.css'

function CardMinhaAgenda({ data, status }) {


    
    
    



    return (
        data.map((conteudo, indx) => {

            
            console.log(conteudo.data);
            

            return (<div key={conteudo.id_evento} className='card-minhaAgenda' style={{ backgroundImage: 'url(./Imgs/banco/lagoinhaDoLeste.jpg)' }}>
                <div className="data-card-minhaAgenda">
                    <p>{conteudo.data.split('-',3)[1]}</p>
                    <div className='barra-data-minhaAgenda'></div>
                    <p>{conteudo.data.split('-',3)[2].split("T",2)[0]}</p>
                </div>

                <div className="conteudo-card-minhaAgenda" >

                    <div className='status-card-minhaAgenda' >

                        <div className='conteudo-status-card-minhaAgenda'>
                            {status}

                        </div>

                    </div>

                    <div className='informcao-card-minhaAgenda'>

                    <h2>{conteudo.nomeTrilha}</h2>

                    <p>Saída as {conteudo.horário}h </p>

                    <p>{conteudo.bairro},SC</p>

                    </div>
                    <div className='buttons-cards-minhaAgenda'>

                        <button className='botao-editar-cards-MAG' >Editar</button>
                        <button className='botao-deletar-cards-MAG' >Deletar</button>
                    </div>

                </div>

            </div>)
        })
    )
}

export default CardMinhaAgenda
