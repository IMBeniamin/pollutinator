import React, {useEffect, useLayoutEffect, useState} from "react";
import "./secondary_chart.css";
import Chart from "react-apexcharts"
import axios from "axios";
import {CircularProgress} from "@mui/material";
import '../../../config'

const label_formatter = {
    share_global_cement_co2: "Share global cement CO2",
    share_global_coal_co2: "Share global coal CO2",
    share_global_gas_co2: "Share global gas CO2",
    share_global_oil_co2: "Share global oil CO2",
    share_global_other_co2: "Share global other industry products CO2"
}

export default function SecondaryChart(props) {

    const { data } = props

    const [chartSetting, setChartSetting] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
            setIsLoading(true)

            let globalCO2label = Object.keys(data).filter(item => Object.keys(label_formatter).includes(item)).map(item => label_formatter[item])

            let globalCO2data = Object.keys(label_formatter).reduce((values, key) => {
                if (data[key] !== undefined)
                    values.push(props.data[key]);
                return values;
            }, [])


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
                        categories: globalCO2label,
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
                        data: globalCO2data
                    }
                ]
            })
            setIsLoading(false)
    }

    useLayoutEffect(() => {
        getData()
    }, [data]);

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
