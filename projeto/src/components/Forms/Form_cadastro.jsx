import React, { useContext } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import cadastro from '../../server/inserirDados/cadastro';

function Form_cadastro() {

    const [nome, setnome] = React.useState('')
    const [emailCadastro, setEmailCadastro] = React.useState('');
    const [senhaCadastro, setSenhaCadastro] = React.useState('');
    const [cpf, setCpf] = React.useState('')
    const [sexo, setSexo] = React.useState('');

    const { isActive, setIsActive, setAlerta } = useContext(Mycontext);

    const regexEmail = (emailCadastro) => {
        return /\S+@\S+\.\S+/.test(emailCadastro)
    }

    const formatarCpf = (valor) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    const validarCpf = (valor) => {
        const cpfLimpo = valor.replace(/\D/g, "");
        return cpfLimpo.length === 11;
    };


    const validarNome = (nome) => {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
        return regex.test(nome) && nome.trim().includes(" ");
    };


    async function cadastrar(e) {
        e.preventDefault()

        if (!validarNome(nome)) {
            setAlerta({ mensagem: "Nome inválido! Digite nome e sobrenome.", icon: "erro" });
            return;
        }

        if (!nome || !emailCadastro || !senhaCadastro || !cpf || !sexo) {
            setAlerta({ mensagem: "Todos os campos são obrigatórios!", icon: "erro" });
            return
        }

        if (!regexEmail(emailCadastro)) {
            setAlerta({ mensagem: "E-mail inválido! Exemplo válido: usuario@dominio.com", icon: "erro" });
            return
        }

        if (!validarCpf(cpf)) {
            setAlerta({ mensagem: "CPF inválido! Exemplo válido: 000.000.000-00", icon: "erro" });
            return;
        }

        const cpfSemMascara = cpf.replace(/\D/g, '');


        const dados = {
            nome: nome,
            email: emailCadastro,
            senha: senhaCadastro,
            cpf: cpfSemMascara,
            sexo: sexo
        }



        const resposta = await cadastro(dados)
        if (resposta.status === 200) {
            setAlerta({ mensagem: resposta.data.mensagem, icon: 'ok' })
            setIsActive(false)
            setnome('')
            setEmailCadastro('')
            setSenhaCadastro('')
            setCpf('')
            setSexo('')
            return
        }
        if (!resposta.ok) {
            setAlerta({ mensagem: resposta.mensagem, icon: 'erro' })
            return
        }


    }





    return (

        <form className='form-cadastro cadastro'>
            <h1>Cadastro</h1>

            <input type="text" placeholder='Nome completo' value={nome} onChange={e => setnome(e.target.value)} />
            <input type="text" placeholder='E-mail' value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} />
            <input type="text" placeholder='CPF' value={cpf} onChange={e => setCpf(formatarCpf(e.target.value))} />
            <input type="password" placeholder='Senha' value={senhaCadastro} onChange={e => setSenhaCadastro(e.target.value)} />
            <span></span>

            <div className='const-label-sexo'>

                <label className='label-sexo'>
                    <input type="radio" name='sexo' checked={sexo === "Feminino"} value='Feminino' onChange={(e) => setSexo(e.target.value)} />
                    Feminino</label>
                <label className='label-sexo'>
                    <input type="radio" name='sexo' checked={sexo === "Masculino"} value="Masculino" onChange={(e) => setSexo(e.target.value)} />
                    Masculino</label>
            </div>
            <button onClick={cadastrar}>Cadastre-se</button>
        </form>

    )
}

export default Form_cadastro