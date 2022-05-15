import React, {useEffect, useState} from 'react';
import './InfoCountry.css'
import {Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * The header component of InfoCard. It shows some general info, such as the country gdp and population
 * @param props (must contain country, iso_code, year, population and GDP)
 * @returns {JSX.Element}
 */
const InfoHeader = (props) => {

    const {activeCountry} = props

    const [countryName, setCountry] = useState('')
    const [isoCode, setIsoCode] = useState('')
    const [yearCountry, setYear] = useState('')
    const [populationCountry, setPopulation] = useState('')
    const [gdpCountry, setGDP] = useState('')

    const changeInfoNation = (countrySelected) => {

        let {country, iso_code, year, population, gdp} = countrySelected

        country = country ? country : 'No data'
        iso_code = iso_code ? iso_code : 'No data'
        year = year ? year : 'No data'
        population = population ? `${Math.floor(population / 1000000)} M` : 'No data'
        gdp = gdp ? `${Math.floor(gdp / 1000000000)} B` : 'No data'

        setCountry(country)
        setIsoCode(iso_code)
        setYear(year)
        setPopulation(population)
        setGDP(gdp)
    }


    useEffect(() => {
        changeInfoNation(activeCountry)
    }, [activeCountry])

    return (
        <div className="header">
            <div className="header-title">
                <span className='title-text'>{countryName}</span>
            </div>
            <Typography className='data-item'>
                <FontAwesomeIcon icon="globe" className='data-icon'/>
                <span className='data-text'>{isoCode}</span>
            </Typography>
            <Typography className='data-item'>
                <FontAwesomeIcon icon="calendar-alt" className='data-icon'/>
                <span className='data-text'>{yearCountry}</span>
            </Typography>
            <Typography className='data-item'>
                <FontAwesomeIcon icon={['fas', 'users']} className='data-icon'/>
                <span className='data-text'>{populationCountry}</span>
            </Typography>
            <Typography className='data-item'>
                <FontAwesomeIcon icon={['fas', 'dollar-sign']} className='data-icon'/>
                <span className='data-text'>{gdpCountry}</span>
            </Typography>
        </div>
    )
}

export default InfoHeader