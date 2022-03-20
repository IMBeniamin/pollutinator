import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./card.css"
import {CardHeader} from "@mui/material";

const InfoCard = forwardRef((props,ref) => {
    const [contentHeader,setContentHeader] = useState({})
    const [contentMain,setContentMain] = useState({})


    const formatData = (info) =>{
        setContentHeader({
            year: `Data from ${info.year}`,
            country: info.country,
            warning: "Data expressed in milions tonnes"
        })
        setContentMain({
            co2: `CO2 produced: ${info.co2}`,
            coal_co2: `CO2 produced by coal: ${info.coal_co2}`,
            gas_co2: `CO2 produced by gas: ${info.gas_co2}`,
            oil_co2: `CO2 produced by oil: ${info.oil_co2}`,
            cement_co2: `CO2 produced by cement: ${info.cement_co2}`,
            flaring_co2: `CO2 produced by flaring: ${info.flaring_co2}`,
            other_industry_co2: `CO2 produced by other resources: ${info.other_industry_co2}`,
            co2_growth_prct: `Percentage of growth in CO2 production: ${info.co2_growth_prct}%`,
            co2_per_capita: `CO2 calculated on population: ${info.co2_per_capita}`,
            population: `Population: ${info.population}`
        })

    }
    console.log(contentHeader)
    useImperativeHandle(ref, () => ({
        updateData(dataState) {
            formatData(dataState[0])
            //console.log(info)
        }
    }))

    const header = [<Typography > {contentHeader.country} </Typography>,<Typography > {contentHeader.year} </Typography>,<Typography  style={{fontSize: 12}} sx={{mb: 2}}>{contentHeader.warning}</Typography>]

    let informationState = []
    Object.entries(contentMain).forEach( (item) =>{
        informationState.push(<Typography variant="body2">{item[1]}</Typography>)
    })


    return(
      <Card sx={{ minWidth: 400 }} className={"card-container"} style={{backgroundColor: "#F44336", color:"white"}}>
        <CardContent >
            <CardHeader title={header}/>
            {informationState}
        </CardContent>
    </Card>
  );
    
})

export default memo(InfoCard)