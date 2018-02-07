import Cards from 'components/Cards'
import {constant, status} from 'modules/util'
import {DragSource} from 'react-dnd'
import {connect} from 'react-redux'
import * as actions from 'modules'

const cardSpec = {
  beginDrag(props, monitor) {
    return {
      lineIndex: props.lineIndex,
      cardIndex: props.cardIndex,
    }
  },

  isDragging(props, monitor) {
    const {lineIndex, cardIndex} = props
    const dragItem = monitor.getItem()
    const dragLineIndex = dragItem.lineIndex
    const dragCardIndex = dragItem.cardIndex

    if (lineIndex === dragLineIndex && cardIndex >= dragCardIndex) {
      return dragCardIndex
    }
    else {
      return lineIndex === dragLineIndex && cardIndex === dragCardIndex
    }
  },

  endDrag(props, monitor) {
    const dragItem = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.lineIndex !== dragItem.lineIndex) {
      const {field, moveCard, flipCard, setCard, pushPast} = props
      const dragCardIndex = dragItem.cardIndex
      const dragLineIndex = dragItem.lineIndex
      const dropLineIndex = dropResult.lineIndex
      const dropLineFlipped = dropResult.flipped

      pushPast()
      moveCard(dragLineIndex, dragCardIndex, dropLineIndex)
      flipCard(dragLineIndex)

      const dropped = field(dropLineIndex).splice(0, dropLineFlipped)
      const dragged = field(dragLineIndex).splice(0, dragCardIndex)
      const chain = dropped.concat(dragged).map((card, i) => (
        status(card).suit + (status(card).value + i)
      ))

      if (chain.filter(card => card === chain.get(chain.size - 1)).size === 13) {
        setCard(dropLineIndex)
        flipCard(dropLineIndex)
      }
    }
  }
}

let collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview:connect.dragPreview(),
  dropResult: monitor.getDropResult(),
  isDragging: monitor.isDragging() === false ? -1 : monitor.isDragging()
})

const mapStateToProps = state => ({
  stock: state.getIn(['present', 'stock']),
  field: lineIndex => state.getIn(['present', 'field', lineIndex]),
  entering: state.get('entering')
})

const mapDispatchToProps = dispatch => ({
  moveCard: (dragLineIndex, dragCardIndex, dropLineIndex) => {
    dispatch(actions.moveCard({dragLineIndex, dragCardIndex, dropLineIndex}))
  },
  flipCard: lineIndex => {dispatch(actions.flipCard(lineIndex))},
  setCard: dropLineIndex => dispatch(actions.setCard(dropLineIndex)),
  pushPast: () => dispatch(actions.pushPast())
})

const CardsDragSource = DragSource(constant.spider, cardSpec, collect)(Cards)
export default connect(mapStateToProps, mapDispatchToProps)(CardsDragSource)
