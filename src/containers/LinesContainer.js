import {DropTarget} from 'react-dnd'
import {constant} from 'modules/util'
import {Lines} from 'components'

const lineSpec = {
  drop(props) {
    return {
      lineIndex: props.lineIndex,
      flipped: props.flipped
    }
  }
}

let collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  item: monitor.getItem(),
  // isOver: monitor.isOver(),
  // canDrop: monitor.canDrop()
})

export default DropTarget(constant.spider, lineSpec, collect)(Lines)
