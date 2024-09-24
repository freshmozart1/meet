import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        (async () => {
            setEvents(await getEvents());
        })();
    }, []);
    return (
        <div className="App">
            <CitySearch />
            <EventList events={events} />
        </div>
    );
}

export default App;