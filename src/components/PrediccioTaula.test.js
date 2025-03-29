import React from 'react';
import { render, screen } from '@testing-library/react';
import PrediccioTaula from './PrediccioTaula';

test('renders PrediccioTaula with prediccio data', () => {
    const prediccio = {
        nomMunicipi: 'Barcelona',
        prediccions: [
            { dia: 1, tempMax: 25, tempMin: 15, probPrec: 20 },
            { dia: 2, tempMax: 26, tempMin: 16, probPrec: 30 },
        ],
    };

    render(<PrediccioTaula prediccio={prediccio} />);

    const header = screen.getByText('Predicció per Barcelona');
    expect(header).toBeInTheDocument();

    const tempMax = screen.getByText('25ºC');
    expect(tempMax).toBeInTheDocument();

    const tempMin = screen.getByText('15ºC');
    expect(tempMin).toBeInTheDocument();

    const probPrec = screen.getByText('20%');
    expect(probPrec).toBeInTheDocument();
});