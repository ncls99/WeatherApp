import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import img from './assets/cloudyIcon.png'
import cloudsIcon from './assets/cloudsIcon.png'
import pressureIcon from './assets/pressureIcon.png'
import windIcon from './assets/windIcon.png'


function App() {

  const [location, setLocation] = useState()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation(pos.coords)
    })

  }, [])

  useEffect(() => {
    if (location) {

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=de6bffa89937ad3a0806deca84074ab8`

      axios.get(URL)
        .then(res => {
          console.log(res.data)
        })

    }
  }, [location])

  return (
    <div className="App">
      <div className='card'>
        <h1>Weather App</h1>
        <h2 className='subTitle'>Bogotá, CO</h2>
        <div className='container'>
          <div className='firstBox'>
            <h2 className='title'>Clouds</h2>
            <div className='boxImg'>
              <img src={img}></img>
            </div>
            <h2 className='subTitle'>25,95 °C</h2>
          </div>
          <div className='secondBox'>
            <h3>Scatered Clouds</h3>
            <div>
              <div className='infoBox'>
                <div className='boxIcon'>
                  <img src={windIcon}></img>
                </div>
                <h3><span>Wind speed: </span>5.15m/s</h3>
              </div>
              <div className='infoBox'>
                <div className='boxIcon'>
                  <img src={cloudsIcon}></img>
                </div>
                <h3><span>Clouds: </span>40%</h3>
              </div>
              <div className='infoBox'>
                <div className='boxIcon'>
                  <img src={pressureIcon}></img>
                </div>
                <h3><span>Presure: </span>40 mb</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='boxButton'>
          <button>Change to °F</button>
        </div>
      </div>
    </div>
  )
}

export default App
