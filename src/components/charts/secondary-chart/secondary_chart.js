import React, {memo} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import "./secondary_chart.css";

const SecondaryChart = () => {
    const data = [
        {
            name: 'January',
            co2: 300
        },
        {
            name: 'February',
            co2: 500
        },
        {
            name: 'March',
            co2: 100
        },
        {
            name: 'April',
            co2: 200
        },
        {
            name: 'May',
            co2: 400
        },
        {
            name: 'June',
            co2: 500
        },
        {
            name: 'July',
            co2: 600
        },
        {
            name: 'August',
            co2: 700
        },
        {
            name: 'September',
            co2: 800
        },
        {
            name: 'October',
            co2: 900
        },
        {
            name: 'November',
            co2: 1000
        },
        {
            name: 'December',
            co2: 1100
        },
    ];
    return (
        <div className="secondary-chart">
            <ResponsiveContainer
                minHeight={100}
                width="100%"
                height="100%"
                // aspect={16/9}
            >
                <LineChart
                    data={data}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                >
                    <CartesianGrid stroke="rgba(100, 100, 100, 0.45)" strokeDasharray="10 10"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="co2" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default memo(SecondaryChart);
