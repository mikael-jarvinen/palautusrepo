import React, { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const SetBirthyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  const handleSubmit = event => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) }})
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        name <input type='text' value={name} onChange={event => setName(event.target.value)}/>
        born <input type='number' value={born} onChange={event => setBorn(event.target.value)}/>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear