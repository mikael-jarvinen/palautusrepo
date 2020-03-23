import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <>
  <h1>{props.course}</h1>
  </>
  )
}

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

const Course =({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header text='Web development curriculum' />
      {courses.map((x) => <Course key={x.id} course={x} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))