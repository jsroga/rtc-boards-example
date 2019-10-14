import actionTypes from '../types/cards'
export interface ICardState {
  id: string
  order: number
  list: string
  content: string
}

export interface ICardsState {
  [id: string]: ICardState
}

export default (state: ICardsState | undefined, action: any): ICardsState => {
  if (!state) {
    return {}
  }

  const { payload, type } = action

  switch (type) {
    case actionTypes.ADD_CARD_CONFIRMED:
      return {
        ...state,
        [payload.card.id]: payload.card
      }
    case actionTypes.REMOVE_CARD_CONFIRMED:
      const newState = { ...state }
      delete newState[payload.id]
      return newState
    case actionTypes.CHANGE_CARD_ORDER_CONFIRMED:
      return {
        ...state,
        ...{
          [payload.id]: {
            ...state[payload.id],
            order: payload.order
          }
        }
      }
    case actionTypes.CHANGE_CARD_PARENT_CONFIRMED:
      return {
        ...state,
        ...{
          [payload.id]: {
            ...state[payload.id],
            list: payload.list
          }
        }
      }
    case actionTypes.CHANGE_CARD_CONTENT_CONFIRMED:
      return {
        ...state,
        ...{
          [payload.id]: {
            ...state[payload.id],
            content: payload.content
          }
        }
      }
    default:
      return state
  }
}
