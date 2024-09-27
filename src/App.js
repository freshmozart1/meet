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
    const [slicedEvents, setSlicedEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(defaultNOE);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setEvents(await getEvents());
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        setSlicedEvents(events.slice(0, currentNOE));
    }, [events, currentNOE]);

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
                                    setCurrentNOE(number);
                                }} max={events.length} defaultValue={defaultNOE} />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <EventList events={slicedEvents} className='w-100' />
            </Stack>
        </Container>
    );
}

export default App;