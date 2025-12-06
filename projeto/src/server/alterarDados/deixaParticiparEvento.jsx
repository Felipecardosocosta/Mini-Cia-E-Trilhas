import React from 'react'
import axios from 'axios'

const deixaParticiparEvento = async(token,idEvento) => {

  if (!token) {

        return {ok:false, mensagem: "Erro necessário token" }

    }

    try {

        const resultado = await axios.put(`https://api-mine-cia.vercel.app/cancelar/participacao/evento/id/${idEvento}`,{},
            {
                headers: {
                    authorization: token,
                    "Content-Type": "application/json"
                }
            })
            
            if (resultado.status===200) {

                return {ok:true, mensagem:resultado.data.mensagem}
            }

    } catch (error) {
        console.error(error);
        
        if (error.response.data.mensagem) {
            
            return {ok:false, mensagem: error.response.data.mensagem}
        }

        return {ok:false, error:error,mensagem:"Sem resposta do servidor"}
        
    }
  
}


export default deixaParticiparEvento
