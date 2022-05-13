import React, {useEffect, useState} from "react";
import "./main_chart.css";
import '../../../config';
import {CircularProgress, Typography} from "@mui/material";
import Chart from "react-apexcharts"

const statesCompare = 4
const text_color = '#f5f5f5'
/**
 * two_pass_variance is algorithm that calculate a variance dynamically
 * @param arrObj: array of objects
 * @param property: the values on which the algorithm relies to calculate the variance
 * @returns {number}: the variance
 */
const two_pass_variance = (arrObj, property) => {
    if (arrObj.length < 2)
        return 0

    let cleanData = arrObj.filter(obj => obj.iso_code && obj.trade_co2 && obj.consumption_co2)

    let k, n, ex, ex2
    k = cleanData[0][property]
    n = ex = ex2 = 0

    cleanData.forEach(function (obj) {
        n++
        ex += obj[property] - k
        ex2 += (obj[property] - k) * (obj[property] - k)
    })

    return (ex2 - (ex * ex) / n) / (n - 1)
}

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
        var x = Math.floor(Math.random() * len);
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

    const {dataActiveCountry, data} = props

    const maxVarianceTrade = Math.round(two_pass_variance(data, "trade_co2") / 5)
    const maxVarianceConsumption = Math.round(two_pass_variance(data, "consumption_co2"))


    const [isLoading, setIsLoading] = useState(true);
    const [chartSetting, setChartSetting] = useState(undefined)


    useEffect(() => {
        setIsLoading(true)

        //filter data to only nation that have iso_code, trade_co2 and consumption_co2
        let cleanData = data.filter(obj => obj.iso_code && obj.trade_co2 && obj.consumption_co2)

        //applying variance to take nation which have similar consumption and trade co2
        let dataTradeFiltered = cleanData.filter(obj => Math.abs(obj.trade_co2 - dataActiveCountry.trade_co2) <= maxVarianceTrade / 100)
        let dataTradeConsumptionFiltered = dataTradeFiltered.filter(obj => Math.abs(obj.consumption_co2 - dataActiveCountry.consumption_co2) <= maxVarianceConsumption / 1000 && obj.iso_code)

        //delete activeCountry from data filtered to avoid getting it in random
        dataTradeConsumptionFiltered.forEach((obj, index) => {
            if (obj.iso_code === dataActiveCountry.iso_code)
                dataTradeConsumptionFiltered.splice(index, 1)
        })

        let country = Object.values(dataTradeConsumptionFiltered.map(obj => obj.country))
        let trade_co2 = Object.values(dataTradeConsumptionFiltered.map(obj => obj.trade_co2))
        let consumption_co2 = Object.values(dataTradeConsumptionFiltered.map(obj => obj.consumption_co2))

        //setting data. Getting 4 random nation and, if activeCountry doesn't have a property, using an empty array
        let dataFormatted = {
            country: [...getRandom(country, statesCompare), dataActiveCountry.country || []],
            trade_co2: [...getRandom(trade_co2, statesCompare), dataActiveCountry.trade_co2 || []],
            consumption_co2: [...getRandom(consumption_co2, statesCompare), dataActiveCountry.consumption_co2 || []]
        }

        //setting legend: select only trade and consumption co2 properties from dataFormatter and formatting it with label formatter
        let legend = Object.keys((({trade_co2, consumption_co2}) => ({
            trade_co2,
            consumption_co2
        }))(dataFormatted)).map(key => label_formatter[key])

        setChartSetting({

            series: [{
                name: "CO2 products by trade",
                data: dataFormatted.trade_co2
            }, {
                name: "CO2 products by consumption",
                data: dataFormatted.consumption_co2
            }],
            options: {
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
                        colors: text_color,
                        fontfamily: 'Roboto'
                    }
                }
            },
        })

        setIsLoading(false)
    }, [dataActiveCountry]);


    return isLoading ? <CircularProgress/> :
        (
            <div className="primary-chart">
                <Typography variant="h6" className="chart-title">
                    Economical influence on pollution per capita
                </Typography>
                <Chart
                    options={chartSetting.options}
                    series={chartSetting.series}
                    height="100%"
                    type={"bar"}
                />
            </div>
        );
};

export default MainChart
