import React, { useEffect, useState, useContext, useRef } from 'react'
import "./minhaAgenda.css"
import { Link, useNavigate } from 'react-router-dom'
import CardMinhaAgenda from '../../components/Cards/CardMinhaAgenda/CardMinhaAgenda'
import buscarCardsMinhaAgenda from '../../server/buscarInformacao/buscarCardsMinhaAgenda'
import { Mycontext } from '../../context/ContextGlobalUser'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import ModalTrilhaAgenda from '../../components/Modals/ModalTrilhaAgenda/ModalTrilhaAgenda'
import { TfiMenu } from "react-icons/tfi";
import buscarCardsMinhaAgendaCriador from '../../server/buscarInformacao/buscarCardsMinhaAgendaCriador'
import NavBarMinhaAgenda from '../../components/NavBarMinhaAgenda/NavBarMinhaAgenda'

function MinhaAgenda() {

    const [dados, setDados] = useState([])

    const [dadosCriador, setDadosCriador] = useState([])



    const { setAlerta, setUser, modalLogin, setModalLogin } = useContext(Mycontext)
    const [abriTrilha, setAbriTrilha] = useState(false)





    const [regaregarPagina, setRecarregarPagina] = useState(false)

    const [participandoAtivo, setParticipandoAtivo] = useState(true)

    const [organizandoAtivo, setOrganizandoAtivo] = useState(false)

    const [open, setOpen] = useState(false)




    const navegacao = useNavigate()

    const [idEditar, setIdEditar] = useState('')

    async function buscarDados() {
        const localUser = JSON.parse(localStorage.getItem('user'))
        if (localUser) {

            const dadosParticipando = await buscarCardsMinhaAgenda(localUser.token)


            if (dadosParticipando.ok) {


                setDados(dadosParticipando.result)

                
                return
            }
            



            if (!dadosParticipando.ok) {

                if (dadosParticipando.mensagem === "Token Invalido ou expirado") {

                    setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
                    setModalLogin(true)
                    setUser(false)
                    localStorage.removeItem('user')

                    return


                }

                if (dadosParticipando.mensagem ==='Sem eventos agendados no momento') {


                    
                }


                return setAlerta({ mensagem: dadosParticipando.mensagem, icon: "erro" })
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

    function abrirParticipando() {
        setParticipandoAtivo(true)
        setOrganizandoAtivo(false)
    }
 

    function abrirOrganizando() {
        setParticipandoAtivo(false)
        setOrganizandoAtivo(true)
    }



    useEffect(() => {
        buscarDados()

        function verificar(e) {

            if (minhaRefMenu.current && !minhaRefMenu.current.contains(e.target)) {
                setOpen(false)
            }

        }

        document.addEventListener("mousedown", verificar)

        return () => {

            document.removeEventListener("mousedown", verificar)
        }


    }, [regaregarPagina])


    const minhaRefMenu = useRef(null)


    return (
        <div className="body-img">




            <div className='body-minhaAgenda' >
                <Header transparent />
                {modalLogin && <Login />}

                {abriTrilha && <ModalTrilhaAgenda recaregar={setRecarregarPagina} estadoPagina={regaregarPagina} idTrilha={idEditar} setAbriTrilha={setAbriTrilha} />}

                <div className='cont-minhaAgenda' >
                    <h1 className='titulo-espaçado'>
                        Minha Agenda
                    </h1>

                    <div className="conteudo-minhaAgenda">

                        <NavBarMinhaAgenda 
                        set_organizandoAtivo={setOrganizandoAtivo}
                        set_participandoAtivo={setParticipandoAtivo}
                        setOpen={setOpen}
                        organizandoAtivo={organizandoAtivo}
                        participandoAtivo={participandoAtivo}
                        open={open}
                        />
                        
                        <h1 className='opcaoAberta' >{participandoAtivo ? 'Participando' : 'Organizando'}</h1>
                        <div className="body-cards-minhaAgenda">

                            
                            {dados.length > 0 && <CardMinhaAgenda abrir={setAbriTrilha} id={setIdEditar} status={'Ativo'} data={dados} />}



                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default MinhaAgenda
