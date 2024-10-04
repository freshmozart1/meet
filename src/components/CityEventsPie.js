import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import PropTypes from "prop-types";
import { extractAndCountTechnologies } from '../api';

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${name} (${value})`}
        </text>
    );
};

const CityEventsPie = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(extractAndCountTechnologies(events));
    }, [events]);

    return (
        <ResponsiveContainer width='99%' height={400}>
            <PieChart>
                <Pie cx='50%' cy='50%' outerRadius={160} nameKey='name' dataKey='count' data={data} fill="#8884d8" labelLine={false} label={renderCustomizedLabel} />
            </PieChart>
        </ResponsiveContainer>
    );
};

CityEventsPie.propTypes = {
    events: PropTypes.array.isRequired
};

export default CityEventsPie;