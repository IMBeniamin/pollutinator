import React, {useEffect, useMemo, useState} from "react";
import "./main_chart.css";
import '../../../config';
import {Typography} from "@mui/material";
import Chart from "react-apexcharts"

const text_color = '#f5f5f5'
const label_formatter = {
    trade_co2: "CO2 by trade",
    consumption_co2: "CO2 products by consumption"
}


/**
 * MainChart component used for the left chart in the bottom reactive container
 * @returns {JSX.Element} Returns the graphic component.
 */
const MainChart = ({activeCountry, data}) => {

    const [series, setSeries] = useState([
        {
            name: 'trade_co2',
            data: []
        },
        {
            name: 'consumption_co2',
            data: []
        }
    ])
    //filter data to only nation that have iso_code, trade_co2 and consumption_co2
    let cleanData = data.filter(obj => (obj.iso_code && obj.trade_co2) && obj.consumption_co2)

    const dynamic_variance_avg_trade_co2 = useMemo(() =>
            cleanData.map((obj) => obj.trade_co2).reduce((a, b) => Math.abs(a - b), 0) / cleanData.length,
        [cleanData])
    const dynamic_variance_trade_co2 = useMemo(() =>
            Math.abs(activeCountry.trade_co2 - dynamic_variance_avg_trade_co2) / activeCountry.trade_co2 * activeCountry.trade_co2 / 2,
        [activeCountry, dynamic_variance_avg_trade_co2])
    // console.log("dynamic_variance_trade_co2: ", dynamic_variance_trade_co2)

    const variance_tolerant_trade_co2 = cleanData.reduce((pV, cV) => {
        if (Math.abs(activeCountry.trade_co2 - cV.trade_co2) <= dynamic_variance_trade_co2)
            pV.push(cV)
        return pV
    }, [])
    // console.log("Variance tolerant trade_co2: ", variance_tolerant_trade_co2)


    const dynamic_variance_avg_consumption_co2_trade_co2 = useMemo(() =>
            variance_tolerant_trade_co2.map((obj) => obj.consumption_co2).reduce((a, b) => Math.abs(a - b), 0) /
            variance_tolerant_trade_co2.length,
        [variance_tolerant_trade_co2])
    const dynamic_variance_consumption_co2_trade_co2 = useMemo(() =>
            Math.abs(activeCountry.consumption_co2 - dynamic_variance_avg_consumption_co2_trade_co2) /
            activeCountry.consumption_co2 * activeCountry.consumption_co2 / 2,
        [activeCountry.consumption_co2, dynamic_variance_avg_consumption_co2_trade_co2])
    // console.log("dynamic_variance_consumption_co2_trade_co2: ", dynamic_variance_consumption_co2_trade_co2)

    const variance_tolerant_consumption_co2_trade_co2 = variance_tolerant_trade_co2.reduce((pV, cV) => {
        if (Math.abs(activeCountry.consumption_co2 - cV.consumption_co2) <= dynamic_variance_consumption_co2_trade_co2)
            pV.push(cV)
        return pV
    }, []).slice(0, 6) // limit max number of countries to 10

    //setting data. Getting 4 random nation and, if activeCountry doesn't have a property, using an empty array
    let dataFormatted = {
        country: variance_tolerant_consumption_co2_trade_co2.reduce((pV, cV) => {
            pV.push(cV.country)
            return pV
        }, []),
        trade_co2: variance_tolerant_consumption_co2_trade_co2.reduce((pV, cV) => {
            pV.push(cV.trade_co2)
            return pV
        }, []),
        consumption_co2: variance_tolerant_consumption_co2_trade_co2.reduce((pV, cV) => {
            pV.push(cV.consumption_co2)
            return pV
        }, [])
    }

    //setting legend: select only trade and consumption co2 properties from dataFormatter and formatting it with label formatter
    let legend = Object.keys((({trade_co2, consumption_co2}) => ({
        trade_co2,
        consumption_co2
    }))(dataFormatted)).map(key => label_formatter[key])


    const avg = (dataFormatted.trade_co2.reduce((a, b) => a + b, 0) / dataFormatted.trade_co2.length
        + dataFormatted.consumption_co2.reduce((a, b) => a + b, 0) / dataFormatted.consumption_co2.length) / 2
    // console.log(avg)

    const options = {
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
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    minAngleToShowLabel: 45,
                    size: '35%',
                    background: 'transparent',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetY: 7,
            textAnchor: 'end',
            formatter: (val, opts) => {
                return val > avg ? Math.round(val) + ' (Mt)' : ''
            },
            style: {
                padding: '.5em',
                fontSize: '.7em',
                colors: [text_color]
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: [text_color]
        },
        tooltip: {
            show: true,
            followCursor: true,
            fillSeriesColor: true,
            theme: "dark",
            x: {
                show: true,
            },
        },
        xaxis: {
            categories: dataFormatted.country,
            labels: {
                style: {
                    colors: [text_color],
                    fontSize: '1em'
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
        legend: {
            show: true,
            customLegendItems: legend,
            labels: {
                colors: [text_color],
                fontSieze: '1em'
            }
        },
        noData: {
            text: 'No data available',
            style: {
                colors: [text_color],
                fontFamily: 'Roboto'
            }
        }
    }

    useEffect(() => {
        setSeries([{
            name: "CO2 products by trade",
            data: dataFormatted.trade_co2
        }, {
            name: "CO2 products by consumption",
            data: dataFormatted.consumption_co2
        }])

    }, [activeCountry]);


    return (
        <div className="primary-chart">
            <Typography variant="h6" className="chart-title">
                Similar emissions regarding economic activities
            </Typography>
            <div className="primary-chart-container">
                <Chart
                    id="primary-chart"
                    options={options}
                    series={series}
                    type="bar"
                    height="100%"
                />
            </div>
            {/*{!dynamic_variance_consumption_co2_trade_co2 ? null :*/}
            {/*    <div className="chart-subtitle">*/}
            {/*        <Typography fontStyle='normal' variant='subtitle1'>*/}
            {/*            {`Variances allowed:`}*/}
            {/*        </Typography>*/}
            {/*        <Typography padding=".5em" display="inline" fontStyle='italic' variant='subtitle2'>*/}
            {/*            Trade CO2:*/}
            {/*            <Typography color='yellow' padding='.2em' display="inline" variant='button'>*/}
            {/*                <FontAwesomeIcon icon="fa-plus-minus"/>*/}
            {/*                {`${dynamic_variance_trade_co2.toFixed(2)}`}*/}
            {/*            </Typography>*/}
            {/*            Mt*/}
            {/*        </Typography>*/}
            {/*        <Typography padding=".5em" display="inline" fontStyle='italic' variant='subtitle2'>*/}
            {/*            Consumption CO2:*/}
            {/*            <Typography color='yellow' padding='.2em' display="inline" variant='button'>*/}
            {/*                <FontAwesomeIcon icon="fa-plus-minus"/>*/}
            {/*                {`${dynamic_variance_consumption_co2_trade_co2.toFixed(2)}`}*/}
            {/*            </Typography>*/}
            {/*            Mt*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
};

export default MainChart
