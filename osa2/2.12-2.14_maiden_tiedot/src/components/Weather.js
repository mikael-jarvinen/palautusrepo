import React from 'react'

const Weather = ({weather}) => {
    console.log('rendering', weather)
    if(weather.length === 0){
        return <></>
    } else {
        return (
        <div>
            <h2>Weather in Helsinki</h2>
            <div><b>temperature: </b>{weather.temperature} celsius</div>
            <img src={weather.weather_icons[0]} alt='weather icon' />
            <div><b>wind: </b>{weather.wind_speed} m/s direction {weather.wind_dir}</div>
        </div>
    )}
}

export default Weather