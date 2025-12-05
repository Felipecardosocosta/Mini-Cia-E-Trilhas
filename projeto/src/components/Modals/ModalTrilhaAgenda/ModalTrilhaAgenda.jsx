import { useContext, useEffect, useRef, useState } from 'react'
import './modalMinhaTrilhaAgenda.css'
import buscarEventoCompleto from '../../../server/buscarInformacao/buscarEventoCompleto'
import { Mycontext } from '../../../context/ContextGlobalUser'
import { ClimbingBoxLoader } from "react-spinners";


function ModalTrilhaAgenda({ idTrilha, setAbriTrilha }) {

    const { setUser, setAlerta } = useContext(Mycontext)

    const [dados, setDados] = useState({})
    const user = JSON.parse(localStorage.getItem("user"))
    const [carregando, setCarregando] = useState(true)

    async function buscarInfs() {
        if (!user) {

            setAlerta({ mensagem: "Tempo de login expirado", icon: "erro" })
            setUser(false)
            return
        }
        // setCarregando(true)
        const infos = await buscarEventoCompleto(user.token, idTrilha)

        if (infos.ok) {

            setDados(infos.result)
            // setCarregando(false)
            return
        }
        // setCarregando(false)
        setAlerta({ mensagem: infos.mensagem, icon: 'erro' })
        return


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

                    <div className='carregando'>
                        <ClimbingBoxLoader
                            color='#fff'
                            cssOverride={{}}
                            speedMultiplier={1.5}
                        />
                    </div>
                    :


                    <h1>olaaa</h1>

                }




            </div>



        </div>
    )
}

export default ModalTrilhaAgenda
