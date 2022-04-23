import "./App.css";
import React, {useEffect, useRef, useState} from "react";
import Map from "./components/map/Map";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";
import Card from "./components/infoCard/card";
import MainChart from "./components/charts/main-chart/main_chart";

function App() {
    const [yearMap, setYearMap] = useState(2020);
    const [infoState, setInfoState] = useState([]);
    const mainChartRef = useRef();

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
    const stateUpdate = (state_iso_code) => {
        console.log("clicked on:",state_iso_code);
        mainChartRef.current.updateData(state_iso_code);
    };

    return (
        <div className="App">
            <Map data={{yearMap, infoState}} stateChange={stateUpdate}/>
            <div id="info-card" className="info-card reactive">
                <Card/>
            </div>
            <div id="charts" className="charts reactive">
                <div className="map-controls">
                  <div className="slider-container">
                    <TimeSlider
                      changeYear={setYearMap}
                    />
                  </div>
                </div>
                sadfasdf
                afasdfasd
                asdfasdfasd
                fasdfasdfasdf
                asdfasdfasdfas
                dfasdfasdfasdf

                <div className="graphics">
                    <div className="main-chart">
                        <MainChart ref={mainChartRef} />
                    </div>
                    <div className="secondary-chart">
                        {/*<SecondaryChart />*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
