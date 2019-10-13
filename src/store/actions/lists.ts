import { ICardsState } from '../reducers/cards';
import actionTypes, {
  IAddListAction,
  IRemoveListAction,
  IChangeListOrderAction
} from '../types/lists'

// BPM
export const addListRequested = (list: {
  id: string,
  order: number,
  cards?: ICardsState
}): IAddListAction => ({
  type: actionTypes.ADD_LIST_REQUESTED,
  payload: list
})

export const addListConfirmed = (list: {
  id: string,
  order: number,
  cards?: ICardsState
}): IAddListAction => ({
  type: actionTypes.ADD_LIST_CONFIRMED,
  payload: list
})

export const removeListRequested = (id: string): IRemoveListAction => ({
  type: actionTypes.REMOVE_LIST_REQUESTED,
  payload: { id }
})

export const removeListConfirmed = (id: string): IRemoveListAction => ({
  type: actionTypes.REMOVE_LIST_CONFIRMED,
  payload: { id }
})

export const changeListOrderRequested = (id: string, order: number): IChangeListOrderAction => ({
  type: actionTypes.CHANGE_LIST_ORDER_REQUESTED,
  payload: { id, order }
})

export const changeListOrderConfirmed = (id: string, order: number): IChangeListOrderAction => ({
  type: actionTypes.CHANGE_LIST_ORDER_CONFIRMED,
  payload: { id, order }
})
