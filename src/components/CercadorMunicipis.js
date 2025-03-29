import React, { useState, useEffect } from 'react';
import { getMunicipis } from '../services/api'; // Importa la funció per obtenir municipis
import './CercadorMunicipis.css'; // Importa l'estil del component

const CercadorMunicipis = ({ onSelectMunicipi }) => {
    // Estat per emmagatzemar els municipis
    const [municipis, setMunicipis] = useState([]);
    const [search, setSearch] = useState(''); // Estat per a la cerca de municipis
    const [loading, setLoading] = useState(true); // Estat per indicar si s'està carregant
    const [error, setError] = useState(null); // Estat per gestionar errors
    const [showList, setShowList] = useState(false); // Estat per mostrar o amagar la llista de suggeriments

    // useEffect per carregar els municipis en muntar el component
    useEffect(() => {
        console.log('Fetching municipis...');
        getMunicipis()
            .then(response => {
                console.log('Municipis fetched:', response.data);
                setMunicipis(response.data); // Desa els municipis a l'estat
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching municipis:', error);
                setError('Error carregant municipis'); // Mostra missatge d'error
                setLoading(false);
            });
    }, []);

    // Actualitza l'estat de la cerca i mostra la llista de suggeriments
    const handleSearch = (event) => {
        setSearch(event.target.value);
        setShowList(true);
    };

    // Gestiona la selecció d'un municipi
    const handleSelect = (municipi) => {
        onSelectMunicipi(municipi); // Notifica el component pare amb el municipi seleccionat
        setSearch(''); // Neteja l'input
        setShowList(false); // Amaga la llista de suggeriments
    };

    // Mostra la llista de suggeriments quan l'input rep focus
    const handleFocus = () => {
        setShowList(true);
    };

    // Amaga la llista de suggeriments quan l'input perd focus
    const handleBlur = () => {
        setTimeout(() => setShowList(false), 200); // Retard per permetre seleccionar un element
    };

    // Gestiona la tecla "Enter" per seleccionar un municipi si coincideix exactament amb la cerca
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const selectedMunicipi = municipis.find(m => m.nom.toLowerCase() === search.toLowerCase());
            if (selectedMunicipi) {
                handleSelect(selectedMunicipi);
            }
        }
    };

    // Gestiona el clic a la icona de la lupa per fer la cerca
    const handleIconClick = () => {
        const selectedMunicipi = municipis.find(m => m.nom.toLowerCase() === search.toLowerCase());
        if (selectedMunicipi) {
            handleSelect(selectedMunicipi);
        }
    };

    // Filtra els municipis segons el text introduït (insensible a majúscules/minúscules)
    const filteredMunicipis = municipis.filter(m => m.nom.toLowerCase().includes(search.toLowerCase()));

    // Mostra un missatge si encara s'estan carregant els municipis
    if (loading) return <div>Carregant municipis...</div>;
    if (error) return <div>{error}</div>; // Mostra un missatge d'error si hi ha problemes en la càrrega

    return (
        <div className="search-container">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Cercar municipi"
                className="search-input"
            />
            {/* Icona de lupa per activar la cerca */}
            <img src="/lupa.png" alt="Search" className="search-icon" onClick={handleIconClick} />
            {/* Mostra la llista de municipis filtrats si showList és true */}
            {showList && (
                <ul className="search-list">
                    {filteredMunicipis.map(m => (
                        <li key={m.codi} onClick={() => handleSelect(m)}>{m.nom}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CercadorMunicipis;
