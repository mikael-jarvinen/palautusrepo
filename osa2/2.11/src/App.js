import React, { useState, useEffect } from 'react'
import NewName from './components/NewName.js'
import Contacts from './components/Contacts.js'
import Search from './components/Search.js'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filtered, setFiltered] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')

    const effectHook = () => {
        console.log('effect')
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
            setFiltered(response.data.map(x => false))
        })
    }

    useEffect(effectHook, [])

    const addPerson = (person, newNumber) => {
        console.log('adding', person, 'to phonebook')
        const newNode = {id: persons.length + 1, 
            name: person, 
            number: newNumber}
        setPersons(persons.concat(newNode))
        setFiltered(filtered.concat(false))
    }
    const onSearch = (event) => {
        const search = event.target.value.toLowerCase()
        console.log('searching with parameter', search)

        setFiltered(persons.map((x) => {
            if (!(x.name + x.number).toLowerCase().includes(search.toLowerCase())){
                return (
                    true
                )
            } else {
                return (
                    false
                )
            }
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (persons.reduce((cond, x) => {
            if (x.name === newName){
                cond = true
            }
            return cond
        }, false)){
            window.alert(`${newName} is already added to phonebook`)
        } else {
            setNewName('')
            setNewNumber('')
            addPerson(newName, newNumber)
            console.log(`added ${newName} to contacts`)
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    return (
    <div>
        <h2>Phonebook</h2>
        <Search onSearch={onSearch} />
        <h2>add a new</h2>
        <NewName addPerson={addPerson}
        persons={persons}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        />
        <h2>Numbers</h2>
        <Contacts persons={persons} 
            filtered={filtered}
        />
    </div>
  )

}

export default App