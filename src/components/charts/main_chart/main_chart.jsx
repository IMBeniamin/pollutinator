import React, {useEffect, useState} from "react";
import "./main_chart.css";
import '../../../config';

const maxVariance = 0.1

/**
 * MainChart component used for the left chart in the bottom reactive container
 * @returns {JSX.Element} Returns the graphic component.
 */
const MainChart = (props) => {

    const {data, activeCountry} = props

    const [isLoading, setIsLoading] = useState(true);
    const [chartSetting, setChartSetting] = useState(undefined)
    const [series, setSeries] = useState(undefined)

    // const options = {
    //     chart: {
    //         stacked: false,
    //         animations: {
    //             enabled: true,
    //             easing: "easeinout",
    //             speed: 400,
    //             animateGradually: {
    //                 enabled: true,
    //                 delay: 550
    //             },
    //             dynamicAnimation: {
    //                 enabled: true,
    //                 speed: 1000
    //             },
    //         },
    //         background: 'transparent',
    //         toolbar: {
    //             show: true,
    //             tools: {
    //                 download: false,
    //                 selection: true,
    //                 zoom: true,
    //                 zoomin: true,
    //                 zoomout: true,
    //                 pan: true,
    //                 reset: true,
    //             },
    //         }
    //     },
    //     stroke: {
    //         width: [2, 2, 2, 2],
    //         curve: ['smooth', 'smooth', 'smooth', 'straight'],
    //     },
    //     plotOptions: {
    //         bar: {
    //             dataLabels: {
    //                 minAngleToShowLabel: 45
    //             },
    //             background: 'transparent'
    //         }
    //     },
    //     tooltip: {
    //         show: true,
    //         followCursor: true,
    //         fillSeriesColor: true,
    //         theme: "dark",
    //         x: {
    //             show: true,
    //         }
    //
    //     },
    //     xaxis: {
    //         categories: res.data.map(element => element.year),
    //         position: "bottom",
    //         labels: {
    //             show: false,
    //             style: {
    //                 colors: ['#FFFFFF']
    //             }
    //         },
    //     },
    //     yaxis: {
    //         type: 'numeric',
    //         labels: {
    //             style: {
    //                 colors: ['#FFFFFF']
    //             }
    //         }
    //     },
    //     legend: {
    //         show: true,
    //         labels: {
    //             colors: ['#FFFFFF']
    //         }
    //     },
    //     theme: {
    //         mode: 'dark',
    //         palette: 'palette3'
    //     },
    //     fill: {
    //         opacity: [1, 1, 1, 1],
    //         type: ["solid", "solid", "solid", "gradient"],
    //         gradient: {
    //             inverseColors: false,
    //             shade: 'light',
    //             type: "vertical",
    //             opacityFrom: 0.40,
    //             opacityTo: 0,
    //             stops: [0, 100, 100, 100]
    //         }
    //     },
    // }


    const getData = () => {


        // setChartSettings({
        //     series: [{
        //         name: "GDP",
        //         type: "line",
        //         data: res.data.map(element => element.gdp_per_capita)
        //     }, {
        //         name: "CO2",
        //         type: "line",
        //         data: res.data.map(element => element.co2_per_capita)
        //     }, {
        //         name: "CO2 per GDP",
        //         type: "line",
        //         data: res.data.map(element => element.co2_per_gdp)
        //     }, {
        //         name: "Population",
        //         type: "area",
        //         data: res.data.map(element => element.population)
        //     }],
        //     labels: res.data.map(element => element.year),
        // })

    }

    useEffect(() => {
        setIsLoading(true)
        console.log(props.iso_code)

        let dataActiveCountry = data.filter(obj => obj.iso_code === activeCountry)[0]

        console.log(dataActiveCountry)

        let dataFormatted = {
            co2_per_gdp: data.filter(obj => Math.abs(obj.co2_per_gdp - dataActiveCountry.co2_per_gdp) <= maxVariance).map(obj => obj.co2_per_gdp),
            energy_per_gdp: data.filter(obj => Math.abs(obj.energy_per_gdp - dataActiveCountry.energy_per_gdp) <= maxVariance).map(obj => obj.energy_per_gdp)
        }
        console.log({dataFormatted})
        setIsLoading(false)
    }, [props.iso_code]);

    return null
}
//     return isLoading ? <CircularProgress/> :
//         // (
//         //     // <div className="primary-chart">
//         //     //     <Typography variant="h6" className="chart-title">
//         //     //         Economical influence on pollution per capita
//         //     //     </Typography>
//         //     //     <Chart
//         //     //         options={options}
//         //     //         series={series}
//         //     //         height="100%"
//         //     //     />
//         //     // </div>
//         // );
// };

export default MainChart
