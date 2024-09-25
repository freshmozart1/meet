const NumberOfEvents = ({ updateEvents, min = 1, max, placeholder }) => {
    return (
        <div className="NumberOfEvents">
            <label htmlFor="numberOfEvents">Events on page:</label>
            <input
                type="number"
                className="event-number"
                min={min}
                max={max}
                defaultValue={32}
                onChange={(e) => updateEvents(e.target.value)}
                id="numberOfEvents"
            />
        </div>
    );
}

export default NumberOfEvents;