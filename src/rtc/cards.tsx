import { ICardState } from '../store/reducers/cards'
import { IAddCardOp, IRemoveCardOp, IChangeCardOrderOp, IChangeCardParentOp, IChangeCardContentOp } from './types/cards'

export const shareAddCard = (card: ICardState): IAddCardOp[] => [
  {
    p: ['cards', card.id],
    oi: card
  }
]

export const shareRemoveCard = (card: ICardState): IRemoveCardOp[] => [
  {
    p: ['cards', card.id],
    od: card
  }
]

export const shareChangeCardOrder = (card: ICardState, order: number): IChangeCardOrderOp[] => [
  {
    p: ['cards', card.id, 'order'],
    od: card.order,
    oi: order
  }
]

export const shareChangeCardParent = (card: ICardState, list: string): IChangeCardParentOp[] => [
  {
    p: ['cards', card.id, 'list'],
    od: card.list,
    oi: list
  }
]

export const shareChangeCardContent = (card: ICardState, content: string): IChangeCardContentOp[] => [
  {
    p: ['cards', card.id, 'content'],
    od: card.content,
    oi: content
  }
]
