import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'
import { Mycontext } from '../../context/ContextGlobalUser'
import Dropdown from '../DropdownPerfil/Dropdown';
import Perfil from '../Perfil/Perfil';
import Form_alterarSenha from '../Forms/AlterarSenha/Form_alterarSenha';
import Alerta from '../Alerta/Alerta';
import { BsCheck2Circle } from "react-icons/bs";


function NavBar({ transparent = false }) {


  // useEffect(() => {
  //   const localStorege = localStorage.getItem('user')

  //   if (localStorege) {
  //     setUser(JSON.parse(localStorege));
  //   }
  // }, []);


  const navStyle = {
    backgroundColor: transparent ? '#7b1e1ec5' : '#7B1E1E',
  };

  const { user, setUser, setModalLogin, setModalPerfil, modalPerfil, meusDados, alterarSenha, setAlerta, alerta } = useContext(Mycontext)



  return (
    <nav className='cont-navBar' style={navStyle}>

      <Link className={`link`}  to={'/'}>Home</Link>

      {user && <NavLink className='link'  to={'/dashboard'} >DashBord</NavLink>}

      <NavLink className='link' to={'/eventos'} >Agenda</NavLink>
      <NavLink className='link' to={'/trilhas'} >Trilhas</NavLink>


      {!user ?

        <NavLink
          className={`link ${modalPerfil ? 'linkAtivo' : ''}`}

          onClick={() => setModalLogin(true)}>
          Login

        </NavLink>

        :

        <Dropdown

          transparent={transparent}

          perfil={modalPerfil}

        />

      }

      {meusDados && <Perfil />}
      {alterarSenha && <Form_alterarSenha />}

      {alerta &&

        <Alerta
          mensagem={alerta.mensagem}
          icon={alerta.icon}
          setAlerta={setAlerta}
        />}




    </nav>
  )
}

export default NavBar
