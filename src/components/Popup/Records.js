import React from 'react'
import dateFormat from 'dateformat'
import MdClose from 'react-icons/lib/md/close'
import 'styles/Popup.sass'

const Records = ({records, hidePopup, difficulty, selectDifficulty}) => {
  const filter = records.filter(record => record.difficulty === difficulty)
  const sort = filter.length >= 2 ? filter.sort((a, b) => b['score'] - a['score']) : filter
  const style = {
    backgroundColor: 'rgba(0,0,0,.1)'
  }

  const mapRecords = sort.map((record, i) => (
    <tr key={i+1}>
      <td className="rank">{i+1}</td>
      <td>{record.name}</td>
      <td>{record.score}</td>
      <td>{record.move}</td>
      <td>{dateFormat(record.elapsed, 'MM:ss')}</td>
      <td>{dateFormat(record.date, 'yyyy-mm-dd')}</td>
    </tr>
  ))

  return [
    <div key="dimmer" className="dimmer"></div>,
    <div key="records" id="records" className="popup" style={{top: '20%'}}>
      <div className="inner">
        <div className="header">
          <span className="title">Records</span>
          <button onClick={hidePopup}><MdClose /></button>
        </div>
        <div className="content">
          <ul>
            <li>
              <button onClick={() => selectDifficulty(1)} style={difficulty === 1 ? style : null}>Easy</button>
            </li>
            <li>
              <button onClick={() => selectDifficulty(2)} style={difficulty === 2 ? style : null}>Medium</button>
            </li>
            <li>
              <button onClick={() => selectDifficulty(4)} style={difficulty === 4 ? style : null}>Difficult</button>
            </li>
          </ul>
          <table>
            <thead>
              <tr>
                <th className="rank">Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Move</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {mapRecords}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ]
}

export default Records
