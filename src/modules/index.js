import {createAction, handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {constant, status, shuffleStock, division} from './util'

const spider = constant.spider

// Action Types
const FILL_STOCK = `${spider}/FILL_STOCK`
const GET_CARD = `${spider}/GET_CARD`
const FLIP_CARD = `${spider}/FLIP_CARD`
const MOVE_CARD = `${spider}/MOVE_CARD`
const SET_CARD = `${spider}/SET_CARD`
const PUSH_PAST = `${spider}/PUSH_PAST`
const UNDO_MOVE = `${spider}/UNDO_MOVE`
const TOGGLE_ENTERING = `${spider}/TOGGLE_ENTERING`
const PUSH_RECORDS = `${spider}/PUSH_RECORDS`
const INIT_STATE = `${spider}/INIT_STATE`

// Action Creator
export const fillStock = createAction(FILL_STOCK)
export const getCard = createAction(GET_CARD)
export const flipCard = createAction(FLIP_CARD)
export const moveCard = createAction(MOVE_CARD)
export const setCard = createAction(SET_CARD)
export const pushPast = createAction(PUSH_PAST)
export const undoMove = createAction(UNDO_MOVE)
export const toggleEntering = createAction(TOGGLE_ENTERING)
export const pushRecords = createAction(PUSH_RECORDS)
export const initState = createAction(INIT_STATE)

const initialState = fromJS({
  past: [],
  present: {
    field: [
      [],[],[],[],[],[],[],[],[],[]
    ],
    flipped: [5, 5, 5, 5, 4, 4, 4, 4, 4, 4],
    stock: [],
    sets: {
      line: -1,
      cards: []
    },
  },
  difficulty: 0,
  score: 501,
  move: -1,
  entering: true,
  records: {}
})

// Reducer
export default handleActions({
  [FILL_STOCK]: (state, action) => {
    const suit = ['c', 'd', 'h', 's']
    const selectedSuit = suit.splice(suit.length - action.payload)
    const value = 104 / action.payload

    const stock = (suit, value) => {
      const stockArray = []
      suit.forEach(suit => {
        for(let i=0;i<value;i++) {
          stockArray.push(suit + i)
        }
      })

      return stockArray
    }

    return state.setIn(['present', 'stock'], List(stock(selectedSuit, value)))
                .set('difficulty', action.payload)
  },

  [GET_CARD]: (state, action) => {
    const present = state.get('present')
    const field = present.get('field')
    let stock = present.get('stock')
    const getStock = shuffleStock(stock, stock.size -1)
    const stockIndexs = division(getStock, action.payload)
    const move = state.get('move')
    const score = state.get('score')

    const fromStock = field.map((line, i) => {
      if (stockIndexs[i] === undefined) {
        return line
      }
      return line.concat(stockIndexs[i])
    })

    fromStock.forEach(line => {
      line.forEach(item => {
        const card = stock.indexOf(item)
        if (card !== -1) {
          stock = stock.splice(card, 1)
        }
      })
    })

    return state.set('move', move + 1).set('score', score - 1).mergeIn(['present'],{
      field: List(fromStock),
      stock: stock
    })
  },

  [FLIP_CARD]: (state, action) => {
    const lineIndex = action.payload
    const present = state.get('present')
    const field = lineIndex => present.getIn(['field', lineIndex])
    const flipped = lineIndex => present.getIn(['flipped', lineIndex])
    const isFlipped = flipped(lineIndex) >= field(lineIndex).size && flipped(lineIndex) > 0

    return state.setIn(['present', 'flipped', lineIndex], isFlipped ? flipped(lineIndex) - 1 : flipped(lineIndex))
  },

  [MOVE_CARD]: (state, action) => {
    const {dragLineIndex, dragCardIndex, dropLineIndex} = action.payload
    const present = state.get('present')
    const getField = lineIndex => present.getIn(['field', lineIndex])
    const move = state.get('move')
    const score = state.get('score')

    const dragCard = getField(dragLineIndex).get(dragCardIndex)
    const dropCard = getField(dropLineIndex).get(getField(dropLineIndex).size - 1)
    const moveDrag = getField(dragLineIndex).splice(dragCardIndex, getField(dragLineIndex).size)
    const moveDrop = getField(dropLineIndex).concat(getField(dragLineIndex).splice(0, dragCardIndex))

    const moveCard = state.setIn(['present', 'field', dragLineIndex], moveDrag)
                          .setIn(['present', 'field', dropLineIndex], moveDrop)
                          .set('move', move + 1)
                          .set('score', score - 1)


    if (dropCard && status(dragCard).value === status(dropCard).value - 1) return moveCard
    else if (!dropCard) return moveCard
    else return state
  },

  [SET_CARD]: (state, action) => {
    const dropLineIndex = action.payload
    const present = state.get('present')
    const getField = lineIndex => present.getIn(['field', lineIndex])
    const dropLineSize = getField(dropLineIndex).size
    const getSetCards = present.getIn(['sets', 'cards'])

    return state.mergeIn(['present', 'sets'], {
      cards: getSetCards.concat(getField(dropLineIndex).slice(dropLineSize - 13, dropLineSize)),
      line: dropLineIndex
    })
    .setIn(['present', 'field', dropLineIndex], getField(dropLineIndex).splice(dropLineSize - 13, 13))
    .set('score', state.get('score') + 100)
  },

  [PUSH_PAST]: state => {
    const present = state.get('present')
    return state.set('past', state.get('past').push(present))
  },

  [UNDO_MOVE]: state => {
    const move = state.get('move')
    const score = state.get('score')
    return state.merge({
      present: state.getIn(['past', state.get('past').size - 1]),
      past: state.get('past').pop(),
      move: move + 1,
      score: score - 1
    })
  },

  [TOGGLE_ENTERING]: state => {
    const entering = state.get('entering')
    return state.set('entering', !entering)
  },

  [PUSH_RECORDS]: (state, action) => {
    return state.set('records', action.payload)
  },

  [INIT_STATE]: state => {
    const getState = object => initialState.get(object)
    return state.merge({
      past: getState('past'),
      present: getState('present'),
      difficulty: getState('difficulty'),
      score: getState('score'),
      move: getState('move'),
      entering: getState('entering')
    })
  }
}, initialState)
