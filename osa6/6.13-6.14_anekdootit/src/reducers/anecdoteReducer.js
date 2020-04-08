const getId = () => (100000 * Math.random()).toFixed(0)

export const vote = id => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const anecdoteInit = anecdotes => {
  return {
    type: 'INIT',
    anecdotes
  }
}

const reducer = (state = [], action) => {
  const id = action.data

  switch (action.type){
    case 'VOTE':
      const filteredState = state.filter(anecdote => anecdote.id !== id)
      const anecdote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const votedState = filteredState.concat(votedAnecdote)
      return votedState
    case 'CREATE':
      const newAnecdote = {
        ...action.data,
        votes: 0
      }
      return state.concat(newAnecdote)
    case 'INIT':
      return action.anecdotes
    default:
      return state
  }
}

export default reducer