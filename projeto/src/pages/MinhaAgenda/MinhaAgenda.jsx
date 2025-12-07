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
import CorpoCriador from '../../components/Corpo/CorpoCriador'
import CorpoParticipante from '../../components/Corpo/CorpoParticipante'

function MinhaAgenda() {

    const [dados, setDados] = useState([])

    const [dadosCriador, setDadosCriador] = useState([])

    const [carregarPg, setCarregarPg] = useState(true)

    const { setAlerta, setUser, modalLogin, setModalLogin } = useContext(Mycontext)

    const [abriTrilha, setAbriTrilha] = useState(false)

    const [filtro, setFiltro] = useState(false)

  
    const [participandoAtivo, setParticipandoAtivo] = useState(true)

    const [organizandoAtivo, setOrganizandoAtivo] = useState(false)

    const [open, setOpen] = useState(false)




    const navegacao = useNavigate()

    const [idEditar, setIdEditar] = useState('')




    return (
        <div className="body-img">

   


            <div className='body-minhaAgenda' >
                <Header transparent />
                {modalLogin && <Login />}

                {abriTrilha && <ModalTrilhaAgenda  setFiltro={setFiltro} filtro={filtro} setCarregarPg={setCarregarPg} carregarPg={carregarPg} idTrilha={idEditar} setAbriTrilha={setAbriTrilha} />}

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

                        {!participandoAtivo?  
                        
                        <CorpoCriador
                        
                        idEditar={idEditar}
                        setIdEditar={setIdEditar}
                        setAbriTrilha={setAbriTrilha}
                        carregarPg={carregarPg}
                        setCarregarPg={setCarregarPg}
                        filtro={filtro}
                        setFiltro={setFiltro}
                        
                        />
                        
                        :

                        <CorpoParticipante
                        idEditar={idEditar}
                        setIdEditar={setIdEditar}
                        setAbriTrilha={setAbriTrilha}
                        carregarPg={carregarPg}
                        setCarregarPg={setCarregarPg}
                        filtro={filtro}
                        setFiltro={setFiltro}
                        
                        />


                        }


                      


                    </div>
                </div>

            </div>
        </div>
    )
}

export default MinhaAgenda
