import { combineReducers } from 'redux'
import lists from './lists'
import cards from './cards'
import workspace from './workspace'

export default combineReducers({
  cards,
  lists,
  workspace
})
