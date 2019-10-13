import ActionWithPayload from './actionWithPayload'
import { ICardsState } from '../reducers/cards';

enum actionTypes {
  ADD_LIST_REQUESTED = 'RTC_ADD_LIST_REQUESTED',
  REMOVE_LIST_REQUESTED = 'RTC_REMOVE_LIST_REQUESTED',
  CHANGE_LIST_ORDER_REQUESTED = 'RTC_CHANGE_LIST_ORDER_REQUESTED',
  ADD_LIST_CONFIRMED = 'RTC_ADD_LIST_CONFIRMED',
  REMOVE_LIST_CONFIRMED = 'RTC_REMOVE_LIST_CONFIRMED',
  CHANGE_LIST_ORDER_CONFIRMED = 'RTC_CHANGE_LIST_ORDER_CONFIRMED',
}

export default actionTypes

export interface IAddListAction extends ActionWithPayload {
  type: actionTypes.ADD_LIST_REQUESTED | actionTypes.ADD_LIST_CONFIRMED 
  payload: {
    id: string,
    order: number,
    cards?: ICardsState
  }
}

export interface IRemoveListAction extends ActionWithPayload {
  type: actionTypes.REMOVE_LIST_REQUESTED | actionTypes.REMOVE_LIST_CONFIRMED 
  payload: {
    id: string,
  }
}

export interface IChangeListOrderAction extends ActionWithPayload {
  type: actionTypes.CHANGE_LIST_ORDER_REQUESTED | actionTypes.CHANGE_LIST_ORDER_CONFIRMED 
  payload: {
    id: string,
    order: number,
  }
}