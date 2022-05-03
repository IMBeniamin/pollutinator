import "./App.css";
import React, {useCallback, useEffect, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/card";
import MainChart from "./components/charts/main-chart/main_chart";
import SecondaryChart from "./components/charts/secondary-chart/secondary_chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowsUpDown,faArrowsLeftRight,faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'

function App() {
    const [yearMap, setYearMap] = useState(2020);
    const [infoState, setInfoState] = useState([]);
    const [activeCountry, setActiveCountry] = useState('ITA');
    const [hoveredCountry, setHoveredCountry] = useState('');
    const [isExpand, setIsExpand] = useState(true)

    useEffect(() => {
        axios
            .get("http://inquinapi.derpi.it/api/", {
                params: {
                    year: yearMap,
                    filter: "iso_code,co2",
                },
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                    setInfoState(
                        res.data.sort((a, b) =>
                            a.iso_code > b.iso_code ? 1 : b.iso_code > a.iso_code ? -1 : 0)
                    )
                }
            );
    }, [yearMap]);


    const toggleAll = () => {
      const divs = document.getElementsByClassName('reactive');
      for (let a of divs) {
        a.classList.toggle("collapse");
      }
      setIsExpand(!isExpand)
    };
    const showAll = () => {
        const divs = document.getElementsByClassName('reactive');
        for (let a of divs) {
            a.classList.remove("collapse");
        }
    };
    const hideAll = () => {
        const divs = document.getElementsByClassName('reactive');
        for (let a of divs) {
            a.classList.add("collapse");
        }
    };

    const toggleCard = () => {
      const card = document.getElementById('info-card');
      card.classList.toggle("collapse");
    };
    const showCard = () => {
      const card = document.getElementById('info-card');
      card.classList.remove("collapse");
    };
    const hideCard = () => {
        const card = document.getElementById('info-card');
        card.classList.add("collapse");
    };

    const toggleCharts = () => {
        const card = document.getElementById('bottom-reactive');
        card.classList.toggle("collapse");
    };
    const showCharts = () => {
        const card = document.getElementById('bottom-reactive');
        card.classList.remove("collapse");
    };
    const hideCharts = () => {
        const card = document.getElementById('bottom-reactive');
        card.classList.add("collapse");
    };
    document.controls = {
        toggleAll,
        showAll,
        hideAll,
        toggleCard,
        showCard,
        hideCard,
        toggleCharts,
        showCharts,
        hideCharts
    };

    return (
        <div className="App">
            <Map
                data={{yearMap, infoState}}
                stateChange={setActiveCountry}
                stateHover={setHoveredCountry}
                showCard={showCard}
                hideCard={hideCard}
                showCharts={showCharts}
                hideCharts={hideCharts}
                changeExpandIcon={setIsExpand}
            />
            <div id="info-card" className="reactive info-card collapse">
                <Card iso_code={activeCountry} year={yearMap}/>
            </div>
            <div id="bottom-reactive" className="reactive bottom-reactive collapse">
                <div className="map-controls">
                  <div className="slider-container">
                    <TimeSlider
                      changeYear={setYearMap}
                    />
                  </div>
                </div>
                <div className="layout-controls">
                    <FontAwesomeIcon onClick={toggleCard} className="layout-button" icon={faArrowsLeftRight} />
                    {
                        isExpand ?
                        <FontAwesomeIcon className="layout-button" onClick={toggleAll} icon={faExpand} />
                            :
                        <FontAwesomeIcon className="layout-button" onClick={toggleAll} icon={faCompress} />
                    }
                    <FontAwesomeIcon onClick={toggleCharts} className="layout-button" icon={faArrowsUpDown} />
                </div>
                <div className="charts">
                    <MainChart iso_code={activeCountry}/>
                    <SecondaryChart iso_code={activeCountry} year={yearMap}/>
                </div>
            </div>
        </div>
    );
}
export default App;
