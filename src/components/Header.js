import React from 'react'
import 'styles/Header.sass'

const Header = ({move, score, time}) => {
  return (
  <div id="header">
    <h1>Spider Solitaire</h1>
    <div className="records">
      <div>Score: <span>{score}</span></div>
      <div>Move: <span>{move}</span></div>
      <div>Time: <span className="time">{time}</span></div>
    </div>

  </div>
  )
}

export default Header
