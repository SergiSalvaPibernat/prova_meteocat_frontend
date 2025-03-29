import { render, screen, fireEvent } from '@testing-library/react';
import CercadorMunicipis from './CercadorMunicipis';
import { getMunicipis } from '../services/api';

jest.mock('../services/api');

test('renders CercadorMunicipis and fetches municipis', async () => {
    getMunicipis.mockResolvedValue({ data: [{ codi: '080193', nom: 'Barcelona' }] });

    render(<CercadorMunicipis onSelectMunicipi={jest.fn()} />);

    const input = screen.getByPlaceholderText('Cerca municipi...');
    fireEvent.change(input, { target: { value: 'Bar' } });

    const listItem = await screen.findByText('Barcelona');
    expect(listItem).toBeInTheDocument();
});