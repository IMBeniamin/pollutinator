import React from "react";
import {ComposableMap, Geographies, Geography, ZoomableGroup,} from "react-simple-maps";
import {scaleLinear} from "d3-scale";
import {interpolateCubehelixLong} from "d3";
import "./map.css";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([0, 100, 1000, 11000])
    .range(["lightgreen", "lightblue", "blue", "red"])
    .interpolate(interpolateCubehelixLong.gamma(1));

const MapChart = (props) => {
    return (
        <div className="map-container" id="map-container">
            <ComposableMap
                className="composable-map"
                data-tip=""
                projectionConfig={{scale: 650}}
                width={2000}
                height={2000}
            >
                {props.data.infoState.length > 0 && (
                    <ZoomableGroup center={[25, -10]}>
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map((geo) => {
                                    const current = props.data.infoState.find(
                                        (s) => s.iso_code === geo.properties.ISO_A3);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {}}
                                            onClick={() => {
                                                props.countryClicked(current);
                                            }}
                                            onMouseLeave={() => {
                                                // props.hideCard();
                                                // props.stateHover(null);
                                            }}
                                            style={{
                                                default: {
                                                    // fill: "#5c6367",
                                                    fill: current ? colorScale(current.co2) : "#fff",
                                                    outline: "none",
                                                    stroke: "#000",
                                                    strokeOpacity: 1,
                                                    strokeWidth: 0.01,
                                                    transition: "all 1s ease",
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

export default MapChart;
