import React, { useState } from 'react'

const NewName = ({addPerson, persons}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')

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
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">
                add
            </button>
        </div>
        </form>
    )
}

export default NewName