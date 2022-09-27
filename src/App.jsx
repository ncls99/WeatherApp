import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import cloud from './assets/cloudyIcon.png'
import sunny from './assets/sunnyIcon.png'
import snow from './assets/snowIcon.png'
import storm from './assets/stormIcon.png'
import rain from './assets/rainIcon.png'
import Card from './components/Card'




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

          if (weather === "Clouds") {
            weatherImg = cloud
          } else if (weather === "Snow") {
            weatherImg = snow
          } else if (weather === "Rain") {
            weatherImg = rain
          } else if (weather === "Storm") {
            weatherImg = storm
          } else if (weather === "Sun") {
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
  
  if (weather) {
    return (
      <div className="App">
        <Card data={weather} units={toggleUnits} />
      </div>
    )
  }
}

export default App
