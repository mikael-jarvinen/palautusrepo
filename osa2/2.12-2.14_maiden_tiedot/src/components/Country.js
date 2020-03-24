import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'
const api_key = process.env.REACT_APP_API_KEY

const Country = ({country}) => {
    const [weather, setWeather] = useState([])
    
    const effectHook = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=New%20York`)
    .then(x => {
            setWeather(x.data.current)
        })
    }

    useEffect( effectHook, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(x => {
                    return <li key={x.iso639_1}>{x.name}</li>
                })}
            </ul>
            <img src={country.flag} width="200" alt="flag"/>
            <Weather weather={weather} />
        </div>
    )
}

export default Country