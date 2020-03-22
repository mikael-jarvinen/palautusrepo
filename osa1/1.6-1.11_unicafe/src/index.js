import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const FeedbackButtons = ({badclick, neutralclick, goodclick}) => {
  return (
    <div>
      <Button text='good' onClick={goodclick} />
      <Button text='neutral' onClick={neutralclick} />
      <Button text='bad' onClick={badclick} />
    </div>
  )
}

const FeedbackDisplay = ({good, neutral, bad}) => {
  const avg = (good * 1 + bad * (-1))/(good + neutral + bad)
  const positive = (good)/(good + bad + neutral) * 100

  return (
    <div>
      <p>good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad} <br></br>
      average {avg} <br></br>
      positive {positive} %
      </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    return (
      setGood(good + 1)
    )
  }

  const neutralClick = () => {
    return (
      setNeutral(neutral + 1)
    )
  }

  const badClick = () => {
    return (
      setBad(bad + 1)
    )
  }

  return (
    <div>
      <Header text='give feedback' />
      <FeedbackButtons badclick={badClick} 
      neutralclick={neutralClick} 
      goodclick={goodClick} 
      />
      <Header text='statistics' />
      <FeedbackDisplay good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)