import React, { useState } from 'react'
import NewName from './components/NewName.js'
import Contacts from './components/Contacts.js'
import Search from './components/Search.js'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', filter: false },
        { name: 'Ada Lovelace', number: '39-44-5323523', filter: false},
        { name: 'Dan Abramov', number: '12-43-234345', filter: false },
        { name: 'Mary Poppendieck', number: '39-23-6423122', filter: false }
      ])

    const addPerson = (person, newNumber) => {
        const newNode = {name: person, number: newNumber, filter: false}

        setPersons(persons.concat(newNode))
    }

    const onSearch = (event) => {
        const search = event.target.value.toLowerCase()

        setPersons(persons.map((x) => {
            if (!(x.name + x.number).toLowerCase().includes(search)){
                return (
                    {name: x.name, number: x.number, filter: true}
                )
            } else {
                return (
                    {name: x.name, number: x.number, filter: false}
                )
            }
        }))
    }

    return (
    <div>
        <h2>Phonebook</h2>
        <Search onSearch={onSearch} />
        <h2>add a new</h2>
        <NewName addPerson={addPerson}
        persons={persons}
        />
        <h2>Numbers</h2>
        <Contacts persons={persons} />
    </div>
  )

}

export default App