import React from 'react'
import axios from 'axios'
const alterarDadosEvento = async(token,dadosEvento,idEvento) => {
    console.log(idEvento);
    
     if (!token) {

        return {ok:false, mensagem: "Erro necessário token" }

    }

    try {

        const resultado = await axios.put(`https://api-mine-cia.vercel.app/modificar/evento/atualizar/id/${idEvento}`, dadosEvento,
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
        console.log(error);
        
        if (error.response) {
            
            return {ok:false, mensagem: error.response.data.mensagem}
        }

        return {ok:false, error:error,mensagem:"Sem resposta do servidor"}
        
    }
  
}

export default alterarDadosEvento
