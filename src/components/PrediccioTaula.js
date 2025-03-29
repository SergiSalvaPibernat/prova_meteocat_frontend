import React from 'react';
import './PrediccioTaula.css';

const PrediccioTaula = ({ prediccio }) => {
    // Si no hi ha cap predicció seleccionada, mostra un missatge informatiu
    if (!prediccio) return <div>Selecciona un municipi per veure la predicció.</div>;

    // Obté la data actual i la formata en DD/MM/YYYY
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ca-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Retorna l'abreviació del dia de la setmana en català
    const getDayAbbreviation = (date) => {
        const days = ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'];
        return days[date.getDay()];
    };

    // Retorna la data futura sumant dies a la data actual
    const getFutureDate = (daysAhead) => {
        const date = new Date();
        date.setDate(date.getDate() + daysAhead);
        return date;
    };

    // Formata la temperatura per mostrar-la amb ºC, o "s/d" si no hi ha dades
    const formatTemperature = (temp) => {
        return temp !== null ? `${Math.round(temp)}ºC` : 's/d';
    };

    // Formata la probabilitat de precipitació amb un % o "s/d" si no hi ha dades
    const formatPrecipitation = (prec) => {
        return prec !== null ? `${Math.round(prec)}%` : 's/d';
    };

    // Retorna la icona corresponent segons la probabilitat de precipitació
    const getPrecipitationIcon = (prec) => {
        if (prec === null) return null; // Si no hi ha dades, no es mostra cap icona

        const roundedPrec = Math.round(prec);

        if (roundedPrec <= 25) {
            return <img src="/sol.png" alt="Sol" className="weather-icon" />;
        } else if (roundedPrec <= 60) {
            return <img src="/sol_i_pluja.png" alt="Sol i Pluja" className="weather-icon" />;
        } else {
            return <img src="/pluja.png" alt="Pluja" className="weather-icon" />;
        }
    };

    return (
        <div className="table-container">
            {/* Capçalera de la taula amb la data actual i el nom del municipi seleccionat */}
            <div className="table-header">
                <p className="date">{formattedDate}</p>
                <h2 className="centered-title">Predicció per {prediccio.nomMunicipi}</h2>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Variable</th>
                        {/* Genera les columnes de la taula amb les dates corresponents */}
                        {prediccio.prediccions.map((p, index) => (
                            <th key={index} className={index < 2 ? 'highlight-column' : ''}>
                                {index === 0 ? 'Avui' : index === 1 ? 'Demà' : getDayAbbreviation(getFutureDate(index))}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Fila de temperatura màxima */}
                    <tr>
                        <td>Temp. Màxima</td>
                        {prediccio.prediccions.map((p, index) => (
                            <td key={index} className={`${index < 2 ? 'highlight-column' : ''} max-temp`}>
                                {formatTemperature(p.tempMax)}
                            </td>
                        ))}
                    </tr>
                    
                    {/* Fila de temperatura mínima */}
                    <tr>
                        <td>Temp. Mínima</td>
                        {prediccio.prediccions.map((p, index) => (
                            <td key={index} className={`${index < 2 ? 'highlight-column' : ''} min-temp`}>
                                {formatTemperature(p.tempMin)}
                            </td>
                        ))}
                    </tr>
                    
                    {/* Fila de probabilitat de precipitació amb icones */}
                    <tr>
                        <td>Prob. Precipitació</td>
                        {prediccio.prediccions.map((p, index) => (
                            <td key={index} className={index < 2 ? 'highlight-column' : ''}>
                                {formatPrecipitation(p.probPrec)} {getPrecipitationIcon(p.probPrec)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PrediccioTaula;
