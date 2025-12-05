import "./Cards.css";

function CardsAgendaOn({ nomeTrilha, data, horario, vagas, participar }) {


  let dia = "--";
  let mes = "--";

  if (data && data.includes("/")) {
    const partes = data.split("/");
    dia = partes[0] || "--";
    mes = partes[1] || "--";
  }

  return (
    <div
      className="Card-minhaAgenda"
      style={{
        backgroundImage: 'url("../../../public/Imgs/banco/lagoinhaDoLeste.jpg")'
      }}
    >
      <div className="Data-card-minhaAgenda">
        <p>{dia}</p>
        <div className='Barra-data-minhaAgenda'></div>
        <p>{mes}</p>
      </div>

      <div className="Conteudo-card-minhaAgenda">

        <div className='Status-card-minhaAgenda'>
          <div className='Conteudo-status-card-minhaAgenda'>
            Disponível
          </div>
        </div>

        <div className='Informcao-card-minhaAgenda'>
          <h1>{nomeTrilha}</h1>
          <h3>Saída às {horario} h</h3>
          <h3>{vagas} vagas disponíveis</h3>
        </div>

        <div className='Buttons-cards-minhaAgenda'>
          <button
            className='Botao-editar-cards-MAG'
            onClick={participar}
          >
            <h2>Participar</h2>
          </button>
        </div>

      </div>
    </div>
  );
}

export default CardsAgendaOn;
