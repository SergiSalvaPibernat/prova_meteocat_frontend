import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import debounce from 'lodash.debounce'
import { getMunicipis } from '../services/api';

const CercadorMunicipis = ({ onSelectMunicipi }) => {
    const [municipis, setMunicipis] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleSearch = debounce((event) => {
        setSearch(event.target.value);
    }, 300);

    const handleSelect = (municipi) => {
        onSelectMunicipi(municipi);
    };

    const filteredMunicipis = municipis.filter(m => m.nom.toLowerCase().includes(search.toLowerCase()));

    if (loading) return <div>Carregant municipis...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <input type="text" onChange={handleSearch} placeholder="Cerca municipi..." />
            <ul>
                {filteredMunicipis.map(m => (
                    <li key={m.codi} onClick={() => handleSelect(m)}>{m.nom}</li>
                ))}
            </ul>
        </div>
    );
};

export default CercadorMunicipis;