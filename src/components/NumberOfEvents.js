import React from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({ setCurrentNOE, min = 1, max = Number.MAX_SAFE_INTEGER, defaultValue, setErrorAlert }) => {
    return (
        <div className="NumberOfEvents">
            <label htmlFor="numberOfEvents" style={{ whiteSpace: 'nowrap' }}>Events on page:&nbsp;</label>
            <input
                type="number"
                className="event-number"
                min={min}
                max={max}
                defaultValue={defaultValue}
                onChange={(e) => {
                    if (!(/^\d+$/.test(e.target.value))) {
                        if (setErrorAlert) setErrorAlert('Please enter a valid number');
                        return setCurrentNOE(defaultValue);
                    }
                    const value = parseInt(e.target.value);
                    if (value < min || value > max) {
                        if (setErrorAlert) setErrorAlert(`Please enter a number between ${min} and ${max}`);
                        return setCurrentNOE(defaultValue);
                    }
                    if (setErrorAlert) setErrorAlert('');
                    setCurrentNOE(value);
                }}
                id="numberOfEvents"
            />
        </div>
    );
}

NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.number.isRequired,
    setErrorAlert: PropTypes.func
};
export default NumberOfEvents;