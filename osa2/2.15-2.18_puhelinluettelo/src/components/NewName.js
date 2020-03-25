import React from 'react'

const NewName = ({newName, newNumber, handleNumberChange, handleNameChange, handleSubmit}) => {
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