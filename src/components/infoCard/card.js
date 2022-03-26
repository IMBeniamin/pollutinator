import React, {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./card.css"
import InfoChart from './infoChart/infoChart'
import {CardHeader} from "@mui/material";

const InfoCard =(props => {
    const [contentHeader,setContentHeader] = useState({})
    const [contentCO2,setContentCO2] = useState({})


    const formatData = (info) =>{
        setContentHeader({
            year: `Data from ${info.year}`,
            country: info.country,
            warning: "Data expressed in milions tonnes"
        })
        setContentCO2({
            coal_co2: info.coal_co2,
            gas_co2: info.gas_co2,
            oil_co2: info.oil_co2,
            cement_co2: info.cement_co2,
            flaring_co2: info.flaring_co2,
            other_industry_co2: info.other_industry_co2,
        })

    }


    useEffect( () => {
        formatData(props.state)
    })

    const header = [<Typography > {contentHeader.country} </Typography>,<Typography > {contentHeader.year} </Typography>,<Typography  style={{fontSize: 12}} sx={{mb: 2}}>{contentHeader.warning}</Typography>]

    let informationStateCO2 = []
    Object.entries(contentCO2).forEach( (item) =>{
        informationStateCO2.push(<Typography variant="body2">{item[1]}</Typography>)
    })

    console.log(contentCO2)

    return(
      <Card sx={{ minWidth: 400 }} className={"card-container"} style={{backgroundColor: "#F44336", color:"white"}}>
        <CardContent >
            <CardHeader title={header}/>
            <InfoChart dataState={contentCO2} title={'CO2'}/>
        </CardContent>
    </Card>
  );
    
})

export default memo(InfoCard)