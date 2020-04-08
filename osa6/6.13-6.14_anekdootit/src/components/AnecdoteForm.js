import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const newAnecdote = {
      content: event.target.anecdoteinput.value
    }
    anecdoteService.create(newAnecdote)
      .then(response => {
        dispatch(createAnecdote(response))
        dispatch(changeNotification(`added a new anecdote "${response.content}"`))
        setTimeout(() => dispatch(clearNotification()), 5000)
      })
    event.target.anecdoteinput.value = ''
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