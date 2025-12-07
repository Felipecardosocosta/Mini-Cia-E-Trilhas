import { useContext, useEffect, useRef, useState } from 'react'
import './modalMinhaTrilhaAgenda.css'
import buscarEventoCompleto from '../../../server/buscarInformacao/buscarEventoCompleto'
import { Mycontext } from '../../../context/ContextGlobalUser'

import Loading from '../../Loading/Loading';
import deixaParticiparEvento from '../../../server/alterarDados/deixaParticiparEvento';
import deletarEvento from '../../../server/deletarDados/deletarEvento';
import concluirEvento from '../../../server/alterarDados/concluirEvento';


function ModalTrilhaAgenda({ filtro, setFiltro, idTrilha, setAbriTrilha, setCarregarPg, carregarPg }) {

    const { setUser, setAlerta, setModalLogin } = useContext(Mycontext)

    const [dados, setDados] = useState({})
    const user = JSON.parse(localStorage.getItem("user"))

    const [criador, setCriador] = useState({})

    const [participante, setParticipante] = useState(false)


    const [carregando, setCarregando] = useState(true)


    async function buscarInfs() {


        if (!user) {

            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            return
        }
        setCarregando(true)
        const infos = await buscarEventoCompleto(user.token, idTrilha)

        if (infos.ok) {

            setDados(infos.result)
            setCarregando(false)
            setParticipante(infos.result.participantes.filter(p => p.classe === "P"))


            setCriador(infos.result.participantes.filter(p => {  
                console.log(p);
                
                return p.classe === "C"})[0].nome )


            console.log(participante);
            

            return
        }

        console.error(dados.error);

        if (infos.mensagem === "Token Invalido ou expirado") {

            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            setModalLogin(true)
            setAbriTrilha(false)
            localStorage.removeItem('user')
            return


        }
        setAbriTrilha(false)
        setCarregando(false)
        setAlerta({ mensagem: infos.mensagem, icon: 'erro' })
        return


    }

    async function cancelarIncricao(idEvento) {

        const localStorege = JSON.parse(localStorage.getItem('user'))
        if (!localStorege) {

            setAlerta({ mensagem: 'Erro Recarregue a pagina', icon: erro })

            return

        }

        console.log(localStorege.token);



        const cancelando = await deixaParticiparEvento(localStorege.token, idEvento)


        if (cancelando.ok) {

            setAlerta({ mensagem: cancelando.mensagem, icon: 'ok' })
            setAbriTrilha(false)
            setCarregarPg(!carregarPg)
            return
        }

        if (cancelando.mensagem === "Token Invalido ou expirado") {

            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setModalLogin(true)
            setUser(false)
            localStorage.removeItem('user')

            return


        }
        console.log(cancelando.error);

        setAlerta({ mensagem: cancelando.mensagem, icon: "erro" })

    }



    const minhaRed = useRef(null)

    useEffect(() => {
        buscarInfs()

        function verificar(event) {

            if (minhaRed.current && !minhaRed.current.contains(event.target)) {
                setAbriTrilha(false)
            }

        }

        document.addEventListener("mousedown", verificar)

        return () => {
            document.removeEventListener("mousedown", verificar)
        }

    }, [])

    const localStorege = JSON.parse(localStorage.getItem('user'))


    async function deletaEvento() {


        if (!localStorege) {

            setAlerta({ mensagem: 'Erro Recarregue a pagina', icon: "erro" })
            return
        }

        const deletando = await deletarEvento(localStorege.token, dados.id_evento)

        if (deletando.ok) {

            setAlerta({ mensagem: deletando.mensagem, icon: 'ok' })
            setAbriTrilha(false)
            setCarregarPg(!carregarPg)
            return
        }


        if (deletando.mensagem === "Token Invalido ou expirado") {

            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setModalLogin(true)
            setUser(false)
            localStorage.removeItem('user')

        }

        setAlerta({ mensagem: deletando.mensagem, icon: "erro" })

    }



    async function ediatarEvento() {

        if (!localStorege) {

            setAlerta({ mensagem: 'Erro Recarregue a pagina', icon: "erro" })
            return
        }




    }

    async function finalizarEvento() {
        if (!localStorege) {

            setAlerta({ mensagem: 'Erro Recarregue a pagina', icon: "erro" })
            return
        }


        const finalizar = await concluirEvento(localStorege.token, dados.id_evento, true)

        if (finalizar.ok) {
            setAlerta({ mensagem: finalizar.mensagem, icon: 'ok' })
            setAbriTrilha(false)
            setCarregarPg(!carregarPg)
            return
        }
        if (finalizar.mensagem === "Token Invalido ou expirado") {

            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setModalLogin(true)
            setUser(false)
            localStorage.removeItem('user')


        }

        setAlerta({ mensagem: finalizar.mensagem, icon: "erro" })

    }









    return (
        <div className='body-modalTrilhaAgenda'>

            <div className="cont-modalTrilhaAgenda" ref={minhaRed}>

                {carregando ?

                    <Loading />
                    :
                    <div className="cont-TrilhaAgenda">
                        <div className='img-trilhaAgenda' style={{ backgroundImage: `url(../Imgs/banco/lagoinhaDoLeste.jpg)` }} >

                        </div>

                        <h2>{dados.nomeTrilha}</h2>
                        <h3>Data de Início: {dados.dia.split('T')[0].split('-').reverse().join('/')}</h3>
                        <h3>Hora de Início: {dados.horario.slice(0, 5)} h</h3>
                        <h3>Local: {dados.ponto_partida}</h3>
                        <h3>Criador: {criador}</h3>
                        <h3>Participantes: {participante.length > 0 && participante.map(p => <strong key={participante.id_usuario}>
                            {`${p.nome},`}</strong>)}</h3>

                        {!filtro ?
                            <button className='btn-canelarInscricao' onClick={() => cancelarIncricao(dados.id_evento)} >Cancelar Inscrição</button>
                            :
                            <div className='butons_Criador'>

                                <button className='bnt-delete' onClick={deletaEvento} >Deletar</button>
                                <button className='bnt-editar' onClick={ediatarEvento} >Editar</button>
                                <button className='bnt-finalizar' onClick={finalizarEvento} >Finalizar</button>

                            </div>
                        }

                    </div>



                }




            </div>



        </div>
    )
}

export default ModalTrilhaAgenda
