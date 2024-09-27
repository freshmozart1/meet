import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents, extractLocations } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import NumberOfEvents from './components/NumberOfEvents';
import { Container, Nav, Navbar } from 'react-bootstrap';

function App() {
    const defaultNOE = 32;
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(defaultNOE);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setEvents(await getEvents());
        })();
    }, []);

    useEffect(() => {
        setLocations(extractLocations(events));
        setLoading(events.length === 0);
    }, [events]);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container>
                <Stack gap={1} className="d-flex align-items-center">
                    <Navbar bg="light" expand="lg" className='w-100'>
                        <Container fluid className='w-100'>
                            <Navbar.Brand href="/">Meet App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbar-nav" />
                            <Navbar.Collapse id="navbar-nav">
                                <Nav className="me-auto">
                                    <CitySearch allLocations={locations} />
                                </Nav>
                                <Nav>
                                    <NumberOfEvents updateEvents={(number) => {
                                        setCurrentNOE(number);
                                    }} max={events.length} defaultValue={defaultNOE} />
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <EventList events={events.slice(0, currentNOE)} className='w-100' />
                </Stack>
            </Container>
        );
    }
}

export default App;