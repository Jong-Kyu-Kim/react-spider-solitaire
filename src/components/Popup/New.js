import React from 'react'
import MdClose from 'react-icons/lib/md/close'
import 'styles/Popup.sass'

const New = ({setDifficuly, hidePopup, initState, fillStock, getCard, toggleEntering}) => {
  const select = suit => {
    return new Promise(resolve => {
      hidePopup()
      initState()
      fillStock(suit)
      resolve()
    })
  }

  const difficulty = suit => {
    select(suit).then(() => {
      getCard(6)
      setTimeout(() => {
        toggleEntering()
      }, 5300)
    })
  }

  const spades = <span id="spades-ace" className="front"></span>
  const hearts = <span id="hearts-ace" className="front"></span>
  const clubs = <span id="clubs-ace" className="front"></span>
  const diamonds = <span id="spades-ace" className="front"></span>

  return [
    <div key="dimmer" className="dimmer"></div>,
    <div key="new" id="new" className="popup" style={{top: '20%'}}>
      <div className="inner">
        <div className="header">
          <span className="title">Select a difficulty</span>
          <button onClick={hidePopup}><MdClose /></button>
        </div>
        <div className="content">
          <button onClick={() => difficulty(1)}>
            <div className="cards">
              <div className="card" style={{left: 52}}>{spades}</div>
            </div>
            <span>Easy: One Suit</span>
          </button>
          <button onClick={() => difficulty(2)}>
            <div className="cards">
              <div className="card" style={{left: 37}}>{spades}</div>
              <div className="card" style={{left: 67}}>{hearts}</div>
            </div>
            <span>Medium: Two Suits</span>
          </button>
          <button onClick={() => difficulty(4)}>
            <div className="cards">
              <div className="card" style={{left: 27}}>{spades}</div>
              <div className="card" style={{left: 47}}>{hearts}</div>
              <div className="card" style={{left: 67}}>{clubs}</div>
              <div className="card" style={{left: 87}}>{diamonds}</div>
            </div>
            <span>Difficult: Four Suits</span>
          </button>
        </div>
      </div>
    </div>
  ]
}

export default New;
