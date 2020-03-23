import React, { useState } from 'react'

const NewName = ({addPerson}) => {
    const [ newName, setNewName ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        
        console.log('added', newName, 'to contacts')
        setNewName('')
        addPerson(newName)
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