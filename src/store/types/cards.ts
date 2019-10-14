import ActionWithPayload from './actionWithPayload'
import { ICardState } from '../reducers/cards'

enum actionTypes {
  ADD_CARD_REQUESTED = 'RTC_ADD_CARD_REQUESTED',
  REMOVE_CARD_REQUESTED = 'RTC_REMOVE_CARD_REQUESTED',
  EDIT_CARD_CONTENT_REQUESTED = 'RTC_EDIT_CARD_CONTENT_REQUESTED',
  CHANGE_CARD_PARENT_REQUESTED = 'RTC_CHANGE_CARD_PARENT_REQUESTED',
  CHANGE_CARD_ORDER_REQUESTED = 'RTC_CHANGE_CARD_ORDER_REQUESTED',
  ADD_CARD_CONFIRMED = 'RTC_ADD_CARD_CONFIRMED',
  REMOVE_CARD_CONFIRMED = 'RTC_REMOVE_CARD_CONFIRMED',
  CHANGE_CARD_CONTENT_CONFIRMED = 'RTC_CHANGE_CARD_CONTENT_CONFIRMED',
  CHANGE_CARD_PARENT_CONFIRMED = 'RTC_CHANGE_CARD_PARENT_CONFIRMED',
  CHANGE_CARD_ORDER_CONFIRMED = 'RTC_CHANGE_CARD_ORDER_CONFIRMED'
}

export default actionTypes

export interface IAddCardAction extends ActionWithPayload {
  type: actionTypes.ADD_CARD_REQUESTED | actionTypes.ADD_CARD_CONFIRMED
  payload: {
    card: ICardState
  }
}

export interface IRemoveCardAction extends ActionWithPayload {
  type: actionTypes.REMOVE_CARD_REQUESTED | actionTypes.REMOVE_CARD_CONFIRMED
  payload: {
    id: string
  }
}

export interface IChangeCardOrderAction extends ActionWithPayload {
  type: actionTypes.CHANGE_CARD_ORDER_REQUESTED | actionTypes.CHANGE_CARD_ORDER_CONFIRMED
  payload: {
    id: string
    order: number
  }
}

export interface IChangeCardParentAction extends ActionWithPayload {
  type: actionTypes.CHANGE_CARD_PARENT_REQUESTED | actionTypes.CHANGE_CARD_PARENT_CONFIRMED
  payload: {
    id: string
    list: string
  }
}

export interface IChangeCardContentAction extends ActionWithPayload {
  type: actionTypes.EDIT_CARD_CONTENT_REQUESTED | actionTypes.CHANGE_CARD_CONTENT_CONFIRMED
  payload: {
    id: string
    content: string
  }
}
