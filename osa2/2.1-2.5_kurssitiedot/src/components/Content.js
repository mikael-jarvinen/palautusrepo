import React from 'react'

const Content = ({parts}) =>{
    return (
      <>
      <ul>
        {parts.map((x) => <li key={x.id}>{x.name} {x.exercises}</li>)}
      </ul>
      <b>
        total of {parts.reduce((sum, x) => x.exercises + sum ,0)} exercises
      </b>
      </>
    )
}

export default Content