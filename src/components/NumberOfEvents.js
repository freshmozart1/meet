const NumberOfEvents = ({ updateEvents, min = 1, max, defaultValue }) => {
    return (
        <div className="NumberOfEvents">
            <label htmlFor="numberOfEvents" style={{ whiteSpace: 'nowrap' }}>Events on page:&nbsp;</label>
            <input
                type="number"
                className="event-number"
                min={min}
                max={max}
                defaultValue={defaultValue}
                onChange={(e) => updateEvents(e.target.value)}
                id="numberOfEvents"
            />
        </div>
    );
}

export default NumberOfEvents;