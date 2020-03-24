import React from 'react'

const Countries = ({visCountries}) => {
    return (
        <div>
            {visCountries.map(x => {
                    return <div key={x.name}>{x.name}</div>
            })}
        </div>
    )
}

export default Countries