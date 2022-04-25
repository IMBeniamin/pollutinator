import React, {useEffect, useState} from 'react';
import axios from "axios"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardHeader} from "@mui/material";
import './card.css'
import Chart from './infoChart/infoChart'

const InfoCard = (props) => {
    const [contentHeader,setContentHeader] = useState([])
    const [contentCO2,setContentCO2] = useState([])
    const [contentCO2CAP,setContentCO2CAP] = useState([])
    const [CO2,setCO2] = useState()
    const [CO2capita, setCO2capita] = useState()

    const colorCO2 = ["#7E57C2", "#651FFF", "#3498DB", "#F1C40F", "#E74C3C", "#2ECC71"]

    const colorCO2capita = ["#1976D2","#009688"]

    useEffect(x =>{
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
        ).then( res => {
                let info = res.data[0]
                setContentHeader({
                    country: info.country,
                    year: info.year,
                    warning: "Data expressed in tons and popoulation is /100000",
                })
                setCO2(info.co2)
                setCO2capita(info.co2_per_capita)
                setContentCO2([
                    {name:"CO2 produced by coal", value: info.coal_co2},
                    {name:"CO2 produced by gas", value: info.gas_co2},
                    {name:"CO2 produced by oil", value: info.oil_co2},
                    {name:"CO2 produced by cement", value: info.cement_co2},
                    {name:"CO2 produced by flaring", value: info.flaring_co2},
                    {name:"CO2 produced by other industry products", value: info.other_industry_co2}
                ])
                setContentCO2CAP([
                    {name: "CO2", value: info.co2,},
                    {name:"Population", value: info.population/100000},
                ])
            }
        ).catch( err => {
                console.log(err)
            }
        )
    },[props.year,props.iso_code])


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
            <Chart
                dataState={contentCO2}
                textBar={"CO2 produced:"}
                dataBar={CO2}
                colors={colorCO2}
            />
            <Chart
                dataState={contentCO2CAP}
                textBar={"CO2 per capita:"}
                dataBar={CO2capita}
                colors={colorCO2capita}
            />
        </div>

  );
    
}

export default InfoCard