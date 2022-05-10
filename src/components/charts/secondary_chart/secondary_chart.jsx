import React, {useEffect, useState} from "react";
import "./secondary_chart.css";
import Chart from "react-apexcharts"
import {CircularProgress, Typography} from "@mui/material";
import '../../../config'
// todo add global share co2 in the title

const label_formatter = {
    share_global_cement_co2: "Cement",
    share_global_coal_co2: "Coal",
    share_global_gas_co2: "Gas",
    share_global_oil_co2: "Oil",
    share_global_other_co2: "Other industry products"
}

export default function SecondaryChart(props) {
    const [chartSetting, setChartSetting] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    // title: {
    //     text: "Global share of CO2 emissions by industry",
    //     align: 'center',
    //     margin: 30,
    //     floating: false,
    //     style: {
    //         fontSize:  '1em',
    //         fontWeight:  'bold',
    //         color:  'whitesmoke'
    //     },
    // }


    useEffect(() => {
        setIsLoading(true)

        setChartSetting(
            {
                series: [{
                    name: "Sharing global CO2 parts",
                    data: Object.keys(label_formatter).reduce((values, key) => {
                        if (props.data[key] !== undefined)
                            values.push(props.data[key]);
                        return values;
                    }, [])
                }],
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
                        categories: Object.keys(props.data).filter(key => Object.keys(label_formatter).includes(key)).map(key => label_formatter[key]),
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
                    },
                    // title: {
                    //     text: "Global share of CO2 emissions by industry",
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
    }, [props.data]);

    return isLoading ? <CircularProgress/> :
        (
            <div className="secondary-chart">
                <Typography variant="h6" className="chart-title">
                    Global share of CO2 emissions by industry
                </Typography>
                <Chart
                    options={chartSetting.options}
                    series={chartSetting.series}
                    type="bar"
                    height="100%"
                />
            </div>
        )
}

