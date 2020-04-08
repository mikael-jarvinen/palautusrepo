import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const compareAnecdotes = (first, second) => {
  if (first.votes > second.votes) {
    return -1
  } else if (first.votes < second.votes) {
    return 1
  } else {
    return 0
  }
}

const App = () => {
  const unsortedAnecdotes = useSelector(state => state)
  const anecdotes = unsortedAnecdotes.sort(compareAnecdotes)
  const dispatch = useDispatch()

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
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App