import { useContext, useEffect, useRef, useState } from 'react'
import './modalMinhaTrilhaAgenda.css'
import buscarEventoCompleto from '../../../server/buscarInformacao/buscarEventoCompleto'
import { Mycontext } from '../../../context/ContextGlobalUser'

import Loading from '../../Loading/Loading';
import deixaParticiparEvento from '../../../server/alterarDados/deixaParticiparEvento';


function ModalTrilhaAgenda({ estadoPagina, recaregar,idTrilha, setAbriTrilha }) {

    const { setUser, setAlerta,setModalLogin } = useContext(Mycontext)

    const [dados, setDados] = useState({})
    const user = JSON.parse(localStorage.getItem("user"))
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
            recaregar(!estadoPagina)
            setAbriTrilha(false)
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
    return (
        <div className='body-modalTrilhaAgenda'>

            <div className="cont-modalTrilhaAgenda" ref={minhaRed}>

                {carregando ?

                    <Loading />
                    :
                    <div className="cont-TrilhaAgenda">
                    
                    <button onClick={()=>cancelarIncricao(dados.id_evento)} >Cancelar Inscrição</button>


                    </div>



                }




            </div>



        </div>
    )
}

export default ModalTrilhaAgenda
