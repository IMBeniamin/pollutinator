import React, {useEffect, useState} from "react";
import "./secondary_chart.css";
import Chart from "react-apexcharts"
import {Typography} from "@mui/material";
import '../../../config'

const label_formatter = {
    share_global_cement_co2: "Cement",
    share_global_coal_co2: "Coal",
    share_global_gas_co2: "Gas",
    share_global_oil_co2: "Oil",
    share_global_other_co2: "Other industry products"
}

const text_color = '#f5f5f5' //whitesmoke
const seriesName = "CO2 part global share"
/**
 * SecondaryChart component used for the right chart in the bottom reactive container
 * @param data (activeCountry)
 * @returns {JSX.Element}
 * @constructor
 */
export default function SecondaryChart({data}) {
    const [series, setSeries] = useState([{
        name: seriesName,
        data: []
    }])
    const options = {
        tooltip: {
            show: true,
            followCursor: true,
            fillSeriesColor: true,
            theme: "dark",
            x: {
                show: true,
            },
        },
        chart: {
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 400,
                animateGradually: {
                    enabled: true,
                    delay: 550
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 1000
                },
            },
            background: 'transparent',
            toolbar: {
                show: false,
            },
        },
        theme: {
            mode: 'dark',
            palette: 'palette3'
        },
        xaxis: {
            categories: Object.keys(data).filter(key => Object.keys(label_formatter).includes(key)).map(key => label_formatter[key]), //return an array of  CO2 parts global share available
            // position: "top",
            labels: {
                show: false,
                style: {
                    colors: text_color,
                    fontSize: '1em',
                }
            }
        },
        yaxis: {
            showForNullSeries: false,
            labels: {
                style: {
                    colors: [text_color],
                    fontSize: '1em'
                }
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    minAngleToShowLabel: 45,
                    size: '35%',
                    background: 'transparent',
                },
                distributed: true
            },
        },
        legend: {
            show: true,
            labels: {
                colors: [text_color],
                fontSize: '1em'
            }
        },
        noData: {
            text: 'No data available',
            style: {
                colors: text_color,
                fontFamily: 'Roboto'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: val => `${val}%`,
            style: {
                fontSize: '.7em',
                colors: [text_color]
            },
        }
    }
    useEffect(() => {
        setSeries([{
            name: seriesName,
            //return array of CO2 parts global share values which are available
            data: Object.keys(label_formatter).reduce((values, key) => {
                if (data[key])
                    values.push(data[key]);
                return values;
            }, [])
        }])
    }, [data]);

    return (
        <div className="secondary-chart">
            <Typography variant="h6" className="chart-title">
                Global share of CO2 emissions by industry
            </Typography>
            <div className="secondary-chart-container">
                <Chart
                    id="secondary-chart"
                    options={options}
                    series={series}
                    type="bar"
                    height="100%"
                />
            </div>
        </div>
    )
}

