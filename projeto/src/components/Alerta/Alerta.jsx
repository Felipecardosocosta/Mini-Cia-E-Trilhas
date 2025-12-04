import React from 'react'
import './alerta.css'

function Alerta({setAlerta, tempo,icon , mensagem , tipo = true || false}) {



    

    if (!setAlerta) {
        alert("Precisa mandar o setAlerta para funcionar")
        return
    }

    let tempoAbetura = 115000

    if (tempo) {
        tempoAbetura = tempo
    }

    setTimeout(()=>{
    
        setAlerta(false)
    },tempoAbetura)


  return (
    <div className='cont-alerta'>

        <div className='alerta-conteudo' >


        {icon && (<div className='cont-icon' >{icon}</div>) }


        <div className='cont-mensagem'>
                  <h1 className='mensagem-alerta'>
            <span > {mensagem}</span>

            </h1>
        </div>
    
        </div>


    
    
    </div>
  )
}

export default Alerta
