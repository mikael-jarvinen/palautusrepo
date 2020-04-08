import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from '../reducers/notificationReducer'

const compareAnecdotes = (first, second) => {
  if (first.votes > second.votes) {
    return -1
  } else if (first.votes < second.votes) {
    return 1
  } else {
    return 0
  }
}

const AnecdoteList = () => {
  const unsortedAnecdotes = useSelector(state => state.anecdotes)
  const anecdotes = unsortedAnecdotes.sort(compareAnecdotes)
  const dispatch = useDispatch()

  const voteAnecdote = id => {
    dispatch(vote(id))
    const anecdoteName = anecdotes.find(anecdote => anecdote.id === id).content
    dispatch(changeNotification(`voted "${anecdoteName}"`))
    setTimeout(() => dispatch(clearNotification()) , 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList