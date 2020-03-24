import React from 'react'
import Countries from './Countries'
import Country from './Country'

const Results = ({countries, filtered}) => {
    const visCountries = []

    for (let i=0; i<countries.length; i++){
        if(filtered[i]){
            visCountries.push(countries[i])
        }
    }

    console.log('rendering countries')

    if(visCountries.length <= 10 && visCountries.length > 1){
        return (
            <>
                <Countries visCountries={visCountries} />
            </>
        )
    } else if (visCountries.length === 1){
        const country = visCountries[0]
        return (
            <>
                <Country country={country} />
            </>
        )
    } else {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}

export default Results