import "./App.css";
import React, {useRef, useState} from "react";
import Map from "./components/map/Map";
import MainChart from "./components/charts/main-chart/main_chart";
import SecondaryChart from "./components/charts/secondary-chart/secondary_chart";
import Card from "./components/infoCard/card";

function App() {
  const mainChartRef = useRef();
  const [clicked,setClicked] = useState(false)
  const stateUpdate = (state_iso_code) => {
      console.log("clicked on:",state_iso_code);
    mainChartRef.current.updateData(state_iso_code);
  };
  return (
    <div className="App">
      <div className="reactive-data">
        <Map stateChange={stateUpdate} showGraph={clicked}/>
      </div>
        {clicked ? <div className="card">
            <Card
                className="infocard"
            />
        </div> : null}
        {clicked ? <div className="data-visualization">
        <div className="graphics">
          <div className="main-chart">
            <MainChart ref={mainChartRef} />
          </div>
          <div className="secondary-chart">
            {/*<SecondaryChart />*/}
          </div>
        </div>
      </div> : null }
    </div>
  );
}

export default App;
