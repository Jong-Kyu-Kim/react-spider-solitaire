import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DragLayer} from 'react-dnd'
import {Layer} from 'components'

class LayerContainer extends Component {
  render() {
    const {item, itemType, initialOffset, currentOffset, isDragging, field} = this.props
    return (
      <Layer
        item={item}
        itemType={itemType}
        initialOffset={initialOffset}
        currentOffset={currentOffset}
        isDragging={isDragging}
        field={field}
      />
    )
  }
}

let collect = monitor => ({
  item: monitor.getItem(),
	itemType: monitor.getItemType(),
	initialOffset: monitor.getInitialSourceClientOffset(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
})

const mapStateToProps = state => ({
  field: lineIndex => state.getIn(['present', 'field', lineIndex])
})

const LayerDrag = DragLayer(collect)(LayerContainer)
export default connect(mapStateToProps)(LayerDrag)
