import React from 'react'

const Contacts = ({persons, filtered, deletePerson}) => {
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
                <form id={x.id} onSubmit={deletePerson} key={x.name}>
                    <p>{x.name} {x.number} 
                        <button type="submit">delete</button>
                        <br></br>
                    </p>
                </form>
                )
            })}
        </>
    )
}

export default Contacts