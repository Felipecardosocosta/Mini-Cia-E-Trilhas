import React from 'react'
import NavBar from '../NavBar/NavBar'
import './Header.css'

function Header({transparent=false, dashboard=false ,agenda=false, trilhas=false,home=false}) {
  return (
    <div className='cont-header'>
      <NavBar transparent={transparent} dashboard={dashboard} agenda={agenda} trilhas={trilhas} home={home}/> 
    </div>
  )
}

export default Header
