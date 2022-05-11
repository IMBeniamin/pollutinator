import React, {useEffect, useMemo, useState} from "react";
import "./main_chart.css";
import '../../../config';
import {CircularProgress, Typography} from "@mui/material";
import Chart from "react-apexcharts"

/**
 * two_pass_variance is algorithm that calculate a variance dynamically
 * @param arrObj: array of objects
 * @param property: the values on which the algorithm relies to calculate the variance
 * @returns {number}: the variance
 */
const two_pass_variance = (arrObj, property) => {
    if (arrObj.length < 2)
        return 0

    let dataAvailable = arrObj.filter(obj => obj.co2_per_gdp && obj.trade_co2 && obj.consumption_co2 && obj.iso_code)

    let k, n, ex, ex2
    k = dataAvailable[0][property]
    n = ex = ex2 = 0

    dataAvailable.forEach(function (obj) {
        n++
        ex += obj[property] - k
        ex2 += (obj[property] - k) * (obj[property] - k)
    })

    console.log((ex2 - (ex * ex) / n) / (n - 1))

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
    console.log({result})
    return result;
}

/**
 * MainChart component used for the left chart in the bottom reactive container
 * @returns {JSX.Element} Returns the graphic component.
 */
const MainChart = (props) => {

    const {dataActiveCountry, data, year} = props
    
    const maxVarianceTrade = useMemo(() => two_pass_variance(data, "trade_co2"), [year])
    const maxVarianceConsumption = useMemo(() => two_pass_variance(data, "consumption_co2"), [year])
    const statesCompare = 4

    const [isLoading, setIsLoading] = useState(true);
    const [chartSetting, setChartSetting] = useState(undefined)


    useEffect(() => {
        setIsLoading(true)

        console.log(dataActiveCountry)
        let dataTradeFiltered = data.filter(obj => Math.abs(obj.trade_co2 - dataActiveCountry.trade_co2) <= maxVarianceTrade / 100 && obj.iso_code)
        let dataTradeConsumptionFiltered = dataTradeFiltered.filter(obj => Math.abs(obj.consumption_co2 - dataActiveCountry.consumption_co2) <= maxVarianceConsumption / 1000 && obj.iso_code)

        dataTradeConsumptionFiltered.forEach((obj, index) => {
            if (obj.iso_code === dataActiveCountry.iso_code)
                dataTradeConsumptionFiltered.splice(index, 1)
        })

        console.log({dataTradeConsumptionFiltered})

        let country = Object.values(dataTradeConsumptionFiltered.map(obj => obj.country))
        let trade_co2 = Object.values(dataTradeConsumptionFiltered.map(obj => obj.trade_co2))
        let consumption_co2 = Object.values(dataTradeConsumptionFiltered.map(obj => obj.consumption_co2))

        let dataFormatted = {
            country: [...getRandom(country, statesCompare), dataActiveCountry.country],
            trade_co2: [...getRandom(trade_co2, statesCompare), dataActiveCountry.trade_co2],
            consumption_co2: [...getRandom(consumption_co2, statesCompare), dataActiveCountry.consumption_co2]
        }
        console.log({dataFormatted})

        setChartSetting({

            series: [{
                data: dataFormatted.trade_co2
            }, {
                data: dataFormatted.consumption_co2
            }],
            options: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff']
                    }
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff']
                },
                tooltip: {
                    shared: true,
                    intersect: false
                },
                xaxis: {
                    categories: dataFormatted.country,
                },
            },
        })

        setIsLoading(false)
    }, [props.dataActiveCountry]);


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
