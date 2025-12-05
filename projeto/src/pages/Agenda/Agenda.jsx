import { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import { Mycontext } from '../../context/ContextGlobalUser'
import CardsAgendaOn from '../../components/Cards/CardsAgendaOn'
import CardsAgendaOff from '../../components/Cards/CardsAgendaOff'
import buscarCardsAgendaOff from '../../server/buscarInformacao/buscarCardsAgendaOff'
import participarEvento from '../../server/inserirDados/participarEvento'
import './Agenda.css'
import buscarCardsAgendaOn from '../../server/buscarInformacao/buscarCardsAgendaOn'
import MenuPesqAg from '../../components/MenuPesq/MenuPesqAg'

function Eventos() {

  const [agenda, setAgenda] = useState([]);
  const [atualizar, setAtualiza] = useState(false);

  const { modalLogin, setModalLogin, user, setAlerta, regTrilhas, filtroTipo, filtroOrdem } = useContext(Mycontext);

  // ---------------------------------------------
  // FILTRO POR REGIÃO
  // ---------------------------------------------
  const eventosFiltrados = agenda.filter((evento) => {
    if (regTrilhas === 'Regiões') return true;
    return evento.regiao === regTrilhas;
  });

  // ---------------------------------------------
  // BUSCAR API
  // ---------------------------------------------
  async function pesquisaAPI() {
    const localStorege = JSON.parse(localStorage.getItem('user'));
    let dados;

    if (localStorege) {
      dados = await buscarCardsAgendaOn(localStorege.token);
    } else {
      dados = await buscarCardsAgendaOff();
    }

    if (dados.ok) {
      setAgenda(dados.resultado);
      return;
    }
  }

  useEffect(() => { pesquisaAPI() }, [atualizar]);

  // ---------------------------------------------
  // PARTICIPAR DO EVENTO
  // ---------------------------------------------
  async function participar(evento) {

    if (!user || !user.token) {
      setAlerta({ mensagem: "Você precisa fazer login para participar" });
      setModalLogin(true);
      return;
    }

    const resposta = await participarEvento(user.token, evento.id_evento);

    if (resposta.ok) {
      setAlerta({ mensagem: resposta.mensagem, icon: "ok" });
      setAtualiza(prev => !prev);
    } else {
      setAlerta({ mensagem: resposta.mensagem, icon: "erro" });
    }
  }

  // ---------------------------------------------
  // FILTRO DE DATA E Nº DE VAGAS (IGUAL TRILHAS)
  // ---------------------------------------------

  let eventosOrdenados = [...eventosFiltrados];

  function parseData(dataStr) {
    return new Date(dataStr).getTime();
  }

  if (filtroTipo && filtroOrdem) {

    eventosOrdenados = eventosOrdenados.sort((a, b) => {
      let valA, valB;

      if (filtroTipo === "data") {
        valA = parseData(a.data);
        valB = parseData(b.data);
      }

      if (filtroTipo === "vagas") {
        valA = Number(a.vagasDisp);
        valB = Number(b.vagasDisp);
      }

      return filtroOrdem === "asc" ? valA - valB : valB - valA;
    });

  }

  // ---------------------------------------------
  // RENDER
  // ---------------------------------------------
  return (
    <div>
      <div> <Header /> {modalLogin && <Login />} </div>

      <div className='Agenda-cont'>
        
        <div className='Cont-MenuPesq'> <MenuPesqAg /> </div>

      <div className='Cards-Agenda'>

        {eventosOrdenados.length > 0 &&
          eventosOrdenados.map((evento, index) => (
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

    </div>

    
  )
}

export default Eventos
