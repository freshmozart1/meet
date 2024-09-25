import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents, extractLocations } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import NumberOfEvents from './components/NumberOfEvents';

function App() {
    const [events, setEvents] = useState([]);
    const [numberOfEvents, setNumberOfEvents] = useState(32);
    useEffect(() => { (async () => setEvents(await getEvents()))(); }, []);
    return (
        <Stack gap={1} className="App container d-flex align-items-center w-100">
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>Meet App</a>
                    <CitySearch allLocations={extractLocations(events)} />
                    <NumberOfEvents updateEvents={(number) => {
                        if (number > 0 && number < events.length) {
                            setNumberOfEvents(number);
                        } else {
                            setNumberOfEvents(32);
                        }
                    }} max={events.length} placeholder={32} />
                </div>
            </nav>
            <EventList events={events} numberOfEvents={numberOfEvents} />
        </Stack>
    );
}

export default App;