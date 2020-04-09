import { useState } from 'react'

let states = []

export const useField = name => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  states = states.concat(() => setValue(''))
  return {
    name,
    value,
    onChange
  }
}

export const clear = () => {
  states.forEach(clearValue => clearValue())
}