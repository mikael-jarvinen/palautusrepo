import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const newAnecdote = event.target.anecdoteinput.value
    event.target.anecdoteinput.value = ''
    dispatch(createAnecdote(newAnecdote))
    dispatch(changeNotification(`added a new anecdote "${newAnecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
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