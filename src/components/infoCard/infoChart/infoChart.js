import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts"
import "./infoChart.css"

const InfoChart = (props) => {

    const [CO2, setCO2] = useState([{"name": props.textBar, "value": props.dataBar}]);
    console.log(props)
    console.log("stampo chiavi e poi valori datastate")
    console.log(props.dataState)
    const chartData = {
        // options: {
        //     // colors: colors,
        //     // legend: {
        //     //     show: true,
        //     //     // showForNullSeries: true,
        //     //     // showForZeroSeries: true,
        //     // },
        //     // tooltip: {
        //     //     show: true,
        //     //     followCursor: true,
        //     //     fillSeriesColor: true,
        //     //     // theme: "dark",
        //     //     // x: {
        //     //     //     show: true,
        //     //     // }
        //     // },
        //     // chart: {
        //         // id: "co2_parts",
        //         // type: "donut"
        //     // },
        //     // xaxis: {
        //     //     categories: ["test", "test1", "test2"], // Object.keys(dataState)
        //     //     // position: "top",
        //     //     // tooltip: {
        //     //     //     enabled: false,
        //     //     // },
        //     //     // labels: {
        //     //     //     show: false,
        //     //     // }
        //     // },
        //     labels: Object.keys(dataState)
        // },
        // series: Object.values(dataState)

        options: {
            // labels: ['co2', 'gas_co2', 'oil_co2', 'cement_co2', 'flaring_co2', 'other_industry_co2']
            labels: Object.keys(props.dataState)
        },
        // series: [22.704, 139.951, 127.438, 7.912, 2.757, 3.055]
        series: Object.values(props.dataState)
        // [
        //     {
        //         name: "Series 1",
        //         data: [30, 40, 50]
        //     }
        // ]
    };
    if (!props.dataState) {
        return <div/>
    }
    else {
        return (
            <div className="graph-container">
                <Chart
                    height="100%"
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                >
                </Chart>
                {/*<div className={"bar-container"}>*/}
                {/*    <span>{CO2[0].name} {CO2[0].value}</span>*/}
                {/*</div>*/}
            </div>
        )}
}
export default InfoChart;