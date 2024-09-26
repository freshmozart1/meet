import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents, extractLocations } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import NumberOfEvents from './components/NumberOfEvents';
import { Container, Nav, Navbar } from 'react-bootstrap';

function App() {
    const [events, setEvents] = useState([]);
    const [numberOfEvents, setNumberOfEvents] = useState(32);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setEvents(await getEvents());
            setLoading(false);
        })();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Container>
            <Stack gap={1} className="d-flex align-items-center">
                <Navbar bg="light" expand="lg" className='w-100'>
                    <Container fluid className='w-100'>
                        <Navbar.Brand href="/">Meet App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="me-auto">
                                <CitySearch allLocations={extractLocations(events)} />
                            </Nav>
                            <Nav>
                                <NumberOfEvents updateEvents={(number) => {
                                    if (number > 0 && number < events.length) {
                                        setNumberOfEvents(number);
                                    } else {
                                        setNumberOfEvents(32);
                                    }
                                }} max={events.length} />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <EventList events={events} numberOfEvents={numberOfEvents} className='w-100' />
            </Stack>
        </Container>
    );
}

export default App;