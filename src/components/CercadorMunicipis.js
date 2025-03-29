import React, { useState, useEffect } from 'react';
import { getMunicipis } from '../services/api';
import './CercadorMunicipis.css';

const CercadorMunicipis = ({ onSelectMunicipi }) => {
    const [municipis, setMunicipis] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        console.log('Fetching municipis...');
        getMunicipis()
            .then(response => {
                console.log('Municipis fetched:', response.data);
                setMunicipis(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching municipis:', error);
                setError('Error carregant municipis');
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setShowList(true); // Mostrar la llista mentre l'usuari escriu
    };

    const handleSelect = (municipi) => {
        onSelectMunicipi(municipi);
        setSearch('');
        setShowList(false);
    };

    const handleFocus = () => {
        setShowList(true);
    };

    const handleBlur = () => {
        setTimeout(() => setShowList(false), 200); // Delay to allow click event to register
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const selectedMunicipi = municipis.find(m => m.nom.toLowerCase() === search.toLowerCase());
            if (selectedMunicipi) {
                handleSelect(selectedMunicipi);
            }
        }
    };

    const handleIconClick = () => {
        const selectedMunicipi = municipis.find(m => m.nom.toLowerCase() === search.toLowerCase());
        if (selectedMunicipi) {
            handleSelect(selectedMunicipi);
        }
    };

    const filteredMunicipis = municipis.filter(m => m.nom.toLowerCase().includes(search.toLowerCase()));

    if (loading) return <div>Carregant municipis...</div>;
    if (error) return <div>{error}</div>;

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
            <img src="/lupa.png" alt="Search" className="search-icon" onClick={handleIconClick} /> {/* Afegir la icona de lupa */}
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