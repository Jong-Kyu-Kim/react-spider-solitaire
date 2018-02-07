import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'modules'
import {Stock} from 'components'

class StockContainer extends Component {
  componentDidMount() {
    this.props.fillStock(1)
  }

  render() {
    const {stock, getCard, pushPast, entering, toggleEntering} = this.props
    return (
      <Stock stock={stock} getCard={getCard} pushPast={pushPast} entering={entering} toggleEntering={toggleEntering} />
    )
  }
}

const mapStateToProps = state => ({
  stock: state.getIn(['present', 'stock']),
  entering: state.get('entering')
})

const mapDispatchToProps = dispatch => ({
  fillStock: suit => dispatch(actions.fillStock(suit)),
  getCard: count => dispatch(actions.getCard(count)),
  pushPast: () => dispatch(actions.pushPast()),
  toggleEntering: () => dispatch(actions.toggleEntering())
})

export default connect(mapStateToProps, mapDispatchToProps)(StockContainer)
