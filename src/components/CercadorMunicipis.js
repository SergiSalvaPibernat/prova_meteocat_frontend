import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CercadorMunicipis = ({ onSelectMunicipi }) => {
    const [municipis, setMunicipis] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/municipis')
            .then(response => setMunicipis(response.data))
            .catch(error => console.error('Error fetching municipis:', error));
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSelect = (municipi) => {
        onSelectMunicipi(municipi);
    };

    const filteredMunicipis = municipis.filter(m => m.nom.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <input type="text" value={search} onChange={handleSearch} placeholder="Cerca municipi..." />
            <ul>
                {filteredMunicipis.map(m => (
                    <li key={m.codi} onClick={() => handleSelect(m)}>{m.nom}</li>
                ))}
            </ul>
        </div>
    );
};

export default CercadorMunicipis;