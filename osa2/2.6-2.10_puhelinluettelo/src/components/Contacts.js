import React from 'react'

const Contacts = ({persons}) => {
    return (
        <>
            {persons.map((x) => {
                if (x.filter === false) {
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