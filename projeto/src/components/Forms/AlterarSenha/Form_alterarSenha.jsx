import React, { useState } from 'react'
import './form_alterarSenha.css'
import { RiLock2Fill } from "react-icons/ri";
import { Mycontext } from '../../../context/ContextGlobalUser';
import alterarSenhaUser from '../../../server/alterarDados/alterarSenhaUser';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";



function Form_alterarSenha() {
  const { user, setUser, setModalLogin, setModalPerfil, modalPerfil, meusDados, setMeusDados, setModalPerfi, setAlterarSenha, setAlerta } = React.useContext(Mycontext)
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarSenha2, setMostrarSenha2] = useState(false)
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false)


  async function salvarSenha() {
    if (!novaSenha || !confirmarNovaSenha || !novaSenha) {
      setAlerta({ mensagem: "Todos os campos são obrigatórios", icon: 'erro' })
      return
    }

    if (novaSenha !== confirmarNovaSenha) {
      alert("Deu merda")
      return
    }


    const alterar = await alterarSenhaUser(user.token, senha, novaSenha)

    if (alterar.ok) {
      setAlerta({ mensagem: alterar.mensagem, icon: 'ok' })

      setAlterarSenha(false)
      return
    }
    setAlerta({ mensagem: alterar.mensagem, icon: 'erro' })
  }


  return (
    <div className='fundo_modal_alter'>
      <div className='modal_alterarSenha'>

        <div className='icone_h1'>
          <div className='circulo_lock'>
            <RiLock2Fill />
          </div>
          <h1 className='testeH1'>ALTERAR SENHA</h1>
        </div>

        <div className='alterarSenha_inputs'>
          <div className='input_senhaAtual'>

            <label >

              Senha Atual;

              <input type={mostrarSenhaAtual ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} />
              {mostrarSenhaAtual ? <IoMdEye onClick={() => setMostrarSenhaAtual(false)} /> : <IoIosEyeOff onClick={() => setMostrarSenhaAtual(true)} />}

            </label>

          </div>

          <div className='input_senhaNova'>

            <div className='input_box'>

              <input type={mostrarSenha ? "text" : "password"} placeholder='Nova Senha:' value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
              {mostrarSenha ? <IoMdEye onClick={() => setMostrarSenha(false)} /> : <IoIosEyeOff onClick={() => setMostrarSenha(true)} />}

              <input type={mostrarSenha2 ? "text" : "password"} placeholder='Confirme a Nova Senha' value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} />
              {mostrarSenha2 ? <IoMdEye onClick={() => setMostrarSenha2(false)} /> : <IoIosEyeOff onClick={() => setMostrarSenha2(true)} />}
            </div>
          </div>

          <div className='buttons_alterarSenha'>

            <button className='button_cancelar' onClick={() => setAlterarSenha(false)}>Calcelar</button>
            <button className='button_alterar' onClick={salvarSenha}>Alterar Senha</button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Form_alterarSenha