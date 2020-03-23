import React, { useState } from 'react'

const NewName = ({addPerson, persons}) => {
    const [ newName, setNewName ] = useState('')

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
            addPerson(newName)
            console.log(`added ${newName} to contacts`)
        }
    }

    const handleChange = (event) => setNewName(event.target.value)

    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
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