import React, { useEffect, useState, useContext, useRef } from 'react'
import "./minhaAgenda.css"
import { Link, useNavigate } from 'react-router-dom'
import CardMinhaAgenda from '../../components/Cards/CardMinhaAgenda/CardMinhaAgenda'
import buscarCardsMinhaAgenda from '../../server/buscarInformacao/buscarCardsMinhaAgenda'
import { Mycontext } from '../../context/ContextGlobalUser'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import ModalTrilhaAgenda from '../../components/Modals/ModalTrilhaAgenda/ModalTrilhaAgenda'

function MinhaAgenda() {

    const [dados, setDados] = useState([])
    const { setAlerta, setUser, modalLogin, setModalLogin } = useContext(Mycontext)
    const [abriTrilha, setAbriTrilha] = useState(false)

    const [regaregarPagina, setRecarregarPagina]= useState(false)

    console.log(regaregarPagina);
    

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

                if (dados.mensagem === "Token Invalido ou expirado") {

                    setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
                    setModalLogin(true)
                    setUser(false)
                    localStorage.removeItem('user')

                    return


                }
                return setAlerta({ mensagem: dados.mensagem, icon: "erro" })
            }


            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            navegacao("/")
            localStorage.removeItem('user')


            return

        }

        setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
        setModalLogin(true)
        setUser(false)


    }



    useEffect(() => {
        buscarDados()



    }, [regaregarPagina])



    return (
        <div className='body-minhaAgenda' >
            <Header />
            {modalLogin && <Login />}

            {abriTrilha && <ModalTrilhaAgenda recaregar={setRecarregarPagina} estadoPagina={regaregarPagina} idTrilha={idEditar} setAbriTrilha={setAbriTrilha} />}

            <div className='cont-minhaAgenda' >
                <h4 className='titulo-espaçado'>
                    Minha Agenda
                </h4>



                <div className="conteudo-minhaAgenda">

                    <div className="nav-minhaAgenda">
                        <Link>Próximos</Link>
                        <Link>Passados</Link>

                    </div>

                    <div className="body-cards-minhaAgenda">

                        {dados.length > 0 && <CardMinhaAgenda  abrir={setAbriTrilha} id={setIdEditar} status={'Ativo'} data={dados} />}



                    </div>


                </div>
            </div>

        </div>
    )
}

export default MinhaAgenda
