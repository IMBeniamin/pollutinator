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

    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([]);
    let chart = undefined;
    if (props.data === undefined) setIsLoading(true);
    else {
        chart = {
            options: {
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
                labels: Object.keys(props.data).filter(key => Object.keys(label_formatter).includes(key)).map(key => label_formatter[key])
            }
        }
    }
    useEffect(() => {
        setIsLoading(true);
        setOptions()
        setSeries(Object.keys(label_formatter).reduce((values, key) => {
            if (props.data[key] !== undefined)
                values.push(props.data[key]);
            return values;
        }, []));
        setIsLoading(false);
    }, [props.data]);

    return !isLoading ? (
        <div className="card-container">
            <Chart
                options={chart.options}
                series={series}
                type="donut"
                width="100%"
                className="mini-chart"
            />
        </div>
    ) : <div>Loading...</div>;
}

export default InfoCard