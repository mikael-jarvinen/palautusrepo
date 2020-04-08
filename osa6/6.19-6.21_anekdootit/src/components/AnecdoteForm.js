import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault()
    const newAnecdote = {
      content: event.target.anecdoteinput.value,
      votes: 0
    }
    props.createAnecdote(newAnecdote)
    props.changeNotification(`added a new anecdote "${newAnecdote.content}"`, 5)
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

const mapDispatchToProps = {
  changeNotification,
  createAnecdote
}

const connectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
export default connectedAnecdoteForm