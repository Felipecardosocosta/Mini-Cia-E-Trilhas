import { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import buscarCardsMinhaAgenda from '../../server/buscarInformacao/buscarCardsMinhaAgenda'
import CardEvento from './CardEvento'





function CorpoParticipante({setFiltro,setIdEditar, setAbriTrilha, idEditar,setCarregarPg,carregarPg}) {

    const [dados, setDados] = useState([])

    const { setAlerta, setModalLogin, setUser } = useContext(Mycontext)

    const [semEventos, setSemEventos] = useState(false)


    useEffect(() => {

        async function buscarDados() {

            const localUser = JSON.parse(localStorage.getItem('user'))
            if (localUser) {

                const dadosCriador = await buscarCardsMinhaAgenda(localUser.token)


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


        buscarDados()

        console.log(dados);
        


    },[carregarPg])

    function abriTrilha(id) {
        setIdEditar(id)
        setAbriTrilha(true)
        setFiltro(false)
        
    }

    if (semEventos) {
        return (

            <div className='corpo-criador'>
                <h1 className='opcaoAberta' >Participante</h1>
                <div className='nenhum-evento'>
                    <h3>Nenhum evento agendado no momento</h3>
                </div>

            </div>
        )

    }

    return (
        <div className='corpo-criador'>

             <h1 className='opcaoAberta' >Participante</h1>

                <div className="cont-cards">

               {dados.map((item) => (
                <CardEvento 
                key={item.id_evento} 
                title={item.nomeTrilha} 
                day={item.data.slice(8,10)+'/'+item.data.slice(5,7)} 
                time={item.horário.slice(0,5)} 
                vacancies={item.vagasDisp} 
                image={`../Imgs/banco/${item.imagem}`} 
                onDetails={() => {abriTrilha(item.id_evento)}}/>
            ))}


                </div>

                

        </div>
    )
}

export default CorpoParticipante
