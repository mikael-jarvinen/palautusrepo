/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    client.writeQuery({
      query: ALL_BOOKS,
      data: { 
        ...dataInStore,
        allBooks : dataInStore.allBooks.concat(addedBook) 
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newData = subscriptionData.data.bookAdded
      updateCacheWith(newData)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  if (!token) {
    return (
      <LoginForm
        setToken={setToken}
      />
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommendations'}/>

      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App