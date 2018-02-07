import React from 'react'
import PropTypes from 'prop-types'
import {status, getCardSuit, getCardValue} from 'modules/util'

const Layer = ({item, itemType, isDragging, initialOffset, currentOffset, field}) => {
	const getItemStyles = () => {
		if (!initialOffset || !currentOffset) {
			return {
				display: 'none',
			}
		}

		let {x, y} = currentOffset
		const transform = `translate(${x}px, ${y}px)`

		return {
			transform,
			WebkitTransform: transform,
		}
	}

	const layerStyles = {
		position: 'fixed',
		pointerEvents: 'none',
		zIndex: 110,
		left: 0,
		top: 0,
		width: '100%',
		height: '100%'
	}

  if (!isDragging || itemType !== 'spider') {
    return null
  }

	else {
		const {lineIndex, cardIndex} = item
		const dragCards = field(lineIndex).splice(0, cardIndex).map((card, i) => {
	    const suit = getCardSuit(status(card).suit)
	    const value = getCardValue(status(card).value)
	    const style = {
	      top: 20 * i
	    }

	    return (
	      <div key={i} className="card" style={style}>
	        <span id={suit + '-' +  value} className="front"></span>
	      </div>
	    )
	  })

		return (
			<div style={layerStyles}>
				<div style={getItemStyles()}>
					<div>{dragCards}</div>
				</div>
			</div>
		)
	}
}

Layer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  initialOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  isDragging: PropTypes.bool.isRequired
}

export default Layer
