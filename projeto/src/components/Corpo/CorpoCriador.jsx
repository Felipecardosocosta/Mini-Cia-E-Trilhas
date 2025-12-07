import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import CardEvento from './CardEvento'
import buscarCardsMinhaAgendaCriador from '../../server/buscarInformacao/buscarCardsMinhaAgendaCriador'
import './corpoCriador.css'

function CorpoCriador({setFiltro,setIdEditar, setAbriTrilha, idEditar,setCarregarPg,carregarPg}) {

    const [dados, setDados] = useState([])

    const { setAlerta, setModalLogin, setUser } = useContext(Mycontext)

    const [semEventos, setSemEventos] = useState(false)


    useEffect(() => {

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


        buscarDadosCriador()

        console.log(dados);
        


    },[carregarPg])

    function abriTrilha(id) {
        setIdEditar(id)
        setFiltro(true)
        setAbriTrilha(true)
        
    }

    if (semEventos) {
        return (

            <div className='corpo-criador'>

                <div className='nenhum-evento'>
                    <h3>Nenhum evento agendado no momento</h3>
                </div>

            </div>
        )

    }

    return (
        <div className='corpo-criador'>
                <h1 className='opcaoAberta' >Organizador</h1>
                
                <div className="cont-cards">


               {dados.map((item) => (
                <CardEvento 
                key={item.id_evento} 
                title={item.nomeTrilha} 
                day={item.data.slice(8,10)+'/'+item.data.slice(5,7)} 
                time={item.horário.slice(0,5)} 
                vacancies={item.vagasDisp} 
                image={'../Imgs/banco/lagoinhaDoLeste.jpg'} 
                onDetails={() => {abriTrilha(item.id_evento)}}/>
            ))}


                </div>

                

        </div>
    )
}

export default CorpoCriador







// dia
// : 
// "2025-12-16T00:00:00.000Z"
// dificuldade
// : 
// 4
// distancia
// : 
// "4.20"
// horario
// : 
// "20:02:00"
// id_evento
// : 
// 94
// nomeTrilha
// : 
// "Trilha da Lagoinha do Leste"
// participantes
// : 
// [{…}]
// pontoEncontro
// : 
// "dscsdc"
// ponto_chegada
// : 
// "Praia da Lagoinha do Leste"
// ponto_partida
// : 
// "Pântano do Sul"
// vagas
// : 
// 3
// vagasDisp
// : 
// 3
// [[Prototype]]
// : 
// Obj