import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'modules'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {Field} from 'components'

class FieldContainer extends Component {
  componentDidMount() {
    const {getCard, toggleEntering} = this.props
    getCard(6)
    setTimeout(() => toggleEntering(), 5300)
  }

  render() {
    const {field, flipped, getCard} = this.props
    return (
      <Field
        field={field}
        flipped={flipped}
        getCard={getCard}
      />
    )
  }
}

const mapStateToProps = state => {
  const present = state.get('present')
  return {
    field: present.get('field'),
    flipped: lineIndex => present.getIn(['flipped', lineIndex]),
  }
}

const mapDispatchToProps = dispatch => ({
  getCard: count => dispatch(actions.getCard(count)),
  toggleEntering: () => dispatch(actions.toggleEntering())
})

const fieldDragDropContext = DragDropContext(HTML5Backend)(FieldContainer)
export default connect(mapStateToProps, mapDispatchToProps)(fieldDragDropContext)
