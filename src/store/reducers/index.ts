import { combineReducers } from 'redux'
import lists from './lists'
import cards from './cards'

export default combineReducers({
  cards,
  lists
})
