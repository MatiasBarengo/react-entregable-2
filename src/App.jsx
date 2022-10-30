import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';


function App() {

  const [weather, setWeather] = useState({})

  const [degreesUnit, setDegreesUnit] = useState(true)

  const celcius = Number(weather.main?.temp.toFixed(2));

  const fahrenheit = Number((weather.main?.temp * 9/5) + 32).toFixed(2);

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7684a96115d81c34e4f95295de9035ad&units=metric`)
        .then((res) => setWeather(res.data))
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(weather);

  const changeUnits  = () => {
    setDegreesUnit(!degreesUnit)
  }

//document.body.style = `background: ${colors[randomColorIndex]}`;

  return (
    <div className="App">
      <nav>
        <i className="fa-solid fa-cloud main-icon" style={{ fontSize: '7vh' }}></i>
        <p className='title'>Matias Weather App</p>
        <i className="fa-solid fa-cloud main-icon" style={{ fontSize: '7vh' }}></i>
      </nav>
      <div className='card'>
        <h1><b>Country:</b> {weather.sys?.country}</h1>
        <h2><b>City:</b> {weather.name}</h2>
        <div className='conditions-temperature'>
          <div className='conditions'>
            <h3>Condition</h3>
            <p className='condition'>{weather.weather?.[0].main}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} style={{ height: '15vh' }} />
          </div>
          <div className='temperature'>
            <h3>Temperature</h3>
            <p style={{margin: '10px 0px'}}>{degreesUnit ? celcius : fahrenheit } {' '}
              {degreesUnit ? '°C' : '°F'}
            </p>
            <p><b>"{weather.weather?.[0].description}"</b></p>
            <p><i className="fa-solid fa-wind"></i>{' '}
            <b>Wind speed:</b>{' '}
            {weather.wind?.speed}{' '}m/s</p>
            <p><i className="fa-solid fa-cloud"></i>{' '}
            <b>Clouds:</b>{' '}
            {weather.clouds?.all}{' '}%{' '}
            {weather.clouds?.name}</p>
            <p><i className="fa-solid fa-temperature-quarter"></i> <b>Pressure</b> {weather.main?.pressure} hPa</p>
          </div>
        </div>
        <button onClick={changeUnits}>Change Units</button>
      </div>
    </div>
  )
}

export default App
