import { useContext, useEffect, useRef, useState } from 'react'
import './modalMinhaTrilhaAgenda.css'
import buscarEventoCompleto from '../../../server/buscarInformacao/buscarEventoCompleto'
import { Mycontext } from '../../../context/ContextGlobalUser'

import Loading from '../../Loading/Loading';
import deixaParticiparEvento from '../../../server/alterarDados/deixaParticiparEvento';
import deletarEvento from '../../../server/deletarDados/deletarEvento';
import concluirEvento from '../../../server/alterarDados/concluirEvento';
import alterarDadosEvento from '../../../server/alterarDados/alterarDadosEvento';


function ModalTrilhaAgenda({ filtro, setFiltro, idTrilha, setAbriTrilha, setCarregarPg, carregarPg }) {

    const { setUser, setAlerta, setModalLogin, dadosEvento } = useContext(Mycontext)

    const [dados, setDados] = useState({})
    const user = JSON.parse(localStorage.getItem("user"))

    const [criador, setCriador] = useState({})

    const [participante, setParticipante] = useState(false)
    const [buscarNovasinformacoes, setbuscarNovasinformacoes] = useState(false)

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

                return p.classe === "C"
            })[0].nome)


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

    }, [buscarNovasinformacoes])

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

    const [iniciarEdicao, setIniciarEdicao] = useState(false)


    async function editarEvento() {
        setIniciarEdicao(!iniciarEdicao)

    }

    console.log(dados.id_evento);
    async function salvarEdicao() {


        const dadosAtualizados = {
            dia: dados.dia.split('T')[0],
            horario: dados.horario.slice(0, 8),
            vagas: dados.vagas,
            ponto_de_encontro: dados.pontoEncontro
        }
        
        const resposta = await alterarDadosEvento(user.token, dadosAtualizados,dados.id_evento)
        console.log(resposta);
        
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

                        <div className="contImgTitulo">
                            <div className='img-trilhaAgenda' style={{ backgroundImage: `url(../Imgs/banco/${dados.imagem})` }} >
                            </div>

                            <h2>{dados.nomeTrilha}</h2>

                        </div>

                        <div className="conteudo-modal">

                            <div className="linha-modal" />

                            {!iniciarEdicao ? <div>
                                <h3>Data de Início: {dados.dia.split('T')[0].split('-').reverse().join('/')}</h3>
                                <h3>Hora de Início: {dados.horario.slice(0, 5)} h</h3>
                                <h3>Local: {dados.ponto_partida}</h3>
                                <h3>Ponto de Encontro: {dados.pontoEncontro}</h3>
                                <h3>Criador: {criador}</h3>
                                <h3>Vagas disponíveis: {dados.vagasDisp}</h3>
                                {participante.length > 0 && <h3>Participantes:  {participante.map(p => <strong key={participante.id_usuario}>
                                    {`${p.nome},`}</strong>)}</h3>}
                            </div> :

                                <div>
                                    <label>
                                        Data de Início:
                                        <input type="date" value={dados.dia.split('T')[0]} onChange={(e) => setDados({ ...dados, dia: e.target.value })} />
                                    </label>

                                    <label >
                                        Hora de Início:
                                        <input type="time" value={dados.horario.slice(0, 5)} onChange={(e) => setDados({ ...dados, horario: e.target.value })} />
                                    </label>

                                    <label>
                                        Quantidade de Participantes:
                                        <input type="number" value={dados.vagas} onChange={(e) => setDados({ ...dados, vagas: e.target.value })} />
                                    </label>

                                    <label>
                                        Ponto de Encontro:
                                        <input type="text" value={dados.pontoEncontro} onChange={(e) => setDados({ ...dados, pontoEncontro: e.target.value })} />
                                    </label>

                                </div>}

                        </div>

                        {!filtro ?
                            <div className='butons_Criador'>

                                <button className='btn-canelarInscricao' onClick={() => cancelarIncricao(dados.id_evento)} >Cancelar Inscrição</button>
                            </div>
                            :
                            <div className='butons_Criador'>
                                {!iniciarEdicao ? <div className='butons_Criador'>

                                    <button className='bnt-delete' onClick={deletaEvento} >Deletar</button>
                                    <button className='bnt-editar' onClick={editarEvento} >Editar</button>
                                    <button className='bnt-finalizar' onClick={finalizarEvento} >Finalizar</button>
                                </div> :

                                    <div className='butons_Criador'>
                                        <button className='bnt-editar' onClick={editarEvento} >Cancelar</button>
                                        <button className='bnt-finalizar' onClick={salvarEdicao} >Salvar</button>
                                    </div>}

                            </div>
                        }

                    </div>



                }




            </div>



        </div>
    )
}

export default ModalTrilhaAgenda
