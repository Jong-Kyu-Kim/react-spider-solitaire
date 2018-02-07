import React from 'react'

const Front = ({props}) => {
  const {style, suit, value} = props
  return (
    <div className="card" style={{
      ...style,
      zIndex: 0
    }}>
      <span id={suit + '-' + value} className="front"></span>
    </div>
  )
}

export default Front
