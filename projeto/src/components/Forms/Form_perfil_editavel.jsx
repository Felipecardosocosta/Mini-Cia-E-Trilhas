import React, { useEffect, useState } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import { SlClose } from "react-icons/sl";
import { VscAccount } from 'react-icons/vsc'
import alterarDadosUser from '../../server/alterarDados/alterarDadosUser';




function Form_perfil_editavel({ editar, setEditar }) {
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const { infouser, setInfouser, setMeusDados, user, setAlerta } = React.useContext(Mycontext)

    useEffect(() => {
        
        setEmail(infouser.email)
        if (infouser.num_celular) {

            setTelefone(infouser.num_celular)
        }

    }, [])

const formatarTelefoneComLimite = (valor) => {
    let tel = valor.replace(/\D/g, "");

    // limita a 11 dígitos
    if (tel.length > 11) {
        tel = tel.slice(0, 11);
    }

    // aplica a formatação automática
    tel = tel
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");

    return tel;
};

    const validarTelefone = (valor) => {
        const telefoneLimpo = valor.replace(/\D/g, "")
        return telefoneLimpo.length === 11
    }

    const regexEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }



    async function salvardados() {

        if (!regexEmail(email)) {
            setAlerta({ mensagem: "E-mail inválido! Exemplo válido: usuario@dominio.com", icon: "erro" });
            return
        }

        if (!validarTelefone(telefone)) {
            setAlerta({ mensagem: "Telefone inválido! Exemplo: (11) 98765-4321", icon: "erro" });
            return;
        }

        const telefoneSemMascara = telefone.replace(/\D/g, '');


        const dadosAtualizados = {
            email,
            celular: telefoneSemMascara,
            senha: '1'
        };
        if (!dadosAtualizados.email || !dadosAtualizados.celular) {

            return setAlerta({ mensagem: 'Preencha todos os campos', icon: 'erro' })
        }
        const resposta = await alterarDadosUser(user.token, dadosAtualizados);

        console.log(resposta);


        if (!resposta.ok) {
            setAlerta({ mensagem: resposta.mensagem, icon: 'erro' })
            return
        }
        setAlerta({ mensagem: "Dados alterados com sucesso", icon: 'ok' })

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
                    <label style={{ gap: '2rem' }}> E-mail: <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='' /></label>
                    <label>Telefone: <input type="tel" value={telefone} onChange={(e) => { setTelefone(formatarTelefoneComLimite(e.target.value)) }} placeholder='Ex: (48)99999-9999' /></label>
                    <button className='botao_editar' onClick={salvardados}>Salvar Dados</button>
                    <button className='botao_voltar' onClick={() => setEditar(false)}>Voltar</button>

                </div>
            </div>

        </>
    )
}

export default Form_perfil_editavel