import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts"
import "./infoChart.css"

const InfoChart = (props) => {
    const {dataBar, textBar, colors, dataState} = props;
    const [CO2, setCO2] = useState([{"name": textBar, "value": dataBar}]);

    console.log("stampo chiavi datastate")
    console.log(Object.keys(dataState))

    const chartData = {
        options: {
            colors: colors,
            legend: {
                show: true,
                showForNullSeries: true,
                showForZeroSeries: true,
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
            chart: {
                id: "co2_parts",
                type: "donut"
            },
            xaxis: {
                categories: Object.keys(dataState),
                position: "top",
                tooltip: {
                    enabled: false,
                },
                labels: {
                    show: false,
                }
            },
        },
        series: [
            {
                name: "Series 1",
                data: Object.values(dataState)
            }
        ]
    }

return (
    <div className={"graph-container"}>
        <Chart
            height="100%"
            options={chartData.options}
            series={chartData.series}
            type="donut"
        >

        </Chart>
        <div className={"bar-container"}>
            <span>{CO2[0].name} {CO2[0].value}</span>

        </div>
    </div>
)
}
export default InfoChart;