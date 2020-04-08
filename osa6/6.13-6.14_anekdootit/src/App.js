import React, { useEffect } from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { anecdoteInit } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => dispatch(anecdoteInit(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App