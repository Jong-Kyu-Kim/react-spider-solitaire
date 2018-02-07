import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header} from 'components'
import {Win} from 'components/Popup'
import * as actions from 'modules'
import dateFormat from 'dateformat'
import * as firebase from 'firebase'

class HeaderContainer extends Component {
  constructor() {
    super()
    this.state = {
      start: 0,
      elapsed: '0',
      name: '',
      popup: false
    }
    this.tick = this.tick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {entering, move, sets} = nextProps

    if (move === 0 && !entering) {
      this.setState({ start: Date.now() })
      this.timer = setInterval(this.tick, 1000)
    }

    if (move === 0 && entering) {
      clearInterval(this.timer)
      this.setState({
        start: Date.now(),
        elapsed: '0'
      })
    }

    if (sets === 104) {
      clearInterval(this.timer)
      this.setState({ popup: true })
    }
  }

  tick() {
    this.setState({ elapsed: new Date() - this.state.start })
  }

  showRecord() {}

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  insertRecord() {
    const database = firebase.database()
    const {name, elapsed} = this.state
    const {score, move, difficulty, pushRecords} = this.props

    this.setState({ popup: false })
    database.ref().push().set({
      name,
      score,
      move,
      difficulty,
      elapsed,
      date: Date.now()
    })

    firebase.database().ref('/').once('value').then(res => {
      pushRecords(res.val())
    })
  }

  render() {
    const {score, move} = this.props
    const time = dateFormat(this.state.elapsed, 'MM:ss')
    return [
      <Header key="header" move={move} score={score} time={time} />,
      this.state.popup ?
      <Win key="popup"
        move={move}
        score={score}
        time={time}
        handleChange={this.handleChange.bind(this)}
        insertRecord={this.insertRecord.bind(this)}
      /> : null
    ]
  }
}

const mapStateToProps = state => ({
  sets: state.getIn(['present', 'sets', 'cards']).size,
  score: state.get('score'),
  move: state.get('move'),
  entering: state.get('entering'),
  difficulty: state.get('difficulty')
})

const mapDispatchToProps = dispatch => ({
  pushRecords: records => dispatch(actions.pushRecords(records))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
