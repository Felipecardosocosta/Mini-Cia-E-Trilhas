import React, { useEffect, useRef } from 'react'
import './navBarMinhaagenda.css'
import { TfiMenu } from "react-icons/tfi";
import { Link } from 'react-router-dom';

function NavBarMinhaAgenda({ set_organizandoAtivo, set_participandoAtivo, participandoAtivo, organizandoAtivo, open, setOpen }) {

    function abrirParticipando() {
        set_organizandoAtivo(false)
        set_participandoAtivo(true)

    }

    function abrirOrganizando() {
        set_organizandoAtivo(true)
        set_participandoAtivo(false)


    }


    const minhaRefMenu = useRef(null)


    useEffect(() => {

        function verificar(e) {

            if (minhaRefMenu.current && !minhaRefMenu.current.contains(e.target)) {
                setOpen(false)
            }

        }

        document.addEventListener("mousedown", verificar)

        return () => {

            document.removeEventListener("mousedown", verificar)
        }


    }, [])
    return (
        <div className="nav-minhaAgenda">
            <div className="cont-menu">
                <TfiMenu className='menu-ag' onClick={() => setOpen(!open)} />

                {open &&
                    <div className="cont-option" ref={minhaRefMenu}>
                        {/* <h3 className='centralizar'>Menu</h3> */}
                        {/* <div className="linhaDivisoria"> </div> */}
                        <span>
                            <Link onClick={abrirParticipando} className={`${participandoAtivo ? 'navLinkAtivo' : ''}`}  >Participando</Link>
                        </span>
                        <span>
                            <Link className={`${organizandoAtivo ? 'navLinkAtivo' : ''}`} onClick={abrirOrganizando} >Organizando</Link>
                        </span>


                    </div>
                }
            </div>

        </div>

    )
}

export default NavBarMinhaAgenda
