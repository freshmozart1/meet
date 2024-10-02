import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents, extractLocations } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import NumberOfEvents from './components/NumberOfEvents';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

function App() {
    const defaultNOE = 32;
    const [infoAlert, setInfoAlert] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [warningAlert, setWarningAlert] = useState(navigator.onLine ? '' : 'You are offline. Events may not be up-to-date.');
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(defaultNOE);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCity, setCurrentCity] = useState('See all cities');

    useEffect(() => {
        (async () => {
            const allEvents = await getEvents();
            setEvents(currentCity === 'See all cities' ? allEvents : allEvents.filter(event => event.location === currentCity));
            setLocations(extractLocations(allEvents));
            setLoading(false);
            setWarningAlert(navigator.onLine ? '' : 'You are offline. Events may not be up-to-date.');
        })();
    }, [currentCity]);

    if (loading) {
        return (<div className='alerts-container'>
            <InfoAlert text='Loading...' />
        </div>);
    } else {
        return (
            <Container>
                <Stack gap={1} className="d-flex align-items-center">
                    {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                    {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
                    {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
                    <Navbar bg="light" expand="lg" className='w-100'>
                        <Container fluid className='w-100'>
                            <Navbar.Brand href="/">Meet App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbar-nav" />
                            <Navbar.Collapse id="navbar-nav">
                                <Nav className="me-auto">
                                    <CitySearch allLocations={locations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
                                </Nav>
                                <Nav>
                                    <NumberOfEvents setCurrentNOE={setCurrentNOE} max={events.length} defaultValue={defaultNOE} setErrorAlert={setErrorAlert} />
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