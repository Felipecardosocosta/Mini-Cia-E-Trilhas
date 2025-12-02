import React from 'react'
import login from '../../server/login'
import { Mycontext } from '../../context/ContextGlobalUser'
import Swal from 'sweetalert2'
import { IoIosCheckmarkCircle } from "react-icons/io";

function Form_login() {

    const { user, setUser, modalLogin, setModalLogin } = React.useContext(Mycontext)

    async function logar(e) {
        e.preventDefault()

        const dados = {
            email: email,
            senha: senha
        }

        const resposta = await login(dados)
        console.log(resposta);

        if (resposta.status === 200) {
            Swal.fire({
                position: "top-end",
                title: "Login realizado com sucesso!",
                showConfirmButton: false,
                timer: 200000,
                iconColor:'rgba(0, 0, 0, 1)',
                customClass: {
                    popup: 'alerta',

                }

            });
            setUser(resposta.data.result)
            setModalLogin(false)
            setEmail('')
            setsenha('')
            localStorage.setItem('user', JSON.stringify(resposta.data.result))
            return
        }
        alert("Erro ao fazer login, verifique seus dados.")


    }

    const [email, setEmail] = React.useState('')
    const [senha, setsenha] = React.useState('')

    return (

        <form className='form-login'>
            <h1>Bem vindo de volta!</h1>
            <input type="text" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Senha' value={senha} onChange={e => setsenha(e.target.value)} />
            <a href="#">Esqueceu sua senha?</a>
            <button onClick={logar}>Logar</button>
        </form>

    )
}

export default Form_login