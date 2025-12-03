import React from 'react'
 import './form_alterarSenha.css'
 import { RiLock2Fill } from "react-icons/ri";
import { Mycontext } from '../../../context/ContextGlobalUser';


function Form_alterarSenha() {
   const {user,setUser, setModalLogin, setModalPerfil,modalPerfil,meusDados, setMeusDados, setModalPerfi, setAlterarSenha } = React.useContext(Mycontext)
  return (
    <div className='fundo_modal_alter'>
        <div className='modal_alterarSenha'>

            <div className='icone_h1'>
              <div className='circulo_lock'>
              <RiLock2Fill/>
              </div>
                <h1 className='testeH1'>ALTERAR SENHA</h1>
            </div>

            <div className='alterarSenha_inputs'>
              <div className='input_senhaAtual'>
                <label >Senha Atual;<input type="passsword" /></label>

              </div>
              <div className='input_senhaNova'>
                <input type="text" placeholder='Nova Senha:'/>
                <input type="text" placeholder='Confirme a Nova Senha'/>

              </div>
            <div className='buttons_alterarSenha'>

                <button className='button_cancelar' onClick={()=>setAlterarSenha(false)}>Calcelar</button>
                <button className='button_alterar'>Alterar Senha</button>
            </div>
            </div>
        </div>

    </div>
  )
}

export default Form_alterarSenha