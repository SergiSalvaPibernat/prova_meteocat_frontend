import React from 'react';

const PrediccioTaula = ({ prediccio }) => {
    if (!prediccio) return <div>Selecciona un municipi per veure la predicció.</div>;

    return (
        <div>
            <h2>Predicció per {prediccio.codiMunicipi}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dia</th>
                        <th>Temp. Màxima</th>
                        <th>Temp. Mínima</th>
                        <th>Prob. Precipitació</th>
                    </tr>
                </thead>
                <tbody>
                    {prediccio.prediccions.map((p, index) => (
                        <tr key={index}>
                            <td>{p.dia}</td>
                            <td>{p.tempMax ?? 's/d'}</td>
                            <td>{p.tempMin ?? 's/d'}</td>
                            <td>{p.probPrec ?? 's/d'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrediccioTaula;