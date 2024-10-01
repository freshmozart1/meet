import React from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({ setCurrentNOE, min = 1, max = Number.MAX_SAFE_INTEGER, defaultValue }) => {
    return (
        <div className="NumberOfEvents">
            <label htmlFor="numberOfEvents" style={{ whiteSpace: 'nowrap' }}>Events on page:&nbsp;</label>
            <input
                type="number"
                className="event-number"
                min={min}
                max={max}
                defaultValue={defaultValue}
                onChange={(e) => setCurrentNOE(e.target.value)}
                id="numberOfEvents"
            />
        </div>
    );
}

NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.number.isRequired
};
export default NumberOfEvents;