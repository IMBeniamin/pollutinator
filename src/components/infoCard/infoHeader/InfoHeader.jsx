import React, {useEffect, useState} from 'react';
import './InfoCountry.css'
import {Typography} from "@mui/material";

const InfoHeader = (props) => {

    const {activeCountry} = props

    const [countryName, setCountry] = useState('')
    const [isoCode,setIsoCode] = useState('')
    const [yearCountry,setYear] = useState('')
    const [populationCountry, setPopulation] = useState('')
    const [gdpCountry, setGDP] = useState('')

    const changeInfoNation = (countrySelected) => {

        let {country, iso_code, year, population, gdp} = countrySelected

        country = country ? country : 'No data'
        iso_code = iso_code ? iso_code : 'No data'
        year = year ? year : 'No data'
        population = population ? `${Math.floor(population / 1000000)} milions` : 'No data'
        gdp = gdp ? `${Math.floor(gdp / 1000000000)} bilions` : 'No data'

        setCountry(country)
        setIsoCode(iso_code)
        setYear(year)
        setPopulation(population)
        setGDP(gdp)
    }


    useEffect( () => {
        changeInfoNation(activeCountry)
    },[activeCountry])

    return (
        <div className="header">
            <div className="country"><Typography>{countryName}</Typography></div>
            <Typography>Iso code: {isoCode}</Typography>
            <Typography> Year: {yearCountry}</Typography>
            <Typography> Population: {populationCountry} </Typography>
            <Typography>GDP: {gdpCountry}</Typography>
        </div>
    )
}

export default InfoHeader