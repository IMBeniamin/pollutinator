import React, {useEffect, useState} from 'react';
import './card.css'
import '../../config';
import Chart from "react-apexcharts";

const label_formatter = {
    cement_co2: "Cement",
    coal_co2: "Coal",
    gas_co2: "Gas",
    oil_co2: "Oil",
    other_industry_co2: "Other",
    flaring_co2: "Flaring",
}

const InfoCard = (props) => {
    const [chartSeries, setChartSeries] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const chart = {
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
            labels: chartLabels,
        },
        series: chartSeries,
    }
    useEffect(() => {
        setIsLoading(true);
        setChartLabels(Object.values(props.data));
        setChartSeries(Object.keys(props.data).map(key => label_formatter[key]));
        setIsLoading(false)
    }, [props.year, props.iso_code, props.id, props.data]);

    return !isLoading ? (
        <div className="card-container">
            <Chart
                options={chart.options}
                series={chart.series}
                type="donut"
                width="100%"
                className="mini-chart"
            />
        </div>
    ) : "";
}

export default InfoCard