import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import { Mycontext } from '../../context/ContextGlobalUser'
import Dropdown from '../DropdownPerfil/Dropdown';
import Perfil from '../Perfil/Perfil';

function NavBar({transparent=false}) {


  // useEffect(() => {
  //   const localStorege = localStorage.getItem('user')

  //   if (localStorege) {
  //     setUser(JSON.parse(localStorege));
  //   }
  // }, []);
  

  const navStyle = {
    backgroundColor: transparent ? '#7b1e1ec5' : '#7B1E1E',
  };

  const {user,setUser, setModalLogin, setModalPerfil,modalPerfil,meusDados} = useContext(Mycontext)


  return (
    <nav className='cont-navBar' style={navStyle}> 
        <Link className='link' to={'/'}>Home</Link>
        {user && <Link className='link' to={'/dashboard'} >DashBord</Link>}
        <Link className='link' to={'/eventos'} >Agenda</Link>
        <Link className='link' to={'/trilhas'} >Trilhas</Link>  
        {!user ? <Link className='link' onClick={()=> setModalLogin(true)}>Login</Link>: <Dropdown transparent={transparent} perfil={modalPerfil}/> }
      
        {/* {!user && <Link className='link' to={'/cadastro'}>Cadastro</Link>}         */}
        {meusDados && <Perfil/>}
        
    </nav>
  )
}

export default NavBar
