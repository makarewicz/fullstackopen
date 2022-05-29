import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const FeedbackCollector = ({ onGood, onNeutral, onBad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={onGood} />
      <Button text="neutral" onClick={onNeutral} />
      <Button text="bad" onClick={onBad} />
    </div>
  )
}

const StatisticsLine = ({ text, value, asPercent = false }) => {
  if (asPercent) {
    const valueAsPercent = value * 100;
    return (
      <p>{text} {valueAsPercent} %</p>
    )
  } else {
    return (
      <p>{text} {value}</p>
    )
  }
}

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedbackCount = good + neutral + bad
  if (totalFeedbackCount === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  const averageFeedback = good * 1 + neutral * 0 + bad * -1
  const positiveFeedbackRatio = good / totalFeedbackCount
  return (
    <div>
      <h1>statistics</h1>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={totalFeedbackCount} />
      <StatisticsLine text="average" value={averageFeedback} />
      <StatisticsLine text="positive" value={positiveFeedbackRatio} asPercent />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedbackCollector onGood={() => setGood(good + 1)}
        onNeutral={() => setNeutral(neutral + 1)}
        onBad={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
