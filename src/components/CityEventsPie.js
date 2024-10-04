import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import PropTypes from "prop-types";
import { extractAndCountTechnologies } from '../api';

const CityEventsPie = ({ events, className }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        setGenres(extractAndCountTechnologies(events));
    }, [events]);


    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        percent,
        index
    }) => {
        const RADIAN = Math.PI / 180;
        const x = cx + outerRadius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + outerRadius * Math.sin(-midAngle * Math.PI / 180) * 1.07;

        return (
            <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${genres[index]['name']} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width='99%' height={400} minWidth={360}>
            <PieChart>
                <Pie cx='50%' cy='50%' outerRadius={160} nameKey='name' dataKey='count' data={genres} fill="#8884d8" labelLine={false} label={renderCustomizedLabel} />
            </PieChart>
        </ResponsiveContainer>
    );
};

CityEventsPie.propTypes = {
    events: PropTypes.array.isRequired,
    className: PropTypes.string
};

export default CityEventsPie;