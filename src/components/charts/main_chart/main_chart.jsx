import axios from "axios";
import React, {useEffect, useState} from "react";
import Chart from 'react-apexcharts'
import "./main_chart.css";
import '../../../config';
import {CircularProgress, Typography} from "@mui/material";

/**
 * MainChart component used for the left chart in the bottom reactive container
 * @returns {JSX.Element} Returns the graphic component.
 */
const MainChart = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [chartSettings, setChartSettings] = useState(undefined)

    const getData = () => {
        axios
            .get(global.config.api_url,
                {
                    params: {
                        iso_code: props.iso_code,
                        year: `1990-2020`,
                        filter: "year,iso_code,population,gdp,consumption_co2_per_capita," +
                            "ghg_per_capita,cement_co2_per_capita,coal_co2_per_capita," +
                            "flaring_co2_per_capita,gas_co2_per_capita,oil_co2_per_capita" +
                            "other_co2_per_capita,consumption_co2_per_capita,methane_per_capita" +
                            "nitrous_oxide_per_capita,energy_per_capita"
                    }
                })
            .then(res => {
                res.data.forEach(element => {
                    element.gdp_per_capita = (element.gdp / element.population / 1000).toFixed(3);
                    element.population = (element.population / 1000000).toFixed(3);
                });
                setChartSettings({
                    series: [{
                        name: "Greenhouse gasses",
                        type: "line",
                        data: res.data.map(element => element.ghg_per_capita)
                    }, {
                        name: "GDP",
                        type: "line",
                        data: res.data.map(element => element.gdp_per_capita)
                    }, {
                        name: "CO2",
                        type: "line",
                        data: res.data.map(element => element.co2_per_capita)
                    }, {
                        name: "Population",
                        type: "area",
                        data: res.data.map(element => element.population)
                    }],
                    labels: res.data.map(element => element.year),
                    options: {
                        chart: {
                            stacked: false,
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
                                show: true,
                                tools: {
                                    download: false,
                                    selection: true,
                                    zoom: true,
                                    zoomin: true,
                                    zoomout: true,
                                    pan: true,
                                    reset: true,
                                },
                            }
                        },
                        stroke: {
                            width: [2, 2, 2, 2],
                            curve: ['smooth', 'smooth', 'smooth', 'straight'],
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    minAngleToShowLabel: 45
                                },
                                background: 'transparent'
                            }
                        },
                        tooltip: {
                            show: true,
                            followCursor: true,
                            fillSeriesColor: true,
                            theme: "dark",
                            x: {
                                show: true,
                            }
                        },
                        xaxis: {
                            categories: res.data.map(element => element.year),
                            position: "bottom",
                            labels: {
                                show: false,
                                style: {
                                    colors: ['#FFFFFF']
                                }
                            },
                        },
                        yaxis: {
                            type: 'numeric',
                            labels: {
                                style: {
                                    colors: ['#FFFFFF']
                                }
                            }
                        },
                        legend: {
                            show: true,
                            labels: {
                                colors: ['#FFFFFF']
                            }
                        },
                        theme: {
                            mode: 'dark',
                            palette: 'palette3'
                        },
                        fill: {
                            opacity: [1, 1, 1, 1],
                            type: ["solid", "solid", "solid", "gradient"],
                            gradient: {
                                inverseColors: false,
                                shade: 'light',
                                type: "vertical",
                                opacityFrom: 0.40,
                                opacityTo: 0,
                                stops: [0, 100, 100, 100]
                            }
                        },
                        // title: {
                        //     text: "Economical influence on pollution per capita",
                        //     align: 'center',
                        //     margin: 30,
                        //     floating: false,
                        //     style: {
                        //         fontSize:  '1em',
                        //         fontWeight:  'bold',
                        //         color:  'whitesmoke'
                        //     },
                        // }
                    }
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        setIsLoading(true)
        getData();
    }, [props.iso_code]);


    return isLoading ? <CircularProgress/> :
        (
            <div className="primary-chart">
                <Typography variant="h6" className="chart-title">
                    Economical influence on pollution per capita
                </Typography>
                <Chart
                    options={chartSettings.options}
                    series={chartSettings.series}
                    height="100%"
                />
            </div>
        );
};

export default MainChart
