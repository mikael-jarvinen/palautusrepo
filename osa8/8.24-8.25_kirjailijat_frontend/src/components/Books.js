/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('all')

  if (!props.show) {
    return null
  } else if (result.loading) {
    return <div>loading</div>
  }

  const books = result.data.allBooks
  const categories = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!categories.includes(genre)) {
        categories.push(genre)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            if (!a.genres.includes(genreFilter) && genreFilter !== 'all') {
              return null
            }
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {categories.map(category => {
        return (
          <button
            key={category}
            onClick={() => setGenreFilter(category)}
          >
            {category}
          </button>
        )
      })}
      <button onClick={() => setGenreFilter('all')}>all</button>
    </div>
  )
}

export default Books