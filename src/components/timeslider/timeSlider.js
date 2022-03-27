import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios'
import './timeSlider.css'

export default function TimeSlider(props) {
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

      axios.get(`https://inquinapi.derpi.it/api/`,{
        params:{
          year: value,
          filter: "iso_code,co2"
        }
      })
          .then(res => props.parentCallback(res.data))
    }
  }

  const handleChange = (event, value) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('change');
      updateValue(value);
    }, 1000);
  };
  return (
      <Slider
          sx={{
            color: 'white'
          }}
          className="slider"
          aria-label="Year"
          defaultValue={2020}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1950}
          max={2020}
          onChange={handleChange}
      />
  );
}
