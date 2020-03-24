import React from 'react'

const Contacts = ({persons, filtered}) => {
    console.log('rendering contacts', persons)
    return (
        <>
            {persons.map((x) => {
                if (!filtered[x.id-1]) {
                    return (
                    <p key={x.name}>
                        {x.name} {x.number}<br></br>
                    </p>)
                } else {
                    return null
                }
            })}
        </>
    )
}

export default Contacts