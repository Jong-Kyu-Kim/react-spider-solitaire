import React from 'react'
import {Transition} from 'react-transition-group';

const Back = ({props}) => {
  const {style, getCardStyles, lineIndex, cardIndex, transition, entering} = props
  return (
    <Transition
      in={true}
      onEntered={node => setTimeout(() => node.style.zIndex = 0, 100)}
      appear={true}
      timeout={(lineIndex * 100) + (cardIndex * 1000)}>
      {state => {
        const cardStyle = entering ? getCardStyles[state] : {zIndex: 0}
        return (
          <div className="card" style={{
            ...style,
            transition: transition,
            ...cardStyle
          }}>
            <span className="back"></span>
          </div>
        )
      }}
    </Transition>
  )
}

export default Back
