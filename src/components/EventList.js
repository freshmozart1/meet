// src/components/EventList.js

import React from "react";
import Event from "./Event";
import { Accordion, AccordionItem } from "react-bootstrap";
import PropTypes from "prop-types";


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

EventList.propTypes = {
    events: PropTypes.array,
    className: PropTypes.string
};

export default EventList;