import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onclick}) => {
  return (
    <>
      <button onClick={onclick}>{text}</button>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState({
    index: 0,
    votes: Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  })

  const randomizeAnecdote = () => setSelected({
    ...selected,
    index: Math.floor(Math.random() * anecdotes.length)
  })

  const newVote = () => {
    const copy = [...selected.votes]
    copy[selected.index] += 1
    setSelected({
      ...selected,
      votes: copy
    })
  }

  return (
    <div>
      {anecdotes[selected.index]} <br></br>
      has {selected.votes[selected.index]} votes <br></br>
      <Button text='vote' onclick={newVote} />
      <Button text='next anecdote' onclick={randomizeAnecdote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)