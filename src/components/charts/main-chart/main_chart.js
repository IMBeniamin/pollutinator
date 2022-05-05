import axios from "axios";
import React, {useEffect, useState} from "react";
import Chart from 'react-apexcharts'
import "./main_chart.css";
import '../../../config';
import {CircularProgress} from "@mui/material";

export default function MainChart(props) {
    const [gdpPerCapita, setGdpPerCapita] = useState([]);
    const [population, setPopulation] = useState([]);
    const [ghgPerCapita, setGhgPerCapita] = useState([]);
    const [year, setYear] = useState([]);
    const [co2GrowthPrct, setCo2GrowthPrct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartSettings, setChartSettings] = useState(undefined)

    const getData = () => {
        axios
            .get(global.config.api_url,
                {
                    params: {
                        iso_code: props.iso_code,
                        year: `1990-2020`,
                        filter: "year,iso_code,population,ghg_per_capita,gdp,co2_growth_prct"
                    }
                })
            .then(res => {
                let set = res.data.sort((a, b) => a.year - b.year);
                set.forEach(element => {
                    element.gdp_per_capita = (element.gdp / element.population / 1000).toFixed(3);
                    element.population = (element.population / 1000000).toFixed(3);
                    element.ghg_per_capita = Math.abs(parseFloat(element.ghg_per_capita)).toFixed(3);
                });
                setYear(set.map(element => element.year));
                setGdpPerCapita(set.map(element => element.gdp_per_capita))
                setPopulation(set.map(element => element.population))
                setGhgPerCapita(set.map(element => element.ghg_per_capita))
                setCo2GrowthPrct(set.map(element => element.co2_growth_prct))
                setChartSettings(
                    {
                        series: [
                            {
                                name: "Population",
                                type: "area",
                                data: population
                            }, {
                                name: "GHG per capita",
                                type: "line",
                                data: ghgPerCapita
                            }, {
                                name: "GDP per capita",
                                type: "line",
                                data: gdpPerCapita
                            }, {
                                name: "CO2 growth percentage",
                                type: "line",
                                data: co2GrowthPrct
                            },
                        ],
                        labels: year,
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
                                curve: 'smooth'
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        minAngleToShowLabel: 45
                                    },
                                    columnWidth: '50%',
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
                                categories: year,
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
                            }
                        }
                    })
                console.log(res.data);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(x => {
        getData();
    }, [props.iso_code]);

    return isLoading ? <CircularProgress/> :
        (
            <div className="primary-chart">
                <Chart
                    options={chartSettings.options}
                    series={chartSettings.series}
                    height="100%"
                />
            </div>
        );
};
