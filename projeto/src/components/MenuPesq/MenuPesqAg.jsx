import './MenuPesq.css'
import BttnFln from '../BttnsReg/BttnFln'
import BttnsReg from '../BttnsReg/BttnRegs'
import { useContext, useState } from 'react'
import { Mycontext } from '../../context/ContextGlobalUser'
import BarraPesq from '../BarraPesq/BarraPesq'
import { FaCalendarDays } from "react-icons/fa6";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6"
import { TbFilter } from "react-icons/tb"

function MenuPesqAg() {

    const { setRegiao, filtroTipo, setFiltroTipo, filtroOrdem, setFiltroOrdem } = useContext(Mycontext);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    function Filtros() {
        setMostrarFiltros(prev => {
            const novoValor = !prev;
            if (!novoValor) {
                setFiltroTipo(null);
                setFiltroOrdem(null);
            }
            return novoValor;
        });
    }

    return (
        <div className='MenuPesq-cont'>

            <div className='Cont-barraFiltro'>

                <div className='BarraFiltro-barraPesq'>
                    <div className='BarraPesq-barra'>
                        <BarraPesq />
                    </div>

                    <div className='BarraPesq-pesqBttn'>
                        <button className='PesqBttn'>Pesquisar</button>
                    </div>
                </div>

                <div className='BarraFiltro-filtroBttns'>
                    <div className='FiltroBttns-iconBttn'>
                        <button onClick={Filtros} className='IconBttn-filtro'>
                            <TbFilter size={45} color='rgba(112, 8, 8, 1)' />
                        </button>
                    </div>

                    <div className='FiltroBttns-bttnsDT'>
                        {mostrarFiltros && (
                            <>
                                <button
                                    onClick={() => setFiltroTipo("data")}
                                    className={`BttnsDT ${filtroTipo === "data" ? "ativo" : ""}`}>
                                    <FaCalendarDays size={25} /> <h4>Data</h4>
                                </button>

                                <button
                                    onClick={() => setFiltroTipo("vagas")}
                                    className={`BttnsDT ${filtroTipo === "vagas" ? "ativo" : ""}`}>
                                    <BsPersonRaisedHand size={25} /> <h4>Nº Vagas</h4>
                                </button>
                            </>
                        )}
                    </div>

                    <div className='FiltroBttns-bttnsMN'>
                        {mostrarFiltros && (
                            <>
                                <button
                                    onClick={() => setFiltroOrdem("desc")}
                                    className={`BttnsMN ${filtroOrdem === "desc" ? "ativo" : ""}`}>
                                    <h4>Maior p/ menor</h4> <FaArrowDownWideShort size={15} />
                                </button>

                                <button
                                    onClick={() => setFiltroOrdem("asc")}
                                    className={`BttnsMN ${filtroOrdem === "asc" ? "ativo" : ""}`}>
                                    <FaArrowDownShortWide size={15} /> <h4>Menor p/ maior</h4>
                                </button>
                            </>
                        )}
                    </div>

                </div>

            </div>

            <div className='Cont-dir'>
                <div className='Dir-CdReg'>
                    <BttnsReg funcao={() => setRegiao('Central')} nomeReg={"Central"} img={'Imgs/Central.png'} />
                    <BttnsReg funcao={() => setRegiao('Norte')} nomeReg={"Norte"} img={'Imgs/Norte.png'} />
                    <BttnsReg funcao={() => setRegiao('Leste')} nomeReg={"Leste"} img={'Imgs/Leste.png'} />
                    <BttnsReg funcao={() => setRegiao('Sul')} nomeReg={"Sul"} img={'Imgs/Sul.png'} />
                </div>

                <div className='Dir-TdsReg'>
                    <BttnFln fun={() => setRegiao('Regiões')} fln={"Todas"} map={'Imgs/Geral.png'} />
                </div>
            </div>

        </div>
    )
}

export default MenuPesqAg
