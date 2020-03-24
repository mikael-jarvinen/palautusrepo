import React from 'react'

const Country = ({country}) => {
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
        </div>
    )
}

export default Country