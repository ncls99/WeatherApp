import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import cloud from './assets/cloudyIcon.png'
import cloudsIcon from './assets/cloudsIcon.png'
import pressureIcon from './assets/pressureIcon.png'
import windIcon from './assets/windIcon.png'
import sunny from './assets/sunnyIcon.png'
import snow from './assets/snowIcon.png'
import storm from './assets/stormIcon.png'
import rain from './assets/rainIcon.png'




function App() {

  const [location, setLocation] = useState()
  const [weather, setWeather] = useState()
  const [units, setUnits] = useState("metric")

  const toggleUnits = () => {
    if (units == "metric")
      setUnits("imperial")
    else
      setUnits("metric")
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation(pos.coords)
    })

  }, [])

  useEffect(() => {
    if (location) {
      const apiKey = "de6bffa89937ad3a0806deca84074ab8"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${apiKey}&units=${units}`
      
      axios.get(URL)
        .then(res => {
          let unit = units == "metric" ? "C" : "F"
          let speedunit = units == "metric" ? "m/s" : "mph"
          let weather = res.data.weather[0].main;
          let weatherImg;

          if(weather === "Clouds"){
            weatherImg = cloud
          }else if(weather === "Snow"){
            weatherImg = snow
          }else if(weather === "Rain"){
            weatherImg = rain
          }else if(weather === "Storm"){
            weatherImg = storm
          }else if(weather === "Sun"){
            weatherImg = sunny
          }
          
          const weatherData = {
            temp: res.data.main.temp,
            city: res.data.name,
            country: res.data.sys.country,
            name: res.data.weather[0].main,
            description: res.data.weather[0].description,
            windSpeed: res.data.wind.speed,
            clouds: res.data.clouds.all,
            pressure: res.data.main.pressure,
            units: unit,
            speedunit: speedunit,
            imgWhe: weatherImg
          }

          setWeather(weatherData)
        })

    }
  }, [location, units])

  console.log(weather)

  return (
    <div className="App">
      <div className='card'>
        <h1>Weather App</h1>
        <h2 className='subTitle'>{weather?.city}, {weather?.country}</h2>
        <div className='container'>
          <div className='firstBox'>
            <h2 className='title'>{weather?.name}</h2>
            <div className='boxImg'>
              <img src={weather?.imgWhe}></img>
            </div>
            <h2 className='subTitle'>{weather?.temp} ° {weather?.units}</h2>
          </div>
          <div className='secondBox'>
            <h3>{weather?.description}</h3>
            <div>
              <div className='infoBox'>
                <div className='boxIcon'>
                  <img src={windIcon}></img>
                </div>
                <h3><span>Wind speed: </span>{weather?.windSpeed} {weather?.speedunit}</h3>
              </div>
              <div className='infoBox'>
                <div className='boxIcon'>
                  <img src={cloudsIcon}></img>
                </div>
                <h3><span>Clouds: </span>{weather?.clouds}%</h3>
              </div>
              <div className='infoBox'>
                <div className='boxIcon'>
                  <img src={pressureIcon}></img>
                </div>
                <h3><span>Pressure: </span>{weather?.pressure}mb</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='boxButton'>
          <button onClick={toggleUnits}>Change units</button>
        </div>
      </div>
    </div>
  )
}

export default App
