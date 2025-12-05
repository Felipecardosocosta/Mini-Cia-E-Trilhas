import  { useContext, useEffect, useRef, useState } from 'react'
import './modalMinhaTrilhaAgenda.css'
import buscarEventoCompleto from '../../../server/buscarInformacao/buscarEventoCompleto'
import { Mycontext } from '../../../context/ContextGlobalUser'

function ModalTrilhaAgenda({idTrilha,setAbriTrilha}) {

    const{setUser, setAlerta}= useContext(Mycontext)

    const [dados , setDados] = useState({})
    const user = JSON.parse(localStorage.getItem("user"))

    async function buscarInfs() {
        if (!user) {

            setAlerta({mensagem:"Tempo de login expirado", icon:"erro"})
            setUser(false)
            return
        }
        
        const infos = await buscarEventoCompleto(user.token)

        if(infos.ok){

            setDados(infos.result)
            return
        }

        setAlerta({mensagem:infos.mensagem , icon:'erro'})
        return

        
    }

    const minhaRed = useRef(null)

    useEffect(()=>{
        buscarInfs()

        function verificar(event) {

            if (minhaRed.current&&!minhaRed.current.contains(event.target)) {
                setAbriTrilha(false)
            }
            
        }

        document.addEventListener("mousedown",verificar)

        return()=>{
            document.removeEventListener("mousedown",verificar)
        }

    },[])
  return (
    <div className='body-modalTrilhaAgenda'>
        
        <div className="cont-modalTrilhaAgenda" ref={minhaRed}>
        
        



        </div>



    </div>
  )
}

export default ModalTrilhaAgenda
