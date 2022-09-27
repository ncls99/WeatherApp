import React from 'react'
import cloudsIcon from '../assets/cloudsIcon.png'
import pressureIcon from '../assets/pressureIcon.png'
import windIcon from '../assets/windIcon.png'

const Card = ({ data, units }) => {
    console.log(data)
    return (
        <div>
            <div className='card'>
                <h1>Weather App</h1>
                <h2 className='subTitle'>{data?.city}, {data?.country}</h2>
                <div className='container'>
                    <div className='firstBox'>
                        <h2 className='title'>{data?.name}</h2>
                        <div className='boxImg'>
                            <img src={data?.imgWhe}></img>
                        </div>
                        <h2 className='subTitle'>{data?.temp} ° {data?.units}</h2>
                    </div>
                    <div className='secondBox'>
                        <h3>{data?.description}</h3>
                        <div>
                            <div className='infoBox'>
                                <div className='boxIcon'>
                                    <img src={windIcon}></img>
                                </div>
                                <h3><span>Wind speed: </span>{data?.windSpeed} {data?.speedunit}</h3>
                            </div>
                            <div className='infoBox'>
                                <div className='boxIcon'>
                                    <img src={cloudsIcon}></img>
                                </div>
                                <h3><span>Clouds: </span>{data?.clouds}%</h3>
                            </div>
                            <div className='infoBox'>
                                <div className='boxIcon'>
                                    <img src={pressureIcon}></img>
                                </div>
                                <h3><span>Pressure: </span>{data?.pressure}mb</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='boxButton'>
                    <button onClick={units}>Change units</button>
                </div>
            </div>
        </div>
    )
}

export default Card