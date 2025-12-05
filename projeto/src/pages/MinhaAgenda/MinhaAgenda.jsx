import React, { useEffect, useState, useContext, useRef } from 'react'
import "./minhaAgenda.css"
import { Link, useNavigate } from 'react-router-dom'
import CardMinhaAgenda from '../../components/Cards/CardMinhaAgenda/CardMinhaAgenda'
import buscarCardsMinhaAgenda from '../../server/buscarInformacao/buscarCardsMinhaAgenda'
import { Mycontext } from '../../context/ContextGlobalUser'
import Header from '../../components/Header/Header'

function MinhaAgenda() {

    const [dados, setDados] = useState([])
    const { setAlerta, setUser } = useContext(Mycontext)
    const [abriTrilha, setAbriTrilha] = useState(false)

    const navegacao = useNavigate()

    const [idEditar, setIdEditar] = useState('')

    async function buscarDados() {
        const localUser = JSON.parse(localStorage.getItem('user'))
        if (localUser) {
            const dados = await buscarCardsMinhaAgenda(localUser.token)

            if (dados.ok) {


                setDados(dados.result)


                return
            }
            if (!dados.ok) {
                console.error(dados.error);

                return setAlerta({ mensagem: dados.mensagem, icon: "erro" })
            }


            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            navegacao("/")
            localStorage.removeItem('user')


            return

        }


    }

    const minharef = useRef(null)

    useEffect(() => {
        buscarDados()

        function verificar(event) {
            if (minharef.current && !minharef.current.contains(event.target)) {
                setAbriTrilha(false)
            }
        }

        document.addEventListener("mousedown", verificar)

        return () => {
            document.removeEventListener("mousedown", verificar)
        }

    }, [])



    return (
        <div className='body-minhaAgenda' >
            <Header />
            {abriTrilha && `${abriTrilha}, ${idEditar}`}

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

                        {dados.length > 0 && <CardMinhaAgenda abrir={setAbriTrilha} id={setIdEditar} status={'Ativo'} data={dados} />}



                    </div>


                </div>
            </div>

        </div>
    )
}

export default MinhaAgenda
