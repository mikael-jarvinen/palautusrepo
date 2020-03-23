import React, { useState } from 'react'
import NewName from './components/NewName.js'
import Contacts from './components/Contacts.js'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])

    const addPerson = (person) => {
        const newNode = {name: person}

        setPersons(persons.concat(newNode))
    }

    return (
    <div>
        <h2>Phonebook</h2>
        <NewName addPerson={addPerson}
        persons={persons}
        />
        <h2>Numbers</h2>
        <Contacts persons={persons} />
    </div>
  )

}

export default App