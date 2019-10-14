import { ObjectReplaceOp, Op, ObjectInsertOp, ObjectDeleteOp } from '@soundation/sharedb/lib/client'
import { isObjectReplaceOp, isObjectInsertOp, isObjectDeleteOp } from './op'
import { ICardState } from '../../store/reducers/cards'

export interface IAddCardOp extends ObjectInsertOp {
  p: ['cards', string]
  oi: ICardState
}

export const isAddCardOp = (op: Op): op is IAddCardOp =>
  isObjectInsertOp(op) && op.p.length === 2 && op.p[0] === 'cards'

export interface IRemoveCardOp extends ObjectDeleteOp {
  p: ['cards', string]
  od: ICardState
}

export const isRemoveCardOp = (op: Op): op is IRemoveCardOp =>
  isObjectDeleteOp(op) && op.p.length === 2 && op.p[0] === 'cards'

export interface IChangeCardOrderOp extends ObjectReplaceOp {
  p: ['cards', string, 'order']
  oi: number
  od: number
}

export const isChangeCardOrderOp = (op: Op): op is IChangeCardOrderOp =>
  isObjectReplaceOp(op) && op.p.length === 3 && op.p[2] === 'order' && op.p[0] === 'cards'

export const isChangeCardParentOp = (op: Op): op is IChangeCardParentOp =>
  isObjectReplaceOp(op) && op.p.length === 3 && op.p[2] === 'list' && op.p[0] === 'cards'

export interface IChangeCardParentOp extends ObjectReplaceOp {
  p: ['cards', string, 'list']
  oi: string
  od: string
}

export const isChangeCardContentOp = (op: Op): op is IChangeCardContentOp =>
  isObjectReplaceOp(op) && op.p.length === 3 && op.p[2] === 'content' && op.p[0] === 'cards'

export interface IChangeCardContentOp extends ObjectReplaceOp {
  p: ['cards', string, 'content']
  oi: string
  od: string
}
