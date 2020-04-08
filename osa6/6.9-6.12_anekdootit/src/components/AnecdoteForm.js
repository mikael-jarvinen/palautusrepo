import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const newAnecdote = event.target.anecdoteinput.value
    event.target.anecdoteinput.value = ''
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>Add an anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdoteinput'/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm