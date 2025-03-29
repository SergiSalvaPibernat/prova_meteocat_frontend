import './App.css';
import React, { useState, useEffect } from 'react';
import CercadorMunicipis from './components/CercadorMunicipis';
import PrediccioTaula from './components/PrediccioTaula';
import { getPrediccio } from './services/api';

function App() {
  const [prediccio, setPrediccio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPrediccio('080193') // Codi de Barcelona
      .then(response => {
        setPrediccio(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prediccio:', error);
        setError('Error carregant predicció');
        setLoading(false);
      });
  }, []);

  const handleSelectMunicipi = (municipi) => {
    setLoading(true);
    getPrediccio(municipi.codi)
      .then(response => {
        setPrediccio(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prediccio:', error);
        setError('Error carregant predicció');
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Predicció Meteorològica</h1>
      <CercadorMunicipis onSelectMunicipi={handleSelectMunicipi} />
      {loading ? <div>Carregant predicció...</div> : <PrediccioTaula prediccio={prediccio} />}
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
