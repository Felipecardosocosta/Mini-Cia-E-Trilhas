import React from 'react'
import './CardEvento.css'

export default function CardEvento({ title, day, time, vacancies, image, onDetails }) {

    console.log(time);

    return (
        <div className="card-evento" style={{ backgroundImage: `url(${image})` }}>
            
            <div className="card-overlay" />

            <div className="card-content">

                <h3 className="card-title">{title}</h3>

                <div className="card-meta">

                    <div className="date-badge">{day}</div>

                </div>
                <div className="meta-text">

                    <div className="time">Saída às {time} h</div>

                    <div className="vacancies">{vacancies} vagas disponíveis</div>
                </div>

                <button className="card-button" onClick={onDetails}>Ver detalhes</button>
            </div>
        </div>
    )
}