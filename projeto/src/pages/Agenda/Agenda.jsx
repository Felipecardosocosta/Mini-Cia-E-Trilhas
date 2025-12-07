import { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import { Mycontext } from '../../context/ContextGlobalUser'
import CardsAgendaOn from '../../components/Cards/CardsAgendaOn'
import CardsAgendaOff from '../../components/Cards/CardsAgendaOff'
import buscarCardsAgendaOff from '../../server/buscarInformacao/buscarCardsAgendaOff'
import participarEvento from '../../server/inserirDados/participarEvento'
import buscarCardsAgendaOn from '../../server/buscarInformacao/buscarCardsAgendaOn'
import buscarDadosUsuario from '../../server/buscarInformacao/buscarDadosUsuario'
import MenuPesqAg from '../../components/MenuPesq/MenuPesqAg'
import './Agenda.css'

function Eventos() {

  const { modalLogin, setModalLogin, user, setUser, setAlerta, regTrilhas, filtroTipo, filtroOrdem, setInfouser, setMeusDados, barraPesq } = useContext(Mycontext)

  const [agenda, setAgenda] = useState([])
  const [atualizar, setAtualiza] = useState(false)
  const [carregando, setCarregando] = useState(false)

  async function pucharDados() {
    if (!user || !user.token) return

    setCarregando(true);
    const dados = await buscarDadosUsuario(user.token)
    console.log("Dados do usuário:", dados)

    if (dados.ok) {
      setInfouser(dados.result)
      setCarregando(false)
      return;
    }

    if (dados.mensagem === "Token Invalido ou expirado") {
      setAlerta({ mensagem: "Necessário fazer o login novamente", icon: 'erro' })
      setUser(false)
      setMeusDados(false)
      localStorage.removeItem("user")
    }

    setCarregando(false);
  }

  async function pesquisaAPI() {
    let dados;
    const localuser = JSON.parse(localStorage.getItem("user"))

    if (localuser && localuser.token) {
      dados = await buscarCardsAgendaOn(localuser.token)
    } else {
      dados = await buscarCardsAgendaOff()
    }

    if (dados.ok) {
      setAgenda(dados.resultado)
    }

  }

  

  useEffect(() => {

    async function carregar() {
      await pucharDados()
      await pesquisaAPI()
    }

    carregar();

  }, [atualizar])


let eventosFiltrados = agenda.filter((evento) => {
  if (regTrilhas === 'Regiões') return true
  return evento.regiao === regTrilhas
})

// 🔎 FILTRO DA BARRA DE PESQUISA
if (barraPesq && barraPesq.trim() !== "") {
  eventosFiltrados = eventosFiltrados.filter((evento) =>
    evento.nomeTrilha.toLowerCase().includes(barraPesq.toLowerCase())
  )
}

let eventosOrdenados = [...eventosFiltrados]


  function parseData(dataStr) {
    return new Date(dataStr).getTime()
  }

  if (filtroTipo && filtroOrdem) {

    eventosOrdenados.sort((a, b) => {
      let valA, valB

      if (filtroTipo === "data") {
        valA = parseData(a.data)
        valB = parseData(b.data)
      }

      if (filtroTipo === "vagas") {
        valA = Number(a.vagasDisp)
        valB = Number(b.vagasDisp)
      }

      return filtroOrdem === "asc" ? valA - valB : valB - valA;
    })

  }

  async function participar(evento) {

    if (!user || !user.token) {
      setAlerta({ mensagem: "Você precisa fazer login para participar" })
      setModalLogin(true)
      return;
    }

    const resposta = await participarEvento(user.token, evento.id_evento)

    if (resposta.ok) {
      setAlerta({ mensagem: resposta.mensagem, icon: "ok" })
      setAtualiza(prev => !prev)
    } else {
      setAlerta({ mensagem: resposta.mensagem, icon: "erro" })
    }
  }

  return (
    <div>

      <Header  agenda={true} />
      {modalLogin && <Login />}

      <div className='Agenda-cont'>

        <div className='Cont-MenuPesq'>
          <MenuPesqAg />
        </div>

        <div className='Cards-Agenda'>

          {eventosOrdenados.length === 0 ? (

  <div className="msg-sem-eventos">
    Nenhuma trilha encontrada no momento.
  </div>

) : (

  eventosOrdenados.map((evento, index) => (
    user ? (
      <CardsAgendaOn
      image={`../Imgs/banco/${evento.imagem}`}
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

)}


        </div>

      </div>

    </div>
  )
}

export default Eventos
