import React, {useEffect, useState} from "react";
import "./secondary_chart.css";
import Chart from "react-apexcharts"
import axios from "axios";
import {CircularProgress} from "@mui/material";
import '../../../config'

export default function SecondaryChart(props) {
    const [chartSetting, setChartSetting] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        setIsLoading(true)
        axios
            .get(
                global.config.api_url,
                {
                    params: {
                        iso_code: props.iso_code,
                        year: props.year,
                        filter: "share_global_cement_co2,share_global_coal_co2,share_global_gas_co2,share_global_oil_co2,share_global_other_co2"
                    }
                })
            .then(res => {
                let data = res.data[0]
                console.log(props.label_formatter)
                setChartSetting({
                    options: {
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
                            id: "sharing-global-co2",
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
                            categories: Object.keys(data).map(key => props.label_formatter[key]),
                            position: "top",
                            tooltip: {
                                enabled: false,
                            },
                            labels: {
                                show: false,
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: ['#FFFFFF']
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
                                colors: ['#FFFFFF']
                            }
                        }
                    },
                    series: [
                        {
                            name: "Sharing global CO2 parts",
                            data: Object.values(data)
                        }
                    ]
                })
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [props.iso_code, props.year]);

    return isLoading ?
        (
            <CircularProgress/>
        )
        :
        (
            <div className="secondary-chart">
                <Chart
                    options={chartSetting.options}
                    series={chartSetting.series}
                    type="bar"
                    height="100%"
                />
            </div>
        )
};
