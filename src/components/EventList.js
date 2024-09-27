// src/components/EventList.js

import React from "react";
import Event from "./Event";
import { Accordion, AccordionItem } from "react-bootstrap";


const EventList = ({ events = [], className }) => {
    return (
        <Accordion role='list' id='event-list' className={className}>
            {
                events.length > 0 ? events.map(event => <Event
                    key={event.id}
                    event={event}
                    as={AccordionItem} />
                ) : null
            }
        </Accordion>
    );
};

export default EventList;