import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import "./infoChart.css"
import "../../../config"
import axios from "axios";


const InfoChart = (props) => {

    const [chart, setChart] = useState(undefined);
    const [isLoading, setLoading] = useState(true);
    const label_formatter = props.label_formatter;
    const getNodes = () => {
        axios
            .get(global.config.api_url, {params: props.params})
            .then(res => {
                const data = res.data[0];
                console.log(data);
                setChart({
                    options: {
                        chart: {
                            id: props.id,
                            animations: {
                                enabled: true,
                                easing: 'easeinout',
                                speed: 400,
                                animateGradually: {
                                    enabled: true,
                                    delay: 550
                                },
                                dynamicAnimation: {
                                    enabled: true,
                                    speed: 1000
                                }
                            },
                            background: 'transparent',
                        },
                        theme: {
                            mode: 'dark',
                            palette: 'palette3',
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    minAngleToShowLabel: 45
                                },
                                donut: {
                                    size: '35%',
                                    background: 'transparent',
                                }
                            }
                        },
                        labels: Object.keys(data).map(key => label_formatter[key]),
                    },
                    series: Object.values(data),
                });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getNodes();
    }, [props.id, props.iso_code, props.year]);
    return isLoading ? <div className='loading'>Loading...</div> : (
        <Chart
            options={chart.options}
            series={chart.series}
            type="donut"
            width="100%"
            className="mini-chart"
        />
    )
}
export default InfoChart;