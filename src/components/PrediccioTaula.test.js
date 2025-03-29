import React from 'react';
import { render, screen } from '@testing-library/react';
import PrediccioTaula from './PrediccioTaula';

// Test per verificar que el component PrediccioTaula es renderitza correctament amb les dades de predicció
test('renders PrediccioTaula with prediccio data', () => {
    // Dades simulades de predicció per a la prova
    const prediccio = {
        nomMunicipi: 'Barcelona',
        prediccions: [
            { dia: 1, tempMax: 25, tempMin: 15, probPrec: 20 }, // Predicció per Avui
            { dia: 2, tempMax: 26, tempMin: 16, probPrec: 30 }, // Predicció per Demà
        ],
    };

    // Renderitza el component amb les dades simulades
    render(<PrediccioTaula prediccio={prediccio} />);

    // Comprova que el títol de la taula inclou el nom del municipi
    const header = screen.getByText('Predicció per Barcelona');
    expect(header).toBeInTheDocument();

    // Verifica que es mostren correctament les temperatures màximes i mínimes
    const tempMax = screen.getByText('25ºC'); // Temp. màxima del primer dia
    expect(tempMax).toBeInTheDocument();

    const tempMin = screen.getByText('15ºC'); // Temp. mínima del primer dia
    expect(tempMin).toBeInTheDocument();

    // Comprova que la probabilitat de precipitació es mostra correctament
    const probPrec = screen.getByText('20%'); // Probabilitat de pluja del primer dia
    expect(probPrec).toBeInTheDocument();
});
