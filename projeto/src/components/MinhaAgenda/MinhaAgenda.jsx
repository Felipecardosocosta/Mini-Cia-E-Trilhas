import React, { useEffect, useState,useContext, useRef } from 'react'
import "./minhaAgenda.css"
import { Link } from 'react-router-dom'
import CardMinhaAgenda from './CardMinhaAgenda'
import buscarCardsMinhaAgenda from '../../server/buscarInformacao/buscarCardsMinhaAgenda'
import { Mycontext } from '../../context/ContextGlobalUser'

function MinhaAgenda({setMinhaAgenda}) {

    const [dados,setDados] = useState([])
    const {setAlerta,setUser } = useContext(Mycontext)

    async function buscarDados() {
        const localUser = JSON.parse(localStorage.getItem('user'))
        if (localUser) {
            const dados = await buscarCardsMinhaAgenda(localUser.token)
            
            if (dados.ok) {
               
                if (dados.result.length === 0) {
                    return setAlerta({icon:"erro"})
                }
                
                setDados(dados.result)
                return
            }

            setAlerta({mensagem:"Necessario logar novamenre", icon:"erro"})
            setUser(false)
            localStorage.removeItem('user')


            return

        }
        

    }
    
    const minharef = useRef(null)

    useEffect(()=>{
        buscarDados()

        function verificar(event) {
            if (minharef.current&& !minharef.current.contains(event.target)) {
                setMinhaAgenda(false)
            }
        }

        document.addEventListener("mousedown",verificar)

        return ()=>{
            document.removeEventListener("mousedown",verificar)
        }

    },[])

    

    return (
        <div className='body-minhaAgenda' >

            <div className='cont-minhaAgenda' ref={minharef}>
                <h4 className='titulo-espaçado'>
                    Minha Agenda
                </h4>



                <div className="conteudo-minhaAgenda">

                    <div className="nav-minhaAgenda">
                        <Link>Próximos</Link>
                        <Link>Passados</Link>

                    </div>

                    <div className="body-cards-minhaAgenda">

                        {dados.length > 0 && <CardMinhaAgenda  status={'Ativo'} data={dados}/>}

                        

                    </div>


                </div>
            </div>

        </div>
    )
}

export default MinhaAgenda
