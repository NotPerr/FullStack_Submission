import { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Average = ({average}) => {
  if(isNaN(average))
  {
    //console.log('nan')
    return (
      <p>press button to give feedback</p>
    )
  }
  else {
    return (
      <tr>
        <td>average</td>
        <td>{average}</td>
      </tr>
    )
    }
  
}

const Positive = ({positive}) => {
  if(isNaN(positive))
  {
    return (
      <p>press button to give feedback</p>
    )
  }else {
    return (
      <tr>
        <td>positive</td>
        <td>{positive * 100}%</td>
      </tr>
      
    )
  }
}

const StatisticsLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Statistics = ({good, neutral, bad, rateNum, total}) => {
  if(rateNum === 0)
  {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <>
        <table>
          <tbody>
            
            <StatisticsLine text={'good'} value={good}/>
            
          
            <StatisticsLine text={'neutral'} value={neutral}/>
          
          
            <StatisticsLine text={'bad'} value={bad}/>
          
            <tr>
              <td>all</td>
              <td>{rateNum}</td>
            </tr>
            
          
          
            <Average average={total / rateNum}/>
          
          
            <Positive positive={good / rateNum} />
          
          </tbody>
          
        </table>
      </>
    )  
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [rateNum, setRateNum] = useState(0)

  const goodRate = () => {
    setGood(good + 1)
    //console.log('good: ',good)
    setTotal(total + 1)
    setRateNum(rateNum + 1)
  }

  const neutralRate = () => {
    setNeutral(neutral + 1)
    //console.log('neutral: ',neutral)
    setRateNum(rateNum + 1)
  }

  const badRate = () => {
    setBad(bad + 1)
    //console.log('bad: ',bad)
    setTotal(total - 1)
    setRateNum(rateNum + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodRate} text={'good'} />
      <Button onClick={neutralRate} text={'neutral'} />
      <Button onClick={badRate} text={'bad'} />
      <h1>statistics</h1>
      {/* good, neutral, bad, rateNum, total */}
      <Statistics good={good} neutral={neutral} bad={bad} rateNum={rateNum} total={total}/>
    </div>
  )
}

export default App
