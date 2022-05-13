import React, {useEffect, useState} from "react";
import "./main_chart.css";
import '../../../config';
import {Typography} from "@mui/material";
import Chart from "react-apexcharts"

const statesCompare = 4
const maxVarianceTrade = 100
const maxVarianceConsumption = 1000
const text_color = '#f5f5f5'

/**
 *
 * @param arr
 * @param n
 * @returns {any[]|*}
 */
function getRandom(arr, n) {
    let result = new Array(n), len = arr.length, taken = new Array(len)

    if (n > len)
        return arr
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const label_formatter = {
    trade_co2: "CO2 by trade",
    consumption_co2: "CO2 products by consumption"
}

/**
 * MainChart component used for the left chart in the bottom reactive container
 * @returns {JSX.Element} Returns the graphic component.
 */



const MainChart = (props) => {

    const {activeCountry, data} = props

    const [series, setSeries] = useState([])

    //filter data to only nation that have iso_code, trade_co2 and consumption_co2
    let cleanData = data.filter(obj => (obj.iso_code && obj.trade_co2) && obj.consumption_co2)

    //delete activeCountry from data to avoid getting it in random
    cleanData.splice(cleanData.indexOf(activeCountry),1)

    //applying variance to take nation which have similar consumption and trade co2
    let dataTradeFiltered = cleanData.filter(obj => Math.abs(obj.trade_co2 - activeCountry.trade_co2) <= maxVarianceTrade )
    let dataTradeConsumptionFiltered = dataTradeFiltered.filter(obj => Math.abs(obj.consumption_co2 - activeCountry.consumption_co2) <= maxVarianceConsumption)

    let country = Object.values(dataTradeConsumptionFiltered.map(obj => obj.country))
    let trade_co2 = Object.values(dataTradeConsumptionFiltered.map(obj => obj.trade_co2))
    let consumption_co2 = Object.values(dataTradeConsumptionFiltered.map(obj => obj.consumption_co2))

    //setting data. Getting 4 random nation and, if activeCountry doesn't have a property, using an empty array
    let dataFormatted = {
        country: [...getRandom(country, statesCompare), activeCountry.country],
        trade_co2: [...getRandom(trade_co2, statesCompare), activeCountry.trade_co2],
        consumption_co2: [...getRandom(consumption_co2, statesCompare), activeCountry.consumption_co2]
    }

    //setting legend: select only trade and consumption co2 properties from dataFormatter and formatting it with label formatter
    let legend = Object.keys((({trade_co2, consumption_co2}) => ({
        trade_co2,
        consumption_co2
    }))(dataFormatted)).map(key => label_formatter[key])


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
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: [text_color]
            }
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
                    colors: [text_color]
                }
            }
        },
        yaxis: {
            showForNullSeries: false,
            labels: {
                style: {
                    colors: [text_color]
                }
            }
        },
        legend: {
            show: true,
            customLegendItems: legend,
            labels: {
                colors: [text_color]
            }
        },
        noData: {
            text: 'Data unavaliable',
            style: {
                colors: [text_color],
                fontfamily: 'Roboto'
            }
        }
    }

    console.log({legend,dataFormatted})
    useEffect(() => {

        console.log({data})

    if (isLoading) return <div className="loader"/>;
    return (
        <div className="primary-chart">
            <Typography variant="h6" className="chart-title">
                Economical influence on pollution per capita
            </Typography>
            <div className="primary-chart-container">
        console.log(dataFormatted)


        setSeries([{
                name: "CO2 products by trade",
                data: dataFormatted.trade_co2
            }, {
                name: "CO2 products by consumption",
                data: dataFormatted.consumption_co2
            }])

    }, [activeCountry]);


    return ( (activeCountry.iso_code && activeCountry.consumption_co2) && activeCountry.trade_co2) ?
        (
            <div className="primary-chart">
                <Typography variant="h6" className="chart-title">
                    Economical influence on pollution per capita
                </Typography>
                <Chart
                    id="primary-chart"
                    options={options}
                    series={series}
                    type="bar"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default MainChart
