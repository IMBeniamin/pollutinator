import "./App.css";
import React, {useEffect, useRef, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/infoChart/infoChart";
import MainChart from "./components/charts/main-chart/main_chart";
import SecondaryChart from "./components/charts/secondary-chart/secondary_chart";
function App() {
    const [yearMap, setYearMap] = useState(2020);
    const [infoState, setInfoState] = useState([]);
    const [activeCountry, setActiveCountry] = useState('ITA');

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
            .then((res) => {
                    setInfoState(
                        res.data.sort((a, b) =>
                            a.iso_code > b.iso_code ? 1 : b.iso_code > a.iso_code ? -1 : 0)
                    )
                }
            );
    }, [yearMap]);

    document.change = () => {
      const divs = document.getElementsByClassName('reactive');
      for (let a of divs) {
        a.classList.toggle("collapse");
      }
    };

    return (
        <div className="App">
            <Map data={{yearMap, infoState}} stateChange={setActiveCountry}/>
            <div id="info-card" className="info-card reactive">
                <Card dataState={infoState}/>
            </div>
            <div id="charts" className="charts reactive">
                <div className="map-controls">
                  <div className="slider-container">
                    <TimeSlider
                      changeYear={setYearMap}
                    />
                  </div>
                </div>
                <MainChart iso_code={activeCountry}/>
                <SecondaryChart />
            </div>
        </div>
    );
}
export default App;
