import "./Cards.css";

function CardsAgendaOn(props) {
  return (
    <div className="cardAgenda">
      <h3>{props.nomeTrilha}</h3>

      <p><b>Dia:</b> {props.data}</p>
      <p><b>Horário:</b> {props.horario}</p>
      <p><b>Vagas disponíveis:</b> {props.vagas}</p>

      <button 
        className="btn-participar-on"
        onClick={props.participar}
      >
        Participar do Evento
      </button>
    </div>
  );
}

export default CardsAgendaOn;
