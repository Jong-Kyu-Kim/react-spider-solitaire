import React from 'react'
import {Transition} from 'react-transition-group'
import {onlyUpdateForKeys} from 'recompose'
import {status, getCardSuit, getCardValue} from 'modules/util'
import 'styles/Sets.sass'

const enhance = onlyUpdateForKeys(['cards'])

const Sets = enhance(({cards, lineIndex, field, flipped}) => {
  const setCards = cards.map((card, i) => {
    const suit = getCardSuit(status(card).suit)
    const value = getCardValue(status(card).value)
    const cardIndex = field(lineIndex).size + i%13
    const transitionStyles = {
      entering: {
        top: 133 + (10 * cardIndex) + (10 * (cardIndex - flipped(lineIndex))),
        right : 910 - (100 * lineIndex),
        zIndex: 1
      }
    }

    return (
      <Transition
        key={i}
        in={true}
        appear={true}
        timeout={100 * (12 - i%13)}
      >
        {state => (
          <div className="card" style={{
            top: 0,
            right: Math.floor(i/13) * 15 + 10,
            zIndex: i - (2 * (i % 13) - 6) + 6,
            ...transitionStyles[state],
            transition: '.2s'
          }}>
            <span id={suit + '-' + value} className="front"></span>
          </div>
        )}
      </Transition>
    )
  })

  return (
    <div className="sets">
      {setCards}
    </div>
  )
})

export default Sets
