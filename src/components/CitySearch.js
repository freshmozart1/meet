// src/components/CitySearch.js
import React, { useState, useRef } from 'react';
import { NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CitySearch.scss';

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const inputRef = useRef(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState(allLocations ? allLocations : []);
    const [showNoCityFound, setShowNoCityFound] = useState(false);
    const handleInputChanged = (event) => {
        const value = event.target.value;
        if (value) {
            const filteredLocations = allLocations ? allLocations.filter(location => location.toUpperCase().indexOf(value.toUpperCase()) > -1) : [];
            setShowNoCityFound(filteredLocations.length === 0);
            setQuery(value);
            setSuggestions(filteredLocations);
            setShowSuggestions(true);
        } else {
            setQuery('');
            setSuggestions(allLocations ? allLocations : []);
            setShowSuggestions(false);
        }
    };
    const handleCityClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
    };

    const handleAllCitiesClicked = () => {
        setQuery('');
        setSuggestions(allLocations ? allLocations : []);
        setShowSuggestions(true);
    };
    return (
        <NavDropdown id='city-search' role='list' className='no-caret' title={<input ref={inputRef} type='text' placeholder='Search for a city' value={query} onClick={(e) => { e.stopPropagation(); setShowSuggestions(true); }} onChange={(e) => handleInputChanged(e)} />}
            show={showSuggestions}
            onToggle={(isOpen) => { setShowSuggestions(isOpen) }}
        >
            {
                suggestions.map((suggestion, index) => (<NavDropdown.Item role='listitem' key={index} onClick={(e) => handleCityClicked(e)}>{suggestion}</NavDropdown.Item>))
            }
            {
                showNoCityFound ? <NavDropdown.Item role='listitem' disabled>No city found</NavDropdown.Item> : null
            }
            <NavDropdown.Divider />
            <NavDropdown.Item role='listitem' onClick={(e) => {
                e.stopPropagation();
                handleAllCitiesClicked();
                inputRef.current.focus();
            }}>See all cities</NavDropdown.Item>
        </NavDropdown>
    );
};

CitySearch.propTypes = {
    allLocations: PropTypes.array.isRequired,
    setCurrentCity: PropTypes.func.isRequired
};

export default CitySearch;