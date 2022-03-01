import './App.css';
import axios from "axios";
import{useEffect, useRef} from "react"

function Monitor(props) {
  const { setState, temperature , id, setGaugeValue} = props;

  const inputRef = useRef(null);


  function clearInput() {
    inputRef.current.value = ""
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let newTemperature = Number(e.target.value);
     setGaugeValue(newTemperature)
      axios
        .post("/readings", { id: id, temperature: newTemperature })
        .then((result) => {
          let id = result.data[0].sensor_id;
          let temperature = result.data[0].temperature
          setState((prev) => ({ ...prev, id: temperature }));
        })
        .catch((err) => console.log(err));

      clearInput();

    }
  };

  return (
    <div className='container'>
      <div className="input-div">
        <input type="number" className='monitor' placeholder={"update the temperature"} ref={inputRef} onKeyDown={handleSubmit} />
      </div>
    </div>

  )
}

export default Monitor;