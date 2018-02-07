import React from 'react'
import FaRotateLeft from 'react-icons/lib/fa/rotate-left'
import FaInfo from 'react-icons/lib/fa/info'
import FaPlus from 'react-icons/lib/fa/plus'
import FaCog from 'react-icons/lib/fa/cog'
import FaQuestion from 'react-icons/lib/fa/question'
import FaListOl from 'react-icons/lib/fa/list-ol'
import 'styles/Footer.sass'

const Footer = ({showNew, showRecords, undoMove, past, entering}) => (
  <div id="footer">
    <div className="left">
      {past === 0 ?
        <button className="disable"><FaRotateLeft /><span>Undo</span></button> :
        <button onClick={undoMove}><FaRotateLeft /><span>Undo</span></button>}
      {entering === true ?
        <button><FaPlus /><span>New</span></button> :
        <button onClick={showNew}><FaPlus /><span>New</span></button>}
    </div>
    <div className="right">
      {entering === true ?
        <button><FaListOl /><span>Records</span></button> :
        <button onClick={showRecords}><FaListOl /><span>Records</span></button>}
      <button><FaCog /><span>Settings</span></button>
      <button><FaQuestion /><span>Rules</span></button>
      <button><FaInfo /><span>About</span></button>
    </div>
  </div>
)

export default Footer
