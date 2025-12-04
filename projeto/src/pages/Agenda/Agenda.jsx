import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import { Mycontext } from '../../context/ContextGlobalUser'
import CardsAgendaOn from '../../components/Cards/CardsAgendaOn'
import CardsAgendaOff from '../../components/Cards/CardsAgendaOff'
import buscarCardsAgendaOff from '../../server/buscarInformacao/buscarCardsAgendaOff'
import participarEvento from '../../server/inserirDados/participarEvento'
import './Agenda.css'
import MenuPesq from '../../components/MenuPesq/MenuPesq'
import axios from 'axios';
import buscarCardsAgendaOn from '../../server/buscarInformacao/buscarCardsAgendaOn'
function Eventos() {

  const [agenda, setAgenda] = useState([])

  const [atualizar, setAtualiza] = useState(false)

  const { modalLogin, setModalLogin, user,setAlerta } = React.useContext(Mycontext)

 
  
  async function pesquisaAPI(params) {

    const localStorege = JSON.parse(localStorage.getItem('user'))
    let dados
    if (localStorege) {
      dados = await buscarCardsAgendaOn(localStorege.token)
    } else {
      dados = await buscarCardsAgendaOff()
    }

     await buscarCardsAgendaOff()

    if (dados.ok) {
      setAgenda(dados.resultado)
      return
    }

    console.log(dados)
  }

  useEffect(() => { pesquisaAPI() }, [atualizar])

  // ------------------------------
  // FUNÇÃO DE PARTICIPAR DO EVENTO
  // ------------------------------
  async function participar(evento) {

    if (!user || !user.token) {
      setAlerta({mensagem:"Você precisa fazer login para participar"})
      setModalLogin(true)
      return
    }

    const resposta = await participarEvento(user.token, evento.id_evento)

    if (resposta.ok) {
      setAlerta({mensagem:resposta.mensagem, icon:"ok"})
      
      setAtualiza(atualizar? false: true)
    } else {
      setAlerta({mensagem:resposta.mensagem, icon:"erro"})
    }
  }

  return (
    <div className='Agenda-cont'>
      <div>
        <Header />
        {modalLogin && <Login />}
      </div>

      <div className='Cont-MenuPesq'>
        <MenuPesq />
      </div>

      <div className='Cards-Eventos'>
        
        {agenda.length > 0 &&
          agenda.map((evento, index) => (
            user ? (
              <CardsAgendaOn
                key={index}
                nomeTrilha={evento.nomeTrilha}
                data={new Date(evento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                horario={evento.horário}
                vagas={evento.vagasDisp}
                participar={() => participar(evento)}
              />
            ) : (
              <CardsAgendaOff
                key={index}
                nomeTrilha={evento.nomeTrilha}
                data={new Date(evento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                horario={evento.horário}
                vagas={evento.vagasDisp}
                abrirLogin={() => setModalLogin(true)}
              />
            )
          ))
        }

      </div>
    </div>
  )
}

export default Eventos
