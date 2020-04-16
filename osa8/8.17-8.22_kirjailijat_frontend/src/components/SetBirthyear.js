/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      let newData = dataInStore.allAuthors
      newData = newData.filter(author => author.name !== name.value)
      newData = newData.concat(response.data.editAuthor)
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: newData
        }
      })
    }
  })

  const handleSubmit = event => {
    event.preventDefault()
    editAuthor({ variables: { name: name.value, setBornTo: Number(born) }})
  }

  const options = authors.map(author => {
    return {
      label: author.name,
      value: author.name
    }
  })

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        name <Select 
          options={options} 
          value={name} 
          onChange={selected => setName(selected)}
        />
        born <input type='number' value={born} onChange={event => setBorn(event.target.value)}/>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear