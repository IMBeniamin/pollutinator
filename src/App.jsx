import "./App.css";
import React, {useEffect, useLayoutEffect, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/card";
import MainChart from "./components/charts/main_chart/main_chart";
import SecondaryChart from "./components/charts/secondary_chart/secondary_chart";
import DynamicController from "./components/controls/dynamicLayoutController/DynamicController"
import LayoutController from "./components/controls/layoutControllers/LayoutController"
import './config';

function App() {
    // TODO !!!!importante!!!! Fare leggenda per la mappa

    const [activeYear, setActiveYear] = useState(2010);
    const [yearData, setYearData] = useState([]);
    const [activeCountry, setActiveCountry] = useState('');

    const [isExpandCompress, setIsExpandCompress] = useState(true)
    const [isVisibleCard, setIsVisibleCard] = useState(false)
    const [isVisibleBottom, setIsVisibleBottom] = useState(false)

    const delHoverControllers = (isVisibleBottom) => {
        if (isVisibleBottom === false) {
            //TODO When the bottom layer is invisible, Controllers are shown
        }
    }
    /**
     * Method used to toggle all panels visibility
     *
     * @returns {undefined} Does not have a return value.
     */
    const setVisibilityAllPanels = () => {
        setIsExpandCompress(!isExpandCompress)
        setIsVisibleCard(!isVisibleCard)
        setIsVisibleBottom(!isVisibleBottom)
    }
    const changeExpandCompressDynamic = (isVisibleCard, isVisibleBottom) => {
        if (isVisibleCard === true && isVisibleBottom === true) setIsExpandCompress(false)
        else if (isVisibleCard === false && isVisibleBottom === false) setIsExpandCompress(true)
    }
    const changeVisibilityCard = () => {
        setIsVisibleCard(!isVisibleCard)
    }
    const changeVisibilityBottom = () => {
        setIsVisibleBottom(!isVisibleBottom)
    }
    const changeVisibilityDynamic = (isVisibleCard, isVisibleBottom) => {

        let dynamicHide = (isVisibleCard === true && isVisibleBottom === false) || (isVisibleCard === false && isVisibleBottom === true)
        const dynamicController = document.getElementById("dynamicController")
        dynamicHide ? dynamicController.classList.add("collapse") : dynamicController.classList.remove("collapse")

    }
    const showAll = () => {
        const divs = document.getElementsByClassName('reactive');
        for (let a of divs) {
            a.classList.remove("collapse");
        }
        setIsVisibleCard(true)
        setIsVisibleBottom(true)
    };

    useLayoutEffect(() => {
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
                    )
                }
            );
    }, [activeYear]);

    return (
        <div className="App">
            <Map
                data={{yearMap: activeYear, infoState: yearData}}
                stateChange={setActiveCountry}
                showAll={showAll}
                changeExpandIcon={setIsExpandCompress}
            />
            <div id="info-card" className="reactive info-card collapse">
                <Card yearData={yearData} iso_code={activeCountry} year={activeYear}/>
            </div>
            <div id="bottom-reactive" className="reactive bottom-reactive collapse">
                <div className="map-controls">
                    <div className="slider-container">
                        <TimeSlider
                            changeYear={setActiveYear}
                        />
                    </div>
                </div>
                <div className="layout-controls">
                    <LayoutController componentLinked="info-card"
                                      type="arrowsLeftRight"
                                      visibilityCard={changeVisibilityCard}
                    />

                    <div id="dynamicController">
                        {
                            isExpandCompress ?
                                <DynamicController componentLinked="reactive"
                                                   type="expand"
                                                   visibleCard={isVisibleCard}
                                                   visibleBottom={isVisibleBottom}
                                                   setVisibilityAll={setVisibilityAllPanels}
                                                   changeExpandCompress={changeExpandCompressDynamic}
                                                   changeVisibility={changeVisibilityDynamic}
                                                   delHover={delHoverControllers}
                                />
                                :
                                <DynamicController componentLinked="reactive"
                                                   type="compress"
                                                   visibleCard={isVisibleCard}
                                                   visibleBottom={isVisibleBottom}
                                                   setVisibilityAll={setVisibilityAllPanels}
                                                   changeExpandCompress={changeExpandCompressDynamic}
                                                   changeVisibility={changeVisibilityDynamic}
                                                   delHover={delHoverControllers}
                                />
                        }
                    </div>
                    <LayoutController componentLinked="bottom-reactive"
                                      type="arrowsUpDown"
                                      visibilityBottom={changeVisibilityBottom}
                    />
                </div>
                <div className="charts">
                    <MainChart
                        iso_code={activeCountry}
                    />
                    <SecondaryChart
                        iso_code={activeCountry}
                        year={activeYear}
                        label_formatter={{
                            share_global_cement_co2: "Share global cement CO2",
                            share_global_coal_co2: "Share global coal CO2",
                            share_global_gas_co2: "Share global gas CO2",
                            share_global_oil_co2: "Share global oil CO2",
                            share_global_other_co2: "Share global other industry products CO2"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
