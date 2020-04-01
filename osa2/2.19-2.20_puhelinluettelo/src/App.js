import React, { useState, useEffect } from 'react'
import NewName from './components/NewName'
import Contacts from './components/Contacts'
import Search from './components/Search'
import noteService from './services/noteservices'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [filtered, setFiltered] = useState([])
    const [notification, setNotification] = useState('')

    useEffect(() => {
        noteService
        .getAll()
        .then(result => {
            setPersons(result)
            setFiltered(result.map(x => false))
        })
    } ,[])

    const showNotification = (message) => {
        setNotification(message)
        setTimeout(() => setNotification('') , 3000)
    }

    const onSearch = (event) => {
        const search = event.target.value.toLowerCase()


        setFiltered(persons.map(x => {
            if (!(x.name + x.number).toLowerCase().includes(search)){
                return true
            } else {
                return false
            }
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.reduce((cond, x) => {
            if (x.name === newName){
                cond = true
                if(window.confirm(`${newName} is already added to pronebook, 
                replace the old number with a new one?`)){
                    const newPerson = {
                        name: newName,
                        number: newNumber
                    }
                    noteService
                    .update(x.id, newPerson)
                    .then(() => {
                        showNotification('successfully changed number')
                        setNewName('')
                        setNewNumber('')
                        noteService
                        .getAll()
                        .then((result) => setPersons(result))
                        setFiltered(persons.map(() => false))
                    }, () => {
                        showNotification(`${x.name} has already been deleted`)
                    })
                }
            }
            return cond
        }, false)){
            
        } else {
            setNewName('')
            setNewNumber('')
            
            const newNode = {
                name: newName, 
                number: newNumber
            }

            noteService
            .create(newNode)
            .then(result => {
                setPersons(persons.concat(result))
                setFiltered(filtered.concat(false))
                showNotification(`added ${newNode.name} to contacts`)
            })
            .catch(error => {
                showNotification(error.response.data.error)
            })
        }
    }

    const deletePerson = (event) => {
        event.preventDefault()

        if(window.confirm(`You sure?`)) {
            noteService
        .remove(event.target.id)
        .then(() => {
            noteService.getAll()
            .then(result => {
            console.log(result)
            setPersons(result)
            setFiltered(result.map(x => false))
            showNotification('succesfully deleted')
        }, () => showNotification('error deleting'))
        })
        }
        
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    return (
    <div>
        <h2>Phonebook</h2>
        <Notification message={notification} />
        <Search onSearch={onSearch} />
        <h2>add a new contact</h2>
        <NewName
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        />
        <h2>Numbers</h2>
        <Contacts persons={persons}
        filtered={filtered}
        deletePerson={deletePerson}
        />
    </div>
  )

}

export default App