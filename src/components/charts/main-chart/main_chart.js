import axios from "axios";
import React, {useEffect, useState} from "react";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import "./main_chart.css";

export default function MainChart(props) {
    const [chartData, setChartData] = useState();
    useEffect(x => {
        axios
            .get(
                "https://inquinapi.derpi.it/api/",
                {
                    params: {
                        iso_code: props.iso_code,
                        year: `1990-2020`,
                        filter: "year,iso_code,population,ghg_per_capita,gdp"
                    }
                })
            .then(res => {
                let set = res.data.sort((a, b) => a.year - b.year);
                set.forEach(element => {
                    element.gdp_per_capita = (element.gdp / element.population / 1000).toFixed(3);
                    element.population = (element.population / 1000000).toFixed(3);
                    element.ghg_per_capita = Math.abs(parseFloat(element.ghg_per_capita)).toFixed(3);
                });
                setChartData(set);
                document.test = chartData;
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.iso_code]);
    return (
        <div className="primary-chart">
            <ResponsiveContainer
                minHeight="100%"
                width="100%"
                height="100%"
                // aspect={16/9}
            >
                <ComposedChart
                    data={chartData}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(100, 100, 100, 0.45)" strokeDasharray="3 3"/>
                    <XAxis dataKey="year" scale="band"/>
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(5, 5, 5, 0.6)",
                            blur: "15px",
                            borderRadius: "2.5em",
                            backdropFilter: "blur(5px)",
                            border: "1px solid #000",
                        }}
                        // itemStyle={{ color: "whitesmoke" }}
                    />
                    <Legend/>
                    <Bar type="monotone"
                         dataKey="population"
                         name="Population"
                         barSize={1}
                         fill="#935F8D"
                         unit=" Million"
                    />
                    <Area type="monotone"
                          dataKey="ghg_per_capita"
                          name="GHG per Capita"
                          stroke="#8884d8"
                          strokeWidth={2}
                          fill="url(#colorValue)"
                          unit=" t"
                    />
                    <Line
                        type="monotone"
                        dataKey="gdp_per_capita"
                        name="GDP per Capita"
                        stroke="#ffdf00"
                        strokeWidth={2}
                        unit=" k"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
