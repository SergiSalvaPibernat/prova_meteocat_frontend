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
    };

    const handleSelect = (municipi) => {
        onSelectMunicipi(municipi);
        setSearch(municipi.nom);
        setShowList(false);
    };

    const handleFocus = () => {
        setShowList(true);
    };

    const handleBlur = () => {
        setTimeout(() => setShowList(false), 200); // Delay to allow click event to register
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
                placeholder="Cerca municipi..."
                className="search-input"
            />
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