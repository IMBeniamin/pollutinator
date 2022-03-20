import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./card.css"
import {CardHeader} from "@mui/material";

const InfoCard = forwardRef((props,ref) => {
    const [info,setInfo] = useState({})
    const [state,setState] = useState()

    const formatData = (info) =>{
        info.year = `Data from ${info.year}`
        info.co2 = `CO2 produced: ${info.co2}`
        info.coal_co2 = `CO2 produced by coal: ${info.coal_co2}`
        info.gas_co2 = `CO2 produced by gas: ${info.gas_co2}`
        info.oil_co2 = `CO2 produced by oil: ${info.oil_co2}`
        info.cement_co2 = `CO2 produced by cement: ${info.cement_co2}`
        info.flaring_co2 = `CO2 produced by flaring: ${info.flaring_co2}`
        info.other_industry_co2 = `CO2 produced by other resources: ${info.other_industry_co2}`
        info.co2_growth_prct = `Percentage of growth in CO2 production: ${info.co2_growth_prct}%`
        info.co2_per_capita = `CO2 calculated on population: ${info.co2_per_capita}`
        info.population = `Population: ${info.population}`

    }

    useImperativeHandle(ref, () => ({
        updateData(dataState) {
            formatData(dataState[0])
            setInfo(dataState[0])
            //console.log(info)
        }
    }))

    const header = [<Typography> {info.country} </Typography>,<Typography> {info.year} </Typography>,<Typography style={{fontSize: 12}} sx={{mb: 2}}>{"Data expressed in million tonnes"}</Typography>]

    let informationState = []
    Object.entries(info).slice(2).forEach( (item) =>{
        informationState.push(<Typography variant="body2">{item[1]}</Typography>)
    })

    console.log(informationState)
    return(
      <Card sx={{ minWidth: 400 }} className={"card-container"} style={{backgroundColor: "#F44336", color:"white"}}>
        <CardContent >
            <CardHeader title={header}/>
            {informationState}
        </CardContent>
        <CardActions>
        </CardActions>
    </Card>
  );
    
})

export default memo(InfoCard)