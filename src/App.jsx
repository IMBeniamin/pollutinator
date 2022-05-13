import "./App.css";
import React, {useEffect, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/card";
import MainChart from "./components/charts/main_chart/main_chart"
import SecondaryChart from "./components/charts/secondary_chart/secondary_chart";
import LayoutController from "./components/controls/layoutController/LayoutController"
import './config';

// code for icon handling and registering to allow global use
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object.keys(Icons)
    .filter((key) => key !== 'fa' && key !== 'prefix')
    .map((icon) => Icons[icon]);

library.add(...iconList);

// end of icon handling

function App() {
    // TODO !!!!importante!!!! Fare leggenda per la mappa

    const [isLoading, setIsLoading] = useState(true);

    const [activeYear, setActiveYear] = useState(2010);
    const [yearData, setYearData] = useState(undefined);
    const [activeCountry, setActiveCountry] = useState(undefined);
    const [layout, setLayout] = useState({
        'info-card': '',
        'bottom-card': ''
    })
    const countryChanged = (country) => {
        setActiveCountry(country);
    }
    const yearChanged = (year) => {
        setIsLoading(true);
        setActiveYear(year);
    }

    useEffect(() => {
        axios
            .get(global.config.api_url, {
                params: {
                    year: activeYear
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                    setYearData(
                        res.data.sort((a, b) =>
                            a.iso_code > b.iso_code ? 1 : b.iso_code > a.iso_code ? -1 : 0)
                    );
                    setIsLoading(false);
                }
            );
    }, [activeYear]);
    return !isLoading ? (
        <div className="App">
            <Map data={{yearMap: activeYear, infoState: yearData}}
                 countryClicked={countryChanged}
            />
            {activeCountry !== undefined ?
                <div id="info-card" className={"reactive info-card " + layout['info-card']}>
                    <Card data={activeCountry} />
                </div>
                :
                null
            }
            <div id="bottom-card" className={"reactive " + layout['bottom-card']}>
                <div className="map-controls">
                    <div className="slider-container">
                        <TimeSlider
                            year={activeYear}
                            changeYear={yearChanged}
                        />
                    </div>
                </div>
                <LayoutController
                    layout={layout}
                    setLayout={setLayout}
                />
                {activeCountry !== undefined ?
                    <div className="charts">
                        {activeCountry ?
                            <MainChart dataActiveCountry={activeCountry} data={yearData} year={activeYear}/> : null}
                            <SecondaryChart data={activeCountry} yearData={yearData}/>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    ) : <div className="App">Loading...</div>;
}

export default App;
