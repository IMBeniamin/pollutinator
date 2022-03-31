import "./App.css";
import React, {useEffect, useRef, useState} from "react";
import Map from "./components/map/Map";
import MainChart from "./components/charts/main-chart/main_chart";
import SecondaryChart from "./components/charts/secondary-chart/secondary_chart";
import Card from "./components/infoCard/card";
import TimeSlider from "./components/timeslider/timeSlider";
import axios from "axios";

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

    const hideFunc = (value) => {
        const divs = document.getElementsByClassName('reactive');
        for (let a of divs) {
            a.classList.toggle("collapse");
            a.addEventListener("transitionend", () => {
                console.log("runninng stuff")
                a.classList.toggle("hidden");
            })
        } //TODO: wip
    }
    const stateUpdate = (state_iso_code) => {
        console.log("clicked on:",state_iso_code);
        mainChartRef.current.updateData(state_iso_code);
    };

    return (
        <div className="App">
            <Map hide={hideFunc} props={{yearMap, infoState}} stateChange={stateUpdate}/>
            <div className="reactive-data">
                <div className="info-card reactive">
                    {/*<Card/>*/}
                </div>
            </div>
            <div className="map-controls">
                <div className="slider-container">
                    <TimeSlider
                        changeYear={setYearMap}
                    />
                </div>
            </div>
            <div className="charts reactive">
                sadfasdf
                afasdfasd
                asdfasdfasd
                fasdfasdfasdf
                asdfasdfasdfas
                dfasdfasdfasdf

                <div className="graphics">
                    <div className="main-chart">
                        {/*<MainChart ref={mainChartRef} />*/}
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
