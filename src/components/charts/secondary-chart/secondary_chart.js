import React, {useEffect, useState} from "react";
import "./secondary_chart.css";
import Chart from "react-apexcharts"
import axios from "axios";
import '../../../config'
export default function SecondaryChart(props) {
    const [chartData, setChartData] = useState({
        share_global_cumulative_cement_co2: 0,
        share_global_cumulative_coal_co2: 0,
        share_global_cumulative_gas_co2: 0,
        share_global_cumulative_oil_co2: 0,
        share_global_cumulative_other_co2: 0,
    });

    useEffect(() => {
    axios
        .get(
            global.config.api_url,
            {
                params: {
                    iso_code: props.iso_code,
                    year: props.year,
                    filter: "share_global_cumulative_cement_co2,share_global_cumulative_coal_co2,share_global_cumulative_gas_co2,share_global_cumulative_oil_co2,share_global_cumulative_other_co2"
                }
            })
        .then(res => {
            let set = res.data.sort((a, b) => a.year - b.year);
            setChartData(set[0]);
            console.log(set);
        })
        .catch(err => {
            console.log(err);
        });
}, [props.iso_code, props.year]);

    let categoriesChart = Object.keys(chartData)
    for(let i = 0; i < categoriesChart.length; i++) {
        categoriesChart[i] = categoriesChart[i].replaceAll("_", " ")
        categoriesChart[i] = categoriesChart[i].charAt(0).toUpperCase() + categoriesChart[i].slice(1)
    }

    const chartSetting = {
        options:{
            tooltip: {
                show: true,
                followCursor: true,
                fillSeriesColor: true,
                theme: "dark",
                x:{
                    show:true,
                },
            },
            chart:{
                id:"sharing-global-co2",
                animations: {
                    enabled: true,
                    easing: "easeinout",
                    dynamicAnimation: {
                        speed: 700
                    },
                },
                toolbar: {
                    show: false,
                }
            },
            xaxis:{
                categories: categoriesChart,
                position: "top",
                tooltip: {
                    enabled: false,
                },
                labels:{
                    show: false,
                }
            },
            yaxis:{
                labels:{
                    style:{
                        colors: ['#FFFFFF']
                    }
                }
            },
            plotOptions: {
                bar: {
                    distributed: true
                },
            },
            legend:{
                show: true,
                labels: {
                    colors: ['#FFFFFF']
                }
            }
        },
        series: [
            {
                name: "",
                data: Object.values(chartData)
            }
        ]
    }


    return (
        <div className="secondary-chart">
            <Chart
                options={chartSetting.options}
                series={chartSetting.series}
                type="bar"
                height="100%"
            />
        </div>
    );
};
