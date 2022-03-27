import React, { memo, useState, useEffect, useCallback,useRef } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { interpolateCubehelixLong } from "d3";
import TimeSlider from "../timeslider/timeSlider";
import axios from "axios";
import Card from "../infoCard/card";
import "./map.css";
const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([0, 100, 1000, 11000])
    .range(["lightgreen", "lightblue", "blue", "red"])
    .interpolate(interpolateCubehelixLong.gamma(1));

const MapChart = (props) => {
    const [yearMap, setYearMap] = useState(2020);
    const [infoState, setInfoState] = useState([]);
    const [dataAboutState, setDataAboutState] = useState({
        year: undefined,
        country: undefined,
    })
    const changeInfoState = useCallback((newInfoState) =>
        setInfoState(newInfoState)
    );

    useEffect(() => {
        axios
            .get("https://inquinapi.derpi.it/api/", {
                params: {
                    year: yearMap,
                    filter: "iso_code,co2",
                },
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then((res) =>
                setInfoState(
                    res.data.sort((a, b) =>
                        a.iso_code > b.iso_code ? 1 : b.iso_code > a.iso_code ? -1 : 0
                    )
                )
            );

    }, []);

    return (
        <div className="map-container" id="map-container">
            <div className="map-controls">
                <div className="slider-container">
                    <TimeSlider
                        parentCallback={changeInfoState}
                        changeYear={setYearMap}
                        year={yearMap}
                    />
                </div>
                <button onClick={() => props.hide()}>X</button>
            </div>
            <ComposableMap
                className="composable-map"
                data-tip=""
                projectionConfig={{ scale: 750 }}
                width={800}
                height={600}
                style={{maxHeight: "85%"}}
            >
                {infoState.length > 0 && (
                    <ZoomableGroup center={[13, 45]}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const current = infoState.find(
                                        (s) => s.iso_code === geo.properties.ISO_A3);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {}}
                                            onClick={async () => {
                                                props.stateChange(current.iso_code);
                                                console.log(current)
                                                try {
                                                    const res = await axios.get('https://inquinapi.derpi.it/api/', {
                                                        params: {
                                                            year: yearMap,
                                                            iso_code: current.iso_code,
                                                            filter: "country,year,co2,coal_co2,gas_co2,oil_co2,cement_co2,flaring_co2,other_industry_co2,co2_per_capita,population",
                                                        }
                                                    })
                                                    setDataAboutState(res.data)
                                                }catch (err){
                                                    console.log('No data')
                                                }
                                            }
                                            }
                                            onMouseLeave={() => {}}
                                            style={{
                                                default: {
                                                    // fill: "#5c6367",
                                                    fill: current ? colorScale(current.co2) : "#fff",
                                                    outline: "none",
                                                    stroke: "#000",
                                                    strokeOpacity: 1,
                                                    strokeWidth: 0.01,
                                                },
                                                hover: {
                                                    fill: current ? colorScale(current.co2) : "#fff",
                                                    outline: "none",
                                                    stroke: "#fff",
                                                    strokeOpacity: 1,
                                                    strokeWidth: 2,
                                                    cursor: "pointer",
                                                },
                                                pressed: {
                                                    fill: "#a0acb3",
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                )}
            </ComposableMap>
        </div>
    );
};

export default memo(MapChart);
