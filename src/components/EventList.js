// src/components/EventList.js

import React from "react";
import Event from "./Event";
import { Accordion, AccordionItem } from "react-bootstrap";


const EventList = ({ events = [], numberOfEvents = events.length }) => {
    return (
        <Accordion role='list' id='event-list' className="w-100">
            {
                events.length > 0 ? events.map(event => <Event
                    key={event.id}
                    event={event}
                    as={AccordionItem} />
                ).slice(0, numberOfEvents) : null
            }
        </Accordion>
    );
};

export default EventList;