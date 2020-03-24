import React, { useState } from 'react'
import Country from './Country'

const Countries = ({visCountries}) => {
    const [countries, setCountries] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        const country = event.target.id
        console.log('showing', country)
        setCountries(countries.concat(country))
    }

    return (
        <div>
            {visCountries.map(x => {
                if (countries.includes(x.name)){
                    return <Country key={x.name} country={x}/>
                } else {
                    return <form key={x.name} id={x.name} onSubmit={handleSubmit}>
                        {x.name} <button type="submit">show</button>
                    </form>
                }
            })}
        </div>
    )
}

export default Countries