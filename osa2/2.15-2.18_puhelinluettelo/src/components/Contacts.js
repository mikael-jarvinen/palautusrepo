import React from 'react'

const Contacts = ({persons, filtered}) => {
    let filteredPersons = []
    for (let i=0; i<persons.length; i++){
        if(!filtered[i]){
            filteredPersons.push(persons[i])
        }
    }

    return (
        <>
            {filteredPersons.map((x) => {
                return (
                <p key={x.name}>
                    {x.name} {x.number}<br></br>
                </p>
                )
            })}
        </>
    )
}

export default Contacts