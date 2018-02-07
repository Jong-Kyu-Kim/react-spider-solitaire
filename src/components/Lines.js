import React from 'react'
import {CardsContainer} from 'containers'
import {status} from 'modules/util'
import 'styles/Lines.sass'
import {onlyUpdateForKeys} from 'recompose'

const enhance = onlyUpdateForKeys(['line', 'flipped'])

const Lines = enhance(({line, lineIndex, flipped, connectDropTarget}) => {
  const cards = line.map((card, i) => {
    const onContinue = line.splice(0, i).map((card, j) => (
      status(card).suit + (status(card).value + j)
    ))

    const isContinue = onContinue.filter(card => card !== onContinue.get(0)).size === 0

    return (
      <CardsContainer
        key={i}
        lineIndex={lineIndex}
        cardIndex={i}
        isContinue={isContinue && flipped<=i}
        flipped={flipped}
        isFlipped={flipped<=i}
      />
    )
  })

  // const isActive = isOver && canDrop

  return connectDropTarget (
    <div className="line">
      {cards}
    </div>
  )
})

export default Lines
