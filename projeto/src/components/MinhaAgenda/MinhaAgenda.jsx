import React from 'react'
import "./minhaAgenda.css"
import { Link } from 'react-router-dom'
import CardMinhaAgenda from './CardMinhaAgenda'

function MinhaAgenda() {

    

    return (
        <div className='body-minhaAgenda' >

            <div className='cont-minhaAgenda'>
                <h4 className='titulo-espaçado'>
                    Minha Agenda
                </h4>



                <div className="conteudo-minhaAgenda">

                    <div className="nav-minhaAgenda">
                        <Link>Próximos</Link>
                        <Link>Passados</Link>

                    </div>

                    <div className="body-cards-minhaAgenda">

                        <CardMinhaAgenda status={'Ativo'} data={[{
                            id_evento:1,
                            data:'5/11/2021',
                            nomeTrilha:'Trilha da lagoinha do leste',
                            horário:'11:00',
                            bairro:"Pantano do sul"
                            
                        }]}/>

                        

                    </div>


                </div>
            </div>

        </div>
    )
}

export default MinhaAgenda
