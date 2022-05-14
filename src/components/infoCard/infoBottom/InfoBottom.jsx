import React, {useEffect, useState} from 'react'
import "./InfoBottom.css"
import Chart from "react-apexcharts";

const InfoBottom = ({data, image, label, id}) => {
    const unit = label === 'Energy' ? "kWh" : "m3";
    const [series, setSeries] = useState([
        {
            name: `${label} per Capita`,
            data: [
                {
                    x: `${label} per Capita`,
                    y: data.info_capita
                }
            ]
        },
        {
            name: label,
            data: [
                {
                    x: label,
                    y: data.info
                }
            ]
        }
    ]);
    const options = {
        chart: {
            sparkline: {
                enabled: true
            },
            background: 'transparent',
        },
        colors: ['#ff4560', '#775dd0'],
        fill: {
            type: 'gradient',
            gradient: {
                type: 'diagonal1',
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: .65,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: 'rgba(255, 69, 96, 0.8)'
                    },
                    {
                        offset: 100,
                        color: 'rgba(119, 93, 208, 0.2)'
                    }
                ]
            }
        },
        theme: {
            mode: 'dark',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '50%',
                borderRadius: 15,
                distributed: true,
                dataLabels: {
                    size: '50%',
                    background: 'transparent',
                    hideOverflowingLabels: true,
                },
            }
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            formatter: val => val > Object.values(data).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) / 6 ? val.toFixed(2) + ` ${unit}` : '',
            style: {
                colors: ['whitesmoke']
            },
        },
        stroke: {
            show: true,
        },
        tooltip: {
            show: true,
            followCursor: true,
            fillSeriesColor: true,
            theme: "dark",
            x: {
                show: false
            },
            y: {
                formatter: function (value) {
                    return `${value.toFixed(2)} ${unit}`
                }
            },
        },
        xaxis: {
            categories: [label] // [label, `${label} per Capita`],
        },
        grid: {
            padding: {
                right: 20
            }
        },
        noData: {
            text: 'No data available',
        }
    }

    useEffect(() => {
        setSeries([
            {
                name: `${label} per Capita`,
                data: [{
                    x: `${label} per Capita`,
                    y: data.info_capita
                }]
            },
            {
                name: label,
                data: [{
                    x: label,
                    y: data.info
                }]
            }])
    }, [data.info, data.info_capita, id, label])
    return Object.values(data).every((obj) => obj === undefined) ? null : (
        <div className={`visual-data visual-data-${id}`}>
            <div className='visual-icon-wrapper'>
                <img className='visual-icon' src={image} alt={label}/>
            </div>
            <div className={`sparkline-wrapper`}>
                <Chart
                    id={`sparkline-${id}`}
                    className='sparkline-chart'
                    options={options}
                    series={series}
                    type="bar"
                    height='100%'
                />
            </div>
        </div>
    )
}

export default InfoBottom

