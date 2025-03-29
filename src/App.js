import './App.css';
import React, { useState } from 'react';
import CercadorMunicipis from './components/CercadorMunicipis';
import PrediccioTaula from './components/PrediccioTaula';
import { getPrediccio } from './services/api';

function App() {
  const [prediccio, setPrediccio] = useState(null);

  const handleSelectMunicipi = (municipi) => {
    getPrediccio(municipi.codi)
      .then(response => setPrediccio(response.data))
      .catch(error => console.error('Error fetching prediccio:', error));
  };

  return (
    <div>
      <h1>Predicció Meteorològica</h1>
      <CercadorMunicipis onSelectMunicipi={handleSelectMunicipi} />
      <PrediccioTaula prediccio={prediccio} />
    </div>
  );
}

export default App;
