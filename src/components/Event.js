// src/components/Event.js

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Stack from 'react-bootstrap/Stack';

const Event = ({ event, as: Component, accordionKey = event.id }) => {
    return (
        <Component eventKey={accordionKey} role='listitem'>
            <Accordion.Header as='div'>
                <Stack>
                    <h2>{event.summary}</h2>
                    <p>{event.start.dateTime}</p>
                    <p>{event.location}</p>
                </Stack>
            </Accordion.Header>
            <Accordion.Body>
                <p>{event.description}</p>
            </Accordion.Body>
        </Component>
    );
}

export default Event;