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
import cadastrarEvento from '../../server/inserirDados/cadastrarEvento'




function Trilhas() {
  const { user, modalLogin, setModalLogin, regTrilhas, setRegiao } = useContext(Mycontext)

  const [TrilhasBD, setTrilhasBD] = useState([])

  const [trilhaSelecionada, setTrilhaSelecionada] = useState(null)
  const [modalMarcarTrilha, setModalMarcarTrilha] = useState(false)

  const [dataTrilha, setDataTrilha] = useState("")
  const [horaTrilha, setHoraTrilha] = useState("")
  const [pntEnc, setPntEnc] = useState("")
  const [nPart, setNPart] = useState(1)


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
      console.log("Inf TRILHAS", infsTrilhas);
      return
    }
    console.log(`Erro ao fazer a busca ${infsTrilhas}`);
  }

  function validarDiaHora(dataStr, horaStr) {
    const agora = new Date();
    const dataHora = new Date(`${dataStr}T${horaStr}`);

    return dataHora >= agora;
  }
  function validarHora(e) {
    const value = e.target.value;

    if (!dataTrilha) return;

    if (validarDiaHora(dataTrilha, value)) {
      setHoraTrilha(value);
    } else {
      alert("O horário não pode ser anterior ao horário atual.");
    }
  }

  async function salvarTrilhaMarcada() {
    if (!dataTrilha || !horaTrilha || !pntEnc) {
      alert("Certifique-se de que você preencheu todos os campos")
      return
    }

    const marcarTrilha = {
      index: trilhaSelecionada.id_trilha,

      nomeTrilha: trilhaSelecionada.nomeTrilha,
      pontoInicial: trilhaSelecionada.pontoInicial,
      pontoFinal: trilhaSelecionada.pontoFinal,
      distancia: trilhaSelecionada.distância,
      tempo: trilhaSelecionada.tempo,
      relevo: trilhaSelecionada.tipoRelevo,
      dificuldade: trilhaSelecionada.dificuldade,

      dia: dataTrilha,
      horario: horaTrilha,
      pontoEncontro: pntEnc,
      participantes: nPart
    }

    console.log("Dados da Trilha Marcada", marcarTrilha)

    const result = await cadastrarEvento(user.token, marcarTrilha)

    console.log("RETORNO DA API:", result); 
    if (result.ok) {
      alert("Trilha Marcada com Sucesso!")
    } else {
      alert(result.mensagem)
    }

    
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

                  <div className='ModalContent-Sup'>

                    <div className='ContentSup-Esq'>
                      <h2>{trilhaSelecionada.nomeTrilha}</h2>

                      <p>Ponto inicial: {trilhaSelecionada.pontoInicial}</p>
                      <p>Ponto final: {trilhaSelecionada.pontoFinal}</p>
                      <br></br>
                      <p>Distância: {trilhaSelecionada.distância}Km / Tempo: {trilhaSelecionada.tempo}</p>
                      <p>Dificuldade: {trilhaSelecionada.dificuldade} // Relevo: {trilhaSelecionada.tipoRelevo}</p>
                    </div>
                    <div className='ContentSup-Meio'>

                    </div>

                    <div className='ContentSup-Dir'>

                      <div className='SupDir-cima'>

                        <div className='SupDirCima-sup'>

                          <div className='SupDirCimaSup1'>

                            {/* Data */}
                            <div className="SupDirCimaSup1-campo1">
                              <label>Dia: </label>
                              <input
                                type="date"
                                value={dataTrilha}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDataTrilha(e.target.value)}
                              />
                            </div>

                            {/* Horário */}
                            <div className="SupDirCimaSup1-campo2">
                              <label>Horário:</label>
                              <input
                                type="time"
                                value={horaTrilha}
                                onChange={validarHora}
                                disabled={!dataTrilha} // só libera depois de escolher a data
                              />
                            </div>

                          </div>

                          <div className='SupDirCimaSup2'>
                            {/* Ponto de Encontro */}
                            <label>Ponto de Encontro:</label>
                            <textarea
                              value={pntEnc}
                              placeholder="Digite o local..."
                              onChange={(e) => setPntEnc(e.target.value)}
                            />
                          </div>

                        </div>

                        <div className='SupDirCima-inf'>
                          {/* Participantes */}
                          <h4>Participantes, você e mais:</h4>

                          <div className="controle-participantes">
                            <button onClick={() => setNPart(prev => Math.max(1, prev - 1))}>-</button>
                            <input
                              type="number"
                              value={nPart}
                              min="1"
                              onChange={(e) => setNPart(Math.max(1, Number(e.target.value)))}
                            />
                            <button onClick={() => setNPart(prev => prev + 1)}>+</button>
                          </div>

                        </div>

                      </div>

                      <div className='SupDir-baixo'>
                        <button onClick={salvarTrilhaMarcada}>Marcar Trilha</button>
                      </div>

                    </div>
                  </div>

                  <div className='ModalContent-Inf'>
                    <button onClick={() => setModalMarcarTrilha(false)}>Fechar</button>
                  </div>

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