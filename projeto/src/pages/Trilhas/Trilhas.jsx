import './Trilhas.css'
import Header from '../../components/Header/Header'
import { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import Login from '../../components/Login/Login'
import MenuPesq from '../../components/MenuPesq/MenuPesq'
import CardsTrilhaOff from '../../components/Cards/CardsTrilhaOff'
import buscarCardsTrilhaOff from '../../server/buscarInformacao/buscarCardsTrilhaOff'
import buscarCardsTrilhaOn from '../../server/buscarInformacao/buscarCardsTrilhaOn'
import CardsTrilhaOn from '../../components/Cards/CardsTrilhaOn'



function Trilhas() {
  const { user, modalLogin, setModalLogin, regTrilhas, setRegiao } = useContext(Mycontext)
  const [TrilhasBD, setTrilhasBD] = useState([])

  const [trilhaSelecionada, setTrilhaSelecionada] = useState(null)
  const [modalMarcarTrilha, setModalMarcarTrilha] = useState(false)


  useEffect(() => { pesquisaAPI() }, [user])

  async function pesquisaAPI(params) {
    let infsTrilhas
    if (user) {
      infsTrilhas = await buscarCardsTrilhaOn(user.token)
    } else {
      infsTrilhas = await buscarCardsTrilhaOff()
    }

    if (infsTrilhas.ok) {
      setTrilhasBD(infsTrilhas.result)
      console.log(infsTrilhas);
      return
    }
    console.log(`Erro ao fazer a busca ${infsTrilhas}`);
  }

  return (
    <div>
      <div>
        <Header />
        {modalLogin && <Login />}
      </div>

      <div className='Trilha-cont'>

        <MenuPesq />

        <div className='Cont-cards'>

          <div className='Cards-trilhas'>
            {console.log("AQUI =>", TrilhasBD)}

            {TrilhasBD.length > 0 && TrilhasBD.map((trilha, index) => (
              user ? (
                <CardsTrilhaOn
                  ind={index}
                  tri={trilha.nomeTrilha}
                  ini={trilha.pontoInicial}
                  fim={trilha.pontoFinal}
                  dis={trilha.distância}
                  tmp={trilha.tempo}
                  rlv={trilha.tipoRelevo}
                  dif={trilha.dificuldade}
                  abrirModal={() => { setTrilhaSelecionada(trilha), setModalMarcarTrilha(true) }}
                />
              ) : (
                <CardsTrilhaOff
                  nome={trilha.nomeTrilha}
                  dis={trilha.distância}
                  tmp={trilha.tempo}
                  dif={trilha.dificuldade}
                />
              )
            ))}

            {modalMarcarTrilha && trilhaSelecionada && (
              <div className="ModalTrilha">
                <div className="ModalContent">
                  <h2>{trilhaSelecionada.nomeTrilha}</h2>
                  <p>Ponto inicial: {trilhaSelecionada.pontoInicial}</p>
                  <p>Ponto final: {trilhaSelecionada.pontoFinal}</p>
                  <p>Distância: {trilhaSelecionada.distância}</p>
                  <p>Tempo: {trilhaSelecionada.tempo}</p>
                  <p>Dificuldade: {trilhaSelecionada.dificuldade}</p>
                  <p>Relevo: {trilhaSelecionada.tipoRelevo}</p>

                  <button onClick={() => setModalMarcarTrilha(false)}>Marcar Trilha</button>
                  <button onClick={() => setModalMarcarTrilha(false)}>Fechar</button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

export default Trilhas