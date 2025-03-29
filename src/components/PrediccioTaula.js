import React from 'react';
import './PrediccioTaula.css';

const PrediccioTaula = ({ prediccio }) => {
    if (!prediccio) return <div>Selecciona un municipi per veure la predicció.</div>;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('ca-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const getDayAbbreviation = (date) => {
        const days = ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'];
        return days[date.getDay()];
    };

    const getFutureDate = (daysAhead) => {
        const date = new Date();
        date.setDate(date.getDate() + daysAhead);
        return date;
    };

    const formatTemperature = (temp) => {
        return temp !== null ? `${Math.round(temp)}ºC` : 's/d';
    };

    const formatPrecipitation = (prec) => {
        return prec !== null ? `${Math.round(prec)}%` : 's/d';
    };

    const getPrecipitationIcon = (prec) => {
        if (prec === null) return null;

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
            <div className="table-header">
                <p className="date">{formattedDate}</p>
                <h2 className="centered-title">Predicció per {prediccio.nomMunicipi}</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Variable</th>
                        {prediccio.prediccions.map((p, index) => (
                            <th key={index} className={index < 2 ? 'highlight-column' : ''}>
                                {index === 0 ? 'Avui' : index === 1 ? 'Demà' : getDayAbbreviation(getFutureDate(index))}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Temp. Màxima</td>
                        {prediccio.prediccions.map((p, index) => (
                            <td key={index} className={`${index < 2 ? 'highlight-column' : ''} max-temp`}>{formatTemperature(p.tempMax)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Temp. Mínima</td>
                        {prediccio.prediccions.map((p, index) => (
                            <td key={index} className={`${index < 2 ? 'highlight-column' : ''} min-temp`}>{formatTemperature(p.tempMin)}</td>
                        ))}
                    </tr>
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