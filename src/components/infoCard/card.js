import React, {useEffect, useState} from 'react';
import axios from "axios"
import Typography from '@mui/material/Typography';
import './card.css'
import InfoChart from './infoChart/infoChart'

const InfoCard = (props) => {
    const [contentHeader, setContentHeader] = useState([])
    const [contentCO2, setContentCO2] = useState([])
    const [contentCO2CAP, setContentCO2CAP] = useState([])

    const colorCO2 = ["#7E57C2", "#651FFF", "#3498DB", "#F1C40F", "#E74C3C", "#2ECC71"]

    const colorCO2capita = ["#1976D2", "#607d8b"]

    useEffect(() => {
        axios
            .get(
                "http://inquinapi.derpi.it/api/",
                {
                    params: {
                        iso_code: props.iso_code,
                        year: props.year,
                        filter: "country,year,co2,coal_co2,gas_co2,oil_co2,cement_co2,flaring_co2,other_industry_co2,co2_per_capita,population"
                    }
                }
            )
                .then(res => {
                    console.log("printing res from the axios request")
                    console.log(res)
                    const data = res.data[0]
                })
            .catch(err => {
                console.log(err)
            }
        )
    }, [props.year, props.iso_code])


    return (
        <div className="card-container">
            <div className="card-header">
                <Typography>
                    {contentHeader.country}
                </Typography>
                <Typography>
                    {contentHeader.year}
                </Typography>
                <Typography
                    style={{fontSize: 12}}
                    sx={{mb: 2}}
                >
                    {contentHeader.warning}
                </Typography>
            </div>
            <InfoChart
                dataState={contentCO2}
                textBar={"CO2 produced:"}
                colors={colorCO2}
            />
            <InfoChart
                dataState={contentCO2CAP}
                textBar={"CO2 per capita:"}
                colors={colorCO2capita}
            />
        </div>
    );
}

export default InfoCard