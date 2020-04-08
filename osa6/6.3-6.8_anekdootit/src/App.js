import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './reducers/anecdoteReducer'

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

  const addAnecdote = event => {
    event.preventDefault()
    const newAnecdote = event.target.anecdoteinput.value
    event.target.anecdoteinput.value = ''
    dispatch(createAnecdote(newAnecdote))
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
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdoteinput'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App