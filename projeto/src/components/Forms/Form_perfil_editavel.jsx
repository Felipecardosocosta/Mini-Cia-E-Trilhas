import React, { useEffect, useState } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import { SlClose } from "react-icons/sl";
import { VscAccount } from 'react-icons/vsc'
import alterarDadosUser from '../../server/alterarDados/alterarDadosUser';



function Form_perfil_editavel({editar, setEditar}) {
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const { infouser, setInfouser, setMeusDados, user } = React.useContext(Mycontext)

    useEffect(()=>{ 
        console.log(infouser);
        
        setEmail(infouser.email)
        if (infouser.num_celular) {
            
            setTelefone(infouser.num_celular)
        }

    },[])

    async function salvardados(){

        const dadosAtualizados = {
          email,
          celular:telefone,
          senha: '1'
        };
          if (!dadosAtualizados.email || !dadosAtualizados.celular ) {
            
            return alert("Preencha os campos")
        }
        const resposta = await alterarDadosUser(user.token, dadosAtualizados);

        console.log(resposta);
        

        if(!resposta.ok){
            alert(`mensagem de erro é :  ${resposta.mensagem}`)
            return
        }

        alert("Dados alterados com sucesso")
        setEditar(false)
        return
    }

    return (


        <>

            <button className='close_button' onClick={() => setMeusDados(false)}><SlClose color='#fff' /></button>
            <div>
                <div className='icone_nome'>
                    <VscAccount size={90} />

                    <h1>{infouser.nome}</h1>

                </div>

                <div className='linha'></div>
                <div className='dados_usuario'>
                    <p>Nome: {infouser.nome}</p>
                    <p>CPF: {infouser.cpf}</p>
                    <label style={{gap:'2rem'}}> E-mail: <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder=''/></label>
                    <label>Telefone: <input type="tel" value={telefone} onChange={(e)=> {setTelefone(e.target.value)}} placeholder='Ex: (48)99999-9999' /></label>
                    <button className='botao_editar' onClick={salvardados}>Salvar Dados</button>
                    <button className='botao_voltar' onClick={() => setEditar(false)}>Voltar</button>

                </div>
            </div>

        </>
    )
}

export default Form_perfil_editavel