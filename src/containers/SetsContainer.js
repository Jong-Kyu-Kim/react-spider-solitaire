import {connect} from 'react-redux'
import {Sets} from 'components'

const mapStateToProps = state => {
  const present = state.get('present')
  return {
    cards: present.getIn(['sets', 'cards']),
    lineIndex: present.getIn(['sets', 'line']),
    field: lineIndex => present.getIn(['field', lineIndex]),
    flipped: lineIndex => present.getIn(['flipped', lineIndex]),
  }
}

export default connect(mapStateToProps)(Sets)
