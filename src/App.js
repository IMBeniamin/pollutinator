import "./App.css";
import React, {useRef} from "react";
import Map from "./components/map/Map";
import MainChart from "./components/charts/main-chart/main_chart";
import SecondaryChart from "./components/charts/secondary-chart/secondary_chart";
import Card from "./components/infoCard/card";

function App() {

    const mainChartRef = useRef();
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
            <div className="reactive-data">
                <Map hide={hideFunc} stateChange={stateUpdate}/>
                <div className="info-card reactive">
                    {/*<Card/>*/}
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
