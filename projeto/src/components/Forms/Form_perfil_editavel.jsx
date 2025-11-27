import React from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import { SlClose } from "react-icons/sl";
import { VscAccount } from 'react-icons/vsc'


function Form_perfil_editavel({editar, setEditar}) {

    const { infouser, setInfouser, setMeusDados } = React.useContext(Mycontext)

    return (


        <div>


            <div>
                {/* <label >Nome</label>
            <input type="text" disabled value={infouser.nome} />
            <label >E-mail</label>
            <input type="text" value={infouser.email} />
            <label >CPF</label>
            <input type="text" disabled value={infouser.cpf} />
            <label>Telefone:</label>
            <input type="tel" disabled value={infouser.telefone} /> */}

                <div className='icone_nome'>
                    <VscAccount size={90} />

                    <h1>{infouser.nome}</h1>

                </div>

                <div className='linha'></div>
                <div className='dados_usuario'>
                    <p>E-mail: {infouser.email}</p>
                    <p>CPF: {infouser.cpf}</p>
                    <p>Telefone: {infouser.telefone} Ex: (48)99999-9999</p>
                    <button className='botao_editar'>Salvar dados</button>
                    <button className='botao_excluir' onClick={() => setEditar(false)}>Voltar</button>

                </div>
            </div>

        </div>
    )
}

export default Form_perfil_editavel