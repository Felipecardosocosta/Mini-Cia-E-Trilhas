import React, { useEffect, useRef } from 'react'
import './Dropdown.css'
import { Link } from 'react-router-dom';
import { Mycontext } from '../../context/ContextGlobalUser';



function Dropdown({ perfil, transparent,minhaAgenda }) {

    const [sair, setSair] = React.useState(false);
    const { user, setUser, setModalLogin, modalPerfil, meusDados, setMeusDados, setModalPerfil, setAlterarSenha } = React.useContext(Mycontext)

   
    function abrirMinhaAgenda() {
        minhaAgenda.setMinhaAgenda(true)
        setModalPerfil(false)
    }

    function abrirdados() {
        setMeusDados(true)
        setModalPerfil(false)
    }

    function botaoDeslogar() {
        setUser(false)
        localStorage.removeItem('user')
        setModalPerfil(false)

    }


    function abrirAlterarSenha() {
        setAlterarSenha(true)
    }

    const minhaReferencia = useRef(null)

    useEffect(() => {
        function verificar(event) {

            if (minhaReferencia.current && !minhaReferencia.current.contains(event.target)) {
                setModalPerfil(false)
            }

        }

        document.addEventListener("mousedown", verificar)

        return () => {
            document.removeEventListener("mousedown", verificar)
        }

    }, [])


    return (
        <div className='dropdown'>
            <Link className='link' onClick={() => modalPerfil ? setModalPerfil(false) : setModalPerfil(true)}>Perfil</Link>

            <div ref={minhaReferencia} className={`dropdown-menu ${perfil ? 'show' : ''} ${transparent ? "transparente" : ""}`}>
                <button onClick={abrirdados}>Meus dados</button>
                <button onClick={abrirMinhaAgenda} >Minha Agenda</button>
                <button onClick={abrirAlterarSenha}>Alterar senha</button>
                <button onClick={botaoDeslogar}>Sair</button>
            </div>

        </div>
    )
}

export default Dropdown