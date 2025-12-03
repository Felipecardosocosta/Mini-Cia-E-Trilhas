import "./Cards.css";

function CardsAgendaOff(props) {
  return (
    <div className="cardAgenda">
      <h3>{props.nomeTrilha}</h3>

      <p><b>Dia:</b> {props.data}</p>
      <p><b>Horário:</b> {props.horario}</p>
      <p><b>Vagas disponíveis:</b> {props.vagas}</p>

      <button 
        className="btn-participar-off"
        onClick={props.abrirLogin}
      >
        Fazer Login para Participar
      </button>
    </div>
  );
}

export default CardsAgendaOff;
