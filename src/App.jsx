import "./App.css";
import React, {useEffect, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/card";
import SecondaryChart from "./components/charts/secondary_chart/secondary_chart";
import './config';

// code for icon handling and registering to allow global use
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import LayoutController from "./components/controls/layoutController/LayoutController";
import MainChart from "./components/charts/main_chart/main_chart";

const iconList = Object.keys(Icons)
    .filter((key) => key !== 'fa' && key !== 'prefix')
    .map((icon) => Icons[icon]);

library.add(...iconList);

// end of icon handling

export default function App() {
    // TODO Create map legend and add reference to OWID as data source

    const [isLoading, setIsLoading] = useState(true);
    const [dataError, setDataError] = useState(false);

    const [activeYear, setActiveYear] = useState(2010); //the default year
    const [yearData, setYearData] = useState(undefined); //data of all nations of a given year (2010)
    const [activeCountry, setActiveCountry] = useState(undefined); //the country clicked
    const [infoCardLayout, setInfoCardLayout] = useState('collapse'); //state containing css class used to hide InfoCard
    const [bottomCardLayout, setBottomCardLayout] = useState('collapse'); //state containing css class used to hide bottom charts
    const [infoCardHeightController, setInfoCardHeightController] = useState(''); //state used to apply the 'force-full-height' css class to bottom charts
    const countryChanged = (country) => {
        setActiveCountry(country)
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
        if (!infoCardLayout) setInfoCardLayout('collapse');
        if (!bottomCardLayout) setBottomCardLayout('collapse');
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
            )
            .catch((err) => {
                console.log(err);
                setDataError(true);
            });
    }, [activeYear]); // eslint-disable-line react-hooks/exhaustive-deps
    if (dataError) return (
        <div className='app-loading'>
            <div>OOPS, we're sorry! We could not load the data from server.</div>
        </div>
    );
    return !isLoading ? (
        <div className="App">
            <Map data={{yearMap: activeYear, infoState: yearData}}
                 countryClicked={countryChanged}
            />
            <div className='layout-sizer'>
                <div id="info-card" className={`reactive ${infoCardHeightController} ${infoCardLayout}`}>
                    {activeCountry ?
                        <Card data={activeCountry}/> : null}
                </div>

                <div id="bottom-card" className={"reactive " + bottomCardLayout}>
                    <div className="map-controls">
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
                            setInfoCardHeightController={setInfoCardHeightController}
                        /> : null
                    }
                    {activeCountry ?
                        <div className="charts">
                            <MainChart activeCountry={activeCountry} data={yearData}/>
                            <SecondaryChart data={activeCountry}/>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    ) : <div className="app-loading">Loading...</div>;
}

