import React from "react";
import {ArcElement, Chart as ChartJS} from "chart.js";

ChartJS.register(
    ArcElement,
)
const InfoChart = (props) => {


    // const mapColor = {
    //     "coal_co2": "#FFBE0B",
    //     "gas_co2": "#FB5607",
    //     "oil_co2": "#FF006E",
    //     "cement_co2": "#8338EC",
    //     "flaring_co2": "#3A86FF",
    //     "other_industry_co2": "#8EA604"
    // }

    //TODO: check if colors re different for each different data
    let mapColor = props.dataState
    for (let key of mapColor)
        //                                       rgb(255, 255, 255)
        mapColor[key] = `#${Math.floor(Math.random() * 16777215).toString(16)}`

    const colorArray = Object.keys(props.dataState).map(x => props.dataState ? mapColor[x] : undefined)
    const dataChart = {
        labels: Object.keys(mapColor).length >= 10 ? Object.keys(mapColor) : undefined, //if there are to many labels, no label displayed
        datasets: [
            {
                label: props.title,
                data: Object.values(props.dataState),
                backgroundColor: colorArray
            }
        ]
    }

    return (
        <div className='infoChart-container'>
            <div className='chart'>
            </div>
            <div className='header-and-bar'>

            </div>
        </div>
    )
}

export default InfoChart