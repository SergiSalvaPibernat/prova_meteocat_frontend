import { render, screen } from '@testing-library/react'; // Importa les utilitats necessàries de Testing Library
import App from './App'; // Importa el component App que es vol testejar

// Test per verificar que el link "learn react" es renderitza correctament
test('renders learn react link', () => {
  // Renderitza el component App
  render(<App />);

  // Busca el text "learn react" dins del component renderitzat
  const linkElement = screen.getByText(/learn react/i); // Utilitza una expressió regular per cercar el text

  // Verifica que el text "learn react" existeix en el component renderitzat
  expect(linkElement).toBeInTheDocument();
});
