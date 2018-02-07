import React from 'react'
import {status, getCardSuit, getCardValue} from 'modules/util'
import {onlyUpdateForKeys} from 'recompose'
import Front from './Front'
import Back from './Back'
import Drag from './Drag'
import 'styles/Cards.sass'

const enhance = onlyUpdateForKeys(['cardIndex', 'isContinue', 'isDragging', 'isFlipped'])
const Cards = enhance(({lineIndex, cardIndex, isContinue, flipped, isFlipped, stock, field, connectDragSource, connectDragPreview, dropResult, isDragging, entering}) => {

  const card = field(lineIndex).get(cardIndex)
  const suit = getCardSuit(status(card).suit)
  const value = getCardValue(status(card).value)
  const opacity = isDragging >= 0 && isDragging <= cardIndex ? 0 : 1
  const transition = isDragging >= 0 ? 'none' : '.2s'
  const style = {
    top: flipped < cardIndex ? 133 + (10 * cardIndex) + (10 * (cardIndex - flipped)) : 133 + (10 * cardIndex),
    left: 10 + (100 * lineIndex),
    zIndex: flipped < cardIndex ? 10 - lineIndex : 110 - (10 * cardIndex) + (10 - lineIndex),
    opacity: opacity
  }

  const getCardStyles = {
    entering: {
      top: 0,
      left: flipped < cardIndex ? 10 + (20 * stock.size/10) : 210 - (20 * cardIndex)
    },
  }

  const transitionIn = () => {
    if (dropResult) {
      return field(lineIndex).size - 1 === cardIndex && dropResult.lineIndex !== lineIndex && flipped === field(lineIndex).size
    }
    else {
      return field(lineIndex).size - 1 === cardIndex
    }
  }

  const props = {
    suit, value, style, getCardStyles, transitionIn, connectDragSource, connectDragPreview, lineIndex, cardIndex, transition, flipped, entering
  }

  if (flipped <= cardIndex && isContinue) {
    return <Drag props={props} />
  }

  else if (flipped <= cardIndex) {
    return <Front props={props} />
  }

  else {
    return <Back props={props} />
  }
})

export default Cards
