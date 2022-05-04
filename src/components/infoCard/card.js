import React from 'react';
import './card.css'
import '../../config';
import InfoChart from "./infoChart/infoChart";
import {Typography} from "@mui/material";

const InfoCard = (props) => {
    return (
        <div className="card-container">
            <div className="card-header">
                <Typography>
                    {props.iso_code}
                </Typography>
                <Typography>
                    {props.year}
                </Typography>
            </div>
            <InfoChart
                year={props.year}
                iso_code={props.iso_code}
                id="co2-parts"
                params={{
                    iso_code: props.iso_code,
                    year: props.year,
                    filter: "cement_co2,coal_co2,gas_co2,oil_co2,other_industry_co2,flaring_co2"
                }}
                label_formatter={{
                    cement_co2: "Cement",
                    coal_co2: "Coal",
                    gas_co2: "Gas",
                    oil_co2: "Oil",
                    other_industry_co2: "Other",
                    flaring_co2: "Flaring",
                }}
            />
            <InfoChart
                year={props.year}
                iso_code={props.iso_code}
                id="co2-capita"
            />
        </div>
    );
}

export default InfoCard