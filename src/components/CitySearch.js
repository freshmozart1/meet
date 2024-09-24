// src/components/CitySearch.js
import { React, useState } from 'react';

const CitySearch = ({ allLocations }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter(location => location.toUpperCase().indexOf(value.toUpperCase()) > -1) : [];
        setQuery(value);
        setSuggestions(filteredLocations);
    };
    const handleItemClicked = (event) => {
        setQuery(event.target.textContent);
        setShowSuggestions(false);
    }
    return (
        <div id="city-search">
            <input type="text" className="city" placeholder="search for a city" value={query} onFocus={() => setShowSuggestions(true)} onChange={handleInputChanged} />
            {
                showSuggestions ? <ul className="suggestions">
                    {
                        suggestions.map((suggestion, index) => (
                            <li key={index} onClick={handleItemClicked}>{suggestion}</li>
                        ))
                    }
                    <li key='See all cities' onClick={handleItemClicked}><b>See all cities</b></li>
                </ul> : null
            }
        </div>
    );
};

export default CitySearch;