import actionTypes from '../types/lists';

export interface IListState {
  id: string,
  order: number,
}

export interface IListsState {
  [id: string] : IListState
}

export default (state: IListsState | undefined, action: any): IListsState => {
  if (!state) {
    return {}
  }

  const { payload, type } = action

  switch (type) {
    case actionTypes.ADD_LIST_CONFIRMED:
      return {
        ...state,
        [payload.id]: payload
      }
    case actionTypes.REMOVE_LIST_CONFIRMED:
      const newState = {...state}
      delete newState[payload.id]
      return newState
    case actionTypes.CHANGE_LIST_ORDER_CONFIRMED:
      return {
        ...state,
        ...{[payload.id]: {
          ...state[payload.id],
          order: payload.order
        }}
      }
    default:
      return state
  }
}
