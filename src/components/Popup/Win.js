import React from 'react'
import 'styles/Popup.sass'
import win from 'you_win.png'

const Records = ({score, move, time, handleChange, insertRecord}) => {
  return [
    <div key="win" className="popup" style={{top: 100}}>
      <img src={win} alt="YOU WIN" />
    </div>,
    <div key="dimmer" className="dimmer"></div>,
    <div key="input" id="win" className="popup" style={{top: 320}}>
      <div className="inner" style={{width: 300}}>
        <div className="win">
          <p>Congratulations!</p>
          <p>Enter your name</p>
          <input type="text" onChange={handleChange}/>
          <button onClick={insertRecord}>OK</button>
        </div>
      </div>
    </div>
  ]
}

export default Records
