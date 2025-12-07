import "./Cards.css";

function CardsAgendaOff({ nomeTrilha, data, horario, vagas, abrirLogin, image }) {

  // Tratamento do formato DD/MM/YYYY
  let dia = "--";
  let mes = "--";

  if (data && data.includes("/")) {
    const partes = data.split("/");
    dia = partes[0] || "--";
    mes = partes[1] || "--";
  }

  return (
    <div className="Card-evento" style={{ backgroundImage: `url(${image})`}}>
      
      <div className="Card-content">
        <h3 className="card-title">{nomeTrilha}</h3>
        <div className="card-meta">
          <div className="date-badge">{dia}/{mes}</div>
        </div>

        <div className="meta-text">

          <div className="time">Saída às {horario} h</div>

          <div className="vacancies">{vagas} vagas disponíveis</div>
        </div>
      </div>

      <button className='Bttn-Participar' onClick={abrirLogin}> <h3>Venha Participar!</h3> </button>

      </div>

  )
}

export default CardsAgendaOff;
