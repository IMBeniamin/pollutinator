import * as React from 'react';
import Slider from '@mui/material/Slider';
import './timeSlider.css'

const TimeSlider = (props) => {
    let timeout;

    const marks = [
        {
            value: 1950,
            label: '1950',
        },
        {
            value: 1964,
            label: '1964',
        },
        {
            value: 1978,
            label: '1978',
        },
        {
            value: 1992,
            label: '1992',
        },
        {
            value: 2006,
            label: '2006',
        },
        {
            value: 2020,
            label: '2020',
        },
    ];

    const updateValue = (value) => {
        if (typeof value === 'number') {
            props.changeYear(value);
        }
    }

    const handleChange = (event, value) => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            updateValue(value);
        }, 1000);
    };
    return (
        <Slider
            sx={{color: 'white'}}
            className="slider"
            aria-label="Year"
            defaultValue={props.year}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={1950}
            max={2020}
            onChange={handleChange}
        />
    );
}

export default TimeSlider