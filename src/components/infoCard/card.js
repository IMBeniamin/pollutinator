import React, {useEffect, useState} from 'react';
import axios from "axios"
import Typography from '@mui/material/Typography';
import './card.css'
import InfoChart from './infoChart/infoChart'

const InfoCard = (props) => {
    const [contentHeader, setContentHeader] = useState([])
    const [contentCO2, setContentCO2] = useState([])
    const [contentCO2CAP, setContentCO2CAP] = useState([])
    const [CO2, setCO2] = useState(0)
    const [CO2capita, setCO2capita] = useState(0)

    const colorCO2 = ["#7E57C2", "#651FFF", "#3498DB", "#F1C40F", "#E74C3C", "#2ECC71"]

    const colorCO2capita = ["#1976D2", "#607d8b"]

    useEffect(() => {
        axios
            .get(
                "https://inquinapi.derpi.it/api/",
                {
                    params: {
                        iso_code: props.iso_code,
                        year: props.year,
                        filter: "country,year,co2,coal_co2,gas_co2,oil_co2,cement_co2,flaring_co2,other_industry_co2,co2_per_capita,population"
                    }
                }
            ).then(res => {
                console.log(res.data[0])
                setContentHeader({
                    country: res.data[0].country,
                    year: res.data[0].year,
                    warning: "Data expressed in tons and popoulation is /100000",
                })
                setCO2capita(res.data[0].co2_per_capita)
                setCO2(res.data[0].co2)
                setContentCO2({
                    co2: res.data[0].coal_co2,
                    gas_co2: res.data[0].gas_co2,
                    oil_co2: res.data[0].oil_co2,
                    cement_co2: res.data[0].cement_co2,
                    flaring_co2: res.data[0].flaring_co2,
                    other_industry_co2: res.data[0].other_industry_co2}
                )
                setContentCO2CAP([
                    {name: "CO2", data: res.data[0].co2},
                    {name: "Population", data: res.data[0].population / 100000},
                ])
            }
        ).catch(err => {
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
                dataBar={CO2}
                colors={colorCO2}
            />
            <InfoChart
                dataState={contentCO2CAP}
                textBar={"CO2 per capita:"}
                dataBar={CO2capita}
                colors={colorCO2capita}
            />
        </div>
    );
}

export default InfoCard