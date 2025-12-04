import React, { useEffect, useRef } from 'react'
import './alerta.css'
import { BsCheck2Circle } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";

function Alerta({ setAlerta, tempo, icon, mensagem, tipo = true || false }) {


    const icons = {
        'ok': <BsCheck2Circle className='alerta-ok'/>,
        'erro':<BiSolidError  className='alerta-error'/>,

    }


    if (!setAlerta) {
        alert("Precisa mandar o setAlerta para funcionar")
        return
    }

    let tempoAbetura = 6000

    if (tempo) {
        tempoAbetura = tempo
    }

    setTimeout(() => {

        setAlerta(false)
    }, tempoAbetura)


    const minhaRef = useRef(null)

    useEffect(()=>{
        function verificar(e) {
            if (minhaRef.current&& !minhaRef.current.contains(e.target)) {
                setAlerta(false)
            }
            
        }

        document.addEventListener('mousedown',verificar)

        return ()=> document.addEventListener("mousedown",verificar)

    },[])


    return (
        <div className='cont-alerta'>

            <div className='alerta-conteudo' ref={minhaRef} >


                {icon && (<div className='cont-icon' >{icons[icon]}</div>)}


                <div className='cont-mensagem'>
                    <h1 className='mensagem-alerta'>
                        {mensagem}

                    </h1>
                </div>

            </div>




        </div>
    )
}


export default Alerta
