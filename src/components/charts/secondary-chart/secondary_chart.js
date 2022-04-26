import React, {useEffect, useState, memo} from "react";
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
import "./secondary_chart.css";
import Chart from "react-apexcharts"
import axios from "axios";
export default function SecondaryChart(props) {
    const [chartData, setChartData] = useState({
        share_global_cumulative_cement_co2: 0,
        share_global_cumulative_coal_co2: 0,
        share_global_cumulative_gas_co2: 0,
        share_global_cumulative_oil_co2: 0,
        share_global_cumulative_other_co2: 0,
    });

    useEffect(x => {
    axios
        .get(
            "https://inquinapi.derpi.it/api/",
            {
                params: {
                    iso_code: props.iso_code,
                    year: props.year,
                    filter: "share_global_cumulative_cement_co2,share_global_cumulative_coal_co2,share_global_cumulative_gas_co2,share_global_cumulative_oil_co2,share_global_cumulative_other_co2"
                }
            })
        .then(res => {
            let set = res.data.sort((a, b) => a.year - b.year);
            setChartData(set[0]);
            console.log(set);
        })
        .catch(err => {
            console.log(err);
        });
}, [props.iso_code, props.year]);

    let categoriesChart = Object.keys(chartData)
    for(let i = 0; i < categoriesChart.length; i++) {
        categoriesChart[i] = categoriesChart[i].replaceAll("_", " ")
        categoriesChart[i] = categoriesChart[i].charAt(0).toUpperCase() + categoriesChart[i].slice(1)
    }

    const chartSetting = {
        options:{
            tooltip: {
                show: true,
                followCursor: true,
                fillSeriesColor: true,
                theme: "dark",
                x:{
                    show:true,
                }
            },
            chart:{
                id:"sharing-global-co2",
                toolbar:{
                    show: false
                }
            },
            xaxis:{
                categories: categoriesChart,
                position: "top",
                tooltip: {
                    enabled: false,
                },
                labels:{
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    distributed: true
                },
            },
        },
        series: [
            {
                name: "",
                data: Object.values(chartData)
            }
        ]
    }


    return (
        <div className="secondary-chart">
            {/*<ResponsiveContainer*/}
            {/*    // minHeight="100%"*/}
            {/*    // width="99%"*/}
            {/*    // height="300px"*/}
            {/*    aspect={16/9}*/}
            {/*>*/}
            {/*    <ComposedChart*/}
            {/*        data={chartData}*/}
            {/*        margin={{top: 10, right: 30, left: 0, bottom: 0}}*/}
            {/*    >*/}
            {/*        <defs>*/}
            {/*            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">*/}
            {/*                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>*/}
            {/*                <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4}/>*/}
            {/*                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.0}/>*/}
            {/*            </linearGradient>*/}
            {/*        </defs>*/}
            {/*        <CartesianGrid stroke="rgba(100, 100, 100, 0.45)" strokeDasharray="3 3"/>*/}
            {/*        <XAxis dataKey="year" scale="band"/>*/}
            {/*        <YAxis />*/}
            {/*        <Tooltip*/}
            {/*            contentStyle={{*/}
            {/*                backgroundColor: "rgba(5, 5, 5, 0.6)",*/}
            {/*                blur: "15px",*/}
            {/*                borderRadius: "2.5em",*/}
            {/*                backdropFilter: "blur(5px)",*/}
            {/*                border: "1px solid #000",*/}
            {/*            }}*/}
            {/*            // itemStyle={{ color: "whitesmoke" }}*/}
            {/*        />*/}
            {/*        <Legend/>*/}
            {/*        ,*/}
            {/*        ,*/}
            {/*        ,*/}
            {/*        ,*/}

            {/*        <Bar*/}
            {/*            type="monotone"*/}
            {/*            dataKey="share_global_cumulative_cement_co2"*/}
            {/*            fill="#8884d8"*/}
            {/*            name="Global Cement CO2"*/}
            {/*            unit="%"*/}
            {/*        />*/}
            {/*        <Bar*/}
            {/*            type="monotone"*/}
            {/*            dataKey="share_global_cumulative_coal_co2"*/}
            {/*            fill="#82ca9d"*/}
            {/*            name="Global Coal CO2"*/}
            {/*            unit="%"*/}
            {/*        />*/}
            {/*        <Bar*/}
            {/*            type="monotone"*/}
            {/*            dataKey="share_global_cumulative_oil_co2"*/}
            {/*            fill="#ffc658"*/}
            {/*            name="Global Oil CO2"*/}
            {/*            unit="%"*/}
            {/*        />*/}
            {/*        <Bar*/}
            {/*            type="monotone"*/}
            {/*            dataKey="share_global_cumulative_other_co2"*/}
            {/*            fill="#ff8a65"*/}
            {/*            name="Global Other CO2"*/}
            {/*            unit="%"*/}
            {/*        />*/}
            {/*    </ComposedChart>*/}
            {/*</ResponsiveContainer>*/}
            <Chart
                options={chartSetting.options}
                series={chartSetting.series}
                type="bar"
            />
        </div>
    );
};
