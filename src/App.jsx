import "./App.css";
import React, {useEffect, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/card";
import MainChart from "./components/charts/main_chart/main_chart"
import SecondaryChart from "./components/charts/secondary_chart/secondary_chart";
import './config';

// code for icon handling and registering to allow global use
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import LayoutController from "./components/controls/layoutController/LayoutController";

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
    const [infoCardLayout, setInfoCardLayout] = useState('collapse');
    const [bottomCardLayout, setBottomCardLayout] = useState('collapse');
    const countryChanged = (country) => {
        setActiveCountry(country);
        if (infoCardLayout && bottomCardLayout) {
            setInfoCardLayout(null);
            setBottomCardLayout(null);
        } else {
            if (!infoCardLayout) setInfoCardLayout(null);
            if (!bottomCardLayout) setBottomCardLayout(null);
        }
    }
    const yearChanged = (year) => {
        setIsLoading(true);
        setActiveYear(year);
    }

    useEffect(() => {
        axios
            .get(global.config.api_url, {
                params: {
                    year: activeYear,
                    strict: "iso_code"
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
                    if (activeCountry) setActiveCountry(res.data.filter((obj) => activeCountry.iso_code === obj.iso_code)[0])
                    setIsLoading(false);
                }
            );
    }, [activeYear]);
    return !isLoading ? (
        // TODO quando no dati in grafico grafico deve ritornare null e l'altro deve espandersi
        <div className="App">
            <Map data={{yearMap: activeYear, infoState: yearData}}
                 countryClicked={countryChanged}
            />
            <div id="info-card" className={"reactive " + infoCardLayout}>
                {activeCountry ?
                    <Card data={activeCountry}/> : null}
            </div>

            <div id="bottom-card" className={"reactive " + bottomCardLayout}>
                <div className="map-controls">
                    {/*TODO !!!important!!! Add button with reference to our world in data for source*/}
                    <div className="slider-container">
                        <TimeSlider
                            year={activeYear}
                            changeYear={yearChanged}
                        />
                    </div>
                </div>
                {activeCountry ?
                    <LayoutController
                        infoCardLayout={infoCardLayout}
                        bottomCardLayout={bottomCardLayout}
                        setInfoCardLayout={setInfoCardLayout}
                        setBottomCardLayout={setBottomCardLayout}
                    /> : null
                }
                {activeCountry ?
                    <div className="charts">
                        <MainChart dataActiveCountry={activeCountry} data={yearData}/>
                        <SecondaryChart data={activeCountry} yearData={yearData}/>
                    </div>
                    : null
                }
            </div>
        </div>
    ) : <div className="App app-loading">Loading...</div>;
}

export default App;
