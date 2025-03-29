import './App.css';
import React, { useState, useEffect } from 'react';
import CercadorMunicipis from './components/CercadorMunicipis';
import PrediccioTaula from './components/PrediccioTaula';
import { getPrediccio } from './services/api';

function App() {
  // Estat per emmagatzemar la predicció meteorològica
  const [prediccio, setPrediccio] = useState(null);
  // Estat per gestionar el carregament de dades
  const [loading, setLoading] = useState(true);
  // Estat per emmagatzemar possibles errors en la càrrega
  const [error, setError] = useState(null);

  // useEffect que es dispara en muntar el component per carregar la predicció de Barcelona per defecte
  useEffect(() => {
    getPrediccio('080193') // Codi de Barcelona
      .then(response => {
        setPrediccio(response.data); // Desa la predicció al seu estat
        setLoading(false); // Desactiva l'estat de carregament
      })
      .catch(error => {
        console.error('Error fetching prediccio:', error);
        setError('Error carregant predicció'); // Desa el missatge d'error
        setLoading(false); // Desactiva l'estat de carregament
      });
  }, []);

  // Funció per gestionar la selecció d'un municipi nou
  const handleSelectMunicipi = (municipi) => {
    setLoading(true); // Activa l'estat de carregament
    getPrediccio(municipi.codi)
      .then(response => {
        setPrediccio(response.data); // Desa la nova predicció
        setLoading(false); // Desactiva l'estat de carregament
      })
      .catch(error => {
        console.error('Error fetching prediccio:', error);
        setError('Error carregant predicció'); // Desa el missatge d'error
        setLoading(false); // Desactiva l'estat de carregament
      });
  };

  return (
    <div className="App">
      <h1>Predicció Meteorològica</h1>
      
      {/* Contenidor de la capçalera amb el cercador de municipis */}
      <div className="header-container">
        <h2>Introdueix-hi el municipi desitjat: </h2>
        <CercadorMunicipis onSelectMunicipi={handleSelectMunicipi} />
      </div>
      
      {/* Mostra el missatge de càrrega mentre es recuperen les dades */}
      {loading ? <div>Carregant predicció...</div> : <PrediccioTaula prediccio={prediccio} />}
      
      {/* Mostra un missatge d'error si la càrrega ha fallat */}
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
