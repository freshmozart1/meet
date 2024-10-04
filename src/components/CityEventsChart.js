// src/components/CityEventsChart.js

import React, { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(() => allLocations.map((location) => ({ city: location.split(/, | - /)[0], count: events.filter(event => event.location === location).length })));
    }, [`${events}`]);

    return (<ResponsiveContainer width='99%' height={400} minWidth={360}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: -30 }}>
            <CartesianGrid />
            <XAxis
                type='category'
                dataKey='city'
                name='City'
                angle={60}
                interval={0}
                tick={{ dx: 20, dy: 40, fontSize: 14 }}
            />
            <YAxis type='number' dataKey='count' name='Number of events' allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='Events' data={data} fill='#8884d8' />
        </ScatterChart>
    </ResponsiveContainer>);
};

CityEventsChart.propTypes = {
    allLocations: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired
};

export default CityEventsChart;