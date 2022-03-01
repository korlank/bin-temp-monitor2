import { useState, useEffect } from 'react';
import './App.css';
import Monitor from './Monitor';
import axios from "axios";


function Bin() {
  const [state, setState] = useState({ 1: [], 2: [], 3: [] });
  // console.log("State", state)
  function formatState(input) {
    for (let eachReading of input) {
      if (state[eachReading.sensor_id]) {
        state[eachReading.sensor_id].push(eachReading.temperature)
      } else {
        state[eachReading.sensor_id] = []
      }
    }
    return state
  }

  useEffect(() => {
      axios
    .get("/readings")
    .then((result) => {

      let newState = formatState(result.data);
      setState((prev)=> ({...prev, ...newState}) )})
    .catch((err) => console.log(err));

    const fillGauge1 = getComputedStyle(document.documentElement).getPropertyValue('--rotation-value1');
    const fillGauge2 = getComputedStyle(document.documentElement).getPropertyValue('--rotation-value2');
    const fillGauge3 = getComputedStyle(document.documentElement).getPropertyValue('--rotation-value3');
  }, [state])

  function setGaugeValue1(value) {
    document.documentElement.style.setProperty('--rotation-value1', ((value*0.5)/60) + 'turn')
  };
  function setGaugeValue2(value) {
    document.documentElement.style.setProperty('--rotation-value2', ((value*0.5)/60) + 'turn')
  };
  function setGaugeValue3(value) {
    document.documentElement.style.setProperty('--rotation-value3', ((value*0.5)/60) + 'turn')
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Grain Bin Temperature Monitoring Demo</h3>
      </header>
      <div className='main'>
        {/* {Object.entries(state).forEach(([key, value]) => {
          <div className='monitors'>
            <Monitor temperature={value} id={key} />
            <Gauge temperature={value} id={key} />
          </div>

        })} */}

        <div className='top__container'>
          <div className='gauge'>
            <div className='gauge__body'>
              <div className='gauge__fill1'></div>
              <div className='gauge__cover'>
                {state[1][state[1].length-1]}
              </div>
            </div>
          </div>
          <Monitor setState={setState} setGaugeValue={setGaugeValue1} id={1} temperature={state[1]} />
        </div>
        <div>
          <div className='gauge'>
            <div className='gauge__body'>
              <div className='gauge__fill2'></div>
              <div className='gauge__cover'>
              {state[2][state[2].length-1]}
              </div>
            </div>
          </div>
          <Monitor setState={setState} setGaugeValue={setGaugeValue2} temperature={state[2]} id={2} />
        </div>
        <div>
          <div className='gauge'>
            <div className='gauge__body'>
              <div className='gauge__fill3'></div>
              <div className='gauge__cover'>
              {state[3][state[3].length-1]}
              </div>
            </div>
          </div>
          <Monitor setState={setState} setGaugeValue={setGaugeValue3} temperature={state[3]} id={3}/>
        </div>
      </div>
    </div>
  );
}

export default Bin;
