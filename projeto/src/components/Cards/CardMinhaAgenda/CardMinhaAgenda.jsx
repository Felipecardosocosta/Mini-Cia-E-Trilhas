import React, { useState } from 'react'
import './cardMinhaAgenda.css'
import { useContext } from 'react'
import { Mycontext } from '../../../context/ContextGlobalUser'
import deixaParticiparEvento from '../../../server/alterarDados/deixaParticiparEvento'
import buscarCardsMinhaAgenda from '../../../server/buscarInformacao/buscarCardsMinhaAgenda'
import { useNavigate } from 'react-router-dom'
import buscarCardsMinhaAgendaCriador from '../../../server/buscarInformacao/buscarCardsMinhaAgendaCriador'

function CardMinhaAgenda({ criador=false, nomeButton, id, abrir, data, status, button = false }) {


    const { setAlerta, setModalLogin, setUser } = useContext(Mycontext)


    const [dados, setDados] = useState([])


    const [semEventos, setSemEventos] = useState(false)

    function iniciarEdicao(idEvento) {
        id(idEvento)
        abrir(true)
    }
    const navegacao = useNavigate()


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

                if (dadosParticipando.mensagem === 'Sem eventos agendados no momento') {

                    setSemEventos(dadosParticipando.mensagem)
                    return
                }


                return setAlerta({ mensagem: dadosParticipando.mensagem, icon: "erro" })
            }


            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            navegacao("/")
            localStorage.removeItem('user')


            return

        }
    }


    async function buscarDadosCriador() {

        const localUser = JSON.parse(localStorage.getItem('user'))
        if (localUser) {

            const dadosCriador = await buscarCardsMinhaAgendaCriador(localUser.token)


            if (dadosCriador.ok) {


                setDados(dadosCriador.result)


                return
            }




            if (!dadosCriador.ok) {

                if (dadosCriador.mensagem === "Token Invalido ou expirado") {

                    setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
                    setModalLogin(true)
                    setUser(false)
                    localStorage.removeItem('user')

                    return


                }

                if (dadosCriador.mensagem === 'Sem eventos agendados no momento') {

                    setSemEventos(dadosCriador.mensagem)
                    return
                }


                return setAlerta({ mensagem: dadosCriador.mensagem, icon: "erro" })
            }


            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            navegacao("/")
            localStorage.removeItem('user')


            return

        }
    }


    if (criador) {
        buscarDadosCriador()

    } else {
        buscarDados()

    }

    
    





    return (
        dados.map((conteudo, indx) => {





            return (<div key={conteudo.id_evento}  className='card-minhaAgenda' style={{ backgroundImage: 'url("../Imgs/banco/lagoinhaDoLeste.jpg")' }}>
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

                        <h3>Saída as {conteudo.horário.slice(0, 5)} h </h3>

                        <h3>{conteudo.vagasDisp} vagas disponíveis</h3>

                    </div>

                    <div className='buttons-cards-minhaAgenda'>

                        <button className='botao-editar-cards-MAG' onClick={() => iniciarEdicao(conteudo.id_evento)}>Ver detalhes</button>


                    </div>

                </div>

            </div>)
        })
    )
}

export default CardMinhaAgenda
