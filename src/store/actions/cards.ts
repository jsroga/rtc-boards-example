import { ICardState } from '../reducers/cards'
import actionTypes from '../types/cards'
import {
  IAddCardAction,
  IRemoveCardAction,
  IChangeCardContentAction,
  IChangeCardParentAction,
  IChangeCardOrderAction
} from '../types/cards'

export const addCardRequested = (card: ICardState): IAddCardAction => {
  return {
    type: actionTypes.ADD_CARD_REQUESTED,
    payload: { card }
  }
}

export const removeCardRequested = (id: string): IRemoveCardAction => {
  return {
    type: actionTypes.REMOVE_CARD_REQUESTED,
    payload: { id }
  }
}

export const ehangeCardContentRequested = (id: string, content: string): IChangeCardContentAction => {
  return {
    type: actionTypes.EDIT_CARD_CONTENT_REQUESTED,
    payload: { id, content }
  }
}

export const changeCardParentRequested = (id: string, list: string): IChangeCardParentAction => {
  return {
    type: actionTypes.CHANGE_CARD_PARENT_REQUESTED,
    payload: { id, list }
  }
}

export const changeCardOrderRequested = (id: string, order: number): IChangeCardOrderAction => {
  return {
    type: actionTypes.CHANGE_CARD_ORDER_REQUESTED,
    payload: { id, order }
  }
}

export const addCardConfirmed = (card: ICardState): IAddCardAction => {
  return {
    type: actionTypes.ADD_CARD_CONFIRMED,
    payload: { card }
  }
}

export const removeCardConfirmed = (id: string): IRemoveCardAction => {
  return {
    type: actionTypes.REMOVE_CARD_CONFIRMED,
    payload: { id }
  }
}

export const ehangeCardContentConfirmed = (id: string, content: string): IChangeCardContentAction => {
  return {
    type: actionTypes.CHANGE_CARD_CONTENT_CONFIRMED,
    payload: { id, content }
  }
}

export const changeCardParentConfirmed = (id: string, list: string): IChangeCardParentAction => {
  return {
    type: actionTypes.CHANGE_CARD_PARENT_CONFIRMED,
    payload: { id, list }
  }
}

export const changeCardOrderConfirmed = (id: string, order: number): IChangeCardOrderAction => {
  return {
    type: actionTypes.CHANGE_CARD_ORDER_CONFIRMED,
    payload: { id, order }
  }
}
