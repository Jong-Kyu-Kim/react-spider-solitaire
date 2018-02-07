import React from 'react'
import {Transition} from 'react-transition-group'
import {getEmptyImage} from 'react-dnd-html5-backend'

const Drag = ({props}) => {
  const {lineIndex, cardIndex} = props
  const flipStyles = {
    entering: { transform: 'rotateY(180deg)' },
    entered:  { transform: 'rotateY(180deg)' },
    exited: { zIndex: 0 }
  }

  props.connectDragPreview(getEmptyImage(), {
    captureDraggingState: true
  })

  return (
    <Transition
      in={props.transitionIn() && props.entering}
      onEntered={node => {
        setTimeout(() => node.style.zIndex = 0, 100)
        setTimeout(() => node.style.transform = 'rotateY(0deg)', 300)
      }}
      appear={true}
      enter={false}
      timeout={props.flipped === cardIndex ? (lineIndex * 100) + (cardIndex * 1000) : lineIndex * 100}
    >
      {state => (
        props.connectDragSource (
          <div className="card" style={{
            ...props.style,
            ...props.getCardStyles[state],
            ...flipStyles[state],
            transition: props.transition
          }}>
          <span id={props.suit + '-' +  props.value} className="front"></span>
          <span className="back"></span>
          </div>
        )
      )}
    </Transition>
  )
}

export default Drag
