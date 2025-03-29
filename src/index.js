// Importa el mòdul React per a poder utilitzar components de React
import React from 'react';

// Importa ReactDOM per a renderitzar l'aplicació a la pàgina web
import ReactDOM from 'react-dom/client';

// Importa els estils globals de la pàgina
import './index.css';

// Importa el component principal de l'aplicació
import App from './App';

// Importa la funció per mesurar el rendiment de l'aplicació
import reportWebVitals from './reportWebVitals';

// Crea un enllaç al node de l'HTML amb id 'root', on es renderitzarà l'aplicació
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderitza l'aplicació en mode estricte per a verificar possibles problemes de rendiment i seguretat en el codi
root.render(
  <React.StrictMode>
    <App /> {/* Renderitza el component App */}
  </React.StrictMode>
);

// Si vols començar a mesurar el rendiment de la teva aplicació, pots passar una funció
// per registrar els resultats (per exemple: reportWebVitals(console.log)) o enviar-los a un endpoint d'analítica.
// Més informació aquí: https://bit.ly/CRA-vitals
reportWebVitals();
