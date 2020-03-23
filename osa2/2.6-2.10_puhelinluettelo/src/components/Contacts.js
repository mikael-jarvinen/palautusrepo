import React from 'react'

const Contacts = ({persons}) => {
    return (
        <>
            {persons.map((x) => <p key={x.name}>{x.name} <br></br></p>)}
        </>
    )
}

export default Contacts