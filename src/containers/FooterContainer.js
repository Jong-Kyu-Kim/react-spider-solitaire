import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'modules'
import {Footer} from 'components'
import {New, Records} from 'components/Popup'
import * as firebase from 'firebase'

class FooterContainer extends Component {
  constructor() {
    super()
    this.state = {
      popup: 'none',
      difficulty: 1
    }
  }

  componentDidMount() {
    firebase.database().ref('/').once('value').then(res => {
      this.props.pushRecords(res.val())
    })
  }

  showNew() {
    this.setState({ popup: 'new' })
  }

  showRecords() {
    this.setState({ popup: 'records' })
  }

  hidePopup() {
    this.setState({ popup: 'none' })
  }

  selectDifficulty(difficulty) {
    this.setState({ difficulty })
  }

  render() {
    const {initState, fillStock, getCard, undoMove, past, entering, records, toggleEntering} = this.props
    return [
      <Footer
        key="footer"
        entering={entering}
        showNew={this.showNew.bind(this)}
        showRecords={this.showRecords.bind(this)}
        undoMove={undoMove}
        past={past}
      />,

      this.state.popup === 'new' ?
      <New
        key="new"
        hidePopup={this.hidePopup.bind(this)}
        initState={initState}
        fillStock={fillStock}
        getCard={getCard}
        toggleEntering={toggleEntering}
      /> :

      this.state.popup === 'records' ?
      <Records
        key="records"
        hidePopup={this.hidePopup.bind(this)}
        records={Object.values(records)}
        difficulty={this.state.difficulty}
        selectDifficulty={this.selectDifficulty.bind(this)}
      /> : null
    ]
  }
}

const mapStateToProps = state => ({
  past: state.get('past').size,
  entering: state.get('entering'),
  difficulty: state.get('difficulty'),
  records: state.get('records')
})

const mapDispatchToProps = dispatch => ({
  initState: () => dispatch(actions.initState()),
  fillStock: suit => dispatch(actions.fillStock(suit)),
  getCard: count => dispatch(actions.getCard(count)),
  undoMove: () => dispatch(actions.undoMove()),
  toggleEntering: () => dispatch(actions.toggleEntering()),
  pushRecords: records => dispatch(actions.pushRecords(records))
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer)
