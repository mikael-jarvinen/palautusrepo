/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const me = useQuery(ME)

  if (!props.show) {
    return null
  } else if (result.loading || me.loading) {
    return <div>loading</div>
  }

  const favoriteGenre = me.data.me.favoriteGenre

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
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
            if (!a.genres.includes(favoriteGenre)) {
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
    </div>
  )
}

export default Books