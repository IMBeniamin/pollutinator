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

const InfoCard = ({data}) => {
    const [series, setSeries] = useState([]);
    const options = {
        chart: {
            id: 'co2-parts-chart',
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
        labels: Object.keys(data).filter(key => Object.keys(label_formatter).includes(key)).map(key => label_formatter[key])
    }
    useEffect(() => {
        setSeries(Object.keys(label_formatter).reduce((values, key) => {
            if (data[key] !== undefined)
                values.push(data[key]);
            return values;
        }, []));
    }, [data]);

    return (
        <div className="card-container">
            <div className="co2-parts-chart-container">
                <Chart
                    id="co2-parts-chart"
                    options={options}
                    series={series}
                    type="donut"
                    width="100%"
                />
            </div>
        </div>
    );
}

export default InfoCard