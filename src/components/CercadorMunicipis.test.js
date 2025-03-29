import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CercadorMunicipis from './CercadorMunicipis';
import { getMunicipis } from '../services/api';

jest.mock('../services/api');

test('renders CercadorMunicipis and fetches municipis', async () => {
    // Simulem la resposta de l'API amb un municipi de prova
    getMunicipis.mockResolvedValue({ data: [{ codi: '080193', nom: 'Barcelona' }] });

    render(<CercadorMunicipis onSelectMunicipi={jest.fn()} />);

    // Esperar que getMunicipis hagi estat cridat
    await waitFor(() => expect(getMunicipis).toHaveBeenCalled());

    // Verificar que l'input existeix
    const input = screen.getByPlaceholderText('Cercar municipi');
    expect(input).toBeInTheDocument();

    // Simular l'entrada de text a l'input
    fireEvent.change(input, { target: { value: 'Bar' } });

    // Comprovar que "Barcelona" apareix a la llista de suggeriments
    const listItem = await screen.findByText('Barcelona');
    expect(listItem).toBeInTheDocument();
});
