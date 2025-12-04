import React, { useContext, useEffect, useRef } from 'react'
import './Perfil.css'
import Form_perfil from '../Forms/Form_perfil'
import { Mycontext } from '../../context/ContextGlobalUser'

function Perfil() {

  const { setMeusDados } = useContext(Mycontext)
  const minhaReferencia = useRef(null)

  useEffect(() => {
    function verificar(event) {

      if (minhaReferencia.current && !minhaReferencia.current.contains(event.target)) {

        setMeusDados(false)

      }
    }

    document.addEventListener("mousedown", verificar)

    return () => {
      document.removeEventListener("mousedown", verificar)
    }

  }, [])

  return (



    <div className='cont-perfil-body'>

      <div className='const-perfil' ref={minhaReferencia}>

        <Form_perfil />

      </div>

    </div>
  )
}

export default Perfil