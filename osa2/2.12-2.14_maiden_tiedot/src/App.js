import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Results from './components/Results'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')

  const effectHook = () => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    console.log('fulfilled')
    setCountries(response.data)
    setFiltered(response.data.map(() => false))
  })
  }

  useEffect(effectHook, [])

  const handleChange = (event) => {
    const search = event.target.value.toLowerCase()
    setSearch(search)
    console.log('filter parameter', search)

    setFiltered(countries.map(x => {
      if(x.name.toLowerCase().includes(search)){
        return true
      } else {
        return false
      }
    }))
  }

  return (
    <div>
      <Search handleChange={handleChange} search={search}/>
      <Results countries={countries} filtered={filtered} />
    </div>
  )
}

export default App;
