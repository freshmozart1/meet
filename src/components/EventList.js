// src/components/EventList.js

import React from "react";
import Event from "./Event";
import { Accordion, AccordionItem } from "react-bootstrap";


const EventList = ({ events }) => {
    return (
        <Accordion role='list' id='event-list'>
            {
                events ? events.map(event => <Event
                    key={event.id}
                    event={event}
                    as={AccordionItem} />
                ) : null
            }
        </Accordion>
    );
};

export default EventList;